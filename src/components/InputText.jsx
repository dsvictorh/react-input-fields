import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputText extends Component{
	static propTypes = {
		inputId: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		size: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 33]).isRequired,
		value: PropTypes.string,
		hide: PropTypes.bool,
		disabled: PropTypes.bool,
		required: PropTypes.bool,
		panel: PropTypes.bool,
		isPassword: PropTypes.bool,
		maxLength: PropTypes.number,
		errors: PropTypes.arrayOf(PropTypes.string),
		warnings: PropTypes.arrayOf(PropTypes.string)
	}

	static defaultProps = {
		errors: [],
		warnings: [],
	}

	render(){
		const {
			inputId,
			label,
			onChange,
			value,
			hide, 
			disabled,
			required,
			panel,
			isPassword,
			size,
			maxLength,
			errors,
			warnings,
		} = this.props

		if(!hide){
			return(
				<div className={`input-field ${panel ? 'shadow' : ''} ${size ? 'size-' + size : ''}`}>
					<label htmlFor={inputId}>
						{label}
						{required &&  <i className="required">*</i>}
					</label>
					<input 
						type={isPassword ? 'password' : 'text'}
						disabled={disabled}
						maxLength={maxLength}
						name={inputId}
						id={inputId}
						onChange={(e) => { onChange(e.target.value); }}
						value={value || ''}
					/>
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

export default InputText;