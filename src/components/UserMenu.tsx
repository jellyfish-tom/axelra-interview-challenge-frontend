import React from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../reducers/store';
import { AuthState } from '../reducers/auth/types';
import { logout, Logout } from '../reducers/auth/actions';
import { Button } from '../layout/UI/Components/Button';

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 50px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LoggedInAs = styled.span`
  margin-right: 5px;
`;

const UnconnectedUserMenu = (props: { logout: Logout }) => {
  const { auth }: { auth: AuthState } = useSelector(
    (state: RootState) => state
  );
  const { logout } = props;

  return (
    <Container>
      <LoggedInAs>Logged in as: {auth.user.email}</LoggedInAs>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};

export const UserMenu = connect(null, {
  logout,
})(UnconnectedUserMenu);
