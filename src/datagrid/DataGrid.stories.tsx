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
import {
    DataGridColumn,
    DataGridRow,
    DataGridCell,
    DataGridFooter,
    DataGrid,
    DataGridColumnHeader,
    DataGridRowContainer,
    DataGridBody,
} from "./DataGrid";
storiesOf("DataGrid", module).add("Basic", () => (
    <div style={{width: "80%"}}>
        <DataGrid>
            <DataGridBody>
                <DataGridColumnHeader>
                    <DataGridColumn>{"User ID"}</DataGridColumn>
                    <DataGridColumn>{"Name"}</DataGridColumn>
                    <DataGridColumn> {"Creation date"}</DataGridColumn>
                    <DataGridColumn>{"Favorite color"}</DataGridColumn>
                </DataGridColumnHeader>
                <DataGridRowContainer>
                    <DataGridRow>
                        <DataGridCell> {41512} </DataGridCell>
                        <DataGridCell> {"Georgia"} </DataGridCell>
                        <DataGridCell> {"Sep 11, 2018"} </DataGridCell>
                        <DataGridCell> {"Blue"} </DataGridCell>
                    </DataGridRow>
                    <DataGridRow>
                        <DataGridCell> {9524} </DataGridCell>
                        <DataGridCell> {"Brynn"} </DataGridCell>
                        <DataGridCell> {"Aug 2, 2014"} </DataGridCell>
                        <DataGridCell> {"Purple"} </DataGridCell>
                    </DataGridRow>
                </DataGridRowContainer>
            </DataGridBody>
            <DataGridFooter> {"10 users"} </DataGridFooter>
        </DataGrid>
    </div>
));
