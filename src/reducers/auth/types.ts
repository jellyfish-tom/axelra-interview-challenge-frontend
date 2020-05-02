import { User } from '../../model/User';

export enum ActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
}

export type LoginRequest = {
  type: ActionTypes.LOGIN_REQUEST;
};

export type LoginSuccess = {
  type: ActionTypes.LOGIN_SUCCESS;
  user: User | null;
};

export type LoginFailure = {
  type: ActionTypes.LOGIN_FAILURE;
};

export type Logout = {
  type: ActionTypes.LOGOUT;
};

export type Register = {
  type: ActionTypes.REGISTER;
};

export type AuthState = {
  user: User | null;
  logged: boolean;
  logging: boolean;
};
