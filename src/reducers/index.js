import { combineReducers } from 'redux';
import errors from './errors';
import persons from './persons';

export default combineReducers({
	errors,
	persons
});