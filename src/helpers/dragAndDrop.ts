import { BoardColumn } from "../model/BoardColumn";
import { Todo } from "../model/Todo";

export const getColumnIndex = (columns: BoardColumn[], column: BoardColumn) =>
  columns.findIndex((_column: BoardColumn) => _column.id === column.id);

export const getTodoById = (column: BoardColumn, id: string) =>
  column.todos.find((todo: Todo) => todo._id === id) as Todo;

export const overwriteColumn = (
  columns: BoardColumn[],
  column: BoardColumn
) => {
  const columnIndex = getColumnIndex(columns, column);

  columns.splice(columnIndex, 1);
  columns.splice(columnIndex, 0, column);

  return columns;
};

export const getColumnWithRemovedTodo = (
  column: BoardColumn,
  todoIndex: number
) => {
  const newSourceColumnTodos = [...column.todos];

  newSourceColumnTodos.splice(todoIndex, 1);

  return {
    ...column,
    todos: newSourceColumnTodos,
  };
};

export const getColumnWithMovedTodo = (
  column: BoardColumn,
  todo: Todo,
  sourceIndex: number,
  destinationIndex: number
) => {
  const newTodos = [...column.todos];

  newTodos.splice(sourceIndex, 1);
  newTodos.splice(destinationIndex, 0, todo);

  return {
    ...column,
    todos: newTodos,
  };
};

export const getColumnWithInsertedTodo = (
  column: BoardColumn,
  todo: Todo,
  index: number
) => {
  const columnNewTodos = [...column.todos];
  columnNewTodos.splice(index, 0, todo);

  return {
    ...column,
    todos: columnNewTodos,
  };
};
