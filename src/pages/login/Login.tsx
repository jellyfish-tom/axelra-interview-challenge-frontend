import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect, useDispatch, useSelector } from 'react-redux';
import { login, Login, register, Register } from '../../reducers/auth/actions';
import { ActionTypes } from '../../reducers/auth/types';
import { Button, Input } from '../../layout/UI/Components';
import { RootState } from '../../reducers/store';
import { AuthState } from '../../reducers/auth/types';
import { Spinner } from '../../layout/UI/Spinners/Spinner';
import { __COLORS } from '../../layout/Theme';
import { BounceIn } from '../../layout/UI/Animations/BounceIn';

const Title = styled.h1`
  font-size: 2em;
`;

const Container = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${BounceIn} 2s ease-in-out 0s forwards;
`;

const CallToAction = styled.span`
  color: blue;
  hover: pointer;
  margin: 0.7em;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  cursor: pointer;
`;

const LoginInput = styled(Input)`
  margin: 0.5em;
  width: 15em;
`;

const LoginButton = styled(Button)`
  margin: 1.3em 0 0.6em 0;
`;

const useCleanUserState = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ActionTypes.LOGOUT_SUCCESS,
    });
  }, [dispatch]);
};

const UnconnectedLoginPage = (props: { login: Login; register: Register }) => {
  const { auth }: { auth: AuthState } = useSelector(
    (state: RootState) => state
  );
  const { login, register } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationEnabled, setRegistrationEnabled] = useState(false);

  useCleanUserState();

  const onLogin = () => {
    login(email, password);
  };

  const onRegister = () => {
    register(email, password);
  };

  const onToggleRegistration = () => {
    setRegistrationEnabled(!registrationEnabled);
  };

  return (
    <Container>
      <Title>Axelera Challenge Login</Title>
      {auth.loading ? (
        <Spinner color={__COLORS.SECONDARY}></Spinner>
      ) : (
        <>
          <LoginInput
            placeholder="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          ></LoginInput>
          <LoginInput
            placeholder="password"
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          ></LoginInput>
          <LoginButton onClick={registrationEnabled ? onRegister : onLogin}>
            {registrationEnabled ? 'Register' : 'Login'}
          </LoginButton>
          {registrationEnabled ? (
            <CallToAction unselectable="on" onClick={onToggleRegistration}>
              Go back to Login
            </CallToAction>
          ) : (
            <CallToAction unselectable="on" onClick={onToggleRegistration}>
              Not registered yet?
            </CallToAction>
          )}
        </>
      )}
    </Container>
  );
};

export const LoginPage = connect(null, {
  login,
  register,
})(UnconnectedLoginPage);
