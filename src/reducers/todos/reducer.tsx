import {
  ActionTypes,
  AddedTodo,
  FetchedTodos,
  LoadingTodos,
  TodoState,
  AddingTodo,
} from './types';

const initialState: TodoState = {
  todos: [],
  loading: false,
  adding: false,
};

const todoReducer = () => {
  return (
    state = initialState,
    action: FetchedTodos | LoadingTodos | AddingTodo | AddedTodo
  ) => {
    switch (action.type) {
      case ActionTypes.LOADING_TODOS:
        return { ...state, loading: action.loading };
      case ActionTypes.ADDING_TODO:
        return {
          ...state,
          adding: action.adding,
          todos: [...state.todos, action.todo],
        };
      case ActionTypes.ADDED_TODO:
        return { ...state, adding: action.adding };
      case ActionTypes.FETCHED_TODOS:
        return {
          ...state,
          todos: action.todos,
          loading: action.loading,
        };
      default:
        return state;
    }
  };
};

export default todoReducer;
