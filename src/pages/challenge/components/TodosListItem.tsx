import React from "react";
import styled from "styled-components";
import { __ALERTS, __COLORS } from "../../../layout/Theme";
import { Todo } from "../../../model/Todo";
import { IconActionButton } from "../../../layout/UI/Components";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Draggable } from "react-beautiful-dnd";

const TodoListItem = styled.div`
  background: ${__COLORS.WHITE};
  padding: 0.5em;
  border-radius: 0.2em;
  font-size: 0.9em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0.5em 0;

  width: calc(100% - 1em);
  left: 1em;
  position: relative;

  background-color: ${(props: any) =>
    props.isDragging ? __COLORS.FOURTH : __COLORS.WHITE};
`;

const Title = styled.span`
  flex: 1;
  padding-right: 0.5em;
`;

export const TodosListItem = (props: {
  todo: Todo;
  onStateChange: (todo: Todo) => void;
  onRemove: (todo: Todo) => void;
  index: number;
}) => {
  const { todo, onStateChange, onRemove, index } = props;

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
    <Draggable draggableId={todo._id} index={index}>
      {(provided: any, snapshot: any) => (
        <TodoListItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Title>{todo.title}</Title>
          <IconActionButton
            theme={getTodoStateButtonTheme()}
            onClick={onChangeCategoryClick}
            style={{ marginRight: ".3em" }}
          >
            {todo.completed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconActionButton>
          <IconActionButton
            theme={{ border: __ALERTS.ERROR, background: __ALERTS.ERROR }}
            onClick={onRemoveTodoClick}
          >
            <DeleteOutlineIcon />
          </IconActionButton>
        </TodoListItem>
      )}
    </Draggable>
  );
};
