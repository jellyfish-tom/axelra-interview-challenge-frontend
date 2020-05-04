import { ActionTypes, ClearNotification, SetNotification } from "./types";
import { ThunkDispatch } from "redux-thunk";

export const setNotification = (
  error?: string,
  warning?: string,
  info?: string,
  success?: string
): any => {
  return async (dispatch: ThunkDispatch<{}, {}, SetNotification>) => {
    const action: SetNotification = {
      type: ActionTypes.SET_NOTIFICATION,
    };

    if (error) {
      action.error = error;
    } else if (warning) {
      action.warning = warning;
    } else if (info) {
      action.info = info;
    } else if (success) {
      action.success = success;
    }

    dispatch(action);
  };
};

export const clearNotification = (): any => {
  return async (dispatch: ThunkDispatch<{}, {}, ClearNotification>) => {
    dispatch({
      type: ActionTypes.CLEAR_NOTIFICATION,
      error: null,
    });
  };
};

export type ClearNotification = typeof clearNotification;
export type SetNotification = typeof setNotification;
