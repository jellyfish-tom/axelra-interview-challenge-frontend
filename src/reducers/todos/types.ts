import { Todo } from '../../model/Todo';

export enum ActionTypes {
  FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST',
  FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE',
  ADD_TODO_REQUEST = 'ADD_TODO_REQUEST',
  ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS',
  ADD_TODO_FAILURE = 'ADD_TODO_FAILURE',
}

export type AddTodoRequest = {
  type: ActionTypes.ADD_TODO_REQUEST;
};

export type AddTodoSuccess = {
  type: ActionTypes.ADD_TODO_SUCCESS;
};

export type AddTodoFailure = {
  type: ActionTypes.ADD_TODO_FAILURE;
  error: string;
};

export type FetchTodosRequest = {
  type: ActionTypes.FETCH_TODOS_REQUEST;
  loading: boolean;
};
export type FetchTodosSuccess = {
  type: ActionTypes.FETCH_TODOS_SUCCESS;
  todos: Todo[];
  loading: boolean;
};
export type FetchTodosFailure = {
  type: ActionTypes.FETCH_TODOS_FAILURE;
  loading: boolean;
  error: string;
};

export type TodoState = {
  todos: Todo[];
  loading: boolean;
  adding: boolean;
  error?: string;
};
