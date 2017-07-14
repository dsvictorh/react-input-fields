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
		}	
	}

	static propTypes = {
		searchFunction: PropTypes.func.isRequired,
        resultsKeyStructure: PropTypes.arrayOf(PropTypes.string),
		searchKeyStructure: PropTypes.arrayOf(PropTypes.string),
		valueKeyStructure: PropTypes.arrayOf(PropTypes.string),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
		searchLength: PropTypes.number,
		hide: PropTypes.bool,
		...InputFieldsBase.getPropTypes()
	}

	static defaultProps = {
		resultsKeyStructure: [],
		valueKeyStructure: ['value'],
		searchKeyStructure: ['label'],
		searchLength: 1,
		...InputFieldsBase.getDefaultProps()
	}

	getProperty = (obj, propertyStructure) => {
	 	for(var prop of propertyStructure){
			if(obj.hasOwnProperty(prop)){
				obj = obj[prop];
			}
		}

		return obj;
	}

	handleOnChangeSearch = (displayValue) => {
		const { 
			searchFunction, 
			resultsKeyStructure, 
			searchLength,
			onChange
		} = this.props;

		console.log('changed');
		this.setState({ displayValue });
		onChange(null);
		if(!searchLength || displayValue.length >= searchLength){
			console.log('searching');
			this.setState({ searching: true, open: true });
			searchFunction(displayValue).then((response) => {
				console.log('found', response);
				this.setState({ open: true, searching: false, results: this.getProperty(response, resultsKeyStructure) || [] });
			},
			function(error){

			});
		}
	}

	handleBlur = (e) => {
		setTimeout(() => {
			const { inputId } = this.props;
			if(!document.querySelector(`#${inputId}-autocomplete .options :focus, #${inputId}-autocomplete input:focus`)){
				this.setState({ open: false});
			}
		}, 50);
	}

	handleSearchKeys = (e) => {
		const { inputId } = this.props;
		switch(e.key){
			case 'ArrowUp':
				e.preventDefault();
				this.setState({ open: false});
				break;
			case 'ArrowDown':
				e.preventDefault();
				document.querySelector(`#${inputId}-autocomplete .options:first-child`).focus();
				break;
			default:
				break;
		}
	}

	handleOptionsKeys = (e) => {
		const { inputId } = this.props;
		switch(e.key){
			case 'Enter':
			case 'Tab':
			case ' ':
				e.preventDefault();
				document.querySelector(`#${inputId}-autocomplete input`).focus();
			 	this.setState({ open: false });
			 	break;
			case 'ArrowUp':
				if(this.moveSelectOption(false)){
					e.target.previousSibling.focus();
				}
				break;
			case 'ArrowDown':
				if(this.moveSelectOption(true)){
					e.target.nextSibling.focus();
				}
				break;
			default:
				e.preventDefault();
				break;
		}
	}

	changeSelectOption = (item, open) => {
		const { inputId, onChange, value, valueKeyStructure, searchKeyStructure } = this.props;
		const itemValue = this.getProperty(item, valueKeyStructure);
		this.setState({ open });
		document.querySelector(`#${inputId}-autocomplete input`).focus();
		if(itemValue.toString() !== value.toString()){
			this.setState({ displayValue: this.getProperty(item, searchKeyStructure) });
			onChange(itemValue);
		}
	}

	moveSelectOption = (forward) => {
		const { value, valueKeyStructure } = this.props;
		const { results } = this.state;
		const currentIndex = results.map(function(item) {
			return this.getProperty(item, valueKeyStructure).toString();
		}).indexOf(value.toString());

		if(forward){
			if(currentIndex < results.length - 1){
				const nextValue = results[currentIndex + 1];
				this.changeSelectOption(nextValue, true);
				return true;
			}
		}else{
			if(currentIndex > 0){
				const previousValue = results[currentIndex - 1];
				this.changeSelectOption(previousValue, true);
				return true;
			}		
		}

		return false;
	} 

	render(){
		const {
			inputId,
			searchKeyStructure,
			valueKeyStructure,
			value, 
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
				<div id={`${inputId}-autocomplete`} className="select autocomplete">
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
						(open && !searching) &&
						<div className="options">
							{
								results.map((item, i) => {
									return(
										<div 
											key={i} 
											tabIndex="0" 
											className={value && value.toString() ===  this.getProperty(item, valueKeyStructure).toString() ? 'selected' : ''} 
											onClick={(e) => this.changeSelectOption(item)}
											onKeyDown={this.handleOptionsKeys}
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