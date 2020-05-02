import { ActionTypes, AlertState } from './types';

export const showAlert = (alertData: AlertState) => {
  return {
    type: ActionTypes.ALERT_SHOW,
    ...alertData,
  };
};

export type ShowAlert = typeof showAlert;
