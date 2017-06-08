import { PERSONS } from './constants';

function setPerson(person){
	return {
		type: PERSONS.SET_PERSON,
		person
	}
}

function removePerson(id){
	return {
		type: PERSONS.REMOVE_PERSON,
		id
	}
}

export default { 
	ACTIONS: PERSONS,
	setPerson,
	removePerson,
};