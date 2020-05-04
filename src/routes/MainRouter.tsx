import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Challenge } from '../pages/challenge/Challenge';
import { LoginPage } from '../pages/login/Login';
import { Notification } from '../components/Notification';
import { PrivateRoute } from '../components/PrivateRoute';

import { routes } from './Routes';

const Container = styled.div`
  width: 100vw;
`;

const MainRouter = () => {
  return (
    <Container>
      <Notification></Notification>
      <Router>
        <Switch>
          <Route
            path={routes.login}
            render={(props) => {
              return localStorage.getItem('user') ? (
                <Redirect
                  to={{ pathname: '/', state: { from: props.location } }}
                />
              ) : (
                <LoginPage />
              );
            }}
            exact
          />
          <PrivateRoute path="/" component={Challenge} exact />
          <Route
            exact
            path={'/*'}
            render={() => {
              return <Redirect to={'/'} />;
            }}
          />
        </Switch>
      </Router>
    </Container>
  );
};

export default MainRouter;
