import { ThunkDispatch } from 'redux-thunk';
import {
  ActionTypes,
  LoginRequest,
  LoginFailure,
  LoginSuccess,
  LogoutRequest,
  LogoutSuccess,
  LogoutFailure,
  RegisterRequest,
  RegisterSuccess,
  RegisterFailure,
} from './types';
import { api } from '../../helpers/api';
import { HTTP_OPTIONS, PROTOCOL_METHOD } from '../../helpers/FetchOptions';

export const login = (email: string, password: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, LoginRequest | LoginFailure | LoginSuccess>
  ) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST });

    try {
      fetch(
        api.auth.login,
        HTTP_OPTIONS(PROTOCOL_METHOD.POST, JSON.stringify({ email, password }))
      )
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: ActionTypes.LOGIN_SUCCESS, user });
          window.location.reload(true);
        })
        .catch((error: string) => {
          dispatch({
            type: ActionTypes.LOGIN_FAILURE,
            error,
          });
        });
    } catch (e) {}
  };
};

export const logout = (): any => {
  return async (
    dispatch: ThunkDispatch<
      {},
      {},
      LogoutRequest | LogoutSuccess | LogoutFailure
    >
  ) => {
    dispatch({ type: ActionTypes.LOGOUT_REQUEST });

    fetch(api.auth.logout, HTTP_OPTIONS(PROTOCOL_METHOD.GET))
      .then((res) => res.json())
      .then((_) => {
        dispatch({
          type: ActionTypes.LOGOUT_SUCCESS,
        });
        localStorage.removeItem('user');
        window.location.reload(true);
      })
      .catch((error: string) => {
        dispatch({
          error,
          type: ActionTypes.LOGOUT_FAILURE,
        });
      });
  };
};

export const register = (email: string, password: string): any => {
  return async (
    dispatch: ThunkDispatch<
      {},
      {},
      RegisterRequest | RegisterSuccess | RegisterFailure
    >
  ) => {
    dispatch({ type: ActionTypes.REGISTER_REQUEST });

    fetch(
      api.auth.register,
      HTTP_OPTIONS(PROTOCOL_METHOD.POST, JSON.stringify({ email, password }))
    )
      .then((res) => res.json())
      .then((response) => {
        const { user } = response;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: ActionTypes.REGISTER_SUCCESS, user });
          window.location.reload(true);
        }
      })
      .catch((error: string) => {
        dispatch({
          error,
          type: ActionTypes.REGISTER_FAILURE,
        });
      });
  };
};

export type Login = typeof login;
export type Logout = typeof logout;
export type Register = typeof register;
