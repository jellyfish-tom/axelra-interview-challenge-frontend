import React, { useState } from 'react';
import styled from 'styled-components';
import { addTodo, AddTodo } from '../../../reducers/todos/actions';
import {
  setNotification,
  SetNotification,
} from '../../../reducers/notification/actions';
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
  height: 2em;
`;

const TodoDescriptionInput = styled(Input)`
  flex: 1;
`;

const UnconnectedTodosControls = (props: {
  addTodo: AddTodo;
  setNotification: SetNotification;
}) => {
  const { auth }: { auth: AuthState } = useSelector(
    (state: RootState) => state
  );
  const todoNeutralState = { value: -1, label: 'Pick state' };
  const [todoState, setTodoState] = useState(todoNeutralState.value);
  const { addTodo, setNotification } = props;
  let input: HTMLInputElement;

  const onMenuItemClick = (dropdownItem: DropdownItem) => {
    setTodoState(dropdownItem.value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const stateNotPicked = todoState === todoNeutralState.value;
    const messageEmpty = !input.value.trim();

    if (stateNotPicked || messageEmpty) {
      let message = '';

      if (messageEmpty && stateNotPicked) {
        message = 'You need to add description and pick state for todo';
      } else if (messageEmpty && !stateNotPicked) {
        message = 'You need to add description for you todo';
      } else if (!messageEmpty && stateNotPicked) {
        message = 'You need to pick state for your todo';
      }

      setNotification(undefined, message);

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
    <Form onSubmit={onFormSubmit}>
      <TodoDescriptionInput
        placeholder="Add description of your todo here"
        ref={(node: HTMLInputElement) => {
          if (node) input = node;
        }}
      />
      <TodoStatesDropdown
        initialState={todoNeutralState}
        onClick={onMenuItemClick}
        items={POSSIBLE_TODO_STATES}
      ></TodoStatesDropdown>
      <Button type="submit">Add Todo</Button>
    </Form>
  );
};

export const TodosControls = connect(null, {
  addTodo,
  setNotification,
})(UnconnectedTodosControls);
