/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import * as React from "react";
import {storiesOf} from "@storybook/react";
import {State, Store} from "@sambego/storybook-state";
import {Icon} from "../icon";
import {DataGrid, GridSelectionType, GridRowType, SortOrder, DataGridFilter, FilterType, DataGridRow} from ".";
import {
    normalColumns,
    normalRows,
    customRows,
    customRowsWithPassword,
    customFooter,
    defaultFooter,
    GridActions,
    sortColumns,
    expandableRows,
    filterFunction,
    sortFunction,
    paginationDetails,
    paginationDetailsWithCompactFooter,
    paginationRows,
    pageFilterFunction,
    hideableColumns,
    hideShowColFooter,
    selectedRows,
    alreadySelectedRows,
    getSelectableRowsData,
    paginationDetailsForAlreadySelectedRows,
    rowsWithDetailPane,
    paginationDetailsForDetailsPane,
    paginationRowsWithLinks,
} from "./DataGridValues";
import {CustomFilter} from "./CustomFilter";
import {CustomFilterMulti} from "./CustomFilterMulti";

const store = new Store({
    selectedRows: selectedRows,
    rows: alreadySelectedRows.slice(0, 5),
    selectRowCallback: (row: DataGridRow) => {
        const rowID = row && row.rowData[0].cellData;
        const index = selectedRows.indexOf(rowID);
        if (row && row.isSelected) {
            // add element
            selectedRows.push(rowID);
        } else {
            //remove element
            selectedRows.splice(index, 1);
        }
        store.set({
            selectedRows: selectedRows,
        });
    },
    selectAllCallback: (allSelected: boolean, rows: DataGridRow[]) => {
        rows!.forEach(row => {
            const rowID = row.rowData[0].cellData;
            const index = selectedRows.indexOf(rowID);

            if (allSelected) {
                index === -1 && selectedRows.push(rowID);
            } else {
                selectedRows.splice(index, 1);
            }
        });

        store.set({
            selectedRows: selectedRows,
        });
    },
    paginationDetails: paginationDetailsForAlreadySelectedRows,
});
// Refrence to call dataGrid methods
const datagridRef = React.createRef<DataGrid>();
const datagridActionsRef = React.createRef<GridActions>();
const datagridFilterRef = React.createRef<DataGrid>();
const datagridFilterSortRef = React.createRef<DataGrid>();
const datagridCustomFilterRef = React.createRef<DataGrid>();
const datagridCustomFilterMultiRef = React.createRef<DataGrid>();
const datagridFullDemoRef = React.createRef<DataGrid>();
const datagridDetailsDemoRef = React.createRef<DataGrid>();

storiesOf("DataGrid", module)
    .add("Basic grid", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} rows={normalRows} footer={defaultFooter} />
        </div>
    ))
    .add("Grid with custom cells and footer", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} rows={customRows} footer={customFooter} />
        </div>
    ))
    .add("Grid with multi select option and no footer", () => (
        <div style={{width: "80%", paddingLeft: "1rem"}}>
            <br />
            <span> {"Grid with all rows are selectable :"} </span>
            <DataGrid columns={normalColumns} rows={normalRows} selectionType={GridSelectionType.MULTI} />
            <br /> <br />
            <span> {"Grid with some rows are selectable :"} </span>
            <DataGrid
                columns={normalColumns}
                rows={getSelectableRowsData()}
                selectionType={GridSelectionType.MULTI}
                footer={defaultFooter}
                id="multi-select-datagrid"
            />
        </div>
    ))
    .add("Grid with single select option", () => (
        <div style={{width: "80%", paddingLeft: "1rem"}}>
            <br />
            <span> {"Grid with all rows are selectable :"} </span>
            <DataGrid
                columns={normalColumns}
                rows={normalRows}
                selectionType={GridSelectionType.SINGLE}
                footer={defaultFooter}
            />
            <br /> <br />
            <span> {"Grid with some rows are selectable :"} </span>
            <DataGrid
                columns={normalColumns}
                rows={getSelectableRowsData()}
                selectionType={GridSelectionType.SINGLE}
                footer={defaultFooter}
                id="single-select-datagrid"
            />
        </div>
    ))
    .add("Grid with batch action", () => (
        <div style={{width: "80%"}}>
            <GridActions ref={datagridActionsRef} />
            <DataGrid
                ref={datagridRef}
                columns={normalColumns}
                rows={normalRows}
                selectionType={GridSelectionType.MULTI}
                onRowSelect={() => {
                    const rows = datagridRef.current!.getSelectedRows();
                    datagridActionsRef.current!.updateActions(rows);
                }}
                onSelectAll={() => {
                    const rows = datagridRef.current!.getSelectedRows();
                    datagridActionsRef.current!.updateActions(rows);
                }}
                footer={defaultFooter}
            />
        </div>
    ))
    .add("Grid with sorting", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={sortColumns} rows={normalRows} footer={defaultFooter} />
        </div>
    ))
    .add("Grid with filter", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                ref={datagridFilterRef}
                columns={[
                    {
                        columnName: "User ID",
                        style: {width: "96px"},
                        filter: (
                            <DataGridFilter
                                placeholder={"Enter user ID"}
                                onFilter={filterFunction}
                                columnName={"User ID"}
                                datagridRef={datagridFilterRef}
                            />
                        ),
                    },
                    {
                        columnName: "Name",
                        style: {width: "96px"},
                        filter: (
                            <DataGridFilter
                                onFilter={filterFunction}
                                columnName={"Name"}
                                datagridRef={datagridFilterRef}
                            />
                        ),
                    },
                    {columnName: "Creation Date", style: {width: "96px"}},
                    {columnName: "Favorite color", style: {width: "96px"}},
                ]}
                rows={normalRows}
                footer={defaultFooter}
            />
        </div>
    ))
    .add("Grid with sorting and filter", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                ref={datagridFilterSortRef}
                columns={[
                    {
                        columnName: "User ID",
                        style: {width: "96px"},
                        sort: {defaultSortOrder: SortOrder.ASC, sortFunction: sortFunction},
                        filter: (
                            <DataGridFilter
                                onFilter={filterFunction}
                                columnName={"User ID"}
                                datagridRef={datagridFilterSortRef}
                            />
                        ),
                    },
                    {
                        columnName: "Name",
                        style: {width: "96px"},
                        sort: {defaultSortOrder: SortOrder.NONE, sortFunction: sortFunction},
                        filter: (
                            <DataGridFilter
                                onFilter={filterFunction}
                                columnName={"Name"}
                                datagridRef={datagridFilterSortRef}
                            />
                        ),
                    },
                    {columnName: "Creation Date", style: {width: "96px"}},
                    {columnName: "Favorite color", style: {width: "96px"}},
                ]}
                rows={normalRows}
                footer={defaultFooter}
                selectionType={GridSelectionType.MULTI}
            />
        </div>
    ))
    .add("Grid with Custom filter", () => (
        <React.Fragment>
            <div style={{width: "80%"}}>
                <label> {"Datagrid with Custom filter for single value filter"} </label>
                <DataGrid
                    ref={datagridCustomFilterRef}
                    columns={[
                        {columnName: "User ID"},
                        {
                            columnName: "Name",
                            filter: (
                                <DataGridFilter
                                    onFilter={filterFunction}
                                    columnName={"Name"}
                                    datagridRef={datagridCustomFilterRef}
                                    filterType={FilterType.CUSTOM}
                                >
                                    <CustomFilter />
                                </DataGridFilter>
                            ),
                        },
                        {columnName: "Creation Date"},
                        {columnName: "Favorite color"},
                    ]}
                    rows={normalRows}
                    footer={defaultFooter}
                />
            </div>
            <br /> <br />
            <div style={{width: "80%"}}>
                <label> {"Datagrid with Custom filter for multiple values filter"} </label>
                <DataGrid
                    ref={datagridCustomFilterMultiRef}
                    columns={[
                        {columnName: "User ID"},
                        {columnName: "Name"},
                        {columnName: "Creation Date"},
                        {
                            columnName: "Favorite color",
                            filter: (
                                <DataGridFilter
                                    onFilter={filterFunction}
                                    columnName={"Favorite color"}
                                    datagridRef={datagridCustomFilterMultiRef}
                                    filterType={FilterType.CUSTOM}
                                >
                                    <CustomFilterMulti />
                                </DataGridFilter>
                            ),
                        },
                    ]}
                    rows={normalRows}
                    footer={defaultFooter}
                />
            </div>
        </React.Fragment>
    ))
    .add("Grid with expandable row", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                columns={normalColumns}
                rows={expandableRows}
                footer={defaultFooter}
                rowType={GridRowType.EXPANDABLE}
            />
        </div>
    ))
    .add("Empty data grid", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} footer={defaultFooter} />
        </div>
    ))
    .add("Grid with compact row", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} rows={normalRows} footer={defaultFooter} rowType={GridRowType.COMPACT} />
        </div>
    ))
    .add("Grid with fixed height", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                columns={normalColumns}
                rows={normalRows}
                footer={defaultFooter}
                //Give fixed height here
                style={{height: "185px"}}
            />
        </div>
    ))
    .add("Grid with pagination", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                columns={normalColumns}
                rows={paginationRows.slice(0, 5)}
                pagination={paginationDetails}
                itemText={"Users"}
                footer={{showFooter: true}}
            />
        </div>
    ))
    .add("Grid with pagination and compact footer", () => (
        <div style={{width: "40%"}}>
            <DataGrid
                columns={normalColumns}
                rows={paginationRows.slice(0, 5)}
                pagination={paginationDetailsWithCompactFooter}
                itemText={"Users"}
                footer={{showFooter: true}}
            />
        </div>
    ))
    .add("Grid with Hide and Show Column", () => (
        <div style={{width: "80%", paddingTop: "5%"}}>
            <DataGrid columns={hideableColumns} rows={normalRows} footer={hideShowColFooter} />
        </div>
    ))
    .add("Grid show selected row count", () => (
        <State store={store}>
            {state => (
                <div style={{width: "80%", paddingTop: "5%"}}>
                    <DataGrid
                        itemText={"Users"}
                        columns={normalColumns}
                        rows={state.rows}
                        pagination={state.paginationDetails}
                        selectionType={GridSelectionType.MULTI}
                        selectedRowCount={state.selectedRows.length}
                        onRowSelect={state.selectRowCallback}
                        onSelectAll={state.selectAllCallback}
                        footer={{showFooter: true}}
                    />
                </div>
            )}
        </State>
    ))
    .add("Grid with detail pane", () => (
        <div style={{width: "80%", paddingTop: "5%"}}>
            <DataGrid
                columns={sortColumns}
                rows={rowsWithDetailPane.slice(0, 5)}
                footer={hideShowColFooter}
                pagination={paginationDetailsForDetailsPane}
                rowType={GridRowType.EXPANDABLE_ROWS_WITH_DETAIL_PANE}
                selectionType={GridSelectionType.MULTI}
            />
        </div>
    ))
    .add("Grid with read-only password", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} rows={customRowsWithPassword} footer={customFooter} />
        </div>
    ))
    .add("Grid full demo", () => (
        <div style={{width: "80%", paddingTop: "5%"}}>
            <DataGrid
                ref={datagridFullDemoRef}
                itemText={"Users"}
                columns={[
                    {
                        columnName: "User ID",
                        displayName: (
                            <div>
                                <Icon shape="user" className="is-solid" /> {"User ID"}
                            </div>
                        ),
                        sort: {defaultSortOrder: SortOrder.ASC, sortFunction: sortFunction},
                        filter: (
                            <DataGridFilter
                                onFilter={pageFilterFunction}
                                columnName={"User ID"}
                                datagridRef={datagridFullDemoRef}
                            />
                        ),
                    },
                    {
                        columnName: "Name",
                        displayName: (
                            <div>
                                <Icon shape="administrator" className="is-solid" /> {"Name"}
                            </div>
                        ),
                        sort: {defaultSortOrder: SortOrder.NONE, sortFunction: sortFunction},
                        filter: (
                            <DataGridFilter
                                onFilter={pageFilterFunction}
                                columnName={"Name"}
                                datagridRef={datagridFullDemoRef}
                            />
                        ),
                    },
                    {columnName: "Creation Date", style: {width: "20%"}},
                    {
                        columnName: "Favorite color",
                        isVisible: false,
                        displayName: (
                            <div>
                                <Icon shape="color-palette" className="is-solid" /> {"Favorite color"}{" "}
                            </div>
                        ),
                    },
                ]}
                rows={paginationRows.slice(0, 5)}
                pagination={paginationDetails}
                selectionType={GridSelectionType.MULTI}
                footer={hideShowColFooter}
            />
        </div>
    ))
    .add("Grid Demo with support to open/close details pane", () => {
        // function to handle
        const handleLinkClick = (rowIndex: number) => {
            datagridDetailsDemoRef &&
                datagridDetailsDemoRef.current &&
                datagridDetailsDemoRef.current.handleDetailPaneToggle(rowIndex);
        };

        return (
            <div style={{width: "80%", paddingTop: "5%"}}>
                <DataGrid
                    ref={datagridDetailsDemoRef}
                    itemText={"Users"}
                    columns={[
                        {
                            columnName: "User ID",
                            displayName: (
                                <div>
                                    <Icon shape="user" className="is-solid" /> {"User ID"}
                                </div>
                            ),
                            isVisible: false,
                            sort: {defaultSortOrder: SortOrder.ASC, sortFunction: sortFunction},
                            filter: (
                                <DataGridFilter
                                    onFilter={pageFilterFunction}
                                    columnName={"User ID"}
                                    datagridRef={datagridFullDemoRef}
                                />
                            ),
                        },
                        {
                            columnName: "Name",
                            displayName: (
                                <div>
                                    <Icon shape="administrator" className="is-solid" /> {"Name"}
                                </div>
                            ),
                            sort: {defaultSortOrder: SortOrder.NONE, sortFunction: sortFunction},
                            filter: (
                                <DataGridFilter
                                    onFilter={pageFilterFunction}
                                    columnName={"Name"}
                                    datagridRef={datagridFullDemoRef}
                                />
                            ),
                        },
                        {columnName: "Creation Date", style: {width: "20%"}},
                        {
                            columnName: "Favorite color",
                            displayName: (
                                <div>
                                    <Icon shape="color-palette" className="is-solid" /> {"Favorite color"}{" "}
                                </div>
                            ),
                        },
                    ]}
                    rows={paginationRowsWithLinks(handleLinkClick).slice(0, 5)}
                    rowType={GridRowType.ROWS_WITH_DETAIL_PANE}
                    pagination={paginationDetails}
                    selectionType={GridSelectionType.MULTI}
                    footer={hideShowColFooter}
                />
            </div>
        );
    });
