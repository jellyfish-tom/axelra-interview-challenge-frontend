import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { TodoState } from "./todos/types";
import { todoReducer } from "./todos/reducer";

import { NotificationState } from "./notification/types";
import { notificationReducer } from "./notification/reducer";

import { AuthState } from "./auth/types";
import { authReducer } from "./auth/reducer";

export type RootState = {
  todos: TodoState;
  notification: NotificationState;
  auth: AuthState;
};

const rootReducer = combineReducers({
  todos: todoReducer(),
  notification: notificationReducer(),
  auth: authReducer(),
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store;
