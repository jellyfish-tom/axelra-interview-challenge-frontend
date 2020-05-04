import { Todo } from '../../model/Todo';

export enum ActionTypes {
  FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE',

  ADD_TODO_REQUEST = 'ADD_TODO_REQUEST',
  ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS',
  ADD_TODO_FAILURE = 'ADD_TODO_FAILURE',

  UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST',
  UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE',

  REMOVE_TODO_REQUEST = 'REMOVE_TODO_REQUEST',
  REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS',
  REMOVE_TODO_FAILURE = 'REMOVE_TODO_FAILURE',
}

/********ADD TODO********/

export type AddTodoRequest = {
  type: ActionTypes.ADD_TODO_REQUEST;
};

export type AddTodoSuccess = {
  type: ActionTypes.ADD_TODO_SUCCESS;
  success: string;
};

export type AddTodoFailure = {
  type: ActionTypes.ADD_TODO_FAILURE;
  error: string;
};

/********REMOVE TODO********/

export type RemoveTodoRequest = {
  type: ActionTypes.REMOVE_TODO_REQUEST;
};

export type RemoveTodoSuccess = {
  type: ActionTypes.REMOVE_TODO_SUCCESS;
  success: string;
};

export type RemoveTodoFailure = {
  type: ActionTypes.REMOVE_TODO_FAILURE;
  error: string;
};

/********UPDATE TODO********/

export type UpdateTodoRequest = {
  type: ActionTypes.UPDATE_TODO_REQUEST;
};

export type UpdateTodoSuccess = {
  type: ActionTypes.UPDATE_TODO_SUCCESS;
  success: string;
};

export type UpdateTodoFailure = {
  type: ActionTypes.UPDATE_TODO_FAILURE;
  error: string;
};

export type FetchTodosRequest = {
  type: ActionTypes.FETCH_TODOS_REQUEST;
};
export type FetchTodosSuccess = {
  type: ActionTypes.FETCH_TODOS_SUCCESS;
  todos: Todo[];
};
export type FetchTodosFailure = {
  type: ActionTypes.FETCH_TODOS_FAILURE;
  error: string;
};

export type TodoState = {
  todos: Todo[];
  loading: boolean;
  adding: boolean;
  error?: string;
};
