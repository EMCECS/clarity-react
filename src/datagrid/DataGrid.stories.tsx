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
import {DataGrid, GridSelectionType} from "./DataGrid";
import {normalColumns, normalRows, customRows, footer, GridActions, sortColumns, sortRows} from "./DataGridValues";

// Refrence to call dataGrid methods
const datagridRef = React.createRef<DataGrid>();
const datagridActionsRef = React.createRef<GridActions>();

storiesOf("DataGrid", module)
    .add("Basic grid", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} data={normalRows} footer={footer} />
        </div>
    ))
    .add("Grid with custom cells", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={normalColumns} data={customRows} footer={footer} />
        </div>
    ))
    .add("Grid with multi select option", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                columns={normalColumns}
                data={normalRows}
                footer={footer}
                selectionType={GridSelectionType.MULTI}
            />
        </div>
    ))
    .add("Grid with single select option", () => (
        <div style={{width: "80%"}}>
            <DataGrid
                columns={normalColumns}
                data={normalRows}
                footer={footer}
                selectionType={GridSelectionType.MULTI}
            />
        </div>
    ))

    .add("Grid with batch action", () => (
        <div style={{width: "80%"}}>
            <GridActions ref={datagridActionsRef} />
            <DataGrid
                ref={datagridRef}
                columns={normalColumns}
                data={normalRows}
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
    .add("Grid with batch action", () => (
        <div style={{width: "80%"}}>
            <GridActions ref={datagridActionsRef} />
            <DataGrid
                ref={datagridRef}
                columns={normalColumns}
                data={normalRows}
                footer={footer}
                selectionType={GridSelectionType.MULTI}
                onRowSelect={() => {
                    const rows = datagridRef.current!.getSelectedRows();
                    datagridActionsRef.current!.updateActions(rows);
                }}
            />
        </div>
    ))
    .add("Grid with sorting", () => (
        <div style={{width: "80%"}}>
            <DataGrid columns={sortColumns} data={sortRows} footer={footer} />
        </div>
    ));
