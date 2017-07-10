import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputFieldsBase from './InputFieldsBase';

class InputCheckbox extends Component{
	static propTypes = {
		tooltip: PropTypes.string,
		value: PropTypes.bool,
		...InputFieldsBase.getPropTypes()
	}

	static defaultProps = {
		valueKey: 'value',
		labelKey: 'label',
		...InputFieldsBase.getDefaultProps()
	}

	handleKeyUp = (e) => {
		e.stopPropagation();
    	e.nativeEvent.stopImmediatePropagation();

    	if(e.key === ' ' || e.key === 'Enter'){
    		const { onChange } = this.props;
    		e.target.previousSibling.checked = !e.target.previousSibling.checked;
    		onChange(e.target.previousSibling.checked);
    	}
	}

	render(){
		const {
			inputId,
			label,
			onChange,
			tooltip,
			value,
			disabled
		} = this.props

		return InputFieldsBase.renderInputField((
			<div className="input-checkbox">
				<input 
					type="checkbox"
					disabled={disabled}
					name={inputId}
					id={inputId}
					onChange={(e) => { onChange(e.target.checked); }}
					checked={value || false}
				/>
				<label 
					htmlFor={inputId} 
					title={tooltip} 
					tabIndex="0"
					onClick={(e) => e.target.blur() }
					onKeyUp={this.handleKeyUp}
				>
						<i></i>
						{label}
				</label>
			</div>
		), this.props)
	}
}

export default InputCheckbox;