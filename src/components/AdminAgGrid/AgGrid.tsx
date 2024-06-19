/** @jsxImportSource @emotion/react */
'use client';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme

import {
  CheckboxSelectionCallbackParams,
  ColDef,
  ColGroupDef,
  HeaderCheckboxSelectionCallbackParams,
} from 'ag-grid-community';
import { useCallback, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import tw from 'twin.macro';
import TagCell from './TagCell';
import Filter from './Filter';

// Row Data Interface
interface IRow {
  make: string;
  model: string;
  price: number;
  tags?: string[];
  electric: boolean;
  date?: string;
}

function isFirstColumn(params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams) {
  const displayedColumns = params.api.getAllDisplayedColumns();
  const thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

const AgGrid = () => {
  const gridRef = useRef<AgGridReact<IRow>>(null);
  const [rowList, setRowList] = useState<
    {
      value: string;
      checked: boolean;
      visible: boolean;
    }[]
  >([]);
  // Row Data: The data to be displayed.
  const [rowData] = useState<IRow[]>([
    { make: 'Tesla', model: 'Model Y', date: '2024-05-29', price: 64950, electric: true },
    {
      make: 'Ford',
      model: 'Series',
      date: '2024-05-29',
      price: 330,
      electric: false,
    },
    { make: 'Toyota', model: 'Corolla', date: '2024-05-30', price: 29600, electric: false },
    { make: 'Toyota', model: 'Corolla', date: '2024-06-01', price: 29600, electric: false },
    { make: 'Toyota', model: 'Corolla', date: '2024-05-29', price: 29600, electric: false },
    { make: 'Mercedes', model: 'EQA', date: '2024-05-28', price: 48890, electric: true },
    { make: 'Fiat', model: '500', date: '2024-05-27', price: 15774, electric: false },
    { make: 'Fiat', model: '500', date: '2024-05-26', price: 15774, electric: false },
    { make: 'Fiat', model: '500', date: '2024-05-25', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', date: '2024-06-02', price: 20675, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: '기본 정보',
      children: [
        {
          headerCheckboxSelection: true,
          showDisabledCheckboxes: true,
          minWidth: 60,
          maxWidth: 60,
          lockVisible: true,
          sortable: false,
          lockPosition: 'left',
        },
        {
          headerName: '상표',
          field: 'make',
          checkboxSelection: false,
          sortable: false,
          filter: Filter,
          filterParams: {
            _filter: ['list'],
            _rowList: rowList,
            _setRowList: setRowList,
          },
        },
        {
          headerName: '날짜',
          field: 'date',
          checkboxSelection: false,
          sortable: false,
          filter: Filter,
          filterParams: {
            _filter: ['date'],
          },
        },
        {
          headerName: '태그',
          field: 'tags',
          checkboxSelection: false,
          sortable: false,
          filter: Filter,
          filterParams: {
            _filter: [],
          },
          cellRenderer: TagCell,
        },
        {
          headerName: '모델',
          field: 'model',
          checkboxSelection: false,
          sortable: false,
          filter: Filter,
          filterParams: {
            _filter: ['search'],
          },
        },
      ],
    },

    {
      headerName: '가격',
      field: 'price',
      checkboxSelection: false,
      sortable: false,
      filter: Filter,
      filterParams: {
        _filter: ['range'],
      },
    },
    { field: 'electric', sortable: false, checkboxSelection: false },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      headerCheckboxSelection: isFirstColumn,
      checkboxSelection: isFirstColumn,
    };
  }, []);

  const onRowSelected = useCallback(() => {
    const selectedRows = gridRef.current!.api.getSelectedRows();

    selectedRows.forEach(() => {
      // console.log(selectedRow);
    });
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      css={styles()}
    >
      <AgGridReact
        ref={gridRef}
        reactiveCustomComponents={true}
        rowData={rowData}
        rowSelection={'multiple'}
        rowMultiSelectWithClick={true}
        headerHeight={42}
        rowHeight={42}
        columnMenu={'new'}
        defaultColDef={defaultColDef}
        columnDefs={colDefs}
        pagination={true}
        onRowSelected={onRowSelected}
      />
    </div>
  );
};

const styles = () => [
  tw`
    h-[560px] // the grid will fill the size of the parent container
  `,
  css``,
];

export default AgGrid;
