import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOADING,
  REGISTER,
} from "../types";

const Reducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.access_token,
        user: action.payload.user,
        error: null,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER:
      return { ...state, loading: false };

    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default Reducer;
