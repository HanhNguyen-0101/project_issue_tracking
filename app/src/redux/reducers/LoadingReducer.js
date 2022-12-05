import { HIDE_LOADING, SHOW_LOADING } from "../constants/LoadingConstant";

const initialState = {
  isLoading: false
}

const LoadingReducer =  (state = initialState, { type, payload }) => {
  switch (type) {

  case SHOW_LOADING: {
    state.isLoading = true;
    return { ...state }
  }
  case HIDE_LOADING: {
    state.isLoading = false;
    return { ...state }
  }
  default:
    return state
  }
}
export default LoadingReducer;