import React, { Component } from 'react';
import { connect } from 'react-redux';

import personActions from '../actions/persons';
import AddEditPerson from './AddEditPerson';
import PersonList from './PersonList';

class App extends Component{
	constructor(props) {
		super(props);

		this.state = {
			person: {}
		}	
	}

	resetPerson = (person) => {
		this.setState({person: person || {}});
	}

	setPerson = (person) => {
		this.setState({person});
	}

	removePerson = (id) => {
		this.props.removePerson(id);
	}

	render(){
		const { person } = this.state;

		return(
			<div>
				<AddEditPerson person={person} onSubmit={this.resetPerson} onCancel={this.resetPerson} />
				<PersonList edit={this.setPerson} edittingPerson={person} remove={this.removePerson} />
			</div>
		)
	}
}

function mapStateToProps(state){
	return {}
}

export default connect(mapStateToProps, personActions)(App);