import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import errorActions from '../actions/errors';
import personActions from '../actions/persons';
import InputFields from './InputFields';

class AddEditPerson extends Component{
	constructor(props) {
		super(props);
		
		this.state = {
			...AddEditPerson.personDefault
		}
	}

	static propTypes = {
		person: PropTypes.object.isRequired,
		onSubmit: PropTypes.func,
		onCancel: PropTypes.func,
	}

	static defaultProps = {
		onSubmit: () => void(0),
		onCancel: () => void(0)
	}

	static personDefault = {
		name: '',
		lastName: '',
		gender: '0',
		active: false,
		birthdate: new Date(),
		loading: false,
	}

	componentWillReceiveProps(nextProps) {
		const { person } = this.props;
		if(person !== nextProps.person){
			const { name, lastName, gender, active, birthdate } = nextProps.person;
			this.setState({ name, lastName, gender, active, birthdate });
		}
	}

	resetForm = (confirm) => {
		if(!confirm || window.confirm('reset the shit?')){
			this.setState({
				name: '', 
				lastName: '',
				gender: '0',
				active:  false,
				birthdate: new Date(),
			});
			this.props.removeErrors('name');
			this.props.removeErrors('lastName');
			this.props.removeErrors('birthdate');
		}
	}

	submitForm = (e) => {
		let valid = true;
		if(!this.state.name){
			this.props.addErrors('name', ['Name is required']);
			valid = false;
		}

		if(!this.state.lastName){
			this.props.addErrors('lastName', ['Last Name is required']);
			valid = false;
		}

		if(!this.state.birthdate){
			this.props.addErrors('birthdate', ['Date of Birth is required']);
			valid = false;
		}
		else if(this.state.birthdate > new Date()){
			this.props.addErrors('birthdate', ['Date of Birth cannot be greater than current date']);
			valid = false;
		}

		if(valid){
			this.setState({ loading: true });
			setTimeout(() => {
				const { name, lastName, gender, active, birthdate } = this.state;
				const { person } = this.props;
				const { id } = person;
				this.props.setPerson({ id, name, lastName, active, gender: parseInt(gender, 10), birthdate });
				this.setState({ loading: false });
				this.props.onSubmit(person);
				this.resetForm();
			}, 1000)
		}
		
		e.preventDefault();
	}

	render(){
		const { 
			errors,
			removeErrors,
			onCancel
		} = this.props;

		const {
			name,
			lastName,
			gender,
			active,
			birthdate,
			loading
		} = this.state;

		return(
			<div>
				<form onSubmit={(e) => this.submitForm(e)}>
					<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={5}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
					/>
					<InputFields.InputText
						inputId={'last-name'} 
						label={'Last Name'} 
						maxLength={50} 
						value={lastName}
						size={5}
						onChange={(value) => {  this.setState({ lastName: value }); removeErrors('lastName'); }}
						errors={errors['lastName']}
					/>
				 	<InputFields.InputDropdown
						inputId={'gender'} 
						label={'Gender'} 
						value={gender}
						required={true}
						size={5}
						values={[{value: 0, label: 'Male'}, {value: 1, label: 'Female'}]}
						onChange={(value) => {  this.setState({ gender: value }); removeErrors('gender'); }}
						errors={errors['gender']}
					 />
				 	<InputFields.InputDate
						inputId={'birth-date'} 
						label={'Date of Birth'} 
						value={birthdate}
						size={5}
						format={'MM/DD/YYYY'}
						onChange={(value) => { this.setState({ birthdate: value }); removeErrors('birthdate'); }}
						errors={errors['birthdate']}
					/>
					<InputFields.InputCheckbox
						inputId={'active'} 
						label={'Active'} 
						tooltip={'Whether this person is active or not'}
						value={active}
						size={5}
						onChange={(value) => {  this.setState({ active: value });  removeErrors('active'); }}
						errors={errors['active']}
				 	/>
					<div>
						<InputFields.InputButton 
							type={'submit'} 
							text={'Submit'} 
							loadingText={'Please wait'} 
							loading={loading} 
						/>
						<InputFields.InputButton 
							text={'Cancel'} 
							className={'danger'} 
							disabled={loading} 
							onClick={() => {this.resetForm(true); onCancel(AddEditPerson.personDefault);} } 
					/>
					</div>
				</form>
				<div>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={10}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
					inputId={'name'} 
					label={'Name'} 
					maxLength={50} 
					value={name}
					size={9}
					onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
					errors={errors['name']}
				/>
				<InputFields.InputDropdown
						inputId={'gender'} 
						label={'Gender'} 
						value={gender}
						required={true}
						size={1}
						values={[{value: 0, label: 'Male'}, {value: 1, label: 'Female'}]}
						onChange={(value) => {  this.setState({ gender: value }); removeErrors('gender'); }}
						errors={errors['gender']}
			 	/>
				<InputFields.InputDropdown
						inputId={'gender'} 
						label={'Gender'} 
						value={gender}
						required={true}
						size={8}
						values={[{value: 0, label: 'Male'}, {value: 1, label: 'Female'}]}
						onChange={(value) => {  this.setState({ gender: value }); removeErrors('gender'); }}
						errors={errors['gender']}
			 	/>
				<InputFields.InputDropdown
						inputId={'gender'} 
						label={'Gender'} 
						value={gender}
						required={true}
						size={2}
						values={[{value: 0, label: 'Male'}, {value: 1, label: 'Female'}]}
						onChange={(value) => {  this.setState({ gender: value }); removeErrors('gender'); }}
						errors={errors['gender']}
			 	/>
				<InputFields.InputCheckbox
						inputId={'active'} 
						label={'Active'} 
						tooltip={'Whether this person is active or not'}
						value={active}
						size={7}
						onChange={(value) => {  this.setState({ active: value });  removeErrors('active'); }}
						errors={errors['active']}
				/>
				<InputFields.InputCheckbox
						inputId={'active'} 
						label={'Active'} 
						tooltip={'Whether this person is active or not'}
						value={active}
						size={3}
						onChange={(value) => {  this.setState({ active: value });  removeErrors('active'); }}
						errors={errors['active']}
				/>
				<InputFields.InputCheckbox
						inputId={'active'} 
						label={'Active'} 
						tooltip={'Whether this person is active or not'}
						value={active}
						size={6}
						onChange={(value) => {  this.setState({ active: value });  removeErrors('active'); }}
						errors={errors['active']}
				/>
				<InputFields.InputCheckbox
						inputId={'active'} 
						label={'Active'} 
						tooltip={'Whether this person is active or not'}
						value={active}
						size={4}
						onChange={(value) => {  this.setState({ active: value });  removeErrors('active'); }}
						errors={errors['active']}
				/>
				<InputFields.InputDate
					inputId={'birth-date'} 
					label={'Date of Birth'} 
					value={birthdate}
					size={5}
					format={'MM/DD/YYYY'}
					onChange={(value) => { this.setState({ birthdate: value }); removeErrors('birthdate'); }}
					errors={errors['birthdate']}
				/>
				<InputFields.InputDate
					inputId={'birth-date'} 
					label={'Date of Birth'} 
					value={birthdate}
					size={5}
					format={'MM/DD/YYYY'}
					onChange={(value) => { this.setState({ birthdate: value }); removeErrors('birthdate'); }}
					errors={errors['birthdate']}
				/>
				<InputFields.InputDate
					inputId={'birth-date'} 
					label={'Date of Birth'} 
					value={birthdate}
					size={4}
					format={'MM/DD/YYYY'}
					onChange={(value) => { this.setState({ birthdate: value }); removeErrors('birthdate'); }}
					errors={errors['birthdate']}
				/>
				<InputFields.InputDate
					inputId={'birth-date'} 
					label={'Date of Birth'} 
					value={birthdate}
					size={6}
					format={'MM/DD/YYYY'}
					onChange={(value) => { this.setState({ birthdate: value }); removeErrors('birthdate'); }}
					errors={errors['birthdate']}
				/>
				<InputFields.InputDate
					inputId={'birth-date'} 
					label={'Date of Birth'} 
					value={birthdate}
					size={3}
					format={'MM/DD/YYYY'}
					onChange={(value) => { this.setState({ birthdate: value }); removeErrors('birthdate'); }}
					errors={errors['birthdate']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={7}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={2}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={8}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={9}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={6}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={4}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={1}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={2}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={2}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={2}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={2}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={2}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={33}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={33}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
				<InputFields.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={33}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
				/>
			</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	const { errors } = state;
	return {
		errors
	}
}

export default connect(mapStateToProps, {...errorActions, ...personActions})(AddEditPerson);