import { css } from '@emotion/react';
import tw from 'twin.macro';

interface Props {
  _stepList: string[];
  _currentStep: number;
}

const StepBox = ({ _stepList = [], _currentStep = 0 }: Props) => {
  return (
    <div className="flex pb-15 pl-5 pr-5">
      {_stepList.map((e, i) => (
        <div className="flex items-center" key={i}>
          {i > _currentStep && (
            <div
              className="flex items-center justify-center"
              css={css`
                box-shadow: 0 0 0 1px var(--Gray4);
                border-radius: 50%;

                color: var(--Gray4);

                ${styles()}
              `}
            >
              1<div>{e}</div>
            </div>
          )}
          {i === _currentStep && (
            <div css={styles}>
              <div>{e}</div>
              <CheckIcon_0_SVG />
            </div>
          )}
          {i < _currentStep && (
            <div css={styles}>
              <div>{e}</div>
              <CheckIcon_1_SVG />
            </div>
          )}

          {_stepList.length - 1 !== i && (
            <>
              {i > _currentStep && <div className="w-[82px] border-t border-Gray4"></div>}
              {i === _currentStep && <div className="w-[82px] border-t border-Blue6 border-dashed"></div>}
              {i < _currentStep && <div className="w-[82px] border-t border-Blue6"></div>}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = () => [
  tw`
    relative text-10
  `,
  css`
    width: 18px;
    height: 18px;
    user-select: none;

    & > div {
      position: absolute;
      top: 18px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  `,
];

const CheckIcon_0_SVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8" stroke="#228BE6" strokeWidth="2" />
    <path d="M12.125 6.5L7.75 11.5L5.875 9.625" stroke="#228BE6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckIcon_1_SVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="18" height="18" rx="9" fill="#228BE6" />
    <path d="M12.125 6.5L7.75 11.5L5.875 9.625" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default StepBox;
