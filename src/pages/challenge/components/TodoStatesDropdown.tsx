import React, { useState } from 'react';
import styled from 'styled-components';
import { __GRAY_SCALE } from '../../../layout/Theme';

const StyledLi = styled.li`
  float: left;
`;

const Dropbtn = styled.button`
  display: inline-block;
  color: black;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  border: 1px solid ${__GRAY_SCALE._400};
  width: 100px;
  border-radius: 3px;
  height: 30px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
  outline: none;
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;
  cursor: pointer;

  &:hover ${DropDownContent} {
    display: block;
  }
`;

const Item = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  font-size: 14px;

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
  onClick: any;
  items: DropdownItem[];
  initialLabel: string;
}) => {
  const { onClick, items, initialLabel } = props;
  const [activeState, setActiveState] = useState({
    label: initialLabel,
    value: -1,
  });

  const onMenuItemClick = (state: DropdownItem) => {
    setActiveState(state);
    onClick(state);
  };

  return (
    <DropDownLi>
      <Dropbtn>{activeState.label}</Dropbtn>
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
