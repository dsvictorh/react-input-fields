import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputCheckbox extends Component{
	static propTypes = {
		inputId: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		tooltip: PropTypes.string,
		value: PropTypes.bool,
		hide: PropTypes.bool,
		disabled: PropTypes.bool,
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
			hide, 
			disabled,
			panel,
			halfField,
			errors,
			warnings,
		} = this.props

		if(!hide){
			return(
				<div className={`input-field ${panel ? 'shadow' : ''} ${halfField ? 'half ' + halfField : ''}`}>
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
						onKeyUp={this.handleKeyUp}>
							<i></i>
							{label}
					</label>
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

export default InputCheckbox;