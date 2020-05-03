import { __GRAY_SCALE } from '../../Theme';

export const border = (props: any) =>
  props.theme.border || props.theme.color || __GRAY_SCALE._400;

export const color = (props: any) => props.theme.color || __GRAY_SCALE._800;

export const background = (props: any) =>
  props.theme.background || props.theme.border || __GRAY_SCALE._WHITE;
