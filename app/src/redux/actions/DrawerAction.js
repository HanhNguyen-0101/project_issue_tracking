import {
  HIDE_DRAWER,
  SET_CONTENT_DRAWER,
  SET_SUBMIT_DRAWER,
  SHOW_DRAWER,
} from "../constants/DrawerConstant";

export const showDrawer = () => ({
  type: SHOW_DRAWER,
});

export const hideDrawer = () => ({
  type: HIDE_DRAWER,
});

export const setContentDrawer = (component, title, visible) => ({
  type: SET_CONTENT_DRAWER,
  payload: { component, title, visible },
});


export const setSubmitDrawer = (callbackFuct) => ({
  type: SET_SUBMIT_DRAWER,
  payload: { callbackFuct },
});
