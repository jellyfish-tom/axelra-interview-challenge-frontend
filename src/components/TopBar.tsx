import React from 'react';
import styled from 'styled-components';
import { UserMenu } from './UserMenu';
import { __GRAY_SCALE } from '../layout/Theme';

const Container = styled.div`
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  height: 3em;
  color: ${__GRAY_SCALE._WHITE};
  justify-content: space-between;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  box-sizing: border-box;
`;

const Title = styled.h1``;

export const TopBar = () => {
  return (
    <Container>
      <Title>Axelra Trello Challenge </Title>
      <UserMenu></UserMenu>
    </Container>
  );
};
