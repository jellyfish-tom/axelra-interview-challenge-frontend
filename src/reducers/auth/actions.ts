import { ThunkDispatch } from 'redux-thunk';
import {
  ActionTypes,
  LoginRequest,
  LoginFailure,
  LoginSuccess,
  Logout,
  Register,
} from './types';
import {
  ActionTypes as AlertActionTypes,
  ShowAlert,
  AlertMessageType,
} from '../alert/types';
import { api } from '../../helpers/api';
import { HTTP_OPTIONS, PROTOCOL_METHOD } from '../../helpers/FetchOptions';

export const login = (email: string, password: string): any => {
  return async (
    dispatch: ThunkDispatch<
      {},
      {},
      LoginRequest | LoginFailure | LoginSuccess | ShowAlert
    >
  ) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST });

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
        dispatch({ type: ActionTypes.LOGIN_FAILURE });
        dispatch({
          type: AlertActionTypes.ALERT_SHOW,
          message: error,
          alertType: AlertMessageType.ERROR,
        });
      });
  };
};

export const logout = (): any => {
  return async (dispatch: ThunkDispatch<{}, {}, Logout | ShowAlert>) => {
    fetch(api.auth.logout, HTTP_OPTIONS(PROTOCOL_METHOD.GET))
      .then((res) => res.json())
      .then((_) => {
        dispatch({ type: ActionTypes.LOGOUT });
        localStorage.removeItem('user');
        window.location.reload(true);
      })
      .catch((error: string) => {
        dispatch({
          type: AlertActionTypes.ALERT_SHOW,
          message: error,
          alertType: AlertMessageType.ERROR,
        });
      });
  };
};

export const register = (email: string, password: string): any => {
  return async (dispatch: ThunkDispatch<{}, {}, Register | ShowAlert>) => {
    dispatch({ type: ActionTypes.REGISTER });

    fetch(
      api.auth.register,
      HTTP_OPTIONS(PROTOCOL_METHOD.POST, JSON.stringify({ email, password }))
    )
      .then((res) => res.json())
      .then((response) => {
        const { user } = response;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          // dispatch({ type: ActionTypes.REGISTER_SUCCESS, user });
          window.location.reload(true);
        }
      });
  };
};

export type Login = typeof login;
export type Logout = typeof logout;
export type Register = typeof register;
