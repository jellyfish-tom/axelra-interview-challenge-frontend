import React from 'react';
import styled from 'styled-components';
import { __ALERTS, __GRAY_SCALE } from '../../../layout/Theme';
import { Todo } from '../../../model/Todo';
import {
  IconActionButton,
  Image,
  AssetType,
} from '../../../layout/UI/Components';

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

export const TodosListItem = (props: {
  todo: Todo;
  index: number;
  onStateChange: (todo: Todo) => void;
  onRemove: (todo: Todo) => void;
}) => {
  const { todo, index, onStateChange, onRemove } = props;

  const onChangeCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onStateChange(todo);
  };

  const onRemoveTodoClick = () => {
    onRemove(todo);
  };

  const getTodoStateButtonTheme = () => {
    const color = todo.completed ? __ALERTS.INFO : __ALERTS.SUCCESS;

    return { border: color, background: color };
  };

  return (
    <TodoListItem>
      <Index>{index}.</Index>
      <Title>{todo.title}</Title>
      <IconActionButton
        theme={getTodoStateButtonTheme()}
        onClick={onChangeCategoryClick}
      >
        {todo.completed ? (
          <Image source="progress.svg" assetType={AssetType.ICON} />
        ) : (
          <Image source="complete.svg" assetType={AssetType.ICON} />
        )}
      </IconActionButton>
      <IconActionButton
        theme={{ border: __ALERTS.ERROR, background: __ALERTS.ERROR }}
        onClick={onRemoveTodoClick}
      >
        <Image source="remove.svg" assetType={AssetType.ICON} />
      </IconActionButton>
    </TodoListItem>
  );
};
