'use client';
import { css } from '@emotion/react';
import { ChangeEvent } from 'react';
import tw from 'twin.macro';

interface Props {
  _title?: string;
  _placeholder?: string;
  _text?: string;
  _type?: string;
  _disabled?: boolean;
  _requirement?: boolean;
  _error?: string;
  _handleChange?(e: ChangeEvent<HTMLInputElement>): void;
}

const InputBox = ({
  _title = '항목 명 관련',
  _placeholder = '',
  _text = '',
  _type = 'text',
  _disabled = false,
  _requirement = false,
  _error = '',
  _handleChange = () => {},
}: Props) => {
  return (
    <div>
      <div className="text-10 mb-2 text-Gray7">
        {_title}
        {_requirement && <span className="text-Red6">&nbsp;*</span>}
      </div>
      <input
        css={styles({ _disabled, _error })}
        type={_type}
        value={_text}
        onChange={_handleChange}
        placeholder={_placeholder}
      />

      {/* <div className="text-10 mt-2 text-Red6">{_error}&nbsp;</div> */}
    </div>
  );
};

const styles = ({ _disabled, _error }: Props) => [
  tw`
      flex
      items-center
      w-full
      h-[32px]
      text-12
      px-10
      rounded-8
    `,
  css`
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

export default InputBox;
