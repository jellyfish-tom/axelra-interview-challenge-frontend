import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ChallengePage } from "../pages/challenge/ChallengePage";
import { LoginPage } from "../pages/login/LoginPage";
import { Notification } from "../components/Notification";
import { PrivateRoute } from "../components/PrivateRoute";
import { ErrorBoundary } from "../components/ErrorBoundary";

import { routes } from "./Routes";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const MainRouter = () => {
  return (
    <ErrorBoundary>
      <Container>
        <Notification></Notification>
        <Router>
          <Switch>
            <Route
              path={routes.login}
              render={(props) => {
                return localStorage.getItem("user") ? (
                  <Redirect
                    to={{ pathname: "/", state: { from: props.location } }}
                  />
                ) : (
                  <LoginPage />
                );
              }}
              exact
            />
            <PrivateRoute path="/" component={ChallengePage} exact />
            <Route
              exact
              path={"/*"}
              render={() => {
                return <Redirect to={"/"} />;
              }}
            />
          </Switch>
        </Router>
      </Container>
    </ErrorBoundary>
  );
};

export default MainRouter;
