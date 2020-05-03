export enum ActionTypes {
  HIDE_ERROR = 'HIDE_ERROR',
}

export type NotificationState = {
  error: string | null;
  success: string | null;
  warning: string | null;
  info: string | null;
  isOpen: boolean;
};

export type ClearNotification = {
  type: ActionTypes.HIDE_ERROR;
  error: null;
};
