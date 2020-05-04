import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  updateTodo,
  UpdateTodo,
  removeTodo,
  RemoveTodo,
} from '../../../reducers/todos/actions';
import { Todo } from '../../../model/Todo';
import { TodosListItem } from './TodosListItem';
import empty from '../../../assets/empty.svg';
import { __GRAY_SCALE, __COLORS } from '../../../layout/Theme';

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
`;

const UnconnectedTodosList = (props: {
  todos: Todo[];
  header: string;
  removeTodo: RemoveTodo;
  updateTodo: UpdateTodo;
}) => {
  const { todos, header, removeTodo, updateTodo } = props;

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
      <ItemsContainer>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <TodosListItem
              key={todo._id}
              todo={todo}
              onStateChange={onStateChange}
              onRemove={onRemove}
            ></TodosListItem>
          ))
        ) : (
          <EmptyListImg src={empty} />
        )}
      </ItemsContainer>
    </TodoList>
  );
};

export const TodosList = connect(null, {
  updateTodo,
  removeTodo,
})(UnconnectedTodosList);
