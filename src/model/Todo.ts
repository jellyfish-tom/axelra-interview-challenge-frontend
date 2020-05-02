// Example of a simple type

export interface PostableTodo {
  uid: string;
  title: string;
  completed: boolean;
}

export interface Todo extends PostableTodo {
  _id: string;
}
