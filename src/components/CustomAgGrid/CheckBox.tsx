'use client';
import { css } from '@emotion/react';
import tw from 'twin.macro';

interface Props {
  _name: string;
  _checked: boolean;
  _handleClick(): void;
}

const CheckBox = ({ _name = '', _checked, _handleClick }: Props) => {
  return (
    <div>
      <label css={styles()}>
        <input type="checkbox" onClick={_handleClick} checked={_checked} readOnly />
        <div className="text-12">{_name}</div>
      </label>
    </div>
  );
};

const styles = () => [
  tw`
    flex items-center
    px-4 py-6
    cursor-pointer
  `,
  css`
    font-weight: 400;
    white-space: nowrap;
    border-radius: 4px;

    &:hover {
      background-color: var(--Gray0);
    }

    input {
      display: none;
    }

    div {
      display: flex;
      align-items: center;
      user-select: none;
    }

    div:before {
      content: '';
      width: 12px;
      height: 12px;
      border: 1px solid var(--Gray5);
      border-radius: 2px;
      margin: 4px;
    }

    input:checked + div:before {
      background-color: var(--Blue6);
      border-color: var(--Blue6);
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='11' height='11' rx='1.5' fill='%23228BE6' stroke='%23228BE6'/%3E%3Cpath d='M8.5 4L5 8L3.5 6.5' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      // svg 변환
      // https://yoksel.github.io/url-encoder/
      background-repeat: no-repeat;
      background-position: 50%;
    }
  `,
];

export default CheckBox;
