/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import tw from 'twin.macro';
import { sm } from '../styles/mediaQuery';

interface Props {
  _tabList: string[];
  _selectedTab: number;
  _handleClick?(index: number): void;
}

const TabBox = ({ _tabList, _selectedTab = 0, _handleClick = () => {} }: Props) => {
  return (
    <div css={styles()}>
      {_tabList.map((e, i) => (
        <div key={i} onClick={() => _handleClick(i)}>
          <div className="flex-1 flex items-center">{e}</div>
          <div
            className="h-[2px] sm:h-[1px]"
            css={css`
              ${_selectedTab === i &&
              css`
                background-color: var(--Black);
              `}
            `}
          ></div>
        </div>
      ))}
    </div>
  );
};

const styles = () => [
  tw`
    flex sm:text-12
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
