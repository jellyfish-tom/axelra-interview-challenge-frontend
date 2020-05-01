import React from 'react';
import styled from 'styled-components';
import { __GRAY_SCALE } from '../layout/Theme';
import { Todo } from '../model/Todo';

const Container = styled.div`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 1em;
  border-radius: 6px;
`;

export const TodosListItem = (props: { todo: Todo }) => {
  const { todo } = props;

  return <Container>{todo.title}</Container>;
};
