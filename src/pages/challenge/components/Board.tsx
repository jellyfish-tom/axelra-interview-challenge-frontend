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
  const { todos }: { todos: TodoState } = useSelector(
    (state: RootState) => state
  );
  const { fetchTodos } = props;

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filterTodosByState = (todos: Todo[], completed: boolean) =>
    todos.filter((todo) => todo.completed === completed);

  return (
    <Container>
      <TodosControls></TodosControls>
      <ListsContainer>
        {!todos.loading ? ( // TODO: cos tu nie gra z tym loadingiem
          <Spinner color={__COLORS.SECONDARY}></Spinner> // TODO: adjust position of loader
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
