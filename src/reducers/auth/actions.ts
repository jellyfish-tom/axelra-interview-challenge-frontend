import { ThunkDispatch } from "redux-thunk";
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
} from "./types";
import { api } from "../../helpers/api";
import { HTTP_OPTIONS, PROTOCOL_METHOD } from "../../helpers/FetchOptions";

export const login = (email: string, password: string): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, LoginRequest | LoginFailure | LoginSuccess>
  ) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST });

    try {
      const response = await fetch(
        api.auth.login,
        HTTP_OPTIONS(PROTOCOL_METHOD.POST, { email, password })
      );

      if (response.ok) {
        const user = await response.json();

        localStorage.setItem("user", JSON.stringify(user));

        window.location.reload(true);
      } else {
        dispatch({
          type: ActionTypes.LOGIN_FAILURE,
          error: (await response.json()).message,
        });
      }
    } catch (e) {
      dispatch({
        type: ActionTypes.LOGIN_FAILURE,
        error: "Ouuch! There has been some error, sorry!",
      });
    }
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

    try {
      const response = await fetch(
        api.auth.logout,
        HTTP_OPTIONS(PROTOCOL_METHOD.GET)
      );

      if (response.ok) {
        localStorage.removeItem("user");
        window.location.reload(true);
      } else {
        dispatch({
          error: (await response.json()).message,
          type: ActionTypes.LOGOUT_FAILURE,
        });
      }
    } catch (e) {
      dispatch({
        type: ActionTypes.LOGOUT_FAILURE,
        error: "Ouuch! There has been some error, sorry!",
      });
    }
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

    try {
      const response = await fetch(
        api.auth.register,
        HTTP_OPTIONS(PROTOCOL_METHOD.POST, { email, password })
      );

      if (response.ok) {
        const user = (await response.json()).user;

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));

          window.location.reload(true);
        } else {
          dispatch({
            type: ActionTypes.REGISTER_FAILURE,
            error: (await response.json()).message,
          });
        }
      } else {
        dispatch({
          type: ActionTypes.REGISTER_FAILURE,
          error: (await response.json()).message,
        });
      }
    } catch (e) {
      dispatch({
        type: ActionTypes.REGISTER_FAILURE,
        error: "Ouuch! There has been some error, sorry!",
      });
    }
  };
};

export type Login = typeof login;
export type Logout = typeof logout;
export type Register = typeof register;
