import { combineReducers } from "redux";
import users from './User/users.reducers'

const rootReducer = combineReducers({
	users,
});

export default rootReducer;
