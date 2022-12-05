import { DELETE_USER_SAGA, GET_ALL_USER_SAGA, GET_USER_BY_KEYWORD_SAGA, REGISTER_USER_SAGA, SEARCH_USER_BY_KEYWORD_SAGA, UPDATE_USER_SAGA, USER_LOGIN_SAGA } from "../constants/UserConstant";

export const userLogin = (user) => ({
  type: USER_LOGIN_SAGA,
  user,
});

export const getUserByKeyword = (keyword) => ({
  type: GET_USER_BY_KEYWORD_SAGA,
  keyword
});

export const searchUserByKeyword = (keyword) => ({
  type: SEARCH_USER_BY_KEYWORD_SAGA,
  keyword
});

export const getAllUser = () => ({
  type: GET_ALL_USER_SAGA
});

export const updateUser = (user) => ({
  type: UPDATE_USER_SAGA,
  user
});

export const deleteUser = (userId) => ({
  type: DELETE_USER_SAGA,
  userId
});

export const registerUser = (user) => ({
  type: REGISTER_USER_SAGA,
  user
});