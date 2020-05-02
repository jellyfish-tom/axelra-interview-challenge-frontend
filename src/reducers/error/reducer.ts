import { ActionTypes, ErrorState, ErrorMessageType } from './types';

import { SetError, HideError } from './actions';

export const initialState: ErrorState = {
  error: null,
  errorType: ErrorMessageType.NEUTRAL,
  isOpen: false,
};

export const errorReducer = () => {
  return (state = initialState, action: any) => {
    const { error } = action;

    if (error) {
      return {
        error,
        isOpen: true,
        errorType: action.errorType,
      };
    } else if (action.type === ActionTypes.HIDE_ERROR) {
      return {
        error: null,
        isOpen: false,
      };
    }

    return state;
  };
};
