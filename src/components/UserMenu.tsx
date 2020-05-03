import React from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../reducers/store';
import { AuthState } from '../reducers/auth/types';
import { logout, Logout } from '../reducers/auth/actions';
import { __GRAY_SCALE } from '../layout/Theme';

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

const LogoutButton = styled.button`
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
  outline: none;
  margin-right: 3px;
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
      <LogoutButton onClick={logout}>Logout</LogoutButton>
    </Container>
  );
};

export const UserMenu = connect(null, {
  logout,
})(UnconnectedUserMenu);
