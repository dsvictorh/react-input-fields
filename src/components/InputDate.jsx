import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class InputDate extends Component{
	static propTypes = {
		inputId: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.instanceOf(Date),
		hide: PropTypes.bool,
		disabled: PropTypes.bool,
		required: PropTypes.bool,
		withTime: PropTypes.bool,
		panel: PropTypes.bool,
		halfField: PropTypes.oneOf(['left', 'right']),
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
			withTime,
			panel,
			halfField,
			errors,
			warnings,
		} = this.props

		let stringValue;
		let momentValue = moment(value);
		if(momentValue.isValid()){
			stringValue = momentValue.format(`YYYY-MM-DD${withTime ? 'THH:mm' : ''}`);
		}

		if(!hide){
			return(
				<div className={`input-field ${panel ? 'shadow' : ''} ${halfField ? 'half ' + halfField : ''}`}>
					<label htmlFor={inputId}>
						{label}
						{required &&  <i className="required">*</i>}
					</label>
					<input 
						type={withTime ? 'datetime-local' : 'date'}
						disabled={disabled}
						name={inputId}
						id={inputId}
						onChange={(e) => {   
							onChange(new Date(e.target.value + (withTime ? '' : 'T00:00:00.000')));
						}}
						value={stringValue || ''}
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

export default InputDate;