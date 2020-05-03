import {
  ActionTypes,
  AddTodoRequest,
  AddTodoSuccess,
  AddTodoFailure,
  FetchTodosRequest,
  FetchTodosSuccess,
  FetchTodosFailure,
  TodoState,
} from './types';

const initialState: TodoState = {
  todos: [],
  loading: true,
  adding: false,
};

export const todoReducer = () => {
  return (
    state = initialState,
    action:
      | FetchTodosRequest
      | FetchTodosSuccess
      | FetchTodosFailure
      | AddTodoRequest
      | AddTodoSuccess
      | AddTodoFailure
  ) => {
    switch (action.type) {
      case ActionTypes.FETCH_TODOS_REQUEST:
        return { ...state, loading: true };
      case ActionTypes.FETCH_TODOS_SUCCESS:
        return {
          ...state,
          todos: action.todos,
          loading: false,
        };
      case ActionTypes.FETCH_TODOS_FAILURE:
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      case ActionTypes.ADD_TODO_REQUEST:
        return {
          ...state,
          adding: true,
        };
      case ActionTypes.ADD_TODO_SUCCESS:
        return { ...state, adding: false };
      case ActionTypes.ADD_TODO_FAILURE:
        return { ...state, adding: false, error: action.error };
      default:
        return state;
    }
  };
};
