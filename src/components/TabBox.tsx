/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import tw from 'twin.macro';
import { sm } from '../styles/mediaQuery';

interface Props {
  _tabList: string[];
  _selectedTab: number;
  _colorType: 0 | 1;
  _handleClick?(index: number): void;
}

const textType = {
  0: 'text-Black',
  1: 'text-Blue6',
};

const bgType = {
  0: 'bg-Black',
  1: 'bg-Blue6',
};

const TabBox = ({ _tabList, _selectedTab = 0, _colorType = 0, _handleClick = () => {} }: Props) => {
  return (
    <div css={styles()}>
      {_tabList.map((e, i) => (
        <div key={i} onClick={() => _handleClick(i)}>
          <div
            className={`flex-1 flex items-center font-400 ${_selectedTab === i && `${textType[_colorType]} font-700`}`}
          >
            {e}
          </div>
          <div className={`h-[2px] sm:h-[1px] ${_selectedTab === i && `${bgType[_colorType]}`}`}></div>
        </div>
      ))}
    </div>
  );
};

const styles = () => [
  tw`
    flex sm:text-12 px-8
  `,
  css`
    font-weight: 700;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 20px;
      height: 46px;
      cursor: pointer;
      user-select: none;

      ${sm(css`
        height: 36px;
      `)}
    }
  `,
];

export default TabBox;
