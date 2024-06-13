'use client';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme

import { CheckboxSelectionCallbackParams, ColDef, HeaderCheckboxSelectionCallbackParams } from 'ag-grid-community';
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
  const [colDefs] = useState<ColDef[]>([
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

  // const after2010 = useCallback(() => {
  //   gridRef
  //     .current!.api.setColumnFilterModel('date', {
  //       conditions: [
  //         {
  //           type: 'equals',
  //           dateFrom: '2024-05-29',
  //           dateTo: null,
  //         },
  //         {
  //           type: 'greaterThan',
  //           dateFrom: '2024-05-29',
  //           dateTo: null,
  //         },
  //       ],
  //       operator: 'OR',
  //     })
  //     .then(() => {
  //       gridRef.current!.api.onFilterChanged();
  //     });
  // }, []);

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
        headerHeight={60}
        rowHeight={60}
        columnMenu={'new'}
        defaultColDef={defaultColDef}
        columnDefs={colDefs}
        onRowSelected={onRowSelected}
      />
    </div>
  );
};

const styles = () => [
  tw`
    h-[1000px] // the grid will fill the size of the parent container
  `,
  css`
    /* Changes the color of the grid text */
    --ag-foreground-color: var(--Black);
    /* Changes the color of the grid background */
    --ag-background-color: var(--White);
    /* Changes the header color of the top row */
    --ag-header-background-color: var(--Blue0);
    /* Changes the hover color of the row*/
    --ag-row-hover-color: rgba(0, 38, 255, 0.1);

    --ag-header-column-resize-handle-width: 1px;
    --ag-header-column-resize-handle-height: 100%;

    --ag-cell-horizontal-padding: 8px;
    --ag-cell-horizontal-border: solid var(--Gray5);

    --ag-icon-font-code-filter: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='5' y='5' width='6' height='1' rx='0.5' fill='%23228BE6'/%3E%3Crect x='5' y='7.5' width='4' height='1' rx='0.5' fill='%23228BE6'/%3E%3Crect x='5' y='10' width='2' height='1' rx='0.5' fill='%23228BE6'/%3E%3C/svg%3E%0A");

    --ag-icon-font-code-asc: '\f062';
    --ag-icon-font-code-desc: '\f063';

    .ag-header-cell:first-of-type {
      .ag-header-cell-comp-wrapper {
        width: 0;
      }
    }

    .ag-ltr .ag-header-select-all {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .ag-cell:first-of-type {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .ag-cell {
      display: flex;
      align-items: center;
    }
    .ag-ltr .ag-header-select-all {
      margin: 0;
    }
    .ag-ltr .ag-selection-checkbox {
      margin: 0;
    }

    .ag-header-cell-text {
      ${tw`
        text-12 font-400
        `}
      color: var(--Blue6);
    }

    .ag-header-cell-resize::after {
      background-color: var(--Gray5);
    }
  `,
];

export default AgGrid;
