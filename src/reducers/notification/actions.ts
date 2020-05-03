import { ActionTypes, ClearNotification } from './types';
import { ThunkDispatch } from 'redux-thunk';

export const clearNotification = (): any => {
  return async (dispatch: ThunkDispatch<{}, {}, ClearNotification>) => {
    dispatch({
      type: ActionTypes.HIDE_ERROR,
      error: null,
    });
  };
};

export type ClearNotification = typeof clearNotification;
