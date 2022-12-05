import { GET_COMMENT } from "../constants/CommentConstant";

const initialState = {
  comments: []
}

const CommentReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case GET_COMMENT:
    return { ...state, comments: payload.comments }

  default:
    return state
  }
}

export default CommentReducer;
