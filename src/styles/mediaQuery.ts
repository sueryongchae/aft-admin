import { SerializedStyles, css } from '@emotion/react';

const breakPoints = {
  xxl: 1920,
  xl: 1440,
  lg: 1200,
  md: 1000,
  sm: 760,
  xs: 540,
};

export const xxl = (style: SerializedStyles) => css`
  @media screen and (max-width: ${breakPoints.xxl}px) {
    ${style}
  }
`;

export const xl = (style: SerializedStyles) => css`
  @media screen and (max-width: ${breakPoints.xl}px) {
    ${style}
  }
`;

export const lg = (style: SerializedStyles) => css`
  @media screen and (max-width: ${breakPoints.lg}px) {
    ${style}
  }
`;

export const md = (style: SerializedStyles) => css`
  @media screen and (max-width: ${breakPoints.md}px) {
    ${style}
  }
`;

export const sm = (style: SerializedStyles) => css`
  @media screen and (max-width: ${breakPoints.sm}px) {
    ${style}
  }
`;

export const xs = (style: SerializedStyles) => css`
  @media screen and (max-width: ${breakPoints.xs}px) {
    ${style}
  }
`;
