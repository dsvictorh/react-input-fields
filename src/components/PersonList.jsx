import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import personActions from '../actions/persons';
import vTools from './vTools';

class PersonList extends Component{
	static propTypes = {
		persons: PropTypes.arrayOf(PropTypes.object).isRequired,
		edittingPerson: PropTypes.object,
		edit: PropTypes.func,
		remove: PropTypes.func,
	}

	static defaultProps = {
		persons: [],
	}

	render(){
		const {
			persons,
			edittingPerson,
			edit,
			remove
		} = this.props;

		return(
			<div>
				<ul>
					{
						persons.map((person) => {
							return(
								<li key={person.id}>
									<h3>{person.name} {person.lastName}</h3>
									<p>{person.gender ? 'Female' : 'Male'}</p>
									<p>{person.active ? 'Active' : 'Inactive'}</p>
									<p>{moment(person.birthdate).format('MMMM Do, YYYY')}</p>
									<p>{person.description}</p>
									<p>{person.role.label}</p>
									{
										edit && <vTools.InputButton text={'Edit'} onClick={() => edit(person)}  />
									}
									{
										remove && <vTools.InputButton disabled={edittingPerson && edittingPerson.id === person.id} text={'Delete'} onClick={() => remove(person.id)}  />
									}
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

function mapStateToProps(state){
	const { persons } = state;
	return {
		persons
	}
}

export default connect(mapStateToProps, personActions)(PersonList);