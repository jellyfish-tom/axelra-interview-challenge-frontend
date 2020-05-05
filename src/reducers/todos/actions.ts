import { ThunkDispatch } from "redux-thunk";
import {
  ActionTypes,
  FetchTodosFailure,
  FetchTodosSuccess,
  FetchTodosRequest,
  AddTodoRequest,
  AddTodoFailure,
  AddTodoSuccess,
  RemoveTodoRequest,
  RemoveTodoSuccess,
  RemoveTodoFailure,
  UpdateTodoRequest,
  UpdateTodoSuccess,
  UpdateTodoFailure,
} from "./types";
import { api } from "../../helpers/api";
import { HTTP_OPTIONS, PROTOCOL_METHOD } from "../../helpers/FetchOptions";
import { PostableTodo, Todo } from "../../model/Todo";

const getUidQueryParam = (uid: string) => {
  return `?${new URLSearchParams({
    //@ts-ignore
    uid,
  })}`;
};

export const fetchTodos = (uid: string): any => {
  return async (
    dispatch: ThunkDispatch<
      {},
      {},
      FetchTodosSuccess | FetchTodosFailure | FetchTodosRequest
    >
  ) => {
    // dispatch({
    //   type: ActionTypes.FETCH_TODOS_REQUEST,
    // });

    try {
      const response = await fetch(
        `${api.todos.list}${getUidQueryParam(uid)}`,
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
          error: (await response.json()).message,
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_TODOS_FAILURE,
        error: "Ouuch! There has been some error, sorry!",
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
          success: "Message added successfully",
        });
        dispatch(fetchTodos(todo.uid));
      } else {
        dispatch({
          type: ActionTypes.ADD_TODO_FAILURE,
          error: (await response.json()).message,
        });
      }
    } catch (e) {
      dispatch({
        type: ActionTypes.ADD_TODO_FAILURE,
        error: "Ouuch! There has been some error, sorry!",
      });
    }
  };
};

export const updateTodo = (todo: Todo): any => {
  return async (
    dispatch: ThunkDispatch<
      {},
      {},
      UpdateTodoRequest | UpdateTodoSuccess | UpdateTodoFailure
    >
  ) => {
    // dispatch({
    //   type: ActionTypes.UPDATE_TODO_REQUEST,
    // });

    try {
      const response = await fetch(
        `${api.todos.list}/${todo._id}`,
        HTTP_OPTIONS(PROTOCOL_METHOD.PUT, todo)
      );

      if (response.ok) {
        dispatch({
          type: ActionTypes.UPDATE_TODO_SUCCESS,
          success: "Message updated successfully",
        });

        dispatch(fetchTodos(todo.uid));
      } else {
        dispatch({
          type: ActionTypes.UPDATE_TODO_FAILURE,
          error: (await response.json()).message,
        });
      }
    } catch (e) {
      dispatch({
        type: ActionTypes.UPDATE_TODO_FAILURE,
        error: "Ouuch! There has been some error, sorry!",
      });
    }
  };
};

export const removeTodo = (todo: Todo): any => {
  return async (
    dispatch: ThunkDispatch<
      {},
      {},
      RemoveTodoRequest | RemoveTodoSuccess | RemoveTodoFailure
    >
  ) => {
    dispatch({
      type: ActionTypes.REMOVE_TODO_REQUEST,
    });

    try {
      const response = await fetch(
        `${api.todos.list}/${todo._id}`,
        HTTP_OPTIONS(PROTOCOL_METHOD.DELETE)
      );

      if (response.ok) {
        dispatch({
          type: ActionTypes.REMOVE_TODO_SUCCESS,
          success: "Message removed successfully",
        });

        dispatch(fetchTodos(todo.uid));
      } else {
        dispatch({
          type: ActionTypes.REMOVE_TODO_FAILURE,
          error: (await response.json()).message,
        });
      }
    } catch (e) {
      dispatch({
        type: ActionTypes.REMOVE_TODO_FAILURE,
        error: "Ouuch! There has been some error, sorry!",
      });
    }
  };
};

export type FetchTodos = typeof fetchTodos;
export type AddTodo = typeof addTodo;
export type UpdateTodo = typeof updateTodo;
export type RemoveTodo = typeof removeTodo;
