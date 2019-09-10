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
import {SortOrder, DataGridRow} from ".";

/**
 * General file description :
 * Data to render diffrent datagrids in storybook
 */

// Column Data
export const normalColumns = [
    {columnName: "User ID", style: {width: "96px"}},
    {columnName: "Name", style: {width: "96px"}},
    {columnName: "Creation Date", style: {width: "96px"}},
    {columnName: "Favorite color", style: {width: "96px"}},
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

// Column Data with sort option
export const sortColumns = [
    {
        columnName: "User ID",
        style: {width: "96px"},
        sort: {defaultSortOrder: SortOrder.ASC, sortFunction: sortFunction},
    },
    {columnName: "Name", style: {width: "96px"}, sort: {defaultSortOrder: SortOrder.NONE, sortFunction: sortFunction}},
    {columnName: "Creation Date", style: {width: "96px"}},
    {columnName: "Favorite color", style: {width: "96px"}},
];

// Custom sorting function for number and string type
export function sortFunction(rows: DataGridRow[], sortOrder: SortOrder, columnName: string) {
    rows.sort(function(first: DataGridRow, second: DataGridRow): number {
        let result = 0;
        let firstRecord = first.content.find(function(element: any) {
            if (element.columnName === columnName) return element;
        });

        let secondRecord = second.content.find(function(element: any) {
            if (element.columnName === columnName) return element;
        });

        if (firstRecord && secondRecord) {
            const contentType = typeof firstRecord.content;

            if (sortOrder === SortOrder.ASC) {
                if (contentType === "number") {
                    result = firstRecord.content - secondRecord.content;
                } else if (contentType === "string") {
                    if (firstRecord.content > secondRecord.content) result = -1;
                    else if (firstRecord.content < secondRecord.content) result = 1;
                }
            } else if (sortOrder == SortOrder.DESC) {
                if (contentType === "number") {
                    result = secondRecord.content - firstRecord.content;
                } else if (contentType === "string") {
                    if (secondRecord.content > firstRecord.content) result = -1;
                    else if (secondRecord.content < firstRecord.content) result = 1;
                }
            }
        }

        return result;
    });

    return rows;
}

//Custom function to filter data
export function filterFunction(rows: DataGridRow[], columnValue: string, columnName: string) {
    if (columnValue === "" || columnValue === undefined) {
        return normalRows;
    }
    let newRows = rows.filter(function(row) {
        let matchFound = false;
        for (let index in row.content) {
            let content = String(row.content[index].content);
            if (content.indexOf(columnValue) !== -1) {
                matchFound = true;
            }
        }
        if (matchFound) return row;
    });
    return newRows;
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
                    DELETE
                </Button>
            </div>
        );
    }
}

const expandableContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in neque in ante placerat mattis id sed quam. Proin rhoncus lacus et tempor dignissim. Vivamus sem quam, pellentesque aliquet suscipit eget, pellentesque sed arcu. Vivamus in dui lectus. Suspendisse cursus est ac nisl imperdiet viverra. Aenean sagittis nibh lacus, in eleifend urna ultrices et. Mauris porttitor nisi nec velit pharetra porttitor. Vestibulum vulputate sollicitudin dolor ut tincidunt. Phasellus vitae blandit felis. Nullam posuere ipsum tincidunt velit pellentesque rhoncus. Morbi faucibus ut ipsum at malesuada. Nam vestibulum felis sit amet metus finibus hendrerit. Fusce faucibus odio eget ex vulputate rhoncus. Fusce nec aliquam leo, at suscipit diam.";
// Expandable row data
export const expandableRows = [
    {
        content: [
            {columnName: "User ID", content: 41512},
            {columnName: "Name", content: "Georgia"},
            {columnName: "Creation Date", content: "Sep 11, 2008"},
            {columnName: "Favorite color", content: "Blue"},
        ],
        expandableContent: expandableContent,
    },
    {
        content: [
            {columnName: "User ID", content: 16166},
            {columnName: "Name", content: "Brynn"},
            {columnName: "Creation Date", content: "Aug 2, 2014"},
            {columnName: "Favorite color", content: "Orange"},
        ],
        expandableContent: expandableContent,
    },
    {
        content: [
            {columnName: "User ID", content: 30574},
            {columnName: "Name", content: "Brad"},
            {columnName: "Creation Date", content: "Jan 4, 2019"},
            {columnName: "Favorite color", content: "Yellow"},
        ],
        expandableContent: expandableContent,
    },
];
