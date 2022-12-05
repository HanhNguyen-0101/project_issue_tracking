import { ProjectService } from "../../services/ProjectService";
import { put, takeLatest, call } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/constants/settingSystem";
import { HIDE_LOADING, SHOW_LOADING } from "../constants/LoadingConstant";
import {
  ASSIGN_USER_TO_PROJECT_SAGA,
  CREATE_PROJECT,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_DETAIL_SAGA,
  EDIT_PROJECT_DETAIL_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_DETAIL_API,
  GET_PROJECT_DETAIL_API_SAGA,
  REMOVE_USER_FROM_PROJECT_SAGA,
} from "../constants/ProjectConstant";
import { history } from "../../utils/history/history";
import { NOTIF_TYPE, openNotification } from "../../utils/notification/notification";
import { HIDE_DRAWER } from "../constants/DrawerConstant";

/******************************************************************/
function* getAllCategorySaga() {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { data, status } = yield call(() => ProjectService.getAllCategory());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        payload: { categories: data.content },
      });
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, '', error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followGetAllCategorySaga() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllCategorySaga);
}

/******************************************************************/
function* createProjectSaga({ project }) {
  yield put({ type: SHOW_LOADING });
  try {
    const { data, status } = yield call(() =>
      ProjectService.createProjectToken(project)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: CREATE_PROJECT,
        payload: { project: data.content },
      });
      history.push("/management-project");
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, '', error);
  }
  yield put({ type: HIDE_LOADING });
}

export function* followCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

/******************************************************************/
export function* getAllProjectSaga() {
  yield put({ type: SHOW_LOADING });
  try {
    const {data, status} = yield call(() => ProjectService.getAllProject());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        payload: {projects: data.content}
      });
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, '', error);
  }
  yield put({ type: HIDE_LOADING });
}

export function* followGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

/******************************************************************/
export function* assignUserToProjectSaga({obj}) {
  try {
    const {data, status} = yield call(() => ProjectService.assignUserToProject(obj));
    if (status === STATUS_CODE.SUCCESS) {
      yield call(getAllProjectSaga);
      openNotification(NOTIF_TYPE.SUCCESS, '', 'Assign the member has successed!');
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, '', error);
  }
}

export function* followAssignUserToProjectSaga() {
  yield takeLatest(ASSIGN_USER_TO_PROJECT_SAGA, assignUserToProjectSaga);
}

/******************************************************************/
export function* removeUserFromProjectSaga({obj}) {
  try {
    const {data, status} = yield call(() => ProjectService.removeUserFromProject(obj));
    if (status === STATUS_CODE.SUCCESS) {
      yield call(getAllProjectSaga);
      openNotification(NOTIF_TYPE.SUCCESS, '', 'Remove the member has successed!');
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, '', error);
  }
}

export function* followRemoveUserFromProjectSaga() {
  yield takeLatest(REMOVE_USER_FROM_PROJECT_SAGA, removeUserFromProjectSaga);
}

/******************************************************************/
function* editProjectDetailSaga({ payload }) {
  yield put({
    type: SHOW_LOADING,
  });
  try {
    const { status, data } = yield call(() =>
      ProjectService.editProjectDetail(payload.project)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield call(getAllProjectSaga);
      openNotification(NOTIF_TYPE.SUCCESS, '', 'Edit project has successed!');
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_DRAWER,
  });
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followEditProjectDetailSaga() {
  yield takeLatest(EDIT_PROJECT_DETAIL_SAGA, editProjectDetailSaga);
}

/******************************************************************/
function* deleteProjectDetailSaga({ payload }) {
  yield put({ type: SHOW_LOADING });
  try {
    const { status, data } = yield call(() =>
      ProjectService.deleteProjectDetail(payload.projectId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield call(getAllProjectSaga);
      openNotification(NOTIF_TYPE.SUCCESS, '', 'Delete project has successed!');
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({ type: HIDE_LOADING });
}

export function* followDeleteProjectDetailSaga() {
  yield takeLatest(DELETE_PROJECT_DETAIL_SAGA, deleteProjectDetailSaga);
}

/******************************************************************/
export function* getProjectDetailApi({ projectId }) {
  yield put({ type: SHOW_LOADING });
  try {
    const { status, data } = yield call(() =>
      ProjectService.getProjectDetail(projectId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_API,
        payload: {project: data.content}
      })
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({ type: HIDE_LOADING });
}

export function* followGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_API_SAGA, getProjectDetailApi);
}
