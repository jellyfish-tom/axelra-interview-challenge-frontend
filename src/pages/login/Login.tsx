import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { login, Login, register, Register } from '../../reducers/auth/actions';
import { __GRAY_SCALE } from '../../layout/Theme';

const Title = styled.h1`
  font-size: 32px;
`;
const Container = styled.div`
  border: 1px solid ${__GRAY_SCALE._200};
  padding: 1em;
  border-radius: 6px;
`;
const Input = styled.input``;
const Button = styled.button``;
const CallToAction = styled.span`
  color: blue;
  hover: pointer;
`;

const UnconnectedLoginPage = (props: { login: Login; register: Register }) => {
  const { login, register } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationEnabled, setRegistrationEnabled] = useState(false);

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
      <Input
        placeholder="email"
        onChange={(e: any) => setEmail(e.target.value)}
      ></Input>
      <Input
        placeholder="password"
        type="password"
        onChange={(e: any) => setPassword(e.target.value)}
      ></Input>
      {registrationEnabled ? (
        <CallToAction onClick={onToggleRegistration}>
          Go back to Login
        </CallToAction>
      ) : (
        <CallToAction onClick={onToggleRegistration}>
          Not registered yet?
        </CallToAction>
      )}
      <Button onClick={registrationEnabled ? onRegister : onLogin}>
        {registrationEnabled ? 'Register' : 'Login'}
      </Button>
    </Container>
  );
};

export const LoginPage = connect(null, {
  login,
  register,
})(UnconnectedLoginPage);
