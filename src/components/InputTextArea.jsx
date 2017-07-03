import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputFieldsBase from './InputFieldsBase';

class InputTextArea extends Component{
	static propTypes = {
		value: PropTypes.string,
		hide: PropTypes.bool,
		maxLength: PropTypes.number,
		verticalResize: PropTypes.bool,
		...InputFieldsBase.getPropTypes()
	}

	static defaultProps = {
		...InputFieldsBase.getDefaultProps()
	}

	render(){
		const {
			inputId,
			onChange,
			value, 
			disabled,
			maxLength,
			verticalResize
		} = this.props

		return InputFieldsBase.renderInputField((
			<textarea 
				className={verticalResize ? 'resize' : ''}
				disabled={disabled}
				maxLength={maxLength}
				name={inputId} 
				id={inputId}
				onChange={(e) => { onChange(e.target.value); }}
				value={value || ''}
			>
			</textarea>
		), this.props, true)
	}
}

export default InputTextArea;