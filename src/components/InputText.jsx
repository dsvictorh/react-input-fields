import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import InputFieldsBase from './InputFieldsBase';

class InputText extends Component{
	static propTypes = {
		value: PropTypes.string,
		hide: PropTypes.bool,
		isPassword: PropTypes.bool,
		maxLength: PropTypes.number,
		mask: PropTypes.string,
		alwaysShowMask: PropTypes.bool,
		...InputFieldsBase.getPropTypes()
	}

	static defaultProps = {
		alwaysShowMask: true,
		...InputFieldsBase.getDefaultProps()
	}

	componentDidMount() {
		const {
			mask,
			isPassword,
			maxLength,
			inputId
		} = this.props;

		if(mask != null && (isPassword || maxLength != null)){
			console.warn(`InputText ${inputId} will ignore maxLength and/or isPassword due to mask property`);
		}
	}

	render(){
		const {
			inputId,
			onChange,
			value, 
			disabled,
			isPassword,
			maxLength,
			mask,
			alwaysShowMask
		} = this.props;

		return InputFieldsBase.renderInputField((
			<div>
				{
					mask != null &&
					<InputMask 
						type="text"
						disabled={disabled}
						mask={mask}
						alwaysShowMask={alwaysShowMask}
						name={inputId}
						id={inputId}
						onChange={(e) => { onChange(e.target.value); }}
						value={value || ''}
					/>
				}
				{
					mask == null &&
					<input 
						type={isPassword ? 'password' : 'text'}
						disabled={disabled}
						maxLength={maxLength}
						name={inputId}
						id={inputId}
						onChange={(e) => { onChange(e.target.value); }}
						value={value || ''}
					/>

				}	
			</div>
		), this.props, true)
	}
}

export default InputText;