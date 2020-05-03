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
import { Todo, PostableTodo } from '../../model/Todo';

const getUidQueryString = (uid: string) => {
  return `${uid ? `?${uid}` : ''}`;
};

export const fetchTodos = (uid: string): any => {
  return async (
    dispatch: ThunkDispatch<
      {},
      {},
      FetchTodosSuccess | FetchTodosFailure | FetchTodosRequest
    >
  ) => {
    dispatch({
      type: ActionTypes.FETCH_TODOS_REQUEST,
    });

    try {
      const response = await fetch(
        `${api.todos.list}${getUidQueryString(uid)}`,
        HTTP_OPTIONS(PROTOCOL_METHOD.GET)
      );

      if (response.ok) {
        const todos = await response.json();

        dispatch({
          type: ActionTypes.FETCH_TODOS_SUCCESS,
          todos,
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_TODOS_FAILURE,
          error: response.statusText,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_TODOS_FAILURE,
        error: "Sorry, can't talk to our servers right now.",
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

    try {
      const response = await fetch(
        `${api.todos.list}`,
        HTTP_OPTIONS(PROTOCOL_METHOD.POST, todo)
      );

      if (response.ok) {
        dispatch({
          type: ActionTypes.ADD_TODO_SUCCESS,
        });
        dispatch(fetchTodos(todo.uid));
      } else {
        dispatch({
          type: ActionTypes.ADD_TODO_FAILURE,
          error: response.statusText,
        });
      }
    } catch (e) {
      dispatch({
        type: ActionTypes.ADD_TODO_FAILURE,
        error: "Sorry, can't talk to our servers right now.",
      });
    }
  };
};

export type FetchTodos = typeof fetchTodos;
export type AddTodo = typeof addTodo;
