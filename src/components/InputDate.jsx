import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";

import InputFieldsBase from './InputFieldsBase';

class InputDateCustomInput extends Component{
	static propTypes = {
		inputId: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onClick: PropTypes.func,
		disabled: PropTypes.bool,
		value: PropTypes.string,
	}

	render(){
		const {
			inputId,
			onChange,
			onClick,
			disabled,
			value,
		} = this.props;

		return(
			<input 
				type="text"
				disabled={disabled}
				id={inputId}
				name={inputId}
				onClick={onClick}
				value={value}
				onChange={onChange}
			/>
		)
	}	
}

class InputDate extends Component{
	constructor(props) {
		super(props);
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
		if(this.props.value !== nextProps.value){
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

		if(init || state.updateDate){
			const date = moment(value, format, true);
			this.setState({
				text: date.isValid() ? date.format(format) : '',
				updateDate: false,
			});
		}
	}

	onChange = (date) => {
		if(!date || date.isValid()){
			this.props.onChange(date ? date.toDate() : null);
		}
	}

	onChangeRaw = (e) => {
		const { format } = this.props;
		this.setState({text: e.target.value });
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
				customInput={<InputDateCustomInput inputId={inputId} disabled={disabled} value={text} onChange={(e) => this.setState({text: e.target.value})} />}
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