/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import { md, sm } from '../../styles/mediaQuery';
import { ChangeEvent } from 'react';

interface Props {
  _chcked?: boolean;
  _disabled?: boolean;
  _handleChange?(e: ChangeEvent<Element>): void;
}

const SwitchBox = ({ _chcked = false, _disabled = false, _handleChange = () => {} }: Props) => {
  return (
    <label css={styles({ _disabled })}>
      <input type="checkbox" onChange={_handleChange} checked={_chcked} readOnly />
      <span></span>
    </label>
  );
};

const styles = ({ _disabled }: { _disabled: boolean }) => [
  css`
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;

    pointer-events: ${_disabled && 'none'};

    ${md(css`
      width: 40px;
      height: 20px;
    `)}

    ${sm(css`
      width: 32px;
      height: 16px;
    `)}

    input {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + span {
        background-color: ${_disabled ? 'var(--Blue1)' : 'var(--Blue6)'};
      }

      &:checked + span:before {
        -webkit-transform: translateX(24px);
        -ms-transform: translateX(24px);
        transform: translateX(24px);

        ${md(css`
          -webkit-transform: translateX(20px);
          -ms-transform: translateX(20px);
          transform: translateX(20px);
        `)}

        ${sm(css`
          -webkit-transform: translateX(16px);
          -ms-transform: translateX(16px);
          transform: translateX(16px);
        `)}
      }
    }

    span {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${_disabled ? 'var(--Gray1)' : 'var(--Gray5)'};
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 34px;

      &::before {
        position: absolute;
        content: '';
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        border-radius: 50%;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;

        ${md(css`
          height: 16px;
          width: 16px;
        `)}

        ${sm(css`
          height: 12px;
          width: 12px;
          bottom: 2px;
        `)}
      }
    }
  `,
];

export default SwitchBox;
