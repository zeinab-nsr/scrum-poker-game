import { Reducer } from "react";
import ActionTypes from "./users.contants"
import { Action } from "./users.types";

export interface UsersState {
	user: string;
  onlinePlayers: [],
}

export const initialState: UsersState = {
	user: "",
  onlinePlayers: [],
};

const reducer: Reducer<UsersState, Action> = (state = initialState, action) => {
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
