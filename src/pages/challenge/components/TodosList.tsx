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

const EmptyListImg = styled.img`
  margin: 40px auto 30px;
  width: fit-content;
  display: flex;
`;

const TodoList = styled.div`
  flex: 1;
`;

const ListHeader = styled.h1``;

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
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <TodosListItem
            index={index}
            key={todo._id}
            todo={todo}
            onStateChange={onStateChange}
            onRemove={onRemove}
          ></TodosListItem>
        ))
      ) : (
        <EmptyListImg src={empty} />
      )}
    </TodoList>
  );
};

export const TodosList = connect(null, {
  updateTodo,
  removeTodo,
})(UnconnectedTodosList);
