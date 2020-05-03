import React, { useEffect } from 'react';
import styled from 'styled-components';
import { __GRAY_SCALE } from '../../../layout/Theme';
import { fetchTodos, FetchTodos } from '../../../reducers/todos/actions';
import { RootState } from '../../../reducers/store';
import { TodoState } from '../../../reducers/todos/types';
import { AuthState } from '../../../reducers/auth/types';
import { connect, useSelector } from 'react-redux';
import { TodosList } from './TodosList';
import { TodosControls } from './TodosControls';
import { Spinner } from '../../../layout/UI/Spinners/Spinner';
import { __COLORS } from '../../../layout/Theme';
import { Todo } from '../../../model/Todo';

const Container = styled.div`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 1em;
  border-radius: 6px;
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Board = (props: { fetchTodos: FetchTodos }) => {
  const { todos, auth }: { todos: TodoState; auth: AuthState } = useSelector(
    (state: RootState) => state
  );
  const { fetchTodos } = props;

  useEffect(() => {
    fetchTodos(auth.user._id);
  }, [fetchTodos, auth.user._id]);

  const filterTodosByState = (todos: Todo[], completed: boolean) =>
    todos.filter((todo) => todo.completed === completed);

  return (
    <Container>
      <TodosControls></TodosControls>
      <ListsContainer>
        {todos.loading ? (
          <Spinner color={__COLORS.SECONDARY}></Spinner>
        ) : (
          <>
            <TodosList
              header="Tasks in progress"
              todos={filterTodosByState(todos.todos, false)}
            ></TodosList>
            <TodosList
              header="Completed tasks"
              todos={filterTodosByState(todos.todos, true)}
            ></TodosList>
          </>
        )}
      </ListsContainer>
    </Container>
  );
};

export default connect(null, {
  fetchTodos,
})(Board);
