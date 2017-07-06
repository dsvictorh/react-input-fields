import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

import InputFieldsBase from './InputFieldsBase';

class InputDateCustomInput extends Component{
	static propTypes = {
		format: PropTypes.string.isRequired,
		inputId: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onClick: PropTypes.func,
		disabled: PropTypes.bool,
		value: PropTypes.string,
	}

	formatMask = (dateFormat) => {
		let maskFormat = '';
		let letterArray = dateFormat.split('');
		for(let letter of letterArray){
			switch(letter.toLowerCase()){
				case 'd':
				case 'm':
				case 'y':
				case 'h':
				case 's':
					maskFormat += '9';
					break;
				default:
					maskFormat += letter;
			}
		}

		return maskFormat;
	}

	render(){
		const {
			format,
			inputId,
			onChange,
			onClick,
			disabled,
			value,
		} = this.props;

		return(
			<InputMask 
				type="text"
				disabled={disabled}
				id={inputId}
				name={inputId}
				onClick={onClick}
				value={value}
				onChange={onChange}
				mask={this.formatMask(format)}
			/>
		)
	}	
}

class InputDate extends Component{
	constructor(props) {
		super(props);
		this.lockUpdate = false;
		this.state = {
			text: '',
			updateDate: false,
		}
	}

	static propTypes = {
		format: PropTypes.string.isRequired,
		value: PropTypes.instanceOf(Date),
		...InputFieldsBase.getPropTypes()
	}

	static defaultProps = {
		...InputFieldsBase.getDefaultProps()
	}

	componentWillMount() {
		this.formatInputValue(this.props, this.state, true);
	}

	componentWillReceiveProps(nextProps) {
		const { value } = this.props;

		if(value !== nextProps.value){
			this.setState({updateDate: true});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		this.formatInputValue(nextProps, nextState);
	}

	formatInputValue = (props, state, init) => {
		const {
			format,
			value
		} = props;

		const {
			updateDate
		} = state;

		if(init || (updateDate && !this.lockUpdate)){
			const date = moment(value, format, true);
			this.setState({
				text: date.isValid() ? date.format(format) : '',
				updateDate: false,
			});
		}else if(this.lockUpdate){
			this.lockUpdate = false;
			this.setState({ updateDate: false });
		}
	}

	onChange = (date) => {
		if(date){
			this.props.onChange(date.isValid() ? date.toDate() : null);
		}
	}

	onChangeRaw = (e) => {
		const { format } = this.props;
		this.lockUpdate = true;
		this.setState({text: e.target.value});
		this.onChange(moment(e.target.value, format, true));
	}

	render(){
		const {
			inputId,
			format,
			value,
			disabled
		} = this.props;

		const {
			text
		} = this.state;

		const date = moment(value, format, true);

		return InputFieldsBase.renderInputField((
			<DatePicker
				customInput={<InputDateCustomInput inputId={inputId} disabled={disabled} format={format} value={text} onChange={(e) => { this.setState({text: e.target.value}) }} />}
				dateFormat={format}
				disabled={disabled}
				selected={date.isValid() ? date : null}
				value={text}
				onChange={(date) => this.onChange(date)}
				onChangeRaw={this.onChangeRaw}
				popoverAttachment="bottom left"
			    popoverTargetAttachment="top left"
			    popoverTargetOffset="5% 0px"
			    showMonthDropdown
			    showYearDropdown
			    dropdownMode="select"
			/>
		), this.props, true)
	}
}

export default InputDate;