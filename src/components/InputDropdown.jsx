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
		valueKey: PropTypes.string,
		labelKey: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		hide: PropTypes.bool,
		disabled: PropTypes.bool,
		required: PropTypes.bool,
		panel: PropTypes.bool,
		halfField: PropTypes.oneOf(['left', 'right']),
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
		var dropdown = document.getElementById(this.props.inputId);
		this.setState({ displayValue: dropdown.options[dropdown.selectedIndex].text });
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.state.open && !prevState.open){
			const { inputId, value } = this.props;
			document.querySelector(`#${inputId}-select .options [data-value="${value}"]`).focus();
		}
	}


	changeSelectOption = (value, text) => {
		document.getElementById(this.props.inputId).value = value;
		this.setState({ displayValue: text, open: false });
		this.props.onChange(value);
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
			halfField,
			errors,
			warnings,
		} = this.props

		if(!hide){
			return(
				<div className={`input-field ${panel ? 'shadow' : ''} ${halfField ? 'half ' + halfField : ''}`}>
					<label htmlFor={inputId}>
						{label}
						{required &&  <i className="required">*</i>}
					</label>
					<div id={`${inputId}-select`} className={`select ${disabled ? 'disabled' : ''}`}>
						<input 
							type="text" 
							value={this.state.displayValue} 
							disabled={disabled}
							className={this.state.open ? 'focus' : ''}
							onClick={(e) =>{
								this.setState({ open: !this.state.open });
							}} 
						/>
						{
							this.state.open &&
							<div className="options">
								{
									!required &&
									<div 
										tabIndex="0" 
										onClick={(e) => this.changeSelectOption('', '')}
									>
									</div>
								}
								{
									values.map((value, i) => {
										return(
											<div 
												key={i} 
												tabIndex="0" 
												data-value={value[valueKey]}
												className={this.props.value.toString() === value[valueKey].toString() ? 'selected' : ''} 
												onClick={(e) => this.changeSelectOption(value[valueKey], value[labelKey])}
												onBlur={(e) => {
													setTimeout(() => {
														if(!document.querySelector(`#${inputId}-select .options :focus, #${inputId}-select input:focus`)){
															console.log('blur')
															this.setState({ open: false});
														}
													}, 1);
													
												}}
											>
												{value[labelKey]}
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
							values.map((value, i) => {
								return(
									<option key={i} value={value[valueKey]}>{value[labelKey]}</option>
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