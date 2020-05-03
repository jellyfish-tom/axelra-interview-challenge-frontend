import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect, useDispatch } from 'react-redux';
import { login, Login, register, Register } from '../../reducers/auth/actions';
import { __GRAY_SCALE } from '../../layout/Theme';
import { ActionTypes } from '../../reducers/auth/types';
import { Button, Input } from '../../layout/UI/Components';

const Title = styled.h1`
  font-size: 32px;
`;

const Container = styled.div`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 1em;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CallToAction = styled.span`
  color: blue;
  hover: pointer;
  margin: 10px;
`;

const LoginInput = styled(Input)`
  margin: 5px;
`;

const LoginButton = styled(Button)`
  margin: 10px;
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
      <LoginInput
        placeholder="email"
        onChange={(e: any) => setEmail(e.target.value)}
      ></LoginInput>
      <LoginInput
        placeholder="password"
        type="password"
        onChange={(e: any) => setPassword(e.target.value)}
      ></LoginInput>
      <LoginButton onClick={registrationEnabled ? onRegister : onLogin}>
        {registrationEnabled ? 'Register' : 'Login'}
      </LoginButton>
      {registrationEnabled ? (
        <CallToAction onClick={onToggleRegistration}>
          Go back to Login
        </CallToAction>
      ) : (
        <CallToAction onClick={onToggleRegistration}>
          Not registered yet?
        </CallToAction>
      )}
    </Container>
  );
};

export const LoginPage = connect(null, {
  login,
  register,
})(UnconnectedLoginPage);
