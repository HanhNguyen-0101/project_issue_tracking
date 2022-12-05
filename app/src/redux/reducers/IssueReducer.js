import {
  GET_ALL_PRIORITY,
  GET_ALL_STATUS,
  GET_ALL_TYPE_TASK,
  GET_ISSUE_DETAIL,
  UPDATE_ISSUE_DETAIL_FIELD,
} from "../constants/IssueConstant";

const initialState = {
  priorities: [],
  statuses: [],
  typeTasks: [],
  taskCurrent: {},
};

const IssueReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PRIORITY: {
      return { ...state, priorities: payload.priorities };
    }
    case GET_ALL_STATUS: {
      return { ...state, statuses: payload.statuses };
    }
    case GET_ALL_TYPE_TASK: {
      return { ...state, typeTasks: payload.typeTasks };
    }
    case GET_ISSUE_DETAIL: {
      return { ...state, taskCurrent: payload.task };
    }
    case UPDATE_ISSUE_DETAIL_FIELD: {
      return {...state, taskCurrent: {...state.taskCurrent, [payload.name]: payload.value}}
    }
    default:
      return state;
  }
};

export default IssueReducer;
