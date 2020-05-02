import {
  ActionTypes,
  AddedTodo,
  FetchedTodos,
  LoadingTodos,
  TodoState,
  AddingTodo,
  ErrorTodos,
} from './types';

const initialState: TodoState = {
  todos: [],
  loading: false,
  adding: false,
};

export const todoReducer = () => {
  return (
    state = initialState,
    action: FetchedTodos | LoadingTodos | AddingTodo | AddedTodo | ErrorTodos
  ) => {
    switch (action.type) {
      case ActionTypes.LOADING_TODOS:
        return { ...state, loading: action.loading };
      case ActionTypes.ADDING_TODO:
        return {
          ...state,
          adding: action.adding,
        };
      case ActionTypes.ADDED_TODO:
        return { ...state, adding: action.adding };
      case ActionTypes.FETCHED_TODOS:
        return {
          ...state,
          todos: action.todos,
        };
      case ActionTypes.ERROR_TODOS:
        return {
          ...state,
          error: action.error,
        };
      default:
        return state;
    }
  };
};
