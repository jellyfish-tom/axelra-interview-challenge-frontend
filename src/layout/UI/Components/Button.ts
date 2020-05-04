import styled from 'styled-components';
import { border, color, background } from './utils';

export const Button = styled.button`
  display: inline-block;
  color: ${(props) => color(props)};
  text-align: center;
  text-decoration: none;
  font-size: 0.9em;
  border: 1px solid ${(props) => border(props)};
  background: ${(props) => background(props)};
  min-width: 7em;
  border-radius: 0.2em;
  height: 2em;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
`;
