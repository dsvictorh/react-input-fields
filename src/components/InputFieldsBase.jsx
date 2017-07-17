import React from 'react';
import PropTypes from 'prop-types';

class InputFieldsBase{
	static getPropTypes = () => {
		 return {
			inputId: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			onChange: PropTypes.func.isRequired,
			size: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
			hide: PropTypes.bool,
			disabled: PropTypes.bool,
			required: PropTypes.bool,
			panel: PropTypes.bool,
			errors: PropTypes.arrayOf(PropTypes.string),
			warnings: PropTypes.arrayOf(PropTypes.string)
		}
	}

	static getDefaultProps = () => {
		return {
			errors: [],
			warnings: [],
		}
	}

	static renderInputField = (jsx, props, withLabel) => {
		const {
			label,
			required,
			inputId,
			hide,
			panel,
			size,
			warnings,
			errors
		} = props;

		if(!hide){
			return (
				<div className={`input-field ${panel ? 'shadow' : ''} ${size ? 'size-' + size : ''}`}>
					{
						withLabel &&
						<label htmlFor={`${inputId}`}>
							{label}
							{required &&  <i className="required">*</i>}
						</label>
					}
					{
						jsx
					}
					{
						warnings && 
						<div className="warnings">
							{
								warnings.map((warning, i) => {
									return (
										<p key={i}>{warning}</p>
									)
								})
							}
						</div>
					}
					{
						errors && 
						<div className="errors">
							{
								errors.map((error, i) => {
									return (
										<p key={i}>{error}</p>
									)
								})
							}
						</div>
					}
				</div>
			)
		}else{
			return null;
		}
	}
}

export default InputFieldsBase;