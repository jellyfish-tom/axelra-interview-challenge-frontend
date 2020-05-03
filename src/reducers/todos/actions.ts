import { ThunkDispatch } from 'redux-thunk';
import {
  ActionTypes,
  FetchTodosFailure,
  FetchTodosSuccess,
  FetchTodosRequest,
  AddTodoRequest,
  AddTodoFailure,
  AddTodoSuccess,
} from './types';
import { api } from '../../helpers/api';
import { HTTP_OPTIONS, PROTOCOL_METHOD } from '../../helpers/FetchOptions';
import { getCurrentUser } from '../../helpers/user';
import { Todo, PostableTodo } from '../../model/Todo';

const getCurrentUserEmailAsURLParam = () => {
  const currentUser = getCurrentUser();

  return currentUser
    ? '?' +
        new URLSearchParams({
          uid: currentUser._id,
        })
    : '';
};

export const fetchTodos = (): any => {
  return async (
    dispatch: ThunkDispatch<
      {},
      {},
      FetchTodosSuccess | FetchTodosFailure | FetchTodosRequest
    >
  ) => {
    dispatch({
      type: ActionTypes.FETCH_TODOS_REQUEST,
      loading: true,
    });

    try {
      const response = await fetch(
        `${api.todos.list}${getCurrentUserEmailAsURLParam()}`,
        HTTP_OPTIONS(PROTOCOL_METHOD.GET)
      );

      if (response.ok) {
        const todos = await response.json();

        dispatch({
          type: ActionTypes.FETCH_TODOS_SUCCESS,
          todos,
          loading: false,
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_TODOS_FAILURE,
          error: response.statusText,
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_TODOS_FAILURE,
        error: "Sorry, can't talk to our servers right now.",
        loading: false,
      });
    }
  };
};

export const addTodo = (todo: PostableTodo): any => {
  return async (
    dispatch: ThunkDispatch<
      {},
      {},
      AddTodoRequest | AddTodoSuccess | AddTodoFailure
    >
  ) => {
    dispatch({
      type: ActionTypes.ADD_TODO_REQUEST,
    });

    fetch(`${api.todos.list}`, HTTP_OPTIONS(PROTOCOL_METHOD.POST, todo))
      .then((res: any) => res.json())
      .then((todo: Todo) => {
        dispatch({
          type: ActionTypes.ADD_TODO_SUCCESS,
        });

        dispatch(fetchTodos());
      })
      .catch((error: string) => {
        dispatch({
          type: ActionTypes.ADD_TODO_FAILURE,
          error,
        });
      });
  };
};

export type FetchTodos = typeof fetchTodos;
export type AddTodo = typeof addTodo;
