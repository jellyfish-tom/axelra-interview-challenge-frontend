import styled from 'styled-components';
import { border, color, background } from './utils';
import { Button } from './Button';

export const IconActionButton = styled(Button)`
  width: 30px;
  border: ${(props) => border(props)};
  background: ${(props) => background(props)};

  & > img {
    width: 17px;
    height: 17px;
  }
`;
