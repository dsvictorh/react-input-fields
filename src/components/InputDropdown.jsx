import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputDropdown extends Component{
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

	render(){
		const {
			inputId,
			label,
			onChange,
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
					<select 
						disabled={disabled}
						name={inputId}
						id={inputId}
						onChange={(e) => { onChange(e.target.value); }}
						value={value || ''}
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