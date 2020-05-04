import React, { CSSProperties, ImgHTMLAttributes } from 'react';

export enum AssetType {
  IMAGE,
  URL,
  ICON,
}

type Props = {
  source: string;
  assetType: AssetType;
  otherProps?: ImgHTMLAttributes<any>;
  style?: CSSProperties;
};

const getPrefix = (assetType: AssetType) => {
  switch (assetType) {
    case AssetType.IMAGE:
      return './../assets/images/';
    case AssetType.ICON:
      return './../assets/icons/';
    case AssetType.URL:
      return '';
    default:
      return './../assets/';
  }
};

export const Image = ({ source, style, assetType, ...otherProps }: Props) => (
  <img
    style={style}
    alt={source}
    src={`${getPrefix(assetType)}${source}`}
    {...otherProps}
  />
);
