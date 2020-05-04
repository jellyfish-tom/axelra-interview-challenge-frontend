// Example of a simple type

export interface PostableTodo {
  uid: string;
  title: string;
  completed: boolean;
}

export interface Todo extends PostableTodo {
  _id: string;
}

export const POSSIBLE_TODO_STATES = [
  { value: 0, label: 'To Do' },
  { value: 1, label: 'Done' },
];
