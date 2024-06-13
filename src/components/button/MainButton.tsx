/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import tw from 'twin.macro';

interface Props {
  _title?: string;
  _disabled?: boolean;
  _ghost?: boolean;
  _handleClick?(): void;
}

const MainButton = ({ _disabled = false, _title = '', _ghost = false, _handleClick = () => {} }: Props) => {
  return (
    <div onClick={_handleClick} css={styles({ _disabled, _ghost })}>
      {_title}
    </div>
  );
};

const styles = ({ _disabled, _ghost }: Props) => [
  tw`
    flex
    justify-center
    items-center
    cursor-pointer
    w-full h-[60px]
    md:h-[50px]
    xs:h-[32px] 
    rounded-10 xs:rounded-4
    text-16 md:text-14 xs:text-12
  `,
  css`
    font-weight: 700;
    color: ${_ghost ? 'var(--Black)' : _disabled ? 'var(--Gray4)' : 'var(--White)'};
    box-shadow: 0 0 0 1px ${_ghost ? 'var(--Black)' : 'none'};
    background-color: ${_ghost ? 'var(--White)' : _disabled ? 'var(--Gray2)' : 'var(--Black)'};
    pointer-events: ${_disabled && 'none'};

    &:hover {
      background-color: var(--Gray7);
      border: none;
      box-shadow: 4px 4px 12px 0px rgba(241, 243, 245, 0.25);
    }
  `,
];

export default MainButton;
