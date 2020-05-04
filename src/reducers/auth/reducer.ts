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
} from "./types";

import { UnloggedUser } from "../../model/User";

const localStorageUser = localStorage.getItem("user");
const initialState: AuthState = localStorageUser
  ? {
      logged: true,
      loading: false,
      user: JSON.parse(localStorageUser),
    }
  : {
      logged: false,
      loading: false,
      user: UnloggedUser,
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
          loading: true,
        };
      case ActionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          user: action.user,
          logged: true,
          loading: false,
        };
      case ActionTypes.LOGIN_FAILURE:
        return {
          ...state,
          logged: false,
          loading: false,
          error: action.error,
        };
      case ActionTypes.LOGOUT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ActionTypes.LOGOUT_SUCCESS:
        return {
          ...state,
          loading: false,
          logged: false,
          user: UnloggedUser,
        };
      case ActionTypes.LOGOUT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case ActionTypes.REGISTER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ActionTypes.REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          logged: true,
          user: action.user,
        };
      case ActionTypes.REGISTER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };

      default:
        return state;
    }
  };
};
