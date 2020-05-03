import {
  ActionTypes,
  AuthState,
  LoginFailure,
  LoginRequest,
  LoginSuccess,
  LogoutRequest,
  LogoutSuccess,
  LogoutFailure,
  RegisterRequest,
  RegisterSuccess,
  RegisterFailure,
} from './types';

const localStorageUser = localStorage.getItem('user');
const initialState: AuthState = localStorageUser
  ? {
      logged: true,
      logging: false,
      user: JSON.parse(localStorageUser),
    }
  : {
      logged: false,
      logging: false,
      user: null,
    };

export const authReducer = () => {
  return (
    state = initialState,
    action:
      | LoginFailure
      | LoginRequest
      | LoginSuccess
      | LogoutRequest
      | LogoutSuccess
      | LogoutFailure
      | RegisterRequest
      | RegisterSuccess
      | RegisterFailure
  ) => {
    switch (action.type) {
      case ActionTypes.LOGIN_REQUEST:
        return {
          ...state,
          logging: true,
        };
      case ActionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          user: action.user,
          logged: true,
          logging: false,
        };
      case ActionTypes.LOGIN_FAILURE:
        return {
          ...state,
          logged: false,
          logging: false,
          error: action.error,
        };
      case ActionTypes.LOGOUT_REQUEST:
        return {
          ...state,
          logging: true,
        };
      case ActionTypes.LOGOUT_SUCCESS:
        return {
          ...state,
          logging: false,
          logged: false,
          user: null,
        };
      case ActionTypes.LOGOUT_FAILURE:
        return {
          ...state,
          logging: false,
          error: action.error,
        };
      case ActionTypes.REGISTER_REQUEST:
        return {
          ...state,
          logging: true,
        };
      case ActionTypes.REGISTER_SUCCESS:
        return {
          ...state,
          logging: false,
          logged: true,
          user: action.user,
        };
      case ActionTypes.REGISTER_FAILURE:
        return {
          ...state,
          logging: false,
          error: action.error,
        };

      default:
        return state;
    }
  };
};
