import { USER_LOGIN_STORE } from "../../utils/constants/settingSystem";
import { GET_ALL_USER, GET_USER_BY_KEYWORD, SEARCH_USER_BY_KEYWORD, USER_LOGIN } from "../constants/UserConstant";

let user = {};
if (localStorage.getItem(USER_LOGIN_STORE)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN_STORE));
}
const initialState = {
  user,
  userSearch: [],
  users: [],
  currentUser: {}
};

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN: {
      return { ...state, user: payload.user };
    }
    case GET_USER_BY_KEYWORD: {
      return {...state, userSearch: payload.userSearch};
    }
    case GET_ALL_USER: {
      return {...state, users: payload.users};
    }
    case SEARCH_USER_BY_KEYWORD: {
      return {...state, users: payload.users};
    }
    default:
      return state;
  }
};
export default UserReducer;
