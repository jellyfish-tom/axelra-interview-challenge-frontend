import { Todo } from '../../model/Todo';

export enum ActionTypes {
  LOADING_TODOS = 'LOADING_TODOS',
  ADDING_TODO = 'ADDING_TODO',
  FETCHED_TODOS = 'FETCHED_TODOS',
  ERROR_TODOS = 'ERROR_TODOS',
  ADDED_TODO = 'ADDED_TODO',
}

export type AddingTodo = {
  type: ActionTypes.ADDING_TODO;
  adding: boolean;
};

export type AddedTodo = {
  type: ActionTypes.ADDED_TODO;
  adding: boolean;
};

export type LoadingTodos = {
  type: ActionTypes.LOADING_TODOS;
  loading: boolean;
};
export type FetchedTodos = {
  todos: Todo[];
  type: ActionTypes.FETCHED_TODOS;
  loading: boolean;
};
export type ErrorTodos = {
  type: ActionTypes.ERROR_TODOS;
  error: string;
  loading: boolean;
};

export type TodoState = {
  todos: Todo[];
  loading: boolean;
  adding: boolean;
  error?: string;
};
