import { css } from '@emotion/react';
import tw from 'twin.macro';
import { sm } from '../styles/mediaQuery';

interface Props {
  _type?: 1 | 2;
  _firstPage?: boolean;
  _lastPage?: boolean;
  _current: number;
  _handleLeftArrow(): void;
  _handleDoubleLeftArrow(): void;
  _handleRightArrow(): void;
  _handleDoubleRightArrow(): void;
  _handlePageClick(page: number): void;
}

const PageNation = ({
  _type = 1,
  _firstPage = true,
  _lastPage = false,
  _current = 1,
  _handleLeftArrow,
  _handleDoubleLeftArrow,
  _handleRightArrow,
  _handleDoubleRightArrow,
  _handlePageClick,
}: Props) => {
  return (
    <div>
      {_type === 1 && (
        <div css={styles1}>
          <div
            className="size-20 md:size-18 sm:size-16 hover:bg-Gray1 rounded-4 cursor-pointer"
            onClick={_handleLeftArrow}
          >
            {_firstPage ? <LeftArrow_0_IconSVG /> : <LeftArrow_1_IconSVG />}
          </div>
          <div className="text-center">
            <div className="sm:text-12">{_current}/10</div>
            <div className="text-10 text-Gray6">1~10&nbsp;/&nbsp;100</div>
          </div>
          <div
            className="size-20 md:size-18 sm:size-16 hover:bg-Gray1 rounded-4 cursor-pointer"
            onClick={_handleRightArrow}
          >
            {_lastPage ? <RightArrow_0_IconSVG /> : <RightArrow_1_IconSVG />}
          </div>
        </div>
      )}
      {_type === 2 && (
        <div css={styles2}>
          <div onClick={_handleDoubleLeftArrow}>
            <DoubleLeftArrowIconSVG />
          </div>
          <div onClick={_handleLeftArrow}>{_firstPage ? <LeftArrow_0_IconSVG /> : <LeftArrow_1_IconSVG />}</div>
          {[1, 2, 3, 4, 5].map((e, i) => (
            <div
              key={i}
              css={css`
                background-color: ${e === _current && 'var(--Blue1)'};
                font-weight: ${e === _current && 700};
              `}
              onClick={() => _handlePageClick(i)}
            >
              {e}
            </div>
          ))}
          <div onClick={_handleRightArrow}>{_lastPage ? <RightArrow_0_IconSVG /> : <RightArrow_1_IconSVG />}</div>
          <div onClick={_handleDoubleRightArrow}>
            <DoubleRightArrowIconSVG />
          </div>
        </div>
      )}
    </div>
  );
};

const styles1 = () => [
  tw`
    flex items-center
  `,
  css`
    gap: 6px;
    width: 132px;
    height: 48px;
    border-radius: 10px;

    box-shadow: 4px 4px 12px 0px rgba(241, 243, 245, 0.25);
  `,
];

const styles2 = () => [
  tw`
    flex items-center
    sm:text-12
  `,
  css`
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      cursor: pointer;

      ${sm(css`
        width: 20px;
        height: 20px;
        border-radius: 4px;
      `)}

      &:hover {
        background-color: var(--Gray1);
      }
    }
  `,
];

const LeftArrow_0_IconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14L8 10L12 6" stroke="#C0C7CE" strokeLinecap="round" />
  </svg>
);
const LeftArrow_1_IconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14L8 10L12 6" stroke="black" strokeLinecap="round" />
  </svg>
);

const DoubleLeftArrowIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14L6 10L10 6" stroke="black" strokeLinecap="round" />
    <path d="M14 14L10 10L14 6" stroke="black" strokeLinecap="round" />
  </svg>
);

const RightArrow_0_IconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6L12 10L8 14" stroke="#C0C7CE" strokeLinecap="round" />
  </svg>
);

const RightArrow_1_IconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6L12 10L8 14" stroke="black" strokeLinecap="round" />
  </svg>
);

const DoubleRightArrowIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6L14 10L10 14" stroke="black" strokeLinecap="round" />
    <path d="M6 6L10 10L6 14" stroke="black" strokeLinecap="round" />
  </svg>
);

export default PageNation;
