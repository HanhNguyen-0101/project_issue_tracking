import {
  CREATE_PROJECT,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_CATEGORY,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_API,
} from "../constants/ProjectConstant";

const initialState = {
  categories: [],
  currentProject: {},
  projects: [],
  editProject: {},
  projectDetail: {},
};

const ProjectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PROJECT_CATEGORY: {
      return { ...state, categories: payload.categories };
    }
    case CREATE_PROJECT: {
      return { ...state, currentProject: payload.project };
    }
    case GET_ALL_PROJECT: {
      return { ...state, projects: payload.projects };
    }
    case GET_PROJECT_DETAIL: {
      return { ...state, editProject: payload.project };
    }
    case GET_PROJECT_DETAIL_API: {
      return { ...state, projectDetail: payload.project };
    }
    default:
      return state;
  }
};
export default ProjectReducer;
