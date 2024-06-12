import { SerializedStyles, css } from '@emotion/react';
import tw from 'twin.macro';

interface Props {
  _buttonType: 'Primary' | 'Secondary' | 'TagPrimary' | 'Subtle';
  _title?: string;
  _disabled?: boolean;
  _downArrow?: boolean;
  _handleClick?(): void;
}

interface Type {
  Primary({ _disabled, _downArrow }: Props): SerializedStyles[];
  Secondary({ _disabled, _downArrow }: Props): SerializedStyles[];
  TagPrimary({ _disabled, _downArrow }: Props): SerializedStyles[];
  Subtle({ _disabled, _downArrow }: Props): SerializedStyles[];
}

const type: Type = {
  Primary: ({ _disabled, _downArrow }: Props) => [
    css`
      background-color: ${_disabled ? 'var(--Red1)' : 'var(--Red6)'};
      color: var(--White);

      ${!_downArrow &&
      css`
        &:hover {
          background-color: var(--Red6);
        }
      `}
    `,
  ],
  Secondary: ({ _disabled, _downArrow }: Props) => [
    css`
      background-color: var(--White);
      color: ${_disabled ? 'var(--Red1)' : 'var(--Red6)'};
      box-shadow: 0 0 0 1px ${_disabled ? 'var(--Red1)' : 'var(--Red6)'} inset;

      ${!_downArrow &&
      css`
        &:hover {
          background-color: var(--White);
        }
      `}
    `,
  ],
  TagPrimary: ({ _disabled, _downArrow }: Props) => [
    css`
      background-color: var(--Red0);
      color: ${_disabled ? 'var(--Red1)' : 'var(--Red6)'};

      ${!_downArrow &&
      css`
        &:hover {
          background-color: var(--Red1);
        }
      `}
    `,
  ],
  Subtle: ({ _disabled, _downArrow }: Props) => [
    css`
      background-color: var(--White);
      color: ${_disabled ? 'var(--Red1)' : 'var(--Red6)'};

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
    <div onClick={_handleClick} css={styles({ _buttonType, _downArrow, _disabled })}>
      {!_disabled && _downArrow && (
        <div className="mr-8 md:mr-6 sm:mr-4 size-20 md:size-18 sm:size-10">
          {_buttonType === 'Primary' ? <DownArrowWhite /> : <DownArrowRed />}
        </div>
      )}
      {_title}
    </div>
  );
};

const styles = ({ _buttonType, _downArrow, _disabled }: Props) => [
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

const DownArrowWhite = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 8L10 12L6 8" stroke="white" strokeLinecap="round" />
    </svg>
  );
};

const DownArrowRed = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8L10 12L6 8" stroke="#FA5252" strokeLinecap="round" />
  </svg>
);

export default MainButton;
