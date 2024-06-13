/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';

interface Props {
  _type: 1 | 2;
  _progress?: number;
  _loadingText?: string;
  _completeText?: string;
}

const Loading = ({ _type, _progress = 0, _loadingText = 'Loading TEXT', _completeText = 'Done' }: Props) => {
  return (
    <div>
      {_type === 1 && (
        <div css={styles1()}>
          <SpinnerSVG />
        </div>
      )}
      {_type === 2 && (
        <div className="flex flex-col gap-12">
          <div css={styles2({ _progress })}>
            <div></div>
          </div>
          <div className="text-center text-12">{_progress >= 100 ? _completeText : _loadingText}</div>
        </div>
      )}
    </div>
  );
};

const styles1 = () => [
  css`
    animation: rotate 1s linear infinite;
    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }
  `,
];

const styles2 = ({ _progress }: { _progress: number }) => [
  css`
    width: 210px;
    height: 20px;
    border-radius: 10px;
    box-shadow: 0 0 0 1px var(--Gray3);
    background: var(--Gray1);
    padding: 4px 5px;
    overflow: hidden;

    div {
      width: ${_progress >= 100 ? 100 : _progress <= 6 ? 6 : _progress}%;
      height: 100%;
      border-radius: 6px;
      background-color: ${_progress >= 100 ? 'var(--Blue6)' : 'var(--Gray6)'};
      transition: all 0.1s;
    }
  `,
];

export default Loading;

const SpinnerSVG = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M36.639 5.60901C39.5795 6.74346 42.2677 8.44598 44.5502 10.6193C46.8327 12.7927 48.6648 15.3944 49.9419 18.2758C51.2189 21.1572 51.9159 24.2619 51.9931 27.4127C52.0703 30.5635 51.5261 33.6986 50.3916 36.6391C49.2572 39.5796 47.5547 42.2678 45.3813 44.5503C43.2079 46.8328 40.6063 48.6649 37.7249 49.9419C34.8435 51.219 31.7387 51.916 28.5879 51.9932C25.4372 52.0703 22.302 51.5262 19.3616 50.3917C16.4211 49.2573 13.7329 47.5547 11.4503 45.3814C9.16784 43.208 7.33576 40.6063 6.05871 37.7249C4.78166 34.8435 4.08465 31.7388 4.00748 28.588C3.93031 25.4372 4.47448 22.3021 5.60894 19.3616C6.74339 16.4212 8.4459 13.7329 10.6193 11.4504C12.7926 9.16792 15.3943 7.33584 18.2757 6.05879C21.1571 4.78174 24.2618 4.08473 27.4126 4.00756C30.5634 3.93038 33.6985 4.47456 36.639 5.60901L36.639 5.60901Z"
      stroke="#D0EBFF"
      strokeWidth="8"
    />
    <path
      d="M36.639 5.60901C41.3676 7.43333 45.3973 10.7078 48.1505 14.9631C50.9037 19.2184 52.2391 24.2361 51.9652 29.297"
      stroke="#228BE6"
      strokeWidth="8"
      strokeLinecap="round"
    />
  </svg>
);
