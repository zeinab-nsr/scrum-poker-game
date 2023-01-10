import { combineReducers } from "redux";
import usersReducer from './User/users.reducers'

const rootReducer = combineReducers({
	usersReducer
});

export default rootReducer;
