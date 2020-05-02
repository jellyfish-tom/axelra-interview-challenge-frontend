import React from 'react';
import styled from 'styled-components';
import { __GRAY_SCALE } from '../../../layout/Theme';
import { addTodo, AddTodo } from '../../../reducers/todos/actions';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../helpers/user';
import { Menu } from './LabelsDropdown';

const Container = styled.div`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 1em;
  border-radius: 6px;
`;

const Input = styled.input``;

const Button = styled.button``;

const UnconnectedTodosControls = (props: { addTodo: AddTodo }) => {
  const { addTodo } = props;
  let input: HTMLInputElement;

  return (
    <Container>
      <Menu></Menu>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();

          if (!input.value.trim()) {
            return;
          }

          const currentUser = getCurrentUser();

          addTodo({
            uid: currentUser._id,
            title: input.value,
            completed: false,
          });

          input.value = '';
        }}
      >
        <Input
          ref={(node: HTMLInputElement) => {
            if (node) input = node;
          }}
        />
        <Button type="submit">Add Todo</Button>
      </form>
    </Container>
  );
};

export const TodosControls = connect(null, {
  addTodo,
})(UnconnectedTodosControls);
