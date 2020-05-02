import React, { useEffect } from 'react';
import styled from 'styled-components';
import { __GRAY_SCALE } from '../../../layout/Theme';
import { fetchTodos, FetchTodos } from '../../../reducers/todos/actions';
import { RootState } from '../../../reducers/store';
import { TodoState } from '../../../reducers/todos/types';
import { connect, useSelector } from 'react-redux';
import { TodosList } from './TodosList';
import { TodosControls } from './TodosControls';
import { Spinner } from '../../../layout/UI/Spinners/Spinner';
import { __COLORS } from '../../../layout/Theme';

const Container = styled.div`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 1em;
  border-radius: 6px;
`;

const Board = (props: { fetchTodos: FetchTodos }) => {
  const { todos }: { todos: TodoState } = useSelector(
    (state: RootState) => state
  );
  const { fetchTodos } = props;

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <Container>
      <TodosControls></TodosControls>
      {!todos ? (
        <Spinner color={__COLORS.SECONDARY}></Spinner> // TODO: adjust positino of loader
      ) : (
        <TodosList todos={todos.todos}></TodosList>
      )}
    </Container>
  );
};

export default connect(null, {
  fetchTodos,
})(Board);
