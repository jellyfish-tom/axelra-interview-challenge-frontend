import styled from "styled-components";
import { border, background } from "./utils";
import { Button } from "./Button";

export const IconActionButton = styled(Button)`
  width: 2em !important;
  min-width: 0 !important;
  border: ${(props: any) => border(props)};
  background: ${(props: any) => background(props)};

  & > img {
    width: 1em !important;
    height: 1em !important;
  }
`;
