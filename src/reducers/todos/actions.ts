import { ThunkDispatch } from 'redux-thunk';
import {
  ActionTypes,
  ErrorTodos,
  FetchedTodos,
  LoadingTodos,
  AddingTodo,
} from './types';
import { api } from '../../helpers/api';
import { HTTP_OPTIONS, PROTOCOL_METHOD } from '../../helpers/FetchOptions';
import { Todo } from '../../model/Todo';

export const fetchTodos = (): any => {
  return async (
    dispatch: ThunkDispatch<{}, {}, FetchedTodos | ErrorTodos | LoadingTodos>
  ) => {
    dispatch({
      type: ActionTypes.LOADING_TODOS,
      loading: true,
    });

    const localStorageUser = localStorage.getItem('user');
    const currentUser = localStorageUser && JSON.parse(localStorageUser);
    const urlParams = currentUser
      ? '?' +
        new URLSearchParams({
          email: currentUser.email,
        })
      : '';

    fetch(`${api.todos.list}${urlParams}`, HTTP_OPTIONS(PROTOCOL_METHOD.GET))
      .then((res) => res.json())
      .then((todos: Todo[]) => {
        console.log('todos');
        console.log(todos);

        dispatch({
          type: ActionTypes.FETCHED_TODOS,
          loading: false,
          todos,
        });
      })
      .catch((error: string) => {
        dispatch({
          type: ActionTypes.ERROR_TODOS,
          error,
          loading: false,
        });
      });
  };
};

//@ts-ignore  TODO - remove
export const addTodo = (todo: Todo): any => {
  return async (dispatch: ThunkDispatch<{}, {}, ErrorTodos | AddingTodo>) => {
    dispatch({
      type: ActionTypes.ADDING_TODO,
      adding: true,
    });

    fetch(api.todos.list, HTTP_OPTIONS(PROTOCOL_METHOD.POST)) // send todo
      .then((res) => res.json())
      .then((_: Todo) => {
        console.log('todo added!');

        dispatch({
          type: ActionTypes.ADDING_TODO,
          adding: false,
        });

        fetchTodos();
      })
      .catch((error: string) => {
        console.log('todos fetch error');
        console.log(error);

        dispatch({
          type: ActionTypes.ERROR_TODOS,
          error,
          loading: false,
        });
      });
  };
};

export type FetchTodos = typeof fetchTodos;
export type AddTodo = typeof addTodo;
