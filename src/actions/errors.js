import { ERRORS } from './constants';

function addErrors(key, values){
	return {
		type: ERRORS.ADD_ERRORS,
		key,
		values
	}
}

function removeErrors(key){
	return {
		type: ERRORS.REMOVE_ERRORS,
		key,
	};
}

export default { 
	ACTIONS: ERRORS,
	addErrors,
	removeErrors,
};