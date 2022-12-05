import { CommentService } from "../../services/CommentService";
import { call, takeLatest, put } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/constants/settingSystem";
import {
  NOTIF_TYPE,
  openNotification,
} from "../../utils/notification/notification";
import {
  DELETE_COMMENT_SAGA,
  GET_COMMENT,
  GET_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../constants/CommentConstant";

function* getCommentSaga({ taskId }) {
  try {
    const { data, status } = yield call(() =>
      CommentService.getCommentByTaskID(taskId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_COMMENT,
        payload: { comments: data.content },
      });
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followGetCommentSaga() {
  yield takeLatest(GET_COMMENT_SAGA, getCommentSaga);
}
/******************************************************************/

function* insertCommentSaga({ commentData }) {
  try {
    const { data, status } = yield call(() =>
      CommentService.insertComment(commentData)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getCommentSaga({ taskId: commentData.taskId }));
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}
/******************************************************************/

function* updateCommentSaga({ commentId, commentContent, taskId }) {
  try {
    const { data, status } = yield call(() =>
      CommentService.updateComment(commentId, commentContent)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getCommentSaga({ taskId }));
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followUpdateCommentSaga() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}
/******************************************************************/

function* deleteCommentSaga({ commentId, taskId }) {
  try {
    const { data, status } = yield call(() =>
      CommentService.deleteComment(commentId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield call(() => getCommentSaga({ taskId }));
    } else {
      openNotification(NOTIF_TYPE.ERROR, data.message, data.content);
    }
  } catch (error) {
    openNotification(NOTIF_TYPE.ERROR, "", error);
  }
}

export function* followDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
/******************************************************************/
