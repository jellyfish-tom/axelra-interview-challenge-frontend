import React, { useState } from 'react';
import styled from 'styled-components';
import { __GRAY_SCALE } from '../../../layout/Theme';
import { Button } from '../../../layout/UI/Components/Button';

const StyledLi = styled.li`
  float: left;
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 10em;
  box-shadow: 0px 0.5em 1em 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-bottom-right-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;
  cursor: pointer;
  margin-right: 0.5em;

  &:hover ${DropDownContent} {
    display: block;
  }
`;

const Item = styled.a`
  color: black;
  padding: 0.7em 1em;
  text-decoration: none;
  display: block;
  text-align: left;
  font-size: 0.9em;

  &:hover {
    background-color: #f1f1f1;
  }

  &:first-child {
    border-bottom: 1px solid ${__GRAY_SCALE._400};
  }
`;

export interface DropdownItem {
  value: number;
  label: string;
}

export const TodoStatesDropdown = (props: {
  onClick: (state: DropdownItem) => void;
  items: DropdownItem[];
  initialState: DropdownItem;
}) => {
  const { onClick, items, initialState } = props;
  const [activeState, setActiveState] = useState(initialState);

  const onMenuItemClick = (state: DropdownItem) => {
    setActiveState(state);
    onClick(state);
  };

  return (
    <DropDownLi>
      <Button
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {activeState.label}
      </Button>
      <DropDownContent>
        {items.map((item) => (
          <Item key={item.value} onClick={() => onMenuItemClick(item)}>
            {item.label}
          </Item>
        ))}
      </DropDownContent>
    </DropDownLi>
  );
};
