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

/**
 * Data for Columns
 */
export const normalColumns = [
    {columnName: "User ID", style: {width: "96px"}},
    {columnName: "Name", style: {width: "96px"}},
    {columnName: "Creation Date", style: {width: "96px"}},
    {columnName: "Favorite color", style: {width: "96px"}},
];

/**
 * Data for Rows
 */
export const normalRows = [
    {
        rowData: [
            {columnName: "User ID", cellData: 41512},
            {columnName: "Name", cellData: "Georgia"},
            {columnName: "Creation Date", cellData: "Sep 11, 2008"},
            {columnName: "Favorite color", cellData: "Blue"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 16166},
            {columnName: "Name", cellData: "Brynn"},
            {columnName: "Creation Date", cellData: "Aug 2, 2014"},
            {columnName: "Favorite color", cellData: "Orange"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 30574},
            {columnName: "Name", cellData: "Brad"},
            {columnName: "Creation Date", cellData: "Jan 4, 2019"},
            {columnName: "Favorite color", cellData: "Yellow"},
        ],
    },
];

/**
 * Data for Footer
 */
export const footer = {
    footerData: "Total 2 users",
};

/**
 * Data for Custom content rendering
 */
export const customRows = [
    {
        rowData: [
            {columnName: "User ID", cellData: 41512},
            {columnName: "Name", cellData: "Georgia"},
            {columnName: "Creation Date", cellData: "Sep 11, 2008"},
            {
                columnName: "Favorite color",
                cellData: (
                    <div>
                        <Icon shape="time" />
                        {"Critical"}
                    </div>
                ),
            },
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 16166},
            {columnName: "Name", cellData: "Brynn"},
            {columnName: "Creation Date", cellData: "Aug 2, 2014"},
            {
                columnName: "Favorite color",
                cellData: (
                    <div>
                        <Icon shape="time" />
                        {"Critical"}
                    </div>
                ),
            },
        ],
    },
];

/**
 * Data for Filtering
 */

//Custom function to filter data
export const filterFunction = (
    rows: DataGridRow[],
    columnValue: string,
    columnName: string,
): Promise<DataGridRow[]> => {
    return new Promise((resolve, reject) => {
        if (columnValue === "" || columnValue === undefined) {
            resolve(normalRows);
        }
        let newRows = rows.filter(function(row) {
            let matchFound = false;
            for (let index in row.rowData) {
                let content = String(row.rowData[index].cellData);
                if (content.indexOf(columnValue) !== -1) {
                    matchFound = true;
                }
            }
            if (matchFound) {
                return row;
            }
        });
        resolve(newRows);
    });
};

/**
 * Data for Sorting
 */

// Custom sorting function for number and string type
export const sortFunction = (rows: DataGridRow[], sortOrder: SortOrder, columnName: string): Promise<DataGridRow[]> => {
    return new Promise((resolve, reject) => {
        rows.sort(function(first: DataGridRow, second: DataGridRow): number {
            let result = 0;
            let firstRecord = first.rowData.find(function(element: any) {
                if (element.columnName === columnName) return element;
            });

            let secondRecord = second.rowData.find(function(element: any) {
                if (element.columnName === columnName) return element;
            });

            if (firstRecord && secondRecord) {
                const contentType = typeof firstRecord.cellData;

                if (sortOrder === SortOrder.ASC) {
                    if (contentType === "number") {
                        result = firstRecord.cellData - secondRecord.cellData;
                    } else if (contentType === "string") {
                        if (firstRecord.cellData > secondRecord.cellData) result = -1;
                        else if (firstRecord.cellData < secondRecord.cellData) result = 1;
                    }
                } else if (sortOrder == SortOrder.DESC) {
                    if (contentType === "number") {
                        result = secondRecord.cellData - firstRecord.cellData;
                    } else if (contentType === "string") {
                        if (secondRecord.cellData > firstRecord.cellData) result = -1;
                        else if (secondRecord.cellData < firstRecord.cellData) result = 1;
                    }
                }
            }
            return result;
        });
        resolve(rows);
    });
};

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

/**
 * Data for Batch Actions
 */
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

/**
 * Data for Expandable Rows
 */
const expandableContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in neque in ante placerat mattis id sed quam. Proin rhoncus lacus et tempor dignissim. Vivamus sem quam, pellentesque aliquet suscipit eget, pellentesque sed arcu. Vivamus in dui lectus. Suspendisse cursus est ac nisl imperdiet viverra. Aenean sagittis nibh lacus, in eleifend urna ultrices et. Mauris porttitor nisi nec velit pharetra porttitor. Vestibulum vulputate sollicitudin dolor ut tincidunt. Phasellus vitae blandit felis. Nullam posuere ipsum tincidunt velit pellentesque rhoncus. Morbi faucibus ut ipsum at malesuada. Nam vestibulum felis sit amet metus finibus hendrerit. Fusce faucibus odio eget ex vulputate rhoncus. Fusce nec aliquam leo, at suscipit diam.";

export const expandableRows = [
    {
        rowData: [
            {columnName: "User ID", cellData: 41512},
            {columnName: "Name", cellData: "Georgia"},
            {columnName: "Creation Date", cellData: "Sep 11, 2008"},
            {columnName: "Favorite color", cellData: "Blue"},
        ],
        expandableContent: expandableContent,
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 16166},
            {columnName: "Name", cellData: "Brynn"},
            {columnName: "Creation Date", cellData: "Aug 2, 2014"},
            {columnName: "Favorite color", cellData: "Orange"},
        ],
        expandableContent: expandableContent,
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 30574},
            {columnName: "Name", cellData: "Brad"},
            {columnName: "Creation Date", cellData: "Jan 4, 2019"},
            {columnName: "Favorite color", cellData: "Yellow"},
        ],
        expandableContent: expandableContent,
    },
];

/**
 * Data for Pagination
 */
export const paginationRows = [
    {
        rowData: [
            {columnName: "User ID", cellData: 41512},
            {columnName: "Name", cellData: "Georgia"},
            {columnName: "Creation Date", cellData: "Sep 11, 2008"},
            {columnName: "Favorite color", cellData: "Blue"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 16166},
            {columnName: "Name", cellData: "Brynn"},
            {columnName: "Creation Date", cellData: "Aug 2, 2014"},
            {columnName: "Favorite color", cellData: "Orange"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 30574},
            {columnName: "Name", cellData: "Brad"},
            {columnName: "Creation Date", cellData: "Jan 4, 2019"},
            {columnName: "Favorite color", cellData: "Yellow"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 2459},
            {columnName: "Name", cellData: "Beverly"},
            {columnName: "Creation Date", cellData: "Mar 2, 2019"},
            {columnName: "Favorite color", cellData: "Pink"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 14262},
            {columnName: "Name", cellData: "Johnson"},
            {columnName: "Creation Date", cellData: "Jun 23, 2019"},
            {columnName: "Favorite color", cellData: "Blue"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 14262},
            {columnName: "Name", cellData: "Johnson"},
            {columnName: "Creation Date", cellData: "Jun 23, 2019"},
            {columnName: "Favorite color", cellData: "Blue"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 59729},
            {columnName: "Name", cellData: "Sibyl"},
            {columnName: "Creation Date", cellData: "Feb 27, 2016"},
            {columnName: "Favorite color", cellData: "Red"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 55316},
            {columnName: "Name", cellData: "Debby"},
            {columnName: "Creation Date", cellData: "Mar 27, 2019"},
            {columnName: "Favorite color", cellData: "Blue"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 92422},
            {columnName: "Name", cellData: "Roslyn"},
            {columnName: "Creation Date", cellData: "Apr 26, 2016"},
            {columnName: "Favorite color", cellData: "Blue"},
        ],
    },
    {
        rowData: [
            {columnName: "User ID", cellData: 83943},
            {columnName: "Name", cellData: "Lottie"},
            {columnName: "Creation Date", cellData: "Jun 21, 2018"},
            {columnName: "Favorite color", cellData: "Yellow"},
        ],
    },
];

// Function to get data for page based on pagenumber
export const getPageData = (pageIndex: number, pageSize: number): Promise<DataGridRow[]> => {
    return new Promise((resolve, reject) => {
        let rows: DataGridRow[] = [];
        if (pageSize == 5) {
            if (pageIndex == 2) {
                rows = paginationRows.slice(5, 10);
            }
            if (pageIndex == 1) {
                rows = paginationRows.slice(0, 5);
            }
        } else if (pageSize == 10) {
            rows = paginationRows;
        }
        resolve(rows);
    });
};

export const paginationDetails = {
    totalItems: 10,
    getPageData: getPageData,
    pageSize: 5,
    pageSizes: [5, 10],
    itemText: "Users",
};
