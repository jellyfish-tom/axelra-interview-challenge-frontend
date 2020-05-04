import React, { useEffect } from 'react';
import styled from 'styled-components';
import { fetchTodos, FetchTodos } from '../../../reducers/todos/actions';
import { RootState } from '../../../reducers/store';
import { TodoState } from '../../../reducers/todos/types';
import { AuthState } from '../../../reducers/auth/types';
import { connect, useSelector } from 'react-redux';
import { TodosList } from './TodosList';
import { TodosControls } from './TodosControls';
import { Spinner } from '../../../layout/UI/Spinners/Spinner';
import { __COLORS } from '../../../layout/Theme';
import { Todo, POSSIBLE_TODO_STATES } from '../../../model/Todo';

const Container = styled.div`
  padding: 1em;
  border-radius: 0.3em;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 3em);
  overflow: hidden;
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: calc(100% - 3em);
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
      {!auth.loading ? (
        <Spinner color={__COLORS.SECONDARY}></Spinner>
      ) : (
        <>
          <TodosControls></TodosControls>
          <ListsContainer>
            {todos.loading && todos.todos.length === 0 ? (
              <Spinner color={__COLORS.SECONDARY}></Spinner>
            ) : (
              <>
                {POSSIBLE_TODO_STATES.map((state, index) => (
                  <TodosList
                    key={index}
                    header={state.label}
                    todos={filterTodosByState(todos.todos, !!state.value)}
                  ></TodosList>
                ))}
              </>
            )}
          </ListsContainer>
        </>
      )}
    </Container>
  );
};

export default connect(null, {
  fetchTodos,
})(Board);
