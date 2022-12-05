import {
  HIDE_DRAWER,
  SET_CONTENT_DRAWER,
  SET_SUBMIT_DRAWER,
  SHOW_DRAWER,
} from "../constants/DrawerConstant";

const initialState = {
  visible: false,
  title: "",
  ContentDrawerComponent: <></>,
  callBackSubmit: () => {},
};

const DrawerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_DRAWER: {
      return { ...state, visible: true };
    }
    case HIDE_DRAWER: {
      return { ...state, visible: false };
    }
    case SET_CONTENT_DRAWER: {
      return {
        ...state,
        ContentDrawerComponent: payload.component,
        visible: payload.visible,
        title: payload.title
      };
    }
    case SET_SUBMIT_DRAWER: {
      return {...state, callBackSubmit: payload.callbackFuct}
    }
    default:
      return state;
  }
};
export default DrawerReducer;
