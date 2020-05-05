import React from "react";
import styled from "styled-components";
import { connect, useSelector } from "react-redux";
import { RootState } from "../reducers/store";
import { AuthState } from "../reducers/auth/types";
import { logout, Logout } from "../reducers/auth/actions";
import { Button } from "../layout/UI/Components/Button";
import { __GRAY_SCALE } from "../layout/Theme";
import { ErrorBoundary } from "../components/ErrorBoundary";

const Container = styled.div`
  height: 3em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LoggedInAs = styled.span`
  margin-right: 0.5em;
  color: ${__GRAY_SCALE._800};
`;

const UnconnectedUserMenu = (props: { logout: Logout }) => {
  const { auth }: { auth: AuthState } = useSelector(
    (state: RootState) => state
  );
  const { logout } = props;

  return (
    <ErrorBoundary>
      <Container>
        <LoggedInAs>Logged in as: {auth.user.email}</LoggedInAs>
        <Button onClick={logout}>Logout</Button>
      </Container>
    </ErrorBoundary>
  );
};

export const UserMenu = connect(null, {
  logout,
})(UnconnectedUserMenu);
