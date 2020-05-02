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
    dispatch: ThunkDispatch<{}, {}, FetchedTodos | ErrorTodos | LoadingTodos>
  ) => {
    console.log('fetching todos...');
    dispatch({
      type: ActionTypes.LOADING_TODOS,
      loading: true,
    });

    dispatch({
      type: ActionTypes.ERROR_TODOS,
      error: 'Lets test it!',
      loading: false,
    });

    try {
      const response = await fetch(
        `${api.todos.list}${getCurrentUserEmailAsURLParam()}`,
        HTTP_OPTIONS(PROTOCOL_METHOD.GET)
      );

      if (response.ok) {
        const todos = await response.json();

        dispatch({
          type: ActionTypes.FETCHED_TODOS,
          todos,
          loading: false,
        });
      } else {
        dispatch({
          type: ActionTypes.ERROR_TODOS,
          error: response.statusText,
          loading: false,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.ERROR_TODOS,
        error: "Sorry, can't talk to our servers right now.",
        loading: false,
      });
    }
  };
};

export const addTodo = (todo: PostableTodo): any => {
  return async (dispatch: ThunkDispatch<{}, {}, ErrorTodos | AddingTodo>) => {
    dispatch({
      type: ActionTypes.ADDING_TODO,
      adding: true,
    });

    fetch(`${api.todos.list}`, HTTP_OPTIONS(PROTOCOL_METHOD.POST, todo))
      .then((res: any) => res.json())
      .then((todo: Todo) => {
        dispatch({
          type: ActionTypes.ADDING_TODO,
          adding: false,
        });

        dispatch(fetchTodos());
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

export type FetchTodos = typeof fetchTodos;
export type AddTodo = typeof addTodo;
