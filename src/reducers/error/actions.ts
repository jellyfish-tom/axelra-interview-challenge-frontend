import { ActionTypes, SetError, HideError } from './types';
import { ThunkDispatch } from 'redux-thunk';

// action to set error manually (not from reducers/actions of other types)
export const setError = (error: string): any => {
  return async (dispatch: ThunkDispatch<{}, {}, SetError>) => {
    dispatch({
      type: ActionTypes.SET_ERROR,
      error: error,
    });
  };
};

export const hideError = (): any => {
  return async (dispatch: ThunkDispatch<{}, {}, HideError>) => {
    dispatch({
      type: ActionTypes.HIDE_ERROR,
      error: null,
    });
  };
};

export type SetError = typeof setError;
export type HideError = typeof hideError;
