import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputButton extends Component{
	static propTypes = {
		text: PropTypes.string.isRequired,
		loading: PropTypes.bool,
		loadingText: PropTypes.string,
		onClick: PropTypes.func,
		hide: PropTypes.bool,
		disabled: PropTypes.bool,
		className: PropTypes.oneOf(['danger']),
		type: PropTypes.oneOf(['submit', 'button'])
	}

	render(){
		const {
			loading,
			loadingText,
			text, 
			onClick,
			hide,
			disabled,
			className,
			type
		} = this.props;

		if(!hide){
			return(
				<button 
					type={type || 'button'} 
					disabled={loading || disabled} 
					className={`input-button ${loading || disabled ? 'disabled' : ''} ${className || ''}`} 
					onClick={() => onClick ? onClick() : void(0)}
				>
					{loading && loadingText ? loadingText: text}
				</button>
			)
		}else {
			return null;
		}
	}
}

export default InputButton;