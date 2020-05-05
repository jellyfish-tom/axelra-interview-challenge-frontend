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
import {
  overwriteColumn,
  getTodoById,
  getColumnWithRemovedTodo,
  getColumnWithInsertedTodo,
  getColumnWithMovedTodo,
} from "../../../helpers/dragAndDrop";

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
      setColumns(
        overwriteColumn(
          [...columns],
          getColumnWithMovedTodo(
            sourceColumn,
            getTodoById(sourceColumn, draggableId),
            source.index,
            destination.index
          )
        )
      );
      return;
    } else {
      const todoToUpdate = getTodoById(sourceColumn, draggableId);

      todoToUpdate.completed = !todoToUpdate.completed;

      const columnsWithUpdatedSourceColumn = overwriteColumn(
        [...columns],
        getColumnWithRemovedTodo(sourceColumn, source.index)
      );

      const updatedColumns = overwriteColumn(
        columnsWithUpdatedSourceColumn,
        getColumnWithInsertedTodo(
          destinationColumn,
          todoToUpdate,
          destination.index
        )
      );

      setColumns(updatedColumns);
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
