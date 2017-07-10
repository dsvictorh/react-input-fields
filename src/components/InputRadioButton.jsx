import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputFieldsBase from './InputFieldsBase';

class InputRadioButton extends Component{
	static propTypes = {
		values: PropTypes.arrayOf(PropTypes.object).isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
		valueKey: PropTypes.string.isRequired,
		labelKey: PropTypes.string.isRequired,
		...InputFieldsBase.getPropTypes()
	}

	static defaultProps = {
		valueKey: 'value',
		labelKey: 'label',
		...InputFieldsBase.getDefaultProps()
	}

	handleKeyUp = (e, value) => {
		e.stopPropagation();
    	e.nativeEvent.stopImmediatePropagation();

    	if(e.key === ' ' || e.key === 'Enter'){
    		this.handleOnChange(value);
    	}
	}

	handleOnChange = (value) => {
		const { onChange } = this.props;
		onChange(value);
	}

	render(){
		const {
			inputId,
			values,
			value,
			valueKey,
			labelKey,
			disabled
		} = this.props

		return InputFieldsBase.renderInputField((
			<div className="input-radio">
				{
					values.map((item, index) => {
						return(
							<div key={item[valueKey]}>
								<input 
									type="radio" 
									name={inputId} 
									value={item[valueKey]}  
									checked={value.toString() === item[valueKey].toString()}
									readOnly={true}
								/>
								<input 
									type="checkbox"
									disabled={disabled}
									name={inputId + '-option' + index}
									id={inputId + '-option' + index}
									onChange={(e) => { this.handleOnChange(item[valueKey]); }}
									checked={value.toString() === item[valueKey].toString()}
								/>
								<label 
									htmlFor={inputId + '-option' + index} 
									tabIndex="0"
									onKeyUp={(e) => this.handleKeyUp(e, item[valueKey])}>
										<i className="radio"></i>
										{item[labelKey]}
								</label>
							</div>
						)
					})
				}
			</div>
		), this.props, true)
	}
}

export default InputRadioButton;