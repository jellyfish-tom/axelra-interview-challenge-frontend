import { ActionTypes, ShowAlert, AlertState, AlertMessageType } from './types';

export const initialState: AlertState = {
  message: '',
  alertType: AlertMessageType.NEUTRAL,
};

export const alertReducer = () => {
  return (state = initialState, action: ShowAlert) => {
    switch (action.type) {
      case ActionTypes.ALERT_SHOW:
        return {
          ...state,
          message: action.message,
          alertType: action.alertType,
        };
      default:
        return state;
    }
  };
};
