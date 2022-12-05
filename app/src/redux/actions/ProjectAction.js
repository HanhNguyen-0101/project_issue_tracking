import {
  ASSIGN_USER_TO_PROJECT_SAGA,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_DETAIL_SAGA,
  EDIT_PROJECT_DETAIL_SAGA,
  GET_ALL_PROJECT_CATEGORY_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_API_SAGA,
  REMOVE_USER_FROM_PROJECT_SAGA,
} from "../constants/ProjectConstant";

export const getAllCategory = () => ({
  type: GET_ALL_PROJECT_CATEGORY_SAGA,
});

export const createProject = (project) => ({
  type: CREATE_PROJECT_SAGA,
  project,
});

export const getAllProject = () => ({
  type: GET_ALL_PROJECT_SAGA
});

export const assignUserToProject = (obj) => ({
  type: ASSIGN_USER_TO_PROJECT_SAGA,
  obj
});

export const removeUserFromProject = (obj) => ({
  type: REMOVE_USER_FROM_PROJECT_SAGA,
  obj
});

export const getProjectDetail = (project) => ({
  type: GET_PROJECT_DETAIL,
  payload: { project },
});

export const getProjectDetailApi = (projectId) => ({
  type: GET_PROJECT_DETAIL_API_SAGA,
  projectId
});

export const editProjectDetail = (project) => ({
  type: EDIT_PROJECT_DETAIL_SAGA,
  payload: { project },
});

export const deleteProjectDetail = (projectId) => ({
  type: DELETE_PROJECT_DETAIL_SAGA,
  payload: { projectId },
});