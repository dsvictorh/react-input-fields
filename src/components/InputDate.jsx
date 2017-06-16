import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";


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
		inputId: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		format: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.instanceOf(Date),
		hide: PropTypes.bool,
		disabled: PropTypes.bool,
		required: PropTypes.bool,
		panel: PropTypes.bool,
		halfField: PropTypes.oneOf(['left', 'right']),
		errors: PropTypes.arrayOf(PropTypes.string),
		warnings: PropTypes.arrayOf(PropTypes.string)
	}

	static defaultProps = {
		errors: [],
		warnings: [],
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
		this.setState({text: e.target.value });
		this.onChange(moment(e.target.value, this.props.format, true));
	}

	render(){
		const {
			inputId,
			label,
			format,
			value,
			hide, 
			disabled,
			required,
			panel,
			halfField,
			errors,
			warnings,
		} = this.props;
		const date = moment(value, format, true);

		if(!hide){
			return(
				<div className={`input-field ${panel ? 'shadow' : ''} ${halfField ? 'half ' + halfField : ''}`}>
					<label htmlFor={inputId}>
						{label}
						{required &&  <i className="required">*</i>}
					</label>
					<DatePicker
						customInput={<InputDateCustomInput inputId={inputId} disabled={disabled} value={this.state.text} onChange={(e) => this.setState({text: e.target.value})} />}
						dateFormat={format}
						disabled={disabled}
						selected={date.isValid() ? date : null}
						value={this.state.text}
						onChange={(date) => this.onChange(date)}
						onChangeRaw={this.onChangeRaw}
						popoverAttachment="bottom left"
					    popoverTargetAttachment="top left"
					    popoverTargetOffset="10px 0px"
					    showMonthDropdown
					    showYearDropdown
					    dropdownMode="select"
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