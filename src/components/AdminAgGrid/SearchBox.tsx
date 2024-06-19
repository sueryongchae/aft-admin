/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';

interface Props {
  _text?: string;
  _disabled?: boolean;
  _handleChange?(e: ChangeEvent<HTMLInputElement>): void;
  _handleDelete?(): void;
}

const SearchBox = ({ _text = '', _disabled = false, _handleChange = () => {}, _handleDelete = () => {} }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(false);

  const handleOutside = (e: MouseEvent) => {
    // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
    if (searchRef.current && !searchRef.current.contains(e.target as HTMLElement)) {
      setFocus(false);
    } else {
      setFocus(true);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutside);
    return () => {
      document.removeEventListener('click', handleOutside);
    };
  }, [searchRef]);

  return (
    <div className="relative w-full">
      <div ref={searchRef} css={styles({ focus, _disabled })}>
        {!focus && <div className="search-icon">{_disabled ? <SearchIconSVGDisabled /> : <SearchIconSVG />}</div>}
        <div className="flex-1">
          <input ref={inputRef} value={_text} onChange={_handleChange} placeholder="검색어를 입력하세요" />
        </div>
        {focus && (
          <div onClick={_handleDelete} className="delete-icon">
            <DeleteInputIconSVG />
          </div>
        )}
      </div>
      {/* {focus && (
        <div css={styles2}>
          {a.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )} */}
    </div>
  );
};
// const a = ['최근에 입력한 내용이 없습니다'];

const styles = ({ focus, _disabled }: { focus: boolean; _disabled: boolean }) => [
  tw`
    flex items-center
    h-[32px]
    text-12
    gap-4
    px-10
    rounded-10
  `,
  css`
    background-color: ${_disabled ? 'var(--Gray0)' : ''};
    box-shadow: 0 0 0 1px var(--Gray3) inset;
    pointer-events: ${_disabled && 'none'};

    /* border-bottom-left-radius: ${focus && 0};
    border-bottom-right-radius: ${focus && 0}; */

    /* ${focus &&
    css`
      &::after {
        background-color: #fff;
        height: 2px;
        content: '';
        position: absolute;
        bottom: 0;
        left: 1px;
        right: 1px;
      }
    `} */

    &:hover {
      background-color: var(--Gray0);

      input {
        background-color: var(--Gray0);
      }
    }

    .search-icon {
      width: 12px;
      height: 12px;
      margin: 2px;
    }

    input {
      width: 100%;
      background-color: ${_disabled && 'var(--Gray0)'};
      user-select: ${_disabled && 'none'};

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: var(--Gray5);
      }
    }

    .delete-icon {
      cursor: pointer;
      width: 18px;
      height: 18px;
      margin: 2px;
    }
  `,
];

// const styles2 = () => [
//   tw`
//     absolute w-full
//     text-12
//   `,
//   css`
//     box-shadow: 0 0 0 1px var(--Gray3) inset;
//     border-bottom-left-radius: 10px;
//     border-bottom-right-radius: 10px;
//     background-color: #fff;
//     z-index: 1;

//     &::after {
//       content: '';
//       background-color: #fff;
//       height: 2px;
//       position: absolute;
//       top: 0;
//       left: 1px;
//       right: 1px;
//     }

//     div {
//       display: flex;
//       align-items: center;
//       padding: 0 16px;
//       height: 32px;
//     }
//   `,
// ];

const SearchIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.1818 1.5C4.45361 1.5 3.74177 1.71593 3.1363 2.12049C2.53083 2.52506 2.05893 3.10007 1.78026 3.77283C1.5016 4.44559 1.42868 5.18588 1.57075 5.90008C1.71281 6.61428 2.06347 7.27031 2.57837 7.78522C3.09328 8.30013 3.74932 8.65079 4.46352 8.79285C5.17771 8.93491 5.918 8.862 6.59076 8.58333C7.26352 8.30467 7.83854 7.83276 8.2431 7.22729C8.64766 6.62183 8.86359 5.90999 8.86359 5.1818C8.86353 4.20534 8.47561 3.2689 7.78515 2.57844C7.0947 1.88798 6.15825 1.50006 5.1818 1.5Z"
      stroke="#ADB5BD"
      strokeWidth="0.8"
      strokeMiterlimit="10"
    />
    <path
      d="M7.92871 7.92871L10.5 10.5"
      stroke="#ADB5BD"
      strokeWidth="0.8"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);

const SearchIconSVGDisabled = () => (
  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.90906 2C5.93814 2 4.98903 2.28791 4.18174 2.82733C3.37444 3.36674 2.74524 4.13343 2.37368 5.03045C2.00213 5.92746 1.90491 6.91451 2.09433 7.86677C2.28375 8.81904 2.75129 9.69375 3.43783 10.3803C4.12438 11.0668 4.99909 11.5344 5.95135 11.7238C6.90362 11.9132 7.89067 11.816 8.78768 11.4444C9.6847 11.0729 10.4514 10.4437 10.9908 9.63639C11.5302 8.8291 11.8181 7.87998 11.8181 6.90906C11.818 5.60712 11.3008 4.35853 10.3802 3.43792C9.45959 2.51731 8.211 2.00008 6.90906 2Z"
      stroke="#DEE2E6"
      strokeMiterlimit="10"
    />
    <path d="M10.5715 10.5718L14 14.0002" stroke="#DEE2E6" strokeMiterlimit="10" strokeLinecap="round" />
  </svg>
);

const DeleteInputIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.9375 12.9375L5.0625 5.0625M12.9375 5.0625L5.0625 12.9375"
      stroke="#707C87"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SearchBox;
