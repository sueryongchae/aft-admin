/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import tw from 'twin.macro';

interface Props {
  _progress?: number;
}

const MenuBox = ({ _progress = 3 }: Props) => {
  return (
    <div css={styles({ _progress })}>
      <div className="flex items-center gap-8 mb-12">
        <div className="flex justify-center items-center bg-Gray0 rounded-10 size-30">📊</div>
        <div className="text-20 font-500">분석</div>
      </div>
      <div className="mb-16">
        <div className="text-10 text-Blue6">스토어를 개설해보세요!</div>
        <div className="bar"></div>
        <div className="text-12 text-Blue6 text-right">0% 완료</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="p-8">메뉴 명 여기에 작성</div>
        <div className="p-8">메뉴 명 여기에 작성</div>
        <div className="p-8">메뉴 명 여기에 작성</div>
        <div className="p-8">메뉴 명 여기에 작성</div>
      </div>
    </div>
  );
};

const styles = ({ _progress }: Props) => [
  tw`
    
  `,
  css`
    width: 270px;
    height: 298px;
    padding: 20px 12px;
    border-radius: 10px;
    border: 1px solid var(--Gray3);

    box-shadow: 4px 4px 12px 0px rgba(241, 243, 245, 0.25);

    .bar {
      position: relative;
      height: 8px;
      border-radius: 100px;
      margin: 4px 0;
      background-color: var(--Gray1);
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        height: 100%;
        left: 0;
        width: ${_progress}%;
        background-color: var(--Blue6);
      }
    }
  `,
];

export default MenuBox;
