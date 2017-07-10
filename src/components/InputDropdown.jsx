import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputFieldsBase from './InputFieldsBase';

class InputDropdown extends Component{
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			displayValue: ''
		}
	}

	static propTypes = {
		values: PropTypes.arrayOf(PropTypes.object).isRequired,
		valueKey: PropTypes.string,
		labelKey: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		...InputFieldsBase.getPropTypes()
	}

	static defaultProps = {
		valueKey: 'value',
		labelKey: 'label',
		...InputFieldsBase.getDefaultProps()
	}

	componentDidMount() {
		const { inputId } = this.props;
		const dropdown = document.getElementById(inputId);
		this.setState({ displayValue: dropdown.options[dropdown.selectedIndex].text });
	}

	componentWillUpdate(nextProps, nextState) {
		const {
			values,
			value,
			valueKey,
			labelKey,
		} = nextProps;

		if(value !== this.props.value){
			const chosen = values.find((item) => item[valueKey].toString() === value.toString());
			if(chosen){
				this.changeSelectOption(chosen[valueKey], chosen[labelKey], nextState.open);
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			open
		} = this.state;

		if(open && !prevState.open){
			const {
				value,
				inputId, 
			} = this.props;
			document.querySelector(`#${inputId}-select .options [data-value="${value}"]`).focus();
		}
	}


	changeSelectOption = (value, displayValue, open) => {
		const { inputId, onChange } = this.props;
		const dropdown = document.getElementById(inputId);
		this.setState({ open });
		document.querySelector(`#${inputId}-select input`).focus();
		if(dropdown.value.toString() !== value.toString()){
			this.setState({ displayValue});
			dropdown.value =  value;
			onChange(value);
		}
	}

	moveSelectOption = (forward, open) => {
		const { values, value, valueKey, labelKey, required } = this.props;
		const currentIndex = values.map(function(item) {
			return item[valueKey].toString();
		}).indexOf(value.toString());

		if(forward){
			if(currentIndex > -1 && currentIndex < values.length - 1){
				const nextValue = values[currentIndex + 1];
				this.changeSelectOption(nextValue[valueKey], nextValue[labelKey], open);
				return true;
			}else if(value === '' && !required){
				const nextValue = values[0];
				this.changeSelectOption(nextValue[valueKey], nextValue[labelKey], open);
				return true;
			}
		}else{
			if(currentIndex > 0){
				const previousValue = values[currentIndex - 1];
				this.changeSelectOption(previousValue[valueKey], previousValue[labelKey], open);
				return true;
			}else if(currentIndex === 0 && !required){
				this.changeSelectOption('', '', open);
				return true;
			}			
		}

		return false;
	} 

	handleOptionsKeys = (e) => {
		const { inputId } = this.props;
		switch(e.key){
			case 'Enter':
			case 'Tab':
			case ' ':
				e.preventDefault();
				document.querySelector(`#${inputId}-select input`).focus();
			 	this.setState({ open: false });
			 	break;
			case 'ArrowUp':
				if(this.moveSelectOption(false, true)){
					e.target.previousSibling.focus();
				}
				break;
			case 'ArrowDown':
				if(this.moveSelectOption(true, true)){
					e.target.nextSibling.focus();
				}
				break;
			default:
				e.preventDefault();
				break;
		}
		
	}

	handleOptionsBlur = (e) => {
		setTimeout(() => {
			const { inputId } = this.props;
			if(!document.querySelector(`#${inputId}-select .options :focus, #${inputId}-select input:focus`)){
				this.setState({ open: false});
			}
		}, 50);
	}

	render(){
		const {
			inputId,
			values,
			valueKey,
			labelKey,
			value,
			disabled,
			required,
		} = this.props;

		const {
			open,
			displayValue
		} = this.state;

		return InputFieldsBase.renderInputField((
			<div>
				<div id={`${inputId}-select`} className={`select ${disabled ? 'disabled' : ''}`}>
					<i 
						className={`caret ${open ? 'open' : ''}`}
						onClick={(e) =>{
							document.querySelector(`#${inputId}-select input`).focus();
							setTimeout(() => this.setState({ open: !open }), 1);
						}}
					>
					</i>
					<input 
						type="text" 
						value={displayValue} 
						disabled={disabled}
						className={this.state.open ? 'focus' : ''}
						onKeyDown={(e) => {
							switch(e.key){
								case 'Enter':
								case ' ':
									e.preventDefault();
									this.setState({ open: !open });
									break;
								case 'ArrowUp':
									this.moveSelectOption(false, false);
									break;
								case 'ArrowDown':
									this.moveSelectOption(true, false);
									break;
								case 'Tab':
									break;
								default:
									e.preventDefault();
								break;
							}
						}}
						onClick={(e) =>{
							this.setState({ open: !open });
						}} 
					/>
					{
						open &&
						<div className="options">
							{
								!required &&
								<div 
									tabIndex="0" 
									data-value=""
									className={value === '' ? 'selected' : ''} 
									onClick={(e) => this.changeSelectOption('', '', false)}
									onKeyDown={this.handleOptionsKeys}
									onBlur={this.handleOptionsBlur}
								>
									&nbsp;
								</div>
							}
							{
								values.map((item) => {
									return(
										<div 
											key={item[valueKey]} 
											tabIndex="0" 
											data-value={item[valueKey]}
											className={value.toString() === item[valueKey].toString() ? 'selected' : ''} 
											onClick={(e) => this.changeSelectOption(item[valueKey], item[labelKey], false)}
											onKeyDown={this.handleOptionsKeys}
											onBlur={this.handleOptionsBlur}
										>
											{item[labelKey]}
										</div>
									)
								})
							}
						</div>
					}					
					
				</div>
				<select 
					disabled={disabled}
					name={inputId}
					id={inputId}
					defaultValue={value || ''}
				>
					{
						!required && <option value=""></option>
					}
					{
						values.map((item, i) => {
							return(
								<option key={i} value={item[valueKey]}>{item[labelKey]}</option>
							)
						})
					}
				</select>
			</div>
		), this.props, true)
	}
}

export default InputDropdown;