import React, { useState } from 'react';
import styled from 'styled-components';
import { __GRAY_SCALE } from '../../../layout/Theme';
import { addTodo, AddTodo } from '../../../reducers/todos/actions';
import { POSSIBLE_TODO_STATES } from '../../../model/Todo';
import { connect, useSelector } from 'react-redux';
import { TodoStatesDropdown, DropdownItem } from './TodoStatesDropdown';
import { RootState } from '../../../reducers/store';
import { AuthState } from '../../../reducers/auth/types';
import { Button, Input } from '../../../layout/UI/Components';

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const todoStateNotPicked = -1;

const UnconnectedTodosControls = (props: { addTodo: AddTodo }) => {
  const { auth }: { auth: AuthState } = useSelector(
    (state: RootState) => state
  );
  const [todoState, setTodoState] = useState(todoStateNotPicked);
  const { addTodo } = props;
  let input: HTMLInputElement;

  const onMenuItemClick = (dropdownItem: DropdownItem) => {
    setTodoState(dropdownItem.value);
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault();

    if (todoState === todoStateNotPicked || !input.value.trim()) {
      alert('Form not valid'); // TODO: dispatch alert
      return;
    }

    addTodo({
      uid: auth.user._id,
      title: input.value,
      completed: !!todoState,
    });

    input.value = '';
  };

  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <Input
          placeholder="Add description of your todo here"
          ref={(node: HTMLInputElement) => {
            if (node) input = node;
          }}
        />
        <TodoStatesDropdown
          initialLabel="Pick state"
          onClick={onMenuItemClick}
          items={POSSIBLE_TODO_STATES}
        ></TodoStatesDropdown>
        <Button type="submit">Add Todo</Button>
      </Form>
    </>
  );
};

export const TodosControls = connect(null, {
  addTodo,
})(UnconnectedTodosControls);
