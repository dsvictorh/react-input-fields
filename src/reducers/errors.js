import errors from '../actions/errors';

export default (state = {}, action) => {
	const actions = errors.ACTIONS;
	switch(action.type){
		case actions.ADD_ERRORS:
		{
			const { key, values } = action;
			const newState = {...state};
			newState[key] = values; 
			return newState;
		}
		case actions.REMOVE_ERRORS:
		{
			const { key } = action;
			const newState = {...state};
			delete newState[key];
			return newState;
		}
		default:
			return state;
	}
}