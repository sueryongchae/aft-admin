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

  const [selectAll, setSelectAll] = useState(false);
  const [rowList, setRowList] = useState<
    {
      value: string;
      checked: boolean;
      visible: boolean;
    }[]
  >([]);

  const setRangeValue = (target: 'min' | 'max', value: string) => {
    let _model = null;
    switch (target) {
      case 'min':
        if (value === '') {
          if (model?.max) {
            _model = {
              ...model,
              min: null,
            };
          } else {
            _model = null;
          }
        } else {
          if (model?.max) {
            _model = {
              ...model,
              min: value,
            };
          } else {
            _model = {
              min: value,
              max: null,
            };
          }
        }
        break;
      case 'max':
        if (value === '') {
          if (model?.min) {
            _model = {
              ...model,
              max: null,
            };
          } else {
            _model = null;
          }
        } else {
          if (model?.min) {
            _model = {
              ...model,
              max: value,
            };
          } else {
            _model = {
              min: null,
              max: value,
            };
          }
        }
        break;
    }

    api.setColumnFilterModel('price', _model).then(() => {
      api.onFilterChanged();
    });
  };

  const clickSelectAll = () => {
    let updateRows = null;
    if (selectAll) {
      updateRows = rowList.map((e) => ({
        ...e,
        value: e.value,
        checked: false,
      }));
    } else {
      updateRows = rowList.map((e) => ({
        ...e,
        value: e.value,
        checked: true,
      }));
    }
    setRowList(updateRows);
    setSelectAll(!selectAll);

    const checkedList = updateRows.filter((e) => e.checked);

    if (checkedList.length === 0) {
      if (model?.text) {
        setListModel({
          ...model,
          list: null,
        });
      } else {
        setListModel(null);
      }
    } else {
      if (model?.text) {
        setListModel({
          ...model,
          list: checkedList.map((e) => e.value),
        });
      } else {
        setListModel({
          text: null,
          list: checkedList.map((e) => e.value),
        });
      }
    }
  };

  const checkItem = (value: string) => {
    let allSelected = true;
    const updateRows = rowList.map((e) => {
      if (e.value === value) {
        if (e.checked) {
          allSelected = false;
        }

        return {
          ...e,
          checked: !e.checked,
        };
      } else {
        if (!e.checked) {
          allSelected = false;
        }
        return e;
      }
    });

    setRowList(updateRows);
    setSelectAll(allSelected);

    const checkedList = updateRows.filter((e) => e.checked);

    if (checkedList.length === 0) {
      if (model?.text) {
        setListModel({
          ...model,
          list: null,
        });
      } else {
        setListModel(null);
      }
    } else {
      if (model?.text) {
        setListModel({
          ...model,
          list: checkedList.map((e) => e.value),
        });
      } else {
        setListModel({
          text: null,
          list: checkedList.map((e) => e.value),
        });
      }
    }
  };

  const onChangeListText = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setRowList(
      rowList.map((e) => {
        if (e.value.toLowerCase().includes(value)) {
          return {
            ...e,
            visible: true,
          };
        } else {
          return {
            ...e,
            visible: false,
          };
        }
      }),
    );

    if (value === '') {
      if (model?.list) {
        setListModel({
          ...model,
          text: null,
        });
      } else {
        setListModel(null);
      }
    } else {
      if (model?.list) {
        setListModel({
          ...model,
          text: value,
        });
      } else {
        setListModel({
          ...model,
          text: value,
        });
      }
    }
  };

  const setListModel = (_model: { text: string | null; list: string[] | null } | null) => {
    api.setColumnFilterModel('make', _model).then(() => {
      api.onFilterChanged();
    });
  };

  const onChangeStartDate = (date: Date) => {
    api
      .setColumnFilterModel('date', {
        start: new Date(`${getDateYYYY_MM_DD(date)} 00:00:00`),
        end: endDate,
      })
      .then(() => {
        api.onFilterChanged();
      });

    setStartDate(new Date(`${getDateYYYY_MM_DD(date)} 00:00:00`));
    setIsOpen([false, false]);
  };

  const onChangeEndDate = (date: Date) => {
    api
      .setColumnFilterModel('date', {
        start: startDate,
        end: new Date(`${getDateYYYY_MM_DD(date)} 23:59:59`),
      })
      .then(() => {
        api.onFilterChanged();
      });

    setEndDate(new Date(`${getDateYYYY_MM_DD(date)} 23:59:59`));
    setIsOpen([false, false]);
  };

  const resetDate = () => {
    api.setColumnFilterModel('date', null).then(() => {
      api.onFilterChanged();
    });

    setStartDate(null);
    setEndDate(null);
  };

  const getDateYYYY_MM_DD = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
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

  const comparator = (cellValue: string | null | undefined) => {
    if (model.start === null || model.end === null || cellValue === undefined || cellValue === null) return false;
    const cellDate = new Date(`${cellValue} 00:00:00`);

    if (model.start.getTime() > cellDate.getTime()) {
      return false;
    }
    if (model.end.getTime() < cellDate.getTime()) {
      return false;
    }

    return true;
  };

  const doesFilterPass = useCallback(
    (params: IDoesFilterPassParams) => {
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

        if (!model.list) {
          return true;
        }
        return model.list?.includes(getValue(node));
      }

      if (_filter?.includes('range')) {
        const { node } = params;
        const value = getValue(node);

        if (model.min && model.max) {
          if (Number(model.min) > value) {
            return false;
          }

          if (Number(model.max) < value) {
            return false;
          }
        } else {
          return false;
        }

        return true;
      }

      if (_filter?.includes('date')) {
        const { node } = params;
        const value: string | null | undefined = getValue(node);
        return comparator(value);
      }

      return false;
    },
    [model],
  );

  const afterGuiAttached = useCallback(
    (params?: IAfterGuiAttachedParams) => {
      if (_filter?.includes('list')) {
        if (rowList.length !== 0) return;

        const rows = api.getRenderedNodes();
        const valueArr = rows.map((e) => {
          const { field } = column.getColDef();
          if (field) {
            return e.data[field];
          }
        });

        const uniqueArr = [...new Set(valueArr)];
        const defaultList = uniqueArr.map((e) => ({
          value: e,
          checked: false,
          visible: true,
        }));
        setRowList(defaultList);
      }
      if (!params || !params.suppressFocus) {
        // Focus the input element for keyboard navigation.
        // Can't do this in an effect,
        // as the component is not recreated when hidden and then shown again
        refInput.current?.focus();
      }
    },
    [rowList],
  );

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
              _text={model?.text || ''}
              _handleChange={onChangeListText}
              _handleDelete={() => {
                const e = { target: { value: '' } } as ChangeEvent<HTMLInputElement>;
                onChangeListText(e);
              }}
            />
          </div>

          <div>
            <CheckBox _name="전체선택" _checked={selectAll} _handleClick={clickSelectAll} />
          </div>
          <div className="h-[1px] bg-Gray3 my-8"></div>
          <div className="flex flex-col gap-4">
            {rowList
              .filter((e) => e.visible)
              .map((e) => (
                <CheckBox key={e.value} _name={e.value} _checked={e.checked} _handleClick={() => checkItem(e.value)} />
              ))}
          </div>
        </>
      )}
      {_filter?.includes('range') && (
        <>
          <div className="my-8 text-10 text-Gray7">숫자 범위 입력</div>
          <div className="mb-4">
            <InputBox
              _title="최소값 입력"
              _placeholder="숫자를 입력하세요"
              _text={model?.min || ''}
              _handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                setRangeValue('min', value.replace(/[^0-9]/g, ''));
              }}
            />
          </div>
          <div>
            <InputBox
              _title="최대값 입력"
              _placeholder="숫자를 입력하세요"
              _text={model?.max || ''}
              _handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                setRangeValue('max', value.replace(/[^0-9]/g, ''));
              }}
            />
          </div>
        </>
      )}
      {_filter?.includes('date') && (
        <>
          <div className="h-[1px] bg-Gray3 my-8"></div>
          <div className="my-8 text-10 text-Gray7">검색 날짜 선택</div>
          <div className="flex items-center gap-4">
            <div
              className={`w-[86px] px-8 py-10 flex justify-center text-12 rounded-8 ${startDate ? 'bg-Blue0' : 'bg-Gray0'} ${startDate ? 'text-Blue6' : 'text-Gray7'} cursor-pointer`}
              onClick={() => setIsOpen([true, false])}
            >
              {startDate ? format(startDate, 'yyyy-MM-dd') : '시작 날짜 선택'}
            </div>
            <div>~</div>
            <div
              className={`w-[86px] px-8 py-10 flex justify-center text-12 rounded-8 ${endDate ? 'bg-Blue0' : 'bg-Gray0'} ${endDate ? 'text-Blue6' : 'text-Gray7'} cursor-pointer`}
              onClick={() => setIsOpen([false, true])}
            >
              {endDate ? format(endDate, 'yyyy-MM-dd') : '종료 날짜 선택'}
            </div>
            <div
              className="flex-1 px-8 py-10 flex justify-center text-12 rounded-8 bg-Blue0 cursor-pointer"
              onClick={resetDate}
            >
              reset
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
