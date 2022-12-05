import { SET_CONTENT_EDIT_TASK_MODAL } from "../constants/ModalConstant";

export const setContentEditIssueDrawer = (component) => ({
    type: SET_CONTENT_EDIT_TASK_MODAL,
    payload: {component}
  });