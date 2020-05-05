import React from "react";
import styled from "styled-components";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Draggable } from "react-beautiful-dnd";
import { __ALERTS, __COLORS } from "../../../layout/Theme";
import { Todo } from "../../../model/Todo";
import { IconActionButton } from "../../../layout/UI/Components";
import { ErrorBoundary } from "../../../components/ErrorBoundary";

const HiddenIconActionButton = styled(IconActionButton)`
  opacity: 0;
  transition: all 0.5s;
`;

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

  &:hover {
    ${HiddenIconActionButton} {
      opacity: 1;
      transition: all 0.5s;
    }
  }
`;

const Title = styled.span`
  flex: 1;
  padding-right: 0.5em;
`;

export const TodosListItem = (props: {
  todo: Todo;
  onRemove: (todo: Todo) => void;
  index: number;
}) => {
  const { todo, onRemove, index } = props;

  const onRemoveTodoClick = () => {
    onRemove(todo);
  };

  return (
    <ErrorBoundary>
      <Draggable draggableId={todo._id} index={index}>
        {(provided: any, snapshot: any) => (
          <TodoListItem
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Title>{todo.title}</Title>
            <HiddenIconActionButton
              theme={{ border: __ALERTS.ERROR, background: __ALERTS.ERROR }}
              onClick={onRemoveTodoClick}
            >
              <DeleteOutlineIcon />
            </HiddenIconActionButton>
          </TodoListItem>
        )}
      </Draggable>
    </ErrorBoundary>
  );
};
