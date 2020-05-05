import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  fetchTodos,
  FetchTodos,
  updateTodo,
  UpdateTodo,
} from "../../../reducers/todos/actions";
import { RootState } from "../../../reducers/store";
import { TodoState } from "../../../reducers/todos/types";
import { AuthState } from "../../../reducers/auth/types";
import { connect, useSelector } from "react-redux";
import { TodosList } from "./TodosList";
import { TodosControls } from "./TodosControls";
import { Spinner } from "../../../layout/UI/Spinners/Spinner";
import { __COLORS } from "../../../layout/Theme";
import { Todo, POSSIBLE_TODO_STATES } from "../../../model/Todo";
import { DragDropContext } from "react-beautiful-dnd";

export interface Column {
  id: number;
  header: string;
  todos: Todo[];
}

const Container = styled.div`
  padding: 1em;
  border-radius: 0.3em;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3em);
  overflow: hidden;
  max-width: 100vw;
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: calc(100% - 3em);
  align-items: center;
`;

const Board = (props: { fetchTodos: FetchTodos; updateTodo: UpdateTodo }) => {
  const { todos, auth }: { todos: TodoState; auth: AuthState } = useSelector(
    (state: RootState) => state
  );
  const { fetchTodos, updateTodo } = props;

  const [columns, setColumns] = useState();

  useEffect(() => {
    fetchTodos(auth.user._id);
  }, [fetchTodos, auth.user._id]);

  useEffect(() => {
    console.log("EFFECT!!!");
    setColumns(
      POSSIBLE_TODO_STATES.map((state, index) => ({
        id: index,
        header: state.label,
        todos: filterTodosByState(todos.todos, !!state.value),
      }))
    );
  }, [todos]);

  const filterTodosByState = (todos: Todo[], completed: boolean) =>
    todos.filter((todo) => todo.completed === completed);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    const droppedInSourcePlace =
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index);

    if (droppedInSourcePlace) {
      return;
    }

    // copy todos so data is not mutated
    const start: Column = columns[source.droppableId];
    const finish: Column = columns[destination.droppableId];
    const droppedInSameColumn = start.id === finish.id;

    if (droppedInSameColumn) {
      const newTodos = [...start.todos];

      // insert todo in new place in same column
      newTodos.splice(source.index, 1);
      newTodos.splice(
        destination.index,
        0,
        start.todos.find((todo: Todo) => todo._id === draggableId) as Todo
      );

      // create new column
      const newColumn = {
        ...start,
        todos: newTodos,
      };

      // clone current columns so data is not mutated
      const newColumns = [...columns];
      // find index of column to be removed
      const columnToRemoveIndex = columns.findIndex(
        (_column: Column) => _column.id === start.id
      );
      // insert column in proper place
      newColumns.splice(columnToRemoveIndex, 1);
      newColumns.splice(columnToRemoveIndex, 0, newColumn);

      setColumns(newColumns);
      return;
    } else {
      //moving from one list to another
      const newStartColumnTodos = [...start.todos];
      const todoToUpdate = start.todos.find(
        (todo: Todo) => todo._id === draggableId
      ) as Todo;

      todoToUpdate.completed = !todoToUpdate.completed;

      // insert todo in new place in same column
      newStartColumnTodos.splice(source.index, 1);

      const newStartColumn = {
        ...start,
        todos: newStartColumnTodos,
      };

      const newFinishColumnTodos = [...finish.todos];
      newFinishColumnTodos.splice(destination.index, 0, todoToUpdate);

      const newFinishColumn = {
        ...start,
        todos: newFinishColumnTodos,
      };

      // insert column in proper place
      const newColumns = [...columns];
      // find index of column to be removed
      const startColumnToIndex = columns.findIndex(
        (_column: Column) => _column.id === start.id
      );
      // insert column in proper place
      newColumns.splice(startColumnToIndex, 1);
      newColumns.splice(startColumnToIndex, 0, newStartColumn);

      const finishColumnIndex = columns.findIndex(
        (_column: Column) => _column.id === finish.id
      );
      // insert column in proper place
      newColumns.splice(finishColumnIndex, 1);
      newColumns.splice(finishColumnIndex, 0, newFinishColumn);

      setColumns(newColumns);
      updateTodo(todoToUpdate);

      return;
    }
  };

  return (
    <Container>
      <TodosControls></TodosControls>
      <DragDropContext key={"context"} onDragEnd={onDragEnd}>
        <ListsContainer>
          {todos.loading && todos.todos.length === 0 ? (
            <Spinner color={__COLORS.SECONDARY}></Spinner>
          ) : (
            <>
              {columns.map((column: Column, index: number) => (
                <TodosList
                  key={index}
                  header={column.header}
                  todos={column.todos}
                  id={String(index)}
                ></TodosList>
              ))}
            </>
          )}
        </ListsContainer>
      </DragDropContext>
    </Container>
  );
};

export default connect(null, {
  fetchTodos,
  updateTodo,
})(Board);
