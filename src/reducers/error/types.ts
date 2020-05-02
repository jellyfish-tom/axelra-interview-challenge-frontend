export enum ActionTypes {
  SET_ERROR = 'SET_ERROR',
  HIDE_ERROR = 'HIDE_ERROR',
}

export enum ErrorMessageType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  NEUTRAL = 'NEUTRAL',
}

export type ErrorState = {
  error: string | null;
  errorType: ErrorMessageType;
  isOpen: boolean;
};

export type SetError = {
  type: ActionTypes.SET_ERROR;
  error: string;
};

export type HideError = {
  type: ActionTypes.HIDE_ERROR;
  error: null;
};
