/** @jsxImportSource @emotion/react */
'use client';
import { css } from '@emotion/react';
import tw from 'twin.macro';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef, useState } from 'react';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { sm } from '../styles/mediaQuery';

interface Props {
  _date: Date;
  _onChange(date: Date): void;
}

const DatePickerBox = ({ _date, _onChange = () => {} }: Props) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div css={styles({ dropDown })}>
      <DatePicker
        locale={ko}
        selected={_date}
        onChange={_onChange}
        customInput={
          <Input
            value={''}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        }
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <Header
            date={date}
            changeYear={changeYear}
            changeMonth={changeMonth}
            decreaseMonth={decreaseMonth}
            increaseMonth={increaseMonth}
            prevMonthButtonDisabled={prevMonthButtonDisabled}
            nextMonthButtonDisabled={nextMonthButtonDisabled}
            dropDown={dropDown}
            clickDropDown={() => setDropDown(!dropDown)}
          />
        )}
      />
    </div>
  );
};

const styles = ({ dropDown }: { dropDown: boolean }) => [
  tw`

  `,
  css`
    .react-datepicker {
      border-radius: 10px;
      background-color: var(--Gray0);
      overflow: hidden;
      border: none;
    }

    .react-datepicker__triangle {
      display: none;
    }

    .react-datepicker__header {
      padding: 0;
      border: none;
      background-color: var(--Gray0);
    }

    .react-datepicker__day-names {
      ${tw`text-12`}
      padding: 0 12px;
      margin: 12px 0;
      background-color: var(--Gray0);
      display: flex;
      justify-content: space-between;
      display: ${dropDown && 'none'};
      ${sm(css`
        padding: 0 8px;
        margin: 8px 0;
      `)}
    }

    .react-datepicker__day-name {
      color: var(--Gray6);
      margin: 0;
      flex: 1;
      padding: 4px 0;
      line-height: 1;
    }

    .react-datepicker__month {
      padding: 0 12px 12px 12px;
      margin: 0;
      display: ${dropDown && 'none'};
      ${sm(css`
        padding: 0 8px 8px 8px;
      `)}
    }

    .react-datepicker__week {
      display: flex;
      justify-content: space-between;
    }

    .react-datepicker__week > div:first-of-type {
      color: var(--Red6);
    }

    .react-datepicker__day {
      ${tw`text-14`}
      flex: 1;
      margin: 0;
      padding: 12px 0;
      line-height: 1;
    }
  `,
];

const Header = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  dropDown,
  clickDropDown,
}: {
  date: Date;
  changeYear(year: number): void;
  changeMonth(month: number): void;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  dropDown: boolean;
  clickDropDown(): void;
}) => {
  return (
    <div css={headerStyles()}>
      <div>
        <div className="flex items-center gap-6 cursor-pointer" onClick={clickDropDown}>
          <div>{dropDown ? <UpArrowSVG /> : <DownArrowSVG />}</div>
          <div className="text-14">{format(date, 'yyyy년 M월')}</div>
        </div>
        <div className="flex gap-12">
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            <LeftArrowSVG />
          </button>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            <RightArrowSVG />
          </button>
        </div>
      </div>
      {dropDown && (
        <div>
          <div className="flex-1">
            <div className="mb-16 text-Gray6">년도 선택</div>
            <div>
              <div className="flex">
                <div className="flex-1 p-12 cursor-pointer hover:bg-Blue0 rounded-4" onClick={() => changeYear(2016)}>
                  2016
                </div>
                <div className="flex-1 p-12 cursor-pointer hover:bg-Blue0 rounded-4" onClick={() => changeYear(2017)}>
                  2017
                </div>
              </div>
              <div className="flex">
                <div className="flex-1 p-12 cursor-pointe hover:bg-Blue0 rounded-4" onClick={() => changeYear(2018)}>
                  2018
                </div>
                <div className="flex-1 p-12 cursor-pointer hover:bg-Blue0 rounded-4" onClick={() => changeYear(2019)}>
                  2019
                </div>
              </div>
              <div className="flex">
                <div className="flex-1 p-12 cursor-pointer hover:bg-Blue0 rounded-4" onClick={() => changeYear(2020)}>
                  2020
                </div>
                <div className="flex-1 p-12 cursor-pointer hover:bg-Blue0 rounded-4" onClick={() => changeYear(2021)}>
                  2021
                </div>
              </div>
              <div className="flex">
                <div className="flex-1 p-12 cursor-pointer hover:bg-Blue0 rounded-4" onClick={() => changeYear(2022)}>
                  2022
                </div>
                <div className="flex-1 p-12 cursor-pointer hover:bg-Blue0 rounded-4" onClick={() => changeYear(2023)}>
                  2023
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-16 text-[var(--Gray6)]">월 선택</div>
            <div>
              <div className="flex">
                <div css={ItemStyles()} onClick={() => changeMonth(0)}>
                  1
                </div>
                <div css={ItemStyles()} onClick={() => changeMonth(1)}>
                  2
                </div>
                <div css={ItemStyles()} onClick={() => changeMonth(2)}>
                  3
                </div>
              </div>
              <div className="flex">
                <div css={ItemStyles()} onClick={() => changeMonth(3)}>
                  4
                </div>
                <div css={ItemStyles()} onClick={() => changeMonth(4)}>
                  5
                </div>
                <div css={ItemStyles()} onClick={() => changeMonth(5)}>
                  6
                </div>
              </div>
              <div className="flex">
                <div css={ItemStyles()} onClick={() => changeMonth(6)}>
                  7
                </div>
                <div css={ItemStyles()} onClick={() => changeMonth(7)}>
                  8
                </div>
                <div css={ItemStyles()} onClick={() => changeMonth(8)}>
                  9
                </div>
              </div>
              <div className="flex">
                <div css={ItemStyles()} onClick={() => changeMonth(9)}>
                  10
                </div>
                <div css={ItemStyles()} onClick={() => changeMonth(10)}>
                  11
                </div>
                <div css={ItemStyles()} onClick={() => changeMonth(11)}>
                  12
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ItemStyles = () => [
  tw`
    flex-1 p-12 cursor-pointer rounded-4
  `,
  css`
    &:hover {
      background-color: var(--Blue0);
    }
  `,
];

const headerStyles = () => [
  tw`
  `,
  css`
    > div:nth-of-type(1) {
      display: flex;
      justify-content: space-between;
      color: var(--Black);

      width: 528px;
      padding: 12px 12px 0 12px;
      ${sm(css`
        width: 240px;
        padding: 8px 8px 0 8px;
      `)}
    }

    > div:nth-of-type(2) {
      display: flex;
      justify-content: space-between;
      color: var(--Black);

      width: 528px;
      padding: 12px 12px 12px 12px;
      ${sm(css`
        width: 240px;
        padding: 8px 8px 8px 8px;
      `)}
    }
  `,
];

const Input = forwardRef(
  ({ value, onClick }: { value: string; onClick(): void }, ref?: React.ForwardedRef<HTMLButtonElement>) => (
    <button css={inputStyles()} onClick={onClick} ref={ref}>
      {value}
    </button>
  ),
);

const inputStyles = () => [
  tw`

  `,
  css`
    background-color: #282c34;
    color: white;
    cursor: pointer;
    width: 240px;
    padding: 10px;
  `,
];

const UpArrowSVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10L9 7L12 10" stroke="black" strokeLinecap="round" />
  </svg>
);
const DownArrowSVG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 7L9 10L6 7" stroke="black" strokeLinecap="round" />
  </svg>
);
const LeftArrowSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 22L13 16L19 10" stroke="#707C87" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const RightArrowSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 10L19 16L13 22" stroke="#707C87" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export default DatePickerBox;
