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

    fetch(
      `${api.todos.list}${getCurrentUserEmailAsURLParam()}`,
      HTTP_OPTIONS(PROTOCOL_METHOD.GET)
    )
      .then((res: any) => res.json())
      .then((todos: Todo[]) => {
        console.log('fetched todos:');
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
