import styled from 'styled-components';
import { border, color } from './utils';

export const Input = styled.input`
  height: 2em;
  border-radius: 0.3em;
  border: 1px solid ${(props) => border(props)};
  margin: 0 0.5em 0 0;
  color: ${(props) => color(props)};
  padding: 0 0.5em;
  box-sizing: border-box;
  font-size: 0.9em;
  outline: none;
`;
