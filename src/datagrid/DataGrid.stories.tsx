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
import {DataGrid, GridSelectionType, GridRowType, SortOrder, DataGridFilter, FilterType} from ".";
import {
    normalColumns,
    normalRows,
    customRows,
    footer,
    GridActions,
    sortColumns,
    expandableRows,
    filterFunction,
    sortFunction,
    paginationDetails,
    paginationRows,
    pageFilterFunction,
} from "./DataGridValues";
import {CustomFilter} from "./CustomFilter";

// Refrence to call dataGrid methods
const datagridRef = React.createRef<DataGrid>();
const datagridActionsRef = React.createRef<GridActions>();
const datagridFilterRef = React.createRef<DataGrid>();
const datagridFilterSortRef = React.createRef<DataGrid>();
const datagridCustomFilterRef = React.createRef<DataGrid>();
const datagridPageFilterRef = React.createRef<DataGrid>();
const datagridFullDemoRef = React.createRef<DataGrid>();
const filterRef = React.createRef<DataGridFilter>();

storiesOf("DataGrid", module)
    .add("Basic grid", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} rows={normalRows} footer={footer} />
        </div>
    ))
    .add("Grid with custom cells", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} rows={customRows} footer={footer} />
        </div>
    ))
    .add("Grid with multi select option", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                columns={normalColumns}
                rows={normalRows}
                footer={footer}
                selectionType={GridSelectionType.MULTI}
            />
        </div>
    ))
    .add("Grid with single select option", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                columns={normalColumns}
                rows={normalRows}
                footer={footer}
                selectionType={GridSelectionType.SINGLE}
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
                footer={footer}
                selectionType={GridSelectionType.MULTI}
                onRowSelect={() => {
                    const rows = datagridRef.current!.getSelectedRows();
                    datagridActionsRef.current!.updateActions(rows);
                }}
                onSelectAll={() => {
                    const rows = datagridRef.current!.getSelectedRows();
                    datagridActionsRef.current!.updateActions(rows);
                }}
            />
        </div>
    ))
    .add("Grid with sorting", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={sortColumns} rows={normalRows} footer={footer} />
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
                footer={footer}
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
                footer={footer}
                selectionType={GridSelectionType.MULTI}
            />
        </div>
    ))
    .add("Grid with Custom filter", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                ref={datagridCustomFilterRef}
                columns={[
                    {
                        columnName: "User ID",
                        style: {width: "96px"},
                    },
                    {
                        columnName: "Name",
                        style: {width: "96px"},
                        filter: (
                            <DataGridFilter
                                ref={filterRef}
                                onFilter={filterFunction}
                                columnName={"Name"}
                                datagridRef={datagridCustomFilterRef}
                                filterType={FilterType.CUSTOM}
                                customFilter={<CustomFilter datagridFilterRef={filterRef} />}
                            />
                        ),
                    },
                    {columnName: "Creation Date", style: {width: "96px"}},
                    {columnName: "Favorite color", style: {width: "96px"}},
                ]}
                rows={normalRows}
                footer={footer}
            />
        </div>
    ))
    .add("Grid with expandable row", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} rows={expandableRows} footer={footer} rowType={GridRowType.EXPANDABLE} />
        </div>
    ))
    .add("Empty data grid", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} footer={{footerData: "0 users"}} />
        </div>
    ))
    .add("Grid with compact row", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} rows={normalRows} footer={footer} rowType={GridRowType.COMPACT} />
        </div>
    ))
    .add("Grid with fixed height", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                columns={normalColumns}
                rows={normalRows}
                footer={footer}
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
            />
        </div>
    ))
    .add("Grid full demo", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                ref={datagridFullDemoRef}
                itemText={"Users"}
                columns={[
                    {
                        columnName: "User ID",
                        style: {width: "96px"},
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
                        style: {width: "96px"},
                        sort: {defaultSortOrder: SortOrder.NONE, sortFunction: sortFunction},
                        filter: (
                            <DataGridFilter
                                onFilter={pageFilterFunction}
                                columnName={"Name"}
                                datagridRef={datagridFullDemoRef}
                            />
                        ),
                    },
                    {columnName: "Creation Date", style: {width: "96px"}},
                    {columnName: "Favorite color", style: {width: "96px"}},
                ]}
                rows={paginationRows.slice(0, 5)}
                pagination={paginationDetails}
                selectionType={GridSelectionType.MULTI}
            />
        </div>
    ));
