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
import { ErrorNotification } from '../components/ErrorNotification';
import { EXTRA_SMALL_DEVICES, LARGE_DEVICES } from '../layout/Mobile';
import { PrivateRoute } from '../components/PrivateRoute';

import { routes } from './Routes';

const Container = styled.div``;

const RoutesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em 0;
  border-radius: 5px;
  padding: 2rem;
  ${EXTRA_SMALL_DEVICES`
   width: 260px;
   `};
  ${LARGE_DEVICES`
   width: 550px;
  `};
`;

const MainRouter = () => {
  return (
    <Container>
      <ErrorNotification></ErrorNotification>
      <Router>
        <RoutesContainer>
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
        </RoutesContainer>
      </Router>
    </Container>
  );
};

export default MainRouter;
