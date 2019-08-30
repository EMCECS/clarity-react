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
import {Icon} from "../icon";
import {Button} from "../forms/button";
import {SortOrder, DataGridRow} from "./DataGrid";

/**
 * General file description :
 * Data to render diffrent datagrids in storybook
 */

// Column Data
export const normalColumns = [
    {columnName: "User ID"},
    {columnName: "Name"},
    {columnName: "Creation Date"},
    {columnName: "Favorite color"},
];

// Row Data
export const normalRows = [
    {
        content: [
            {columnName: "User ID", content: 41512},
            {columnName: "Name", content: "Georgia"},
            {columnName: "Creation Date", content: "Sep 11, 2008"},
            {columnName: "Favorite color", content: "Blue"},
        ],
    },
    {
        content: [
            {columnName: "User ID", content: 16166},
            {columnName: "Name", content: "Brynn"},
            {columnName: "Creation Date", content: "Aug 2, 2014"},
            {columnName: "Favorite color", content: "Orange"},
        ],
    },
    {
        content: [
            {columnName: "User ID", content: 30574},
            {columnName: "Name", content: "Brad"},
            {columnName: "Creation Date", content: "Jan 4, 2019"},
            {columnName: "Favorite color", content: "Yellow"},
        ],
    },
];

// Footer data
export const footer = {
    content: "Total 2 users",
};

export const customRows = [
    {
        content: [
            {columnName: "User ID", content: 41512},
            {columnName: "Name", content: "Georgia"},
            {columnName: "Creation Date", content: "Sep 11, 2008"},
            {
                columnName: "Favorite color",
                content: (
                    <div>
                        <Icon shape="time" />
                        {"Critical"}
                    </div>
                ),
            },
        ],
    },
    {
        content: [
            {columnName: "User ID", content: 16166},
            {columnName: "Name", content: "Brynn"},
            {columnName: "Creation Date", content: "Aug 2, 2014"},
            {
                columnName: "Favorite color",
                content: (
                    <div>
                        <Icon shape="time" />
                        {"Critical"}
                    </div>
                ),
            },
        ],
    },
];

// Column Data
export const sortColumns = [
    {columnName: "User ID", sort: {defaultSorOrder: SortOrder.ASC, sortFunction: sortFunction}},
    {columnName: "Name", sort: {defaultSorOrder: SortOrder.NONE, sortFunction: sortFunction}},
    {columnName: "Creation Date"},
    {columnName: "Favorite color"},
];

// Row Data
export const sortRows = [
    {
        content: [
            {columnName: "User ID", content: 41512},
            {columnName: "Name", content: "Georgia"},
            {columnName: "Creation Date", content: "Sep 11, 2008"},
            {columnName: "Favorite color", content: "Blue"},
        ],
    },
    {
        content: [
            {columnName: "User ID", content: 16166},
            {columnName: "Name", content: "Brynn"},
            {columnName: "Creation Date", content: "Aug 2, 2014"},
            {columnName: "Favorite color", content: "Orange"},
        ],
    },
    {
        content: [
            {columnName: "User ID", content: 30574},
            {columnName: "Name", content: "Brad"},
            {columnName: "Creation Date", content: "Jan 4, 2019"},
            {columnName: "Favorite color", content: "Yellow"},
        ],
    },
];

function sortFunction(rows: DataGridRow[], sortOrder: SortOrder, columnName: string) {
    alert("in sort");
    rows.sort(function(first: DataGridRow, second: DataGridRow): number {
        let result = 0;
        let firstRecord = first.content.find(function(element: any) {
            return element.columnID === columnName;
        });

        let secondRecord = first.content.find(function(element: any) {
            return element.columnID === columnName;
        });

        if (firstRecord && secondRecord) {
            if (sortOrder == SortOrder.ASC) result = firstRecord.content - secondRecord.content;
            else if (sortOrder == SortOrder.DESC) result = secondRecord.content - firstRecord.content;
        }
        return result;
    });

    return rows;
}
// Grid Action component
type GridActionsState = {
    selectedRows: any[];
    showEdit: boolean;
};

export class GridActions extends React.PureComponent<any, GridActionsState> {
    state = {
        selectedRows: [],
        showEdit: false,
    };

    updateActions(rows: any) {
        this.setState({
            selectedRows: rows,
            showEdit: rows.length === 1 ? true : false,
        });
    }

    render() {
        const {selectedRows, showEdit} = this.state;
        return (
            <div>
                <Button key="new">NEW</Button>
                <Button key="edit" show={showEdit}>
                    EDIT
                </Button>

                <Button
                    key="delete"
                    onClick={() => {
                        alert("Deleted" + selectedRows.length);
                    }}
                >
                    DELELTE
                </Button>
            </div>
        );
    }
}
