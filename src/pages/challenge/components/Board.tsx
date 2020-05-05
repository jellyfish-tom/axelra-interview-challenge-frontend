import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import {
  fetchTodos,
  FetchTodos,
  updateTodo,
  UpdateTodo,
} from "../../../reducers/todos/actions";
import { RootState } from "../../../reducers/store";
import { TodoState } from "../../../reducers/todos/types";
import { AuthState } from "../../../reducers/auth/types";
import { TodosList } from "./TodosList";
import { TodosControls } from "./TodosControls";
import { Spinner } from "../../../layout/UI/Spinners/Spinner";
import { __COLORS } from "../../../layout/Theme";
import { BoardColumn } from "../../../model/BoardColumn";
import { Todo } from "../../../model/Todo";
import { POSSIBLE_TODO_DROPDOWN_STATES } from "../../../model/Dropdown";
import { ErrorBoundary } from "../../../components/ErrorBoundary";

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
    setColumns(
      POSSIBLE_TODO_DROPDOWN_STATES.map((state, index) => ({
        id: index,
        header: state.label,
        todos: filterTodosByState(todos.todos, !!state.value),
      }))
    );
  }, [todos.todos]);

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

    const sourceColumn: BoardColumn = columns[source.droppableId];
    const destinationColumn: BoardColumn = columns[destination.droppableId];

    const droppedInSameColumn = sourceColumn.id === destinationColumn.id;

    if (droppedInSameColumn) {
      const newTodos = [...sourceColumn.todos];

      // insert todo in new place in same column
      newTodos.splice(source.index, 1);
      newTodos.splice(
        destination.index,
        0,
        sourceColumn.todos.find(
          (todo: Todo) => todo._id === draggableId
        ) as Todo
      );

      // create new column
      const newColumn = {
        ...sourceColumn,
        todos: newTodos,
      };

      // clone current columns so data is not mutated
      const newColumns = [...columns];
      // find index of column to be removed
      const columnToRemoveIndex = columns.findIndex(
        (_column: BoardColumn) => _column.id === sourceColumn.id
      );
      // insert column in proper place
      newColumns.splice(columnToRemoveIndex, 1);
      newColumns.splice(columnToRemoveIndex, 0, newColumn);

      setColumns(newColumns);
      return;
    } else {
      //moving from one list to another
      const newStartColumnTodos = [...sourceColumn.todos];
      const todoToUpdate = sourceColumn.todos.find(
        (todo: Todo) => todo._id === draggableId
      ) as Todo;

      todoToUpdate.completed = !todoToUpdate.completed;

      // insert todo in new place in same column
      newStartColumnTodos.splice(source.index, 1);

      const newStartColumn = {
        ...sourceColumn,
        todos: newStartColumnTodos,
      };

      const newFinishColumnTodos = [...destinationColumn.todos];
      newFinishColumnTodos.splice(destination.index, 0, todoToUpdate);

      const newDestinationColumn = {
        ...destinationColumn,
        todos: newFinishColumnTodos,
      };

      // insert column in proper place
      const newColumns = [...columns];
      // find index of column to be removed
      const startColumnToIndex = columns.findIndex(
        (_column: BoardColumn) => _column.id === sourceColumn.id
      );
      // insert column in proper place
      newColumns.splice(startColumnToIndex, 1);
      newColumns.splice(startColumnToIndex, 0, newStartColumn);

      const finishColumnIndex = columns.findIndex(
        (_column: BoardColumn) => _column.id === destinationColumn.id
      );
      // insert column in proper place
      newColumns.splice(finishColumnIndex, 1);
      newColumns.splice(finishColumnIndex, 0, newDestinationColumn);

      setColumns(newColumns);
      updateTodo(todoToUpdate);

      return;
    }
  };

  return (
    <Container>
      <ErrorBoundary>
        <TodosControls></TodosControls>
      </ErrorBoundary>
      <DragDropContext key={"context"} onDragEnd={onDragEnd}>
        <ListsContainer>
          {todos.loading && todos.todos.length === 0 ? (
            <Spinner color={__COLORS.SECONDARY}></Spinner>
          ) : (
            <>
              {columns.map((column: BoardColumn, index: number) => (
                <ErrorBoundary key={index}>
                  <TodosList
                    header={column.header}
                    todos={column.todos}
                    id={String(index)}
                  ></TodosList>
                </ErrorBoundary>
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
