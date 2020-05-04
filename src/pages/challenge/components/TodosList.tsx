import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  updateTodo,
  UpdateTodo,
  removeTodo,
  RemoveTodo,
} from '../../../reducers/todos/actions';
import { Image, AssetType } from '../../../layout/UI/Components';
import { Todo } from '../../../model/Todo';
import { TodosListItem } from './TodosListItem';

const EmptyListImg = styled(Image)`
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
        <EmptyListImg source={'empty.svg'} assetType={AssetType.IMAGE} />
      )}
    </TodoList>
  );
};

export const TodosList = connect(null, {
  updateTodo,
  removeTodo,
})(UnconnectedTodosList);
