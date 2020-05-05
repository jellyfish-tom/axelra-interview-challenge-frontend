import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  updateTodo,
  UpdateTodo,
  removeTodo,
  RemoveTodo,
} from "../../../reducers/todos/actions";
import { Todo } from "../../../model/Todo";
import { TodosListItem } from "./TodosListItem";
import empty from "../../../assets/empty.svg";
import { __GRAY_SCALE, __COLORS } from "../../../layout/Theme";
import { Droppable } from "react-beautiful-dnd";
import { lighten } from "polished";

const EmptyListImg = styled.img`
  margin: 3em auto 2em;
  width: fit-content;
  display: flex;
`;

const TodoList = styled.div`
  flex: 1;
  background: ${__COLORS.PRIMARY};
  border-radius: 0.3em;
  padding: 0.5em;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;

  &:not(:last-child) {
    margin-right: 1em;
  }
`;

const ListHeader = styled.h4`
  font-weight: bold;
  color: ${__GRAY_SCALE._600};
  margin: 0 !important;
`;

const ItemsContainer = styled.div`
  height: calc(100% - 1em);
  overflow-y: scroll;
  margin-right: -2em;
  padding-right: 1.1em;
  border-radius: 0.3em;
  margin-left: -1em;

  background-color: ${(props: any) =>
    props.isDraggingOver ? lighten(0.3, __COLORS.PRIMARY) : __COLORS.PRIMARY};
`;

const UnconnectedTodosList = (props: {
  todos: Todo[];
  header: string;
  removeTodo: RemoveTodo;
  updateTodo: UpdateTodo;
  id: string;
}) => {
  const { todos, header, removeTodo, updateTodo, id } = props;

  const onStateChange = (todo: Todo) => {
    updateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  const onRemove = (todo: Todo) => {
    removeTodo(todo);
  };

  return (
    <TodoList>
      <ListHeader>{header}</ListHeader>
      <Droppable droppableId={id}>
        {(provided: any, snapshot: any) => (
          <>
            <ItemsContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {todos.length > 0 ? (
                todos.map((todo, index) => (
                  <TodosListItem
                    index={index}
                    key={todo._id}
                    todo={todo}
                    onRemove={onRemove}
                  ></TodosListItem>
                ))
              ) : (
                <EmptyListImg src={empty} />
              )}
            </ItemsContainer>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </TodoList>
  );
};

export const TodosList = connect(null, {
  updateTodo,
  removeTodo,
})(UnconnectedTodosList);
