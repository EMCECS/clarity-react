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
import {SortOrder, DataGridRow, DataGridFilterResult} from ".";

/**
 * General file description :
 * Data to render diffrent datagrids in storybook
 */

/**
 * Data for Columns
 */
export const normalColumns = [
    {columnName: "User ID"},
    {columnName: "Name"},
    {columnName: "Creation Date"},
    {columnName: "Favorite color"},
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
export const customFooter = {
    footerData: "Total 2 users",
    showFooter: true,
};

export const defaultFooter = {
    showFooter: true,
};

export const noFooter = {
    showFooter: false,
};

export const hideShowColFooter = {
    hideShowColumns: {
        hideShowColBtn: true,
    },
    showFooter: true,
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

function filterRows(rows: DataGridRow[], columnValue: string) {
    const newRows = rows.filter(row => {
        let matchFound = false;
        for (const index in row.rowData) {
            const content = String(row.rowData[index].cellData);
            if (content.indexOf(columnValue) !== -1) {
                matchFound = true;
            }
        }
        if (matchFound) {
            return row;
        }
    });
    return newRows;
}

//Custom function to filter data
export const filterFunction = (
    rows: DataGridRow[],
    columnValue: string,
    columnName: string,
): Promise<DataGridFilterResult> => {
    return new Promise((resolve, reject) => {
        let result: DataGridFilterResult = {
            rows: [],
            totalItems: 0,
        };
        if (columnValue === "" || columnValue === undefined) {
            result = {
                rows: normalRows,
                totalItems: normalRows.length,
            };
        } else {
            const newRows = filterRows(rows, columnValue);
            result = {
                rows: newRows,
                totalItems: newRows.length,
            };
        }
        resolve(result);
    });
};

/**
 * Data for Sorting
 */

// Custom sorting function for number and string type
export const sortFunction = (rows: DataGridRow[], sortOrder: SortOrder, columnName: string): Promise<DataGridRow[]> => {
    return new Promise((resolve, reject) => {
        rows.sort(
            (first: DataGridRow, second: DataGridRow): number => {
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
            },
        );

        // Purposefully added dealy here to see loading spinner
        setTimeout(function() {
            resolve(rows);
        }, 2000);
    });
};

// Column Data with sort option
export const sortColumns = [
    {
        columnName: "User ID",
        sort: {defaultSortOrder: SortOrder.ASC, sortFunction: sortFunction},
    },
    {
        columnName: "Name",
        sort: {defaultSortOrder: SortOrder.NONE, sortFunction: sortFunction},
    },
    {columnName: "Creation Date"},
    {
        columnName: "Favorite color",
        sort: {defaultSortOrder: SortOrder.ASC, sortFunction: sortFunction, isSorted: true},
    },
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
    {
        rowData: [
            {columnName: "User ID", cellData: 345574},
            {columnName: "Name", cellData: "Harry"},
            {columnName: "Creation Date", cellData: "Jan 8, 2009"},
            {columnName: "Favorite color", cellData: "Pink"},
        ],
        expandableContent: null,
    },
];

/**
 * Data for Pagination
 */
export function getRowData() {
    const data = [
        [41512, "Georgia", "Sep 11, 2008", "Blue"],
        [16166, "Brynn", "Aug 2, 2014", "Orange"],
        [30574, "Brad", "Jan 4, 2019", "Yellow"],
        [2459, "Beverly", "Mar 2, 2019", "Pink"],
        [14262, "Johnson", "Jun 23, 2019", "Blue"],
        [59729, "Sibyl", "Feb 27, 2016", "Red"],
        [92422, "Roslyn", "Apr 26, 2016", "Blue"],
        [83943, "Lottie", "Mar 2, 2019", "Yellow"],
        [83943, "Lottie", "Mar 2, 2019", "Yellow"],
        [83943, "Lottie", "Mar 2, 2019", "Yellow"],
    ];

    let rowValues: DataGridRow[] = [];
    data.forEach(function(element) {
        const row: DataGridRow = {
            rowData: [
                {
                    columnName: "User ID",
                    cellData: element[0],
                },
                {
                    columnName: "Name",
                    cellData: element[1],
                },
                {
                    columnName: "Creation Date",
                    cellData: element[2],
                },
                {
                    columnName: "Favorite color",
                    cellData: element[3],
                },
            ],
        };

        rowValues.push(row);
    });
    return rowValues;
}

export const paginationRows = getRowData();

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
        // Purposefully added dealy here to see loading spinner
        setTimeout(function() {
            resolve(rows);
        }, 2000);
    });
};

export const paginationDetails = {
    totalItems: paginationRows.length,
    getPageData: getPageData,
    pageSize: 5,
    pageSizes: [5, 10],
};

export const paginationDetailsWithCompactFooter = {
    totalItems: paginationRows.length,
    getPageData: getPageData,
    pageSize: 5,
    pageSizes: [5, 10],
    compactFooter: true,
};

export const pageFilterFunction = (
    rows: DataGridRow[],
    columnValue: string,
    columnName: string,
): Promise<DataGridFilterResult> => {
    return new Promise((resolve, reject) => {
        let result: DataGridFilterResult = {
            rows: [],
            totalItems: 0,
        };
        if (columnValue === "" || columnValue === undefined) {
            result = {
                rows: paginationRows.slice(0, 5),
                totalItems: paginationRows.length,
            };
        } else {
            const newRows = filterRows(rows, columnValue);
            result = {
                rows: newRows,
                totalItems: newRows.length,
            };
        }

        // Purposefully added dealy here to see loading spinner
        setTimeout(function() {
            resolve(result);
        }, 2000);
    });
};

// Data for Hide/show columns
export const hideableColumns = [
    {columnName: "User ID"},
    {columnName: "Name"},
    {columnName: "Creation Date", isVisible: false},
    {columnName: "Favorite color", isVisible: false},
];
