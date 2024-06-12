import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import tw from 'twin.macro';
import { IToast, store, useStore } from './useStore';
import { md, sm } from '../../styles/mediaQuery';

const ToastBox = () => {
  const [list, setList] = useStore();

  const deleteToast = (rand: number) => {
    setList(store.state.filter((e: IToast) => e._rand !== rand));
  };

  return (
    <div css={styles}>
      {list.map((e: IToast) => (
        <ToastItem key={e._rand} data={e} deleteToast={deleteToast} />
      ))}
    </div>
  );
};

const ToastItem = ({ data, deleteToast }: { data: IToast; deleteToast(rand: number): void }) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const { _isCancel = true } = data;

  const setAnimation = () => {
    setTimeout(() => {
      toastRef.current!.style.opacity = '0';
      setTimeout(() => {
        deleteToast(data._rand);
      }, 500);
    }, 2000);
  };

  const handleClickCancel = () => {
    deleteToast(data._rand);
  };

  useEffect(() => {
    !_isCancel && setAnimation();
  }, []);

  return (
    <div ref={toastRef} css={item(data._type)} data-rand={data._rand}>
      <div className="flex items-center gap-8">
        <div className="size-20 md:size-18 sm:size-16">
          {data._type === 'error' && <ErrorIconSVG />}
          {data._type === 'info' && <InfoIconSVG />}
          {data._type === 'complete' && <SuccessIconSVG />}
          {data._type === 'warning' && <WarningIconSVG />}
        </div>
        <div className="text-16 md:text-14 sm:text-12 font-700">{data._text}</div>
        {_isCancel && (
          <div className="size-18 md:size-16 ml-auto cursor-pointer" onClick={handleClickCancel}>
            {data._type === 'error' && <ErrorXIconSVG />}
            {data._type === 'info' && <InfoXIconSVG />}
            {data._type === 'complete' && <SuccessXIconSVG />}
            {data._type === 'warning' && <WarningXIconSVG />}
          </div>
        )}
      </div>
      {data._subText && (
        <div className="flex items-center gap-8 mt-8 md:mt-2">
          <div className="size-20"></div>
          <div className="text-14 md:text-12 sm:text-10">{data._text}</div>
          <div className="size-18 ml-auto"></div>
        </div>
      )}
    </div>
  );
};

const styles = () => [
  tw`
    fixed flex flex-col
  `,
  css`
    gap: 10px;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  `,
];

const item = (type: string) => [
  tw`
     items-center
  `,
  css`
    width: 560px;
    padding: 14px 12px;

    ${md(css`
      width: 420px;
      padding: 9px 10px;
    `)}

    ${sm(css`
      width: 320px;
      padding: 8px;
    `)}

    border-radius: 10px;
    user-select: none;
    border: 1px solid
      var(
        ${type === 'error'
          ? '--Red6'
          : type === 'info'
            ? '--Gray6'
            : type === 'complete'
              ? '--Blue6'
              : type === 'warning'
                ? '--Yellow6'
                : '--Gray6'}
      );
    color: var(
      ${type === 'error'
        ? '--Red6'
        : type === 'info'
          ? '--Gray6'
          : type === 'complete'
            ? '--Blue6'
            : type === 'warning'
              ? '--Yellow6'
              : '--Gray6'}
    );
    background: var(
      ${type === 'error'
        ? '--Red0'
        : type === 'info'
          ? '--Gray1'
          : type === 'complete'
            ? '--Blue0'
            : type === 'warning'
              ? '--Yellow0'
              : '--Gray1'}
    );
    box-shadow: 4px 4px 12px 0px rgba(241, 243, 245, 0.25);
    opacity: 1;

    transition: all 0.5s;
  `,
];

export default ToastBox;

const ErrorIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.43183 4.34414C9.67255 3.88529 10.3275 3.88529 10.5682 4.34414L15.9252 14.5558C16.1503 14.9848 15.8402 15.5 15.3571 15.5H4.64293C4.15978 15.5 3.84974 14.9848 4.07476 14.5558L9.43183 4.34414ZM10 7.28705C10.2659 7.28705 10.4815 7.50335 10.4815 7.77017V10.9909C10.4815 11.2577 10.2659 11.474 10 11.474C9.73405 11.474 9.51846 11.2577 9.51846 10.9909V7.77017C9.51846 7.50335 9.73405 7.28705 10 7.28705ZM10 13.5675C10.3546 13.5675 10.6421 13.2791 10.6421 12.9234C10.6421 12.5676 10.3546 12.2792 10 12.2792C9.6454 12.2792 9.35795 12.5676 9.35795 12.9234C9.35795 13.2791 9.6454 13.5675 10 13.5675Z"
      fill="#FA5252"
    />
  </svg>
);
const ErrorXIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.9375 12.9375L5.0625 5.0625M12.9375 5.0625L5.0625 12.9375"
      stroke="#FA5252"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10ZM10 6.83335C10.2761 6.83335 10.5 7.05721 10.5 7.33335V10.6667C10.5 10.9428 10.2761 11.1667 10 11.1667C9.72386 11.1667 9.5 10.9428 9.5 10.6667V7.33335C9.5 7.05721 9.72386 6.83335 10 6.83335ZM10 13.3334C10.3682 13.3334 10.6667 13.0349 10.6667 12.6667C10.6667 12.2985 10.3682 12 10 12C9.63181 12 9.33333 12.2985 9.33333 12.6667C9.33333 13.0349 9.63181 13.3334 10 13.3334Z"
      fill="#707C87"
    />
  </svg>
);

const InfoXIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.9375 12.9375L5.0625 5.0625M12.9375 5.0625L5.0625 12.9375"
      stroke="#707C87"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SuccessIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10ZM10 6.83335C10.2761 6.83335 10.5 7.05721 10.5 7.33335V10.6667C10.5 10.9428 10.2761 11.1667 10 11.1667C9.72386 11.1667 9.5 10.9428 9.5 10.6667V7.33335C9.5 7.05721 9.72386 6.83335 10 6.83335ZM10 13.3334C10.3682 13.3334 10.6667 13.0349 10.6667 12.6667C10.6667 12.2985 10.3682 12 10 12C9.63181 12 9.33333 12.2985 9.33333 12.6667C9.33333 13.0349 9.63181 13.3334 10 13.3334Z"
      fill="#228BE6"
    />
  </svg>
);
const SuccessXIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.9375 12.9375L5.0625 5.0625M12.9375 5.0625L5.0625 12.9375"
      stroke="#228BE6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WarningIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10ZM10 6.83335C10.2761 6.83335 10.5 7.05721 10.5 7.33335V10.6667C10.5 10.9428 10.2761 11.1667 10 11.1667C9.72386 11.1667 9.5 10.9428 9.5 10.6667V7.33335C9.5 7.05721 9.72386 6.83335 10 6.83335ZM10 13.3334C10.3682 13.3334 10.6667 13.0349 10.6667 12.6667C10.6667 12.2985 10.3682 12 10 12C9.63181 12 9.33333 12.2985 9.33333 12.6667C9.33333 13.0349 9.63181 13.3334 10 13.3334Z"
      fill="#FAB005"
    />
  </svg>
);
const WarningXIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.9375 12.9375L5.0625 5.0625M12.9375 5.0625L5.0625 12.9375"
      stroke="#FAB005"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
