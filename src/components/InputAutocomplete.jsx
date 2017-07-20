import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputFieldsBase from './InputFieldsBase';

class InputAutocomplete extends Component{
	constructor(props) {
		super(props);
		this.state = {
			displayValue: '',
			open: false,
			searching: false,
			results: [],
			timeout: null
		}	
	}

	static propTypes = {
		searchFunction: PropTypes.func.isRequired,
        resultsKeyStructure: PropTypes.arrayOf(PropTypes.string),
		searchKeyStructure: PropTypes.arrayOf(PropTypes.string),
		value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
		searchLength: PropTypes.number,
		hide: PropTypes.bool,
		...InputFieldsBase.getPropTypes()
	}

	static defaultProps = {
		resultsKeyStructure: [],
		searchKeyStructure: [],
		searchLength: 1,
		...InputFieldsBase.getDefaultProps()
	}

	componentWillMount() {
		const { 
			value,
			searchKeyStructure,
			inputId
		} = this.props;

		if(typeof value === 'object'){
			if(!searchKeyStructure.length){
				console.warning(`InputAutocomplete with inputId ${inputId} has value property of type object but no searchKeyStructure for display property has been supplied. Component might misbehave`);
			}
		}
	}	

	componentWillReceiveProps(nextProps) {
		const { value, searchKeyStructure } = this.props;
		if(nextProps.value !== value){
			this.setState({ displayValue: this.getProperty(nextProps.value, searchKeyStructure) || '' });
		}
	}

	getProperty = (obj, propertyStructure) => {
		if(obj){
			for(var prop of propertyStructure){
				if(obj.hasOwnProperty(prop)){
					obj = obj[prop];
				}
			}
		}
	 	
		return obj;
	}

	handleOnChangeSearch = (displayValue) => {
		const { 
			searchFunction, 
			resultsKeyStructure, 
			searchLength,
			onChange,
			inputId
		} = this.props;

		const {
			timeout
		} = this.state;
		
		setTimeout(() => { 
			onChange(null); 
			this.setState({ displayValue }) 
		}, 1);

		if(timeout){
			clearTimeout(timeout);
			this.setState({ timeout: null});
		}

		if(!searchLength || displayValue.length >= searchLength){
			this.setState({ timeout: setTimeout(() => {
				const promise = searchFunction(displayValue);
				this.setState({ searching: true });
				if(promise instanceof Promise){
					promise.then((response) => {
						if(document.querySelector(`#${inputId}-autocomplete .options :focus, #${inputId}-autocomplete input:focus`)){
							const results = this.getProperty(response, resultsKeyStructure) || [];
							this.setState({ open: results.length, results });
						}

						this.setState({ searching: false });
					},
					function(error){

					});
				}else{
					console.error(`Property "searchFunction" provided to InputAutocomplete with inputId ${inputId} is not isntance of Promise`);
				}
			}, 500)});
		}else{
			this.setState({ searching: false, results: [] });
		}
	}

	handleBlur = (e) => {
		setTimeout(() => {
			const { inputId, value } = this.props;
			if(!document.querySelector(`#${inputId}-autocomplete .options :focus, #${inputId}-autocomplete input:focus`)){
				this.setState({ open: false});

				if(!value){
					this.setState({ displayValue: '' });
				}
			}			
		}, 1);
	}

	handleSearchKeys = (e) => {
		const { inputId } = this.props;
		const { results } = this.state;
		switch(e.key){
			case 'ArrowUp':
				e.preventDefault();
				this.setState({ open: false, results: [] });
				break;
			case 'ArrowDown':
				e.preventDefault();
				if(results.length){
					document.querySelector(`#${inputId}-autocomplete .options :first-child`).focus();
				}
				break;
			default:
				break;
		}
	}

	handleOptionsKeys = (e, item) => {
		const { inputId } = this.props;

		
		switch(e.key){
			case 'Enter':
			case 'Tab':
			case ' ':
				e.preventDefault();
				this.changeSelectOption(item, false);
				document.querySelector(`#${inputId}-autocomplete input`).focus();
			 	break;
			case 'Escape':
				this.setState({ open: false});
				document.querySelector(`#${inputId}-autocomplete input`).focus();
				break;
			case 'ArrowUp':
				if(e.target.previousSibling){
					e.target.previousSibling.focus();
				}else{
					document.querySelector(`#${inputId}-autocomplete input`).focus();
				}
				break;
			case 'ArrowDown':
				if(e.target.nextSibling){
					e.target.nextSibling.focus();
				}
				break;
			default:
				e.preventDefault();
				break;
		}
	}

	changeSelectOption = (item, open) => {
		const {
		 inputId, 
		 onChange,
		} = this.props;

		onChange(item);
		this.setState({ open });
		document.querySelector(`#${inputId}-autocomplete input`).focus();
	}

	render(){
		const {
			inputId,
			searchKeyStructure,
			disabled,
		} = this.props;

		const {
			displayValue,
			open,
			searching,
			results
		} = this.state;

		return InputFieldsBase.renderInputField((
			<div>
				<div id={`${inputId}-autocomplete`} className={`select autocomplete ${searching ? 'searching' : ''}`}>
					<input 
						type="text"
						disabled={disabled}
						name={inputId}
						id={inputId}
						onChange={(e) => this.handleOnChangeSearch(e.target.value)}
						onKeyDown={this.handleSearchKeys}
						onBlur={this.handleBlur}
						value={displayValue || ''}
					/>
					{
						(open && results.length) &&
						<div className="options">
							{
								results.map((item, i) => {
									return(
										<div 
											key={i} 
											tabIndex="0" 
											onClick={(e) => this.changeSelectOption(item)}
											onKeyDown={(e) => this.handleOptionsKeys(e, item)}
											onBlur={this.handleBlur}
										>
											{this.getProperty(item, searchKeyStructure)}
										</div>
									)
								})
							}
						</div>
					}
					
				</div>
			</div>
		), this.props, true)
	}
}

export default InputAutocomplete;