import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import errorActions from '../actions/errors';
import personActions from '../actions/persons';
import vTools from './vTools';

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
		role: 1,
		active: false,
		birthdate: new Date(),
		loading: false,
		description: '',
	}

	componentWillReceiveProps(nextProps) {
		const { person } = this.props;
		if(person !== nextProps.person){
			const { name, lastName, gender, active, birthdate, description, role } = nextProps.person;
			this.setState({ name, lastName, gender, active, birthdate, description, role });
		}
	}

	resetForm = (confirm) => {
		if(!confirm || window.confirm('reset the shit?')){
			this.setState({
				...AddEditPerson.personDefault
			});
			this.props.removeErrors('name');
			this.props.removeErrors('role');
			this.props.removeErrors('lastName');
			this.props.removeErrors('birthdate');
			this.props.removeErrors('description');
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

		if(!this.state.role){
			this.props.addErrors('role', ['Role is required']);
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
				const { name, lastName, gender, active, birthdate, description, role } = this.state;
				const { person } = this.props;
				const { id } = person;
				this.props.setPerson({ id, name, lastName, active, gender: parseInt(gender, 10), birthdate, description, role });
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
			description,
			loading,
			role
		} = this.state;

		return(
			<div>
				<form onSubmit={(e) => this.submitForm(e)}>
					<vTools.InputText
						inputId={'name'} 
						label={'Name'} 
						maxLength={50} 
						value={name}
						size={6}
						onChange={(value) => {  this.setState({ name: value }); removeErrors('name'); }}
						errors={errors['name']}
					/>
					<vTools.InputCheckbox
						inputId={'active'} 
						label={'Active'} 
						tooltip={'Whether this person is active or not'}
						value={active}
						size={6}
						onChange={(value) => {  this.setState({ active: value });  removeErrors('active'); }}
						errors={errors['active']}
				 	/>
					<vTools.InputText
						inputId={'last-name'} 
						label={'Last Name'} 
						maxLength={50} 
						value={lastName}
						size={6}
						onChange={(value) => {  this.setState({ lastName: value }); removeErrors('lastName'); }}
						errors={errors['lastName']}
					/>
				 	<vTools.InputDropdown
						inputId={'gender'} 
						label={'Gender'} 
						value={gender}
						required={true}
						size={6}
						values={[{value: 0, label: 'Male'}, {value: 1, label: 'Female'}]}
						onChange={(value) => {  this.setState({ gender: value }); removeErrors('gender'); }}
						errors={errors['gender']}
					 />
					 <vTools.InputAutocomplete
						inputId={'role'} 
						label={'Role'} 
						value={role}
						required={true}
						size={6}
						searchFunction={(search) => {
							const roles = [
								{ label: 'Admin', value: 1 },
								{ label: 'Support', value: 2 },
								{ label: 'Dev', value: 3},
								{ label: 'Client', value: 4},
								{ label: 'Constrcutor', value: 5},
								{ label: 'Advertising', value: 6},
								{ label: 'Accountancy', value: 7 }
							];

							console.log('Create Promise');
							return new Promise((resolve, reject) => {
								const filteredRoles = roles.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
								console.log('promise started', filteredRoles);

								setTimeout(() => {  resolve(filteredRoles); }, 1000);
								
							});
						}}
						onChange={(value) => {  this.setState({ role: value }); removeErrors('role'); }}
						errors={errors['role']}
					 />
					 <vTools.InputDate
						inputId={'birth-date'} 
						label={'Date of Birth'} 
						value={birthdate}
						size={6}
						format={'MM/DD/YYYY'}
						onChange={(value) => { this.setState({ birthdate: value }); removeErrors('birthdate'); }}
						errors={errors['birthdate']}
					/>
					 <vTools.InputRadioButton
						inputId={'gender'} 
						label={'Gender'} 
						value={gender}
						size={6}
						values={[{value: 0, label: 'Male'}, {value: 1, label: 'Female'}]}
						onChange={(value) => {  this.setState({ gender: value }); removeErrors('gender'); }}
						errors={errors['gender']}
					 />
					 
				 	<vTools.InputTextArea
						inputId={'description'} 
						label={'Description'} 
						value={description}
						verticalResize={true}
						size={12}
						onChange={(value) => {  this.setState({ description: value }); removeErrors('description'); }}
						errors={errors['description']}
					/>
					<div>
						<vTools.InputButton 
							type={'submit'} 
							text={'Submit'} 
							loadingText={'Please wait'} 
							loading={loading} 
						/>
						<vTools.InputButton 
							text={'Cancel'} 
							className={'danger'} 
							disabled={loading} 
							onClick={() => {this.resetForm(true); onCancel(AddEditPerson.personDefault);} } 
					/>
					</div>
				</form>
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