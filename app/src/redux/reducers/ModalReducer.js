import { SET_CONTENT_EDIT_TASK_MODAL } from "../constants/ModalConstant";

const initialState = {
    ContentModalComponent: <></>
}

const ModalReducer =  (state = initialState, { type, payload }) => {
  switch (type) {

  case SET_CONTENT_EDIT_TASK_MODAL: {
    return { ...state, ContentModalComponent: payload.component }
  }
  default:
    return state
  }
}
export default ModalReducer;