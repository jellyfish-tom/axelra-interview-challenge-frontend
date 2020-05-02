export enum ActionTypes {
  ALERT_SHOW = 'ALERT_SHOW',
}

export enum AlertMessageType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  NEUTRAL = 'NEUTRAL',
}

export type ShowAlert = {
  type: ActionTypes.ALERT_SHOW;
  message: string;
  alertType: AlertMessageType;
};

export type AlertState = {
  message: string;
  alertType: AlertMessageType;
};
