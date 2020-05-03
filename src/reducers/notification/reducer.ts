import { ActionTypes, NotificationState } from './types';

import { HideNotification } from './actions';

export const initialState: NotificationState = {
  error: null,
  isOpen: false,
  success: null,
  warning: null,
  info: null,
};

export const notificationReducer = () => {
  return (state = initialState, action: any) => {
    const { error, success, info, warning } = action;

    // structured like that so it catches props from other reducers
    if (error) {
      return {
        error,
        isOpen: true,
      };
    } else if (success) {
      return {
        success,
        isOpen: true,
      };
    } else if (info) {
      return {
        info,
        isOpen: true,
      };
    } else if (warning) {
      return {
        warning,
        isOpen: true,
      };
    } else if (action.type === ActionTypes.HIDE_ERROR) {
      return initialState;
    }

    return state;
  };
};
