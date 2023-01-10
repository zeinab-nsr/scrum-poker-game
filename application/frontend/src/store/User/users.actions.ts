import { Action, User } from "./users.types";
import ActionTypes from "./users.contants";

class Actions {
	setUserInfo(user: User): Action<User> {
		return {
			type: ActionTypes.SET_USER_INFO,
			payload: user,
		};
	}

  updatePlayersList(users: [User]): Action<[User]> {
    return {
			type: ActionTypes.UPDATE_ONLINE_PLAYERS_LIST,
			payload: users,
		};
  }
};

const UserActions = new Actions();

export default UserActions;
