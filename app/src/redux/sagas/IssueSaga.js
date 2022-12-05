import { takeLatest, call, put, select } from "redux-saga/effects";
import { IssueService } from "../../services/IssueService";
import { STATUS_CODE } from "../../utils/constants/settingSystem";
import {
  NOTIF_TYPE,
  openNotification,
} from "../../utils/notification/notification";
import { HIDE_DRAWER } from "../constants/DrawerConstant";
import {
  CREATE_ISSUE_DETAIL_SAGA,
  DELETE_ISSUE_DETAIL_SAGA,
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TYPE_TASK,
  GET_ALL_TYPE_TASK_SAGA,
  GET_ISSUE_DETAIL,
  GET_ISSUE_DETAIL_SAGA,
  UPDATE_ISSUE_DETAIL_FIELD,
  UPDATE_ISSUE_DETAIL_SAGA,
  UPDATE_STATUS_ISSUE_SAGA,
} from "../constants/IssueConstant";
import { getProjectDetailApi } from "./ProjectSaga";

function* getIssueDetailSaga({ issueId }) {
  try {
    const { data, status } = yield call(() =>
      IssueService.getIssueDetail(issueId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      const listUserAsign = data.content.assigness?.map(i => i.id);
      yield put({
        type: GET_ISSUE_DETAIL,
        payload: {task: {...data.content, listUserAsign}}
      })
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followGetIssueDetailSaga() {
  yield takeLatest(GET_ISSUE_DETAIL_SAGA, getIssueDetailSaga);
}

/******************************************************************/
function* deleteIssueDetailSaga({ issueId, projectId }) {
  try {
    const { data, status } = yield call(() =>
      IssueService.deleteIssue(issueId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getProjectDetailApi({projectId}));
      openNotification(NOTIF_TYPE.SUCCESS, '', 'The issue has deleted successful!');
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followDeleteIssueDetailSaga() {
  yield takeLatest(DELETE_ISSUE_DETAIL_SAGA, deleteIssueDetailSaga);
}

/******************************************************************/
function* updateIssueDetailSaga({ payload }) {

  yield put({
    type: UPDATE_ISSUE_DETAIL_FIELD,
    payload
  });

  const {taskCurrent} = yield select(state => state.IssueReducer);

  try {
    const { data, status } = yield call(() => IssueService.updateIssue(taskCurrent));
    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getProjectDetailApi({projectId: taskCurrent.projectId}));
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followUpdateIssueDetailSaga() {
  yield takeLatest(UPDATE_ISSUE_DETAIL_SAGA, updateIssueDetailSaga);
}

/******************************************************************/
function* createIssueDetailSaga({ issue }) {
  try {
    const { data, status } = yield call(() => IssueService.createIssue(issue));
    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getProjectDetailApi({projectId: issue.projectId}));
      openNotification(NOTIF_TYPE.SUCCESS, '', 'The issue has created successful!');
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
  yield put({
    type: HIDE_DRAWER
  });
}

export function* followCreateIssueDetailSaga() {
  yield takeLatest(CREATE_ISSUE_DETAIL_SAGA, createIssueDetailSaga);
}

/******************************************************************/
function* getAllPrioritySaga() {
  try {
    const { data, status } = yield call(() => IssueService.getAllPriority());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PRIORITY,
        payload: { priorities: data.content }
      })
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followGetAllPrioritySaga() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}

/******************************************************************/
function* getAllStatusSaga() {
  try {
    const { data, status } = yield call(() => IssueService.getAllStatus());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_STATUS,
        payload: { statuses: data.content }
      })
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}

/******************************************************************/
function* getAllTypeTaskSaga() {
  try {
    const { data, status } = yield call(() => IssueService.getAllTypeTask());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_TYPE_TASK,
        payload: { typeTasks: data.content }
      })
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followGetAllTypeTaskSaga() {
  yield takeLatest(GET_ALL_TYPE_TASK_SAGA, getAllTypeTaskSaga);
}

/******************************************************************/
function* updateStatusIssueSaga({ statusData }) {
  try {
    const { data, status } = yield call(() =>
      IssueService.updateStatusIssue(statusData)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getProjectDetailApi({projectId: statusData.projectId}));
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followUpdateStatusIssueSaga() {
  yield takeLatest(UPDATE_STATUS_ISSUE_SAGA, updateStatusIssueSaga);
}

/******************************************************************/
