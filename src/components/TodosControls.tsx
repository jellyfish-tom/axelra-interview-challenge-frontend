import React from 'react';
import styled from 'styled-components';
import { __ALERTS, __COLORS, __GRAY_SCALE } from '../layout/Theme';
import { addTodo, AddTodo } from '../reducers/todos/actions';
import { connect } from 'react-redux';

const Container = styled.div`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 1em;
  border-radius: 6px;
`;

const UnconnectedTodosControls = (props: { addTodo: AddTodo }) => {
  const { addTodo } = props;
  let input: HTMLInputElement;

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!input.value.trim()) {
            return;
          }

          addTodo({ title: input.value, userId: '', id: 0, completed: false });
          input.value = '';
        }}
      >
        <Input
          ref={(node: HTMLInputElement) => {
            if (node) input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </Container>
  );
};

export const TodosControls = connect(null, {
  addTodo,
})(UnconnectedTodosControls);

const Input = styled.input``;
