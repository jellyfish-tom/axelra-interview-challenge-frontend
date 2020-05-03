import { ActionTypes, HideNotification } from './types';
import { ThunkDispatch } from 'redux-thunk';

export const hideNotification = (): any => {
  return async (dispatch: ThunkDispatch<{}, {}, HideNotification>) => {
    dispatch({
      type: ActionTypes.HIDE_ERROR,
      error: null,
    });
  };
};

export type HideNotification = typeof hideNotification;
