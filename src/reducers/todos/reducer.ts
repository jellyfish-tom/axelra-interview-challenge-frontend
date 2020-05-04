import {
  ActionTypes,
  AddTodoRequest,
  AddTodoSuccess,
  AddTodoFailure,
  UpdateTodoRequest,
  UpdateTodoSuccess,
  UpdateTodoFailure,
  RemoveTodoRequest,
  RemoveTodoSuccess,
  RemoveTodoFailure,
  FetchTodosRequest,
  FetchTodosSuccess,
  FetchTodosFailure,
  TodoState,
} from "./types";

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
      | UpdateTodoRequest
      | UpdateTodoSuccess
      | UpdateTodoFailure
      | RemoveTodoRequest
      | RemoveTodoSuccess
      | RemoveTodoFailure
  ) => {
    switch (action.type) {
      /********FETCH TODOS********/

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

      /********ADD TODO********/

      case ActionTypes.ADD_TODO_REQUEST:
        return {
          ...state,
          adding: true,
        };
      case ActionTypes.ADD_TODO_SUCCESS:
        return { ...state, adding: false };
      case ActionTypes.ADD_TODO_FAILURE:
        return { ...state, adding: false, error: action.error };

      /********REMOVE TODO********/

      case ActionTypes.REMOVE_TODO_REQUEST:
        return {
          ...state,
        };
      case ActionTypes.REMOVE_TODO_SUCCESS:
        return { ...state, loading: false, success: action.success };
      case ActionTypes.REMOVE_TODO_FAILURE:
        return { ...state, loading: false, error: action.error };

      /********UPDATE TODO********/

      case ActionTypes.UPDATE_TODO_REQUEST:
        return {
          ...state,
        };
      case ActionTypes.UPDATE_TODO_SUCCESS:
        return { ...state, loading: false };
      case ActionTypes.UPDATE_TODO_FAILURE:
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };
};
