export enum ActionTypes {
  CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION',
  SET_NOTIFICATION = 'SET_NOTIFICATION',
}

export type NotificationState = {
  error: string | null;
  success: string | null;
  warning: string | null;
  info: string | null;
  isOpen: boolean;
};

export type ClearNotification = {
  type: ActionTypes.CLEAR_NOTIFICATION;
  error: null;
};

export type SetNotification = {
  type: ActionTypes.SET_NOTIFICATION;
  error?: string;
  success?: string;
  warning?: string;
  info?: string;
};
