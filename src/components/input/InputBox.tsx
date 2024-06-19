/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import { ChangeEvent, useEffect, useState } from 'react';
import tw from 'twin.macro';

interface Props {
  _title?: string;
  _type?: 'text' | 'password';
  _value?: string;
  _placeholder?: string;
  _disabled?: boolean;
  _requirement?: boolean;
  _error?: string;
  _isEye?: boolean;
  _handleChange?(e: ChangeEvent<Element>): void;
}

const InputBox = ({
  _title = '항목 명 관련',
  _type = 'text',
  _value = '',
  _placeholder = '',
  _disabled = false,
  _requirement = false,
  _error = '',
  _isEye = false,
  _handleChange = () => {},
}: Props) => {
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    if (_type === 'password') {
      setIsPassword(true);
    }
  }, []);

  return (
    <div>
      <div className="text-12 sm:text-10 select-none mb-2 text-Gray7">
        {_title}
        {_requirement && <span className="text-Red6">&nbsp;*</span>}
      </div>
      <div className="relative">
        <input
          css={styles({ _disabled, _error, _isEye })}
          type={isPassword ? 'password' : 'text'}
          value={_value}
          onChange={_handleChange}
          placeholder={_placeholder}
        />
        {_isEye && (
          <div
            className="absolute h-full top-0 right-0 flex items-center px-12 cursor-pointer"
            onClick={() => setIsPassword(!isPassword)}
          >
            <Eye color={isPassword ? '#C0C7CE' : '#228BE6'} />
          </div>
        )}
      </div>

      <div className="text-12 sm:text-10 select-none mt-2 text-Red6">{_error}&nbsp;</div>
    </div>
  );
};

const styles = ({ _disabled, _error, _isEye }: Props & { _isEye: boolean }) => [
  tw`
    flex
    items-center
    w-full
    h-[48px] md:h-[36px] sm:h-[32px]
    text-16 md:text-14 sm:text-12
    px-16 md:px-12 sm:px-10
    rounded-10 sm:rounded-8
  `,
  css`
    ${_isEye && 'padding-right: 48px;'}
    box-shadow: 0 0 0 1px ${_error !== '' ? 'var(--Red6)' : 'var(--Gray3)'} inset;
    background-color: ${_disabled && 'var(--Gray0)'};

    pointer-events: ${_disabled && 'none'};
    color: ${_disabled ? 'var(--Gray7)' : 'var(--Black)'};

    &::placeholder {
      color: ${_disabled ? 'var(--Gray7)' : 'var(--Gray5)'};
    }

    &:focus {
      box-shadow: none;
      outline-color: var(--Gray5);

      /* outline: none;
      box-shadow: 0 0 0 1px ${_error !== '' ? 'var(--Red6)' : 'var(--Gray5)'} inset; */
    }
  `,
];

const Eye = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_378_42845)">
      <path
        d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_378_42845">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default InputBox;
