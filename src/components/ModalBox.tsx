/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import tw from 'twin.macro';
import { sm } from '../styles/mediaQuery';

interface Props {
  _open: boolean;
  _title?: string;
  _text?: string;
  _isClose?: boolean;
  _isButton?: boolean;
  _isHeightSmall?: boolean;
  children?: React.ReactNode;
  _handleCancel?(): void;
  _handleConfirm?(): void;
}

const ModalBox = ({
  _open = false,
  _title = '타이틀',
  _text = '설명 문구가 필요한 경우 여기에 작성을 이어갑니다.',
  _isClose = true,
  _isButton = true,
  _isHeightSmall = false,
  children,
  _handleCancel = () => {},
  _handleConfirm = () => {},
}: Props) => {
  return (
    <div css={styles({ _open, _isHeightSmall })}>
      <div>
        <div className="flex items-center justify-between mb-16 sm:mb-10">
          <div className="text-24 sm:text-20 font-500">{_title}</div>
          {_isClose && (
            <div className="size-28 sm:size-18 cursor-pointer" onClick={_handleCancel}>
              <CancelIconSVG />
            </div>
          )}
        </div>
        <div className="sm:text-12 mb-16 sm:mb-10">{_text}</div>

        <div className="flex-1 bg-Gray5 mb-8 sm:mb-36 overflow-hidden">{children}</div>

        {_isButton && (
          <div
            className="flex items-center justify-center self-center w-[398px] sm:w-[360px] h-[60px] sm:h-[50px] rounded-10 font-700 cursor-pointer text-White sm:text-14 bg-Black"
            onClick={_handleConfirm}
          >
            모달 최종 버튼
          </div>
        )}
      </div>
    </div>
  );
};

const styles = ({ _open, _isHeightSmall }: { _open: boolean; _isHeightSmall: boolean }) => [
  tw`
    fixed 
    w-screen
    h-screen
    top-0
  `,
  css`
    background-color: rgba(33, 37, 41, 0.8);
    display: ${_open ? 'block' : 'none'};

    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 24px;
      border-radius: 20px;

      display: flex;
      flex-direction: column;
      width: 600px;

      ${sm(css`
        padding: 20px;
        width: 430px;
      `)}

      height: ${_isHeightSmall ? '360px' : '600px'};
      background-color: var(--White);
      box-shadow: 4px 4px 12px 0px rgba(241, 243, 245, 0.25);
    }
  `,
];

const CancelIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.3 21.3L8.69995 8.69995M21.3 8.69995L8.69995 21.3"
      stroke="#707C87"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ModalBox;
