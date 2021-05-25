import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  USER_LOADED,
  GET_USER,
  AUTH_ERROR,
  LOGOUT,
  GET_FRIENDS,
  FOLLOW_USER,
  UPDATE_USER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        profileUser: action.payload,
      };
    case GET_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        user: {
          ...state.user,
          followings: !action.payload.follow
            ? [...state.user.followings, action.payload.followings]
            : state.user.followers.filter(
                (following) => following.user !== action.payload.id
              ),
        },
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_START:
    case REGISTER_START:
      return {
        ...state,
        user: null,
        loading: true,
        error: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.token,
        isAuthenticated: true,
        loading: false,
        error: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
