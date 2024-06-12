import { css } from '@emotion/react';
import { md, sm } from '../../styles/mediaQuery';
import tw from 'twin.macro';

interface Props {
  _type: 1 | 2 | 3;
  _name?: string;
  _checked?: boolean;
  _handleClick?(): void;
}

const CheckBox = ({ _type, _name = '', _checked = false, _handleClick = () => {} }: Props) => {
  return (
    <div className="flex">
      {_type === 1 && (
        <label css={styles1}>
          <input type="checkbox" onClick={_handleClick} checked={_checked} readOnly />
          <div></div>
        </label>
      )}

      {_type === 2 && (
        <label css={styles2}>
          <input type="checkbox" onClick={_handleClick} checked={_checked} readOnly />
          <div>{_name}</div>
        </label>
      )}

      {_type === 3 && (
        <label css={styles3({ _checked })}>
          <input type="checkbox" onClick={_handleClick} checked={_checked} readOnly />
          <div>{_name}</div>
        </label>
      )}
    </div>
  );
};

const commonStyles = () => [
  css`
    display: flex;
    align-items: center;
    font-weight: 400;
    white-space: nowrap;
    cursor: pointer;
    align-self: center;

    input {
      display: none;
    }

    div {
      display: flex;
      align-items: center;
      user-select: none;
      cursor: pointer;
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

const styles1 = () => [
  css`
    padding: 4px;
    border-radius: 4px;

    ${md(css`
      padding: 3px;
    `)}

    &:hover {
      background-color: var(--Gray1);
    }

    ${commonStyles()}

    div:before {
      ${md(css`
        width: 10px;
        height: 10px;
      `)}
    }
  `,
];

const styles2 = () => [
  tw`
    text-14 md:text-10
    p-2
    rounded-4
  `,
  css`
    &:hover {
      background-color: var(--Gray1);
    }

    ${commonStyles()}

    div:before {
      margin: 4px 8px 4px 4px;

      ${md(css`
        width: 10px;
        height: 10px;
        margin: 4px 6px 4px 4px;
      `)}
    }
  `,
];

const styles3 = ({ _checked }: { _checked: boolean }) => [
  tw`
    w-[196px] md:w-[152px] sm:w-[114px]
    h-[48px] md:h-[36px] sm:h-[32px]
    text-16 md:text-14 sm:text-12
    px-8 md:px-6
    rounded-10
  `,
  css`
    background-color: ${_checked ? 'var(--White)' : 'var(--Gray0)'};
    box-shadow: 0 0 0 1px ${_checked ? 'var(--Blue6)' : 'var(--Gray3)'} inset;
    color: ${_checked ? 'var(--Blue6)' : 'var(--Gray7)'};

    /* &:hover {
      background-color: var(--Gray1);
    } */

    ${commonStyles()}

    div:before {
      margin: 4px 8px 4px 4px;

      ${md(css`
        margin: 3px 5px 3px 3px;
      `)}

      ${sm(css`
        margin: 2px 4px 2px 2px;
      `)}
    }
  `,
];

export default CheckBox;
