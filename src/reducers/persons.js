import persons from '../actions/persons';

export default (state = [], action) => {
	const actions = persons.ACTIONS;
	switch(action.type){
		case actions.SET_PERSON:
		{
			const { person } = action;
			if(!person.id){
				person.id = Math.random();
			}

			return [...state.filter(item => item.id !== person.id), person];
		}
		case actions.REMOVE_PERSON:
		{
			const { id } = action;
			return [...state.filter(item => item.id !== id)];
		}
		default:
			return state;
	}
}