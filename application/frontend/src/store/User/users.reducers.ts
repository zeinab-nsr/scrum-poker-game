import { Reducer } from "react";
import ActionTypes from "./users.contants"
import { Action, User } from "./users.types";

export interface UsersStore {
	user: User;
  onlinePlayers: [],
}

export const initialState: UsersStore = {
	user: {
    username: '',
    id: '',
    voted: false,
  },
  onlinePlayers: [],
};

const reducer: Reducer<UsersStore, Action> = (state = initialState, action) => {
	const payload = action.payload;
	switch (action.type) {
		case ActionTypes.SET_USER_INFO:
			return {
        ...state,
        user: payload,
      };

    case ActionTypes.UPDATE_ONLINE_PLAYERS_LIST:
    return {
      ...state,
      onlinePlayers: payload,
    };

		default:
			return state;
	}
};
export default reducer;
