import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { IAfterGuiAttachedParams, IDoesFilterPassParams, SortDirection } from 'ag-grid-community';
import { CustomFilterProps, useGridFilter } from 'ag-grid-react';
import { format } from 'date-fns';
import DatePickerBox from './DatePickerBox';
import SearchBox from './SearchBox';
import CheckBox from './CheckBox';
import InputBox from './InputBox';
import { css } from '@emotion/react';

interface ICustomProps {
  _filter?: ['search', 'date', 'range', 'list'];
}

const Filter = (props: CustomFilterProps & ICustomProps) => {
  const { column, api, model, onModelChange, _filter, getValue } = props;
  const filterRef = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);

  const [sort, setSort] = useState<SortDirection>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState([false, false]);

  const onChangeStartDate = useCallback((date: Date) => {
    // const dateColumFilter = await api.getColumnFilterInstance('date');

    // console.log(dateColumFilter);
    api
      .setColumnFilterModel('date', {
        type: 'greaterThan',
        dateFrom: '2010-01-01',
        dateTo: null,
      })
      .then(() => {
        api.onFilterChanged();
      });

    setStartDate(date);
    setIsOpen([false, false]);
  }, []);

  const onChangeEndDate = (date: Date) => {
    setEndDate(date);
    setIsOpen([false, false]);
  };

  const handleCalendarClose = () => console.log('Calendar closed');
  const handleCalendarOpen = () => console.log('Calendar opened');

  const handleChangeSort = (_direction: 'asc' | 'desc') => {
    const colId = column.getColId();
    const currentSortType = column.getSort();

    let setDirection: SortDirection = null;
    switch (_direction) {
      case 'asc':
        if (currentSortType === _direction) {
          setDirection = null;
        } else {
          setDirection = _direction;
        }
        break;
      case 'desc':
        if (currentSortType === _direction) {
          setDirection = null;
        } else {
          setDirection = _direction;
        }
        break;
    }

    api.applyColumnState({
      state: [
        {
          colId: colId,
          sort: setDirection,
        },
      ],
      defaultState: {
        sort: null,
      },
    });
    setSort(setDirection);
  };

  const comparator = (filterLocalDateAtMidnight: Date, cellValue: string) => {
    console.log(cellValue);
    const dateAsString = cellValue;
    if (dateAsString == null) return -1;
    const dateParts = dateAsString.split('-');
    const cellDate = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  };

  const doesFilterPass = useCallback(
    (params: IDoesFilterPassParams) => {
      console.log(model);

      if (_filter?.includes('search')) {
        const { node } = params;
        const filterText: string = model;
        const value: string = getValue(node).toString().toLowerCase();
        // make sure each word passes separately, ie search for firstname, lastname

        return filterText
          .toLowerCase()
          .split(' ')
          .every((filterWord) => value.indexOf(filterWord) >= 0);
      }

      if (_filter?.includes('list')) {
        const { node } = params;
        const filterText: string = model;
        const value: string = getValue(node).toString().toLowerCase();
        // make sure each word passes separately, ie search for firstname, lastname

        return filterText
          .toLowerCase()
          .split(' ')
          .every((filterWord) => value.indexOf(filterWord) >= 0);
      }
      if (_filter?.includes('date')) {
        const { node } = params;
        const value: string | null | undefined = getValue(node);
        console.log(comparator);
        console.log(value);
      }

      return false;
    },
    [model],
  );

  const afterGuiAttached = useCallback((params?: IAfterGuiAttachedParams) => {
    if (!params || !params.suppressFocus) {
      // Focus the input element for keyboard navigation.
      // Can't do this in an effect,
      // as the component is not recreated when hidden and then shown again
      refInput.current?.focus();
    }
  }, []);

  // register filter handlers with the grid
  useGridFilter({
    doesFilterPass,
    afterGuiAttached,
  });

  return (
    <div ref={filterRef} className="w-[256px] p-8 bg-White">
      <div className="flex justify-between py-4">
        <div className="text-12 text-Gray7">항목명</div>
        <div
          onClick={() => {
            // console.log('asdf');
            // console.log(document.querySelector('body'));
            // document.querySelector('body').click();
          }}
        >
          <CancelSVG />
        </div>
      </div>
      {
        <>
          <div className="text-10 text-Gray7 my-4">정렬 선택</div>
          <div
            className="px-4 py-6 mb-4 text-12 text-Gray9 hover:bg-Gray0 cursor-pointer"
            css={css`
              background-color: ${sort === 'asc' && 'var(--Gray0)'};
            `}
            onClick={() => handleChangeSort('asc')}
          >
            오름차순
          </div>
          <div
            className="px-4 py-6 text-12 text-Gray9 hover:bg-Gray0 cursor-pointer"
            css={css`
              background-color: ${sort === 'desc' && 'var(--Gray0)'};
            `}
            onClick={() => handleChangeSort('desc')}
          >
            내림차순
          </div>
        </>
      }
      {_filter?.includes('search') && (
        <>
          <div className="my-8 text-10 text-Gray7">검색어 입력</div>

          <div className="mb-4">
            <SearchBox
              _text={model || ''}
              _handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                onModelChange(value === '' ? null : value);
              }}
              _handleDelete={() => {
                onModelChange(null);
              }}
            />
          </div>
        </>
      )}
      {_filter?.includes('list') && (
        <>
          <div className="my-8 text-10 text-Gray7">필터 목록</div>

          <div className="mb-4">
            <SearchBox
              _text={model || ''}
              _handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                onModelChange(value === '' ? null : value);
              }}
              _handleDelete={() => {
                onModelChange(null);
              }}
            />
          </div>

          <div>
            <CheckBox _name="전체선택" />
          </div>
          <div className="h-[1px] bg-Gray3 my-8"></div>
          <div className="flex flex-col gap-4">
            <CheckBox _name="항목 값1" />
            <CheckBox _name="항목 값2" />
          </div>
        </>
      )}
      {_filter?.includes('range') && (
        <>
          <div className="my-8 text-10 text-Gray7">숫자 범위 입력</div>
          <div className="mb-4">
            <InputBox _title="최소값 입력" _placeholder="숫자를 입력하세요" />
          </div>
          <div>
            <InputBox _title="최대값 입력" _placeholder="숫자를 입력하세요" />
          </div>
        </>
      )}
      {_filter?.includes('date') && (
        <>
          <div className="h-[1px] bg-Gray3 my-8"></div>
          <div className="my-8 text-10 text-Gray7">검색 날짜 선택</div>
          <div className="flex items-center gap-4">
            <div
              className={`w-[86px] px-8 py-10 flex justify-center text-12 rounded-8 ${isOpen[0] ? 'bg-Blue0' : startDate ? 'bg-Blue0' : 'bg-Gray0'} ${isOpen[0] ? 'text-Blue6' : startDate ? 'text-Blue6' : 'text-Gray7'} cursor-pointer`}
              onClick={() => setIsOpen([true, false])}
            >
              {startDate ? format(startDate, 'yyyy-MM-dd') : '시작 날짜 선택'}
            </div>
            <div>~</div>
            <div
              className={`w-[86px] px-8 py-10 flex justify-center text-12 rounded-8 ${isOpen[1] ? 'bg-Blue0' : endDate ? 'bg-Blue0' : 'bg-Gray0'} ${isOpen[1] ? 'text-Blue6' : endDate ? 'text-Blue6' : 'text-Gray7'} cursor-pointer`}
              onClick={() => setIsOpen([false, true])}
            >
              {endDate ? format(endDate, 'yyyy-MM-dd') : '종료 날짜 선택'}
            </div>
          </div>
          <div className="mt-4">
            {isOpen[0] && (
              <DatePickerBox
                _date={startDate || new Date()}
                _onChange={onChangeStartDate}
                _onCalendarClose={handleCalendarClose}
                _onCalendarOpen={handleCalendarOpen}
              />
            )}
            {isOpen[1] && (
              <DatePickerBox
                _date={endDate || new Date()}
                _onChange={onChangeEndDate}
                _onCalendarClose={handleCalendarClose}
                _onCalendarOpen={handleCalendarOpen}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const CancelSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.0625 11.0625L4.9375 4.9375M11.0625 4.9375L4.9375 11.0625"
      stroke="#707C87"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Filter;
