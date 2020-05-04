import styled from "styled-components";
import { background, border, color } from "./utils";
import { darken } from "polished";

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

  &:hover,
  &:focus {
    border: 1px solid ${(props) => darken(0.1, border(props))};
    background: ${(props) => darken(0.1, background(props))};
  }
`;
