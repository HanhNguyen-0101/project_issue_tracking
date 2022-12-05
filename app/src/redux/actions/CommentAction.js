import {
  DELETE_COMMENT_SAGA,
  GET_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../constants/CommentConstant";

export const getComment = (taskId) => ({
  type: GET_COMMENT_SAGA,
  taskId,
});

export const insertComment = (commentData) => ({
  type: INSERT_COMMENT_SAGA,
  commentData,
});

export const updateComment = (commentId, commentContent, taskId) => ({
  type: UPDATE_COMMENT_SAGA,
  commentId,
  commentContent,
  taskId
});

export const deleteComment = (commentId, taskId) => ({
  type: DELETE_COMMENT_SAGA,
  commentId,
  taskId
});
