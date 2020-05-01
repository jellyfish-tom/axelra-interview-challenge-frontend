import { ThunkDispatch } from 'redux-thunk';
import {
  ActionTypes,
  FetchedTodos,
  LoadingTodos,
  AddingTodo,
  AddedTodo,
} from './types';

import { Todo } from '../../model/Todo';

export const fetchTodos = (): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedTodos | LoadingTodos>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_TODOS,
      loading: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    dispatch({
      type: ActionTypes.FETCHED_TODOS,
      loading: false,
      todos: [],
    });
  };
};

export const addTodo = (todo: Todo): any => {
  return async (dispatch: ThunkDispatch<{}, {}, AddingTodo | AddedTodo>) => {
    dispatch({
      type: ActionTypes.ADDING_TODO,
      adding: true,
      todo,
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: ActionTypes.ADDED_TODO,
          adding: false,
        });

        resolve();
      }, 2000);
    });
  };
};

export type FetchTodos = typeof fetchTodos;
export type AddTodo = typeof addTodo;
