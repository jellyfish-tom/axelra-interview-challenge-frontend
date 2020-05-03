import styled from 'styled-components';
import { border, color } from './utils';

export const Input = styled.input`
  height: 30px;
  border-radius: 3px;
  border: 1px solid ${(props) => border(props)};
  margin: 0 10px 0 2px;
  color: ${(props) => color(props)};
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 13px;
  width: calc(100% - 190px);
  outline: none;
`;
