import {
  ActionTypes,
  AuthState,
  LoginFailure,
  LoginRequest,
  LoginSuccess,
  Logout,
  Register,
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
    action: LoginFailure | LoginRequest | LoginSuccess | Logout | Register
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
        };
      case ActionTypes.LOGOUT:
        return {
          ...state,
          logged: false,
          user: null,
        };
      case ActionTypes.REGISTER:
        return {
          ...state,
          logging: true,
        };
      default:
        return state;
    }
  };
};
