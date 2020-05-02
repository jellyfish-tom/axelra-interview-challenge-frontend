import React from 'react';
import styled from 'styled-components';
import { __GRAY_SCALE } from '../../../layout/Theme';
import { Todo, POSSIBLE_TODO_STATES } from '../../../model/Todo';
import { TodoStatesDropdown, DropdownItem } from './TodoStatesDropdown';

const TodoListItem = styled.div`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 0.5em;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0.5em 0;
`;

const Index = styled.span`
  margin: 0 0.5em;
`;

const Title = styled.span`
  flex: 1;
`;

export const TodosListItem = (props: { todo: Todo; index: number }) => {
  const { todo, index } = props;

  const onChangeStateClick = (dropdownItem: DropdownItem) => {
    console.log('CHANGE ITEM STATE!');
  };

  const getPossibleNextStates = () => {
    return POSSIBLE_TODO_STATES.filter(
      (state) => Boolean(state.value) !== Boolean(todo.completed)
    );
  };

  return (
    <TodoListItem>
      <Index>{index}.</Index>
      <Title>{todo.title}</Title>
      <TodoStatesDropdown
        initialLabel="Move to"
        onClick={onChangeStateClick}
        items={getPossibleNextStates()}
      ></TodoStatesDropdown>
    </TodoListItem>
  );
};
