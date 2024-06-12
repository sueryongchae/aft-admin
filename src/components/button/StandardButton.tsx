'use client';
import { SerializedStyles, css } from '@emotion/react';
import tw from 'twin.macro';

interface Props {
  _buttonType: 'Primary' | 'Secondary' | 'Default' | 'TagPrimary' | 'TagSecondary' | 'Subtle';
  _title?: string;
  _downArrow?: boolean;
  _disabled?: boolean;
  _handleClick?(): void;
}

interface Type {
  Primary({ _disabled, _downArrow }: Props): SerializedStyles[];
  Secondary({ _disabled, _downArrow }: Props): SerializedStyles[];
  Default({ _disabled, _downArrow }: Props): SerializedStyles[];
  TagPrimary({ _disabled, _downArrow }: Props): SerializedStyles[];
  TagSecondary({ _disabled, _downArrow }: Props): SerializedStyles[];
  Subtle({ _disabled, _downArrow }: Props): SerializedStyles[];
}

const type: Type = {
  Primary: ({ _disabled, _downArrow }: Props) => [
    css`
      background-color: ${_disabled ? 'var(--Blue1)' : 'var(--Blue6)'};
      color: var(--White);

      ${!_downArrow &&
      css`
        &:hover {
          background-color: var(--Blue6);
        }
      `}
    `,
  ],
  Secondary: ({ _disabled, _downArrow }) => [
    css`
      background-color: ${_disabled ? 'var(--Gray1)' : 'var(--Black)'};
      color: ${_disabled ? 'var(--Gray4)' : 'var(--White)'};

      ${!_downArrow &&
      css`
        &:hover {
          background-color: var(--Black);
        }
      `}
    `,
  ],
  Default: ({ _disabled, _downArrow }) => [
    css`
      background-color: ${_disabled ? 'var(--Gray0)' : 'var(--White)'};
      color: ${_disabled ? 'var(--Gray4)' : 'var(--Gray7)'};
      box-shadow: 0 0 0 1px ${_disabled ? 'var(--Gray1)' : 'var(--Gray3)'} inset;

      ${!_downArrow &&
      css`
        &:hover {
          background-color: var(--Gray7);
          color: var(--White);
        }
      `}
    `,
  ],
  TagPrimary: ({ _disabled, _downArrow }) => [
    css`
      background-color: ${_disabled ? 'var(--Blue0)' : 'var(--Blue0)'};
      color: ${_disabled ? 'var(--Blue1)' : 'var(--Blue6)'};

      ${!_downArrow &&
      css`
        &:hover {
          background-color: var(--Blue1);
        }
      `}
    `,
  ],
  TagSecondary: ({ _disabled, _downArrow }) => [
    css`
      background-color: ${_disabled ? 'var(--Gray0)' : 'var(--Gray0)'};
      color: ${_disabled ? 'var(--Gray3)' : 'var(--Gray7)'};

      ${!_downArrow &&
      css`
        &:hover {
          background-color: var(--Gray1);
        }
      `}
    `,
  ],
  Subtle: ({ _disabled, _downArrow }) => [
    css`
      background-color: ${_disabled ? 'var(--White)' : 'var(--White)'};
      color: ${_disabled ? 'var(--Gray4)' : 'var(--Black)'};

      ${!_downArrow &&
      css`
        &:hover {
          background-color: var(--Gray0);
        }
      `}
    `,
  ],
};

const MainButton = ({
  _buttonType,
  _title = 'Button Title',
  _disabled = false,
  _downArrow = false,
  _handleClick = () => {},
}: Props) => {
  return (
    <div onClick={_handleClick} css={styles({ _buttonType, _disabled, _downArrow })}>
      {!_disabled && _downArrow && (
        <div className="mr-8 md:mr-6 sm:mr-4 size-20 md:size-18 sm:size-10">
          {_buttonType === 'Primary' && <DownArrowWhite />}
          {_buttonType === 'Secondary' && <DownArrowWhite />}
          {_buttonType === 'Default' && <DownArrowGray />}
          {_buttonType === 'TagPrimary' && <DownArrowBlue />}
          {_buttonType === 'TagSecondary' && <DownArrowGray />}
          {_buttonType === 'Subtle' && <DownArrowBlack />}
        </div>
      )}
      {_title}
    </div>
  );
};

const styles = ({ _buttonType, _disabled, _downArrow }: Props) => [
  tw`
    flex
    justify-center
    items-center
    cursor-pointer
    px-16 md:px-12 sm:px-10 
    text-16 md:text-14 sm:text-12
    rounded-10 sm:rounded-8
    h-[48px] md:h-[36px] sm:h-[32px]
  `,
  css`
    font-weight: 400;
    pointer-events: ${_disabled && 'none'};

    ${type[_buttonType]({ _buttonType, _disabled, _downArrow })}
  `,
];

const DownArrowWhite = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8L10 12L6 8" stroke="white" strokeLinecap="round" />
  </svg>
);

const DownArrowGray = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8L10 12L6 8" stroke="#495057" strokeLinecap="round" />
  </svg>
);

const DownArrowBlue = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8L10 12L6 8" stroke="#228BE6" strokeLinecap="round" />
  </svg>
);

const DownArrowBlack = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8L10 12L6 8" stroke="black" strokeLinecap="round" />
  </svg>
);

export default MainButton;
