import styled from 'styled-components';
import { border, color, background } from './utils';

export const Button = styled.button`
  display: inline-block;
  color: ${(props) => color(props)};
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  border: 1px solid ${(props) => border(props)};
  background: ${(props) => background(props)};
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
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
`;
