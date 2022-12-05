import {
  CREATE_ISSUE_DETAIL_SAGA,
  DELETE_ISSUE_DETAIL_SAGA,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TYPE_TASK_SAGA,
  GET_ISSUE_DETAIL_SAGA,
  UPDATE_ISSUE_DETAIL_SAGA,
  UPDATE_STATUS_ISSUE_SAGA,
} from "../constants/IssueConstant";

export const getIssueDetail = (issueId) => ({
  type: GET_ISSUE_DETAIL_SAGA,
  issueId,
});

export const deleteIssueDetail = (issueId, projectId) => ({
  type: DELETE_ISSUE_DETAIL_SAGA,
  issueId,
  projectId
});

export const updateIssueDetailField = (name, value) => ({
  type: UPDATE_ISSUE_DETAIL_SAGA,
  payload: {name, value}
});

export const createIssueDetail = (issue) => ({
  type: CREATE_ISSUE_DETAIL_SAGA,
  issue,
});

export const getAllPriority = () => ({
  type: GET_ALL_PRIORITY_SAGA
});

export const getAllStatus = () => ({
  type: GET_ALL_STATUS_SAGA
});


export const getAllTypeTask = () => ({
  type: GET_ALL_TYPE_TASK_SAGA
});

export const updateStatusIssue = (statusData) => ({
  type: UPDATE_STATUS_ISSUE_SAGA,
  statusData
})