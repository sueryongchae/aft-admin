/** @jsxImportSource @emotion/react */
'use client';
import { SerializedStyles, css } from '@emotion/react';
import { ReactNode } from 'react';
import tw from 'twin.macro';

interface Props {
  _arrowDirection:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'right-top'
    | 'right-center'
    | 'right-bottom'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'left-bottom'
    | 'left-center'
    | 'left-top';
  _top?: number;
  _left?: number;
  _isArrow: boolean;
}

const Tooltip = ({
  _arrowDirection = 'top-left',
  _top = 0,
  _left = 0,
  _isArrow = true,
  children,
}: Props & { children: ReactNode }) => {
  return <div css={styles({ _arrowDirection, _top, _left, _isArrow })}>{children}</div>;
};

const styles = ({ _arrowDirection, _top, _left, _isArrow }: Props) => [
  tw`
    absolute
    flex
    flex-col
    text-12
  `,
  css`
    background-color: rgba(33, 37, 41, 0.8);
    border-radius: 8px;
    color: var(--White);
    font-weight: 700;
    padding: 12px;
    z-index: 100;

    white-space: nowrap;

    top: ${_top}%;
    left: ${_left}%;

    transform: translate(-50%, -50%);

    &::before {
      ${_isArrow && 'content: "";'}
      position: absolute;
      display: block;
      z-index: 0;

      ${arrowDirectionList[_arrowDirection]()}
    }
  `,
];

interface IDirectionList {
  'top-left'(): SerializedStyles[];
  'top-center'(): SerializedStyles[];
  'top-right'(): SerializedStyles[];
  'right-top'(): SerializedStyles[];
  'right-center'(): SerializedStyles[];
  'right-bottom'(): SerializedStyles[];
  'bottom-right'(): SerializedStyles[];
  'bottom-center'(): SerializedStyles[];
  'bottom-left'(): SerializedStyles[];
  'left-bottom'(): SerializedStyles[];
  'left-center'(): SerializedStyles[];
  'left-top'(): SerializedStyles[];
}

const arrowDirectionList: IDirectionList = {
  'top-left': () => [
    css`
      top: 0;
      left: 20%;
      transform: translate(-50%, -100%);
      border-top: 4px solid none;
      border-bottom: 10px solid rgba(33, 37, 41, 0.8);
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    `,
  ],
  'top-center': () => [
    css`
      top: 0;
      left: 50%;
      transform: translate(-50%, -100%);
      border-top: 4px solid none;
      border-bottom: 10px solid rgba(33, 37, 41, 0.8);
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    `,
  ],
  'top-right': () => [
    css`
      top: 0;
      left: 80%;
      transform: translate(-50%, -100%);
      border-top: 4px solid none;
      border-bottom: 10px solid rgba(33, 37, 41, 0.8);
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    `,
  ],
  'right-top': () => [
    css`
      top: 30%;
      left: 100%;
      transform: translate(0, -50%);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 10px solid rgba(33, 37, 41, 0.8);
      border-right: 8px solid none;
    `,
  ],
  'right-center': () => [
    css`
      top: 50%;
      left: 100%;
      transform: translate(0, -50%);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 10px solid rgba(33, 37, 41, 0.8);
      border-right: 8px solid none;
    `,
  ],
  'right-bottom': () => [
    css`
      top: 70%;
      left: 100%;
      transform: translate(0, -50%);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 10px solid rgba(33, 37, 41, 0.8);
      border-right: 8px solid none;
    `,
  ],
  'bottom-right': () => [
    css`
      top: 100%;
      left: 80%;
      transform: translate(-50%, 0);
      border-top: 10px solid rgba(33, 37, 41, 0.8);
      border-bottom: 4px solid none;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    `,
  ],
  'bottom-center': () => [
    css`
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      border-top: 10px solid rgba(33, 37, 41, 0.8);
      border-bottom: 4px solid none;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    `,
  ],
  'bottom-left': () => [
    css`
      top: 100%;
      left: 20%;
      transform: translate(-50%, 0);
      border-top: 10px solid rgba(33, 37, 41, 0.8);
      border-bottom: 4px solid none;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    `,
  ],
  'left-bottom': () => [
    css`
      top: 70%;
      left: 0;
      transform: translate(-100%, -50%);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 8px solid none;
      border-right: 10px solid rgba(33, 37, 41, 0.8);
    `,
  ],
  'left-center': () => [
    css`
      top: 50%;
      left: 0;
      transform: translate(-100%, -50%);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 8px solid none;
      border-right: 10px solid rgba(33, 37, 41, 0.8);
    `,
  ],
  'left-top': () => [
    css`
      top: 30%;
      left: 0;
      transform: translate(-100%, -50%);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 8px solid none;
      border-right: 10px solid rgba(33, 37, 41, 0.8);
    `,
  ],
};

export default Tooltip;
