import { Todo } from "./Todo";

export interface BoardColumn {
  id: number;
  header: string;
  todos: Todo[];
}
