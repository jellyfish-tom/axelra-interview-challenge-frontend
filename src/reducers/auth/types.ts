import { User } from '../../model/User';

export enum ActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE = 'LOGOUT_FAILURE',
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_FAILURE = 'REGISTER_FAILURE',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
}

export type LoginRequest = {
  type: ActionTypes.LOGIN_REQUEST;
};

export type LoginSuccess = {
  type: ActionTypes.LOGIN_SUCCESS;
  user: User;
};

export type LoginFailure = {
  type: ActionTypes.LOGIN_FAILURE;
  error: string;
};

export type LogoutRequest = {
  type: ActionTypes.LOGOUT_REQUEST;
};

export type LogoutSuccess = {
  type: ActionTypes.LOGOUT_SUCCESS;
};

export type LogoutFailure = {
  type: ActionTypes.LOGOUT_FAILURE;
  error: string;
};

export type RegisterRequest = {
  type: ActionTypes.REGISTER_REQUEST;
};

export type RegisterSuccess = {
  type: ActionTypes.REGISTER_SUCCESS;
  user: User;
};

export type RegisterFailure = {
  type: ActionTypes.REGISTER_FAILURE;
  error: string;
};

export type AuthState = {
  user: User;
  logged: boolean;
  logging: boolean;
};
