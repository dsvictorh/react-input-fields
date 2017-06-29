import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputDropdown extends Component{
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			displayValue: ''
		}
	}

	static propTypes = {
		inputId: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		values: PropTypes.arrayOf(PropTypes.object).isRequired,
		size: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 33]).isRequired,
		valueKey: PropTypes.string,
		labelKey: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		hide: PropTypes.bool,
		disabled: PropTypes.bool,
		required: PropTypes.bool,
		panel: PropTypes.bool,
		errors: PropTypes.arrayOf(PropTypes.string),
		warnings: PropTypes.arrayOf(PropTypes.string)
	}

	static defaultProps = {
		errors: [],
		warnings: [],
		valueKey: 'value',
		labelKey: 'label'
	}

	componentDidMount() {
		const { inputId } = this.props;
		const dropdown = document.getElementById(inputId);
		this.setState({ displayValue: dropdown.options[dropdown.selectedIndex].text });
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.state.open && !prevState.open){
			const { inputId, value } = this.props;
			document.querySelector(`#${inputId}-select .options [data-value="${value}"]`).focus();
		}
	}


	changeSelectOption = (value, displayValue, open) => {
		const { inputId, onChange } = this.props;
		const dropdown = document.getElementById(inputId);
		this.setState({ displayValue, open });
		document.querySelector(`#${inputId}-select input`).focus();
		if(dropdown.value.toString() !== value.toString()){
			dropdown.value = value;
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
				console.log('close');
			}
		}, 100);
	}

	render(){
		const {
			inputId,
			label,
			values,
			valueKey,
			labelKey,
			value,
			hide, 
			disabled,
			required,
			panel,
			size,
			errors,
			warnings,
		} = this.props;

		const {
			open,
			displayValue
		} = this.state;

		if(!hide){
			return(
				<div className={`input-field ${panel ? 'shadow' : ''} ${size ? 'size-' + size : ''}`}>
					<label htmlFor={`${inputId}-select`}>
						{label}
						{required &&  <i className="required">*</i>}
					</label>
					<div id={`${inputId}-select`} className={`select ${disabled ? 'disabled' : ''}`}>
						<i 
							className={`caret ${open ? 'open' : ''}`}
							onClick={(e) =>{
								document.querySelector(`#${inputId}-select input`).focus();
								setTimeout(() => this.setState({ open: !open }), 1);
								console.log('caret');
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
								console.log('clicked input');
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
									values.map((item, i) => {
										return(
											<div 
												key={i} 
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
					<div className="warnings">
						{
							warnings.map((warning, i) => {
								return (
									<p key={i}>{warning}</p>
								)
							})
						}
					</div>
					<div className="errors">
						{
							errors.map((error, i) => {
								return (
									<p key={i}>{error}</p>
								)
							})
						}
					</div>
				</div>
			)
		}else{
			return null;
		}
	}
}

export default InputDropdown;