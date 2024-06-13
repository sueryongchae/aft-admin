/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import tw from 'twin.macro';
import { ISnackBar, store, useStore } from './useStore';

const SnackBarBox = () => {
  const [list, setList] = useStore();

  const deleteSnackBar = (rand: number) => {
    setList(store.state.filter((e: ISnackBar) => e._rand !== rand));
  };

  return (
    <div css={styles()}>
      {list.map((e: ISnackBar) => (
        <SnackBarItem key={e._rand} data={e} deleteSnackBar={deleteSnackBar} />
      ))}
    </div>
  );
};

const SnackBarItem = ({ data, deleteSnackBar }: { data: ISnackBar; deleteSnackBar(rand: number): void }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  const setAnimation = () => {
    return;
    setTimeout(() => {
      toastRef.current!.style.opacity = '0';
      setTimeout(() => {
        deleteSnackBar(data._rand);
      }, 500);
    }, 2000);
  };

  const handleClickCancel = () => {
    deleteSnackBar(data._rand);
  };

  const handleClickConfirm = () => {
    data._handleClickConfirm!();
    handleClickCancel();
  };

  const handleClickReFuse = () => {
    data._handleClickReFuse!();
    handleClickCancel();
  };

  useEffect(() => {
    setAnimation();
  }, []);

  return (
    <div ref={toastRef} css={item()} data-rand={data._rand}>
      <div className="flex items-center gap-8">
        <div className="text-16 md:text-14 sm:text-12 font-700">{data._text}</div>
        <div className="size-16 ml-auto cursor-pointer" onClick={handleClickCancel}>
          <InfoXIconSVG />
        </div>
      </div>
      {data._subText && (
        <div className="flex items-center gap-8 mt-4">
          <div className="text-14 md:text-12 sm:text-10">{data._text}</div>
        </div>
      )}
      <div className="flex items-center gap-12 mt-4">
        {data._confirmText && (
          <div className="p-10 rounded-8 bg-Blue0 text-Blue6 text-12 cursor-pointer" onClick={handleClickConfirm}>
            {data._confirmText}
          </div>
        )}
        {data._reFuseText && (
          <div className="p-10 rounded-8 bg-Red0 text-Red6 text-12 cursor-pointer" onClick={handleClickReFuse}>
            {data._reFuseText}
          </div>
        )}

        <div className="p-10 rounded-8 bg-Gray0 text-Gray7 text-12 ml-auto">읽음 처리</div>
      </div>
    </div>
  );
};

const styles = () => [
  tw`
    fixed flex flex-col
  `,
  css`
    gap: 10px;
    bottom: 56px;
    right: 40px;
  `,
];

const item = () => [
  tw`
     items-center
  `,
  css`
    width: 320px;
    padding: 12px;

    border-radius: 10px;
    user-select: none;
    border: 1px solid var(--Gray2);
    color: var(--Black);
    background: var(--Gray0);
    box-shadow: 4px 4px 12px 0px rgba(241, 243, 245, 0.25);
    opacity: 1;

    transition: all 0.5s;
  `,
];

export default SnackBarBox;

const InfoXIconSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 11.5L4.5 4.5M11.5 4.5L4.5 11.5" stroke="#495057" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
