import React from 'react';
import styled from 'styled-components';
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

export const TodosList = (props: { todos: Todo[]; header: string }) => {
  const { todos, header } = props;

  return (
    <TodoList>
      <ListHeader>{header}</ListHeader>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <TodosListItem
            index={index}
            key={todo._id}
            todo={todo}
          ></TodosListItem>
        ))
      ) : (
        <EmptyListImg src={empty} />
      )}
    </TodoList>
  );
};
