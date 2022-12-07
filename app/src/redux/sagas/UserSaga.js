import { put, call, takeLatest, delay } from "redux-saga/effects";
import { UserService } from "../../services/UserService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN_STORE,
} from "../../utils/constants/settingSystem";
import { history } from "../../utils/history/history";
import {
  NOTIF_TYPE,
  openNotification,
} from "../../utils/notification/notification";
import { HIDE_DRAWER } from "../constants/DrawerConstant";
import { HIDE_LOADING, SHOW_LOADING } from "../constants/LoadingConstant";
import {
  DELETE_USER_SAGA,
  GET_ALL_USER,
  GET_ALL_USER_SAGA,
  GET_USER_BY_KEYWORD,
  GET_USER_BY_KEYWORD_SAGA,
  REGISTER_USER_SAGA,
  SEARCH_USER_BY_KEYWORD,
  SEARCH_USER_BY_KEYWORD_SAGA,
  UPDATE_USER_SAGA,
  USER_LOGIN,
  USER_LOGIN_SAGA,
} from "../constants/UserConstant";

function* userLoginSaga({ user }) {
  yield put({
    type: SHOW_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() => UserService.userLoginSr(user));

    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(TOKEN, data.content.accessToken);
      localStorage.setItem(USER_LOGIN_STORE, JSON.stringify(data.content));

      yield put({
        type: USER_LOGIN,
        payload: { user: data.content },
      });
      yield history.push("/management-project");
      yield window.location.reload();
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followUserLoginSaga() {
  yield takeLatest(USER_LOGIN_SAGA, userLoginSaga);
}

/******************************************************************/
function* getUserByKeywordSaga({ keyword }) {
  try {
    const { data, status } = yield call(() =>
      UserService.findUserByKeyword(keyword)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_KEYWORD,
        payload: { userSearch: data.content },
      });
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followGetUserByKeywordSaga() {
  yield takeLatest(GET_USER_BY_KEYWORD_SAGA, getUserByKeywordSaga);
}
/******************************************************************/
function* searchUserByKeywordSaga({ keyword }) {
  yield put({
    type: SHOW_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      UserService.findUserByKeyword(keyword)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: SEARCH_USER_BY_KEYWORD,
        payload: { users: data.content },
      });
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followSearchUserByKeywordSaga() {
  yield takeLatest(SEARCH_USER_BY_KEYWORD_SAGA, searchUserByKeywordSaga);
}

/******************************************************************/
function* getAllUserSaga() {
  yield put({
    type: SHOW_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() => UserService.getAllUser());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_USER,
        payload: { users: data.content },
      });
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* followGetAllUserSaga() {
  yield takeLatest(GET_ALL_USER_SAGA, getAllUserSaga);
}

/******************************************************************/
function* updateUserSaga({ user }) {
  yield put({
    type: SHOW_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() => UserService.editUser(user));
    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllUserSaga());
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_DRAWER
  });
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followUpdateUserSaga() {
  yield takeLatest(UPDATE_USER_SAGA, updateUserSaga);
}

/******************************************************************/
function* deleteUserSaga({ userId }) {
  yield put({
    type: SHOW_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() => UserService.deleteUser(userId));
    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getAllUserSaga());
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* followDeleteUserSaga() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}

/******************************************************************/
function* registerUserSaga({ user }) {
  yield put({
    type: SHOW_LOADING,
  });

  yield delay(500);

  try {
    const { data, status } = yield call(() => UserService.registerUser(user));
    if (status === STATUS_CODE.SUCCESS) {
      openNotification(NOTIF_TYPE.SUCCESS, 'Create Account successful!', 'Please login this one');
      yield history.push("/login");
      yield window.location.reload();
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* followRegisterUserSaga() {
  yield takeLatest(REGISTER_USER_SAGA, registerUserSaga);
}
