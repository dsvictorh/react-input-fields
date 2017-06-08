import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import personActions from '../actions/persons';
import InputFields from './InputFields';

class PersonList extends Component{
	static propTypes = {
		persons: PropTypes.arrayOf(PropTypes.object).isRequired,
		edit: PropTypes.func,
		remove: PropTypes.func,
	}

	static defaultProps = {
		persons: [],
	}

	render(){
		const { 
			persons,
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
									{
										edit && <InputFields.InputButton text={'Edit'} onClick={() => edit(person)}  />
									}
									{
										remove && <InputFields.InputButton text={'Delete'} onClick={() => remove(person.id)}  />
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