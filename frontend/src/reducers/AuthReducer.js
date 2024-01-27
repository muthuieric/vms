import TYPE from "./Type";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

const AuthReducer = (state=initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPE.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case TYPE.LOGIN_SUCCESS:
    case TYPE.GOOGLE_AUTH_SUCCESS:
    case TYPE.FACEBOOK_AUTH_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case TYPE.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case TYPE.USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case TYPE.AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case TYPE.USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case TYPE.GOOGLE_AUTH_FAIL:
    case TYPE.FACEBOOK_AUTH_FAIL:
    case TYPE.LOGIN_FAIL:
    case TYPE.TYPE.SIGNUP_FAIL:
    case TYPE.LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    case TYPE.PASSWORD_RESET_SUCCESS:
    case TYPE.PASSWORD_RESET_FAIL:
    case TYPE.PASSWORD_RESET_CONFIRM_SUCCESS:
    case TYPE.PASSWORD_RESET_CONFIRM_FAIL:
    case TYPE.ACTIVATION_SUCCESS:
    case TYPE.ACTIVATION_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
export default AuthReducer;