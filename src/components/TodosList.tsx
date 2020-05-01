import React from 'react';
import styled from 'styled-components';
import { __GRAY_SCALE } from '../layout/Theme';
import { Todo } from '../model/Todo';
import { TodosListItem } from './TodosListItem';

const Container = styled.div`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 1em;
  border-radius: 6px;
`;

export const TodosList = (props: { todos: Todo[] }) => {
  const { todos } = props;

  return (
    <Container>
      {todos.length > 0 ? (
        todos.map((todo) => <TodosListItem todo={todo}></TodosListItem>)
      ) : (
        <p>No things to do boss</p>
      )}
    </Container>
  );
};
