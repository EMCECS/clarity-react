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
import {ClassNames} from "./ClassNames";
import {classNames, allTrueOnKey} from "../utils";
import {CheckBox} from "../forms/checkbox";
import {RadioButton} from "../forms/radio";
import {Button} from "../forms/button";
import {Icon, Direction} from "../icon";

/**
 * General component description :
 * DataGrid :
 * Datagrids are for organizing large volumes of data that users can perform actions on.
 */

/**
 * Props for DataGrid :
 * @param {className} CSS class names
 * @param {style} CSS styles
 * @param {selectionType} row selection type that is multi or single
 * @param {pagination} pagination support
 * @param {columns} column details
 * @param {rows} rows data
 * @param {footer} footer component
 * @param {onRowSelect} Function which will gets called on select/deselect of rows
 * @param {onSelectAll} Function which will gets called on select/deselect of all rows
 * @param {keyfield} field to uniquely identify row
 * @param {rowType} Expandable or compact row type
 * @param {itemText} label to display for all items
 * @param {pagination} pagination support
 */
type DataGridProps = {
    className?: string;
    style?: any;
    selectionType?: GridSelectionType;
    columns: DataGridColumn[];
    rows?: DataGridRow[];
    footer?: DataGridFooter;
    onRowSelect?: Function;
    onSelectAll?: Function;
    keyfield?: string;
    rowType?: GridRowType;
    itemText?: string;
    pagination?: DataGridPaginationProps;
};

/**
 * type for DataGridColumn :
 * @param {columnName} column data
 * @param {sort} does colum support sorting
 * @param {className} CSS class name
 * @param {columns} column details
 * @param {style} CSS style
 * @param {filter} Filter component
 */
export type DataGridColumn = {
    columnName: string;
    columnID?: number; // For internal use
    sort?: DataGridSort;
    className?: string;
    style?: any;
    filter?: React.ReactNode;
};

/**
 * type for DataGridRow :
 * @param {rowData} row data
 * @param {rowID} unique ID to identify row
 * @param {isSelected} set to true if row is selected
 * @param {className} CSS class name
 * @param {style} CSS style
 * @param {expandableContent} Expandable data content
 */
export type DataGridRow = {
    rowData: DataGridCell[];
    className?: string;
    style?: any;
    rowID?: number; // not to take from user
    isSelected?: boolean; // not to take from user
    expandableContent?: any;
    isExpanded?: boolean;
};

/**
 * type for DataGridCell :
 * @param {cellData} data for cell
 * @param {className} CSS class name
 * @param {style} CSS style
 */
export type DataGridCell = {
    cellData: any;
    columnName: string;
    className?: string;
    style?: any;
};

/**
 * type for DataGridFooter :
 * @param {footerData} Footer data
 * @param {className} CSS class name
 * @param {style} CSS style
 */
export type DataGridFooter = {
    footerData: any;
    className?: string;
    style?: any;
};

/**
 * type for DataGridSort :
 * @param {defaultSortOrder} if data in column by default sorted
 * @param {sortFunction} function to perform sorting
 */
export type DataGridSort = {
    defaultSortOrder: SortOrder;
    sortFunction: (rows: DataGridRow[], order: SortOrder, columnName: string) => DataGridRow[];
};

/**
 * Props for DataGridPagination :
 * @param {className} CSS
 * @param {style} CSS styles
 * @param {currentPage} Index of the currently displayed page, starting from 1
 * @param {pageSize} Number of items displayed per page. Defaults to 10
 * @param {totalItems} Total number of items present in the datagrid, after the filters have been applied
 * @param {lastPage} Index of the last page for the current data
 * @param {getPage} custom function to get page data for given page number
 */
type DataGridPaginationProps = {
    className?: string;
    style?: any;
    currentPage?: number;
    pageSize?: number;
    pageSizes?: number[];
    totalItems: number;
    getPageData?: (pageIndex: number, pageSize: number) => Promise<DataGridRow[]>;
};

/**
 * Enum for GridSelectionType :
 * @param {MULTI} for enabling multi row select
 * @param {SINGLE} for enabling single row select
 */
export enum GridSelectionType {
    MULTI = "multi",
    SINGLE = "single",
}

/**
 * Enum for sorting order :
 * @param {DESC} to sort data in descending order
 * @param {ASC} to sort data in ascending order
 * @param {NONE} no sorting
 */
export enum SortOrder {
    DESC = "descending",
    ASC = "ascending ",
    NONE = "none",
}

/**
 * Enum for RowTpye :
 * @param {EXPANDABLE} for enabling expandable rows
 * @param {COMPACT} for enabling compact rows
 */
export enum GridRowType {
    EXPANDABLE = "expandable",
    COMPACT = "compact",
}

/**
 * State for DataGrid :
 * @param {selectAll} set to true if all rows got selected else false
 * @param {allColumns} column data
 * @param {allRows} row data
 * @param {itemText} label to display for all items
 * @param {pagination} pagination data
 */
type DataGridState = {
    selectAll: boolean;
    allColumns: DataGridColumn[];
    allRows: DataGridRow[];
    itemText: string;
    pagination?: DataGridPaginationState;
};

type DataGridPaginationState = {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    firstItem: number;
    lastItem: number;
    totalPages: number;
    pageSizes: number[];
};

/**
 * DataGrid Componnet :
 * Displays data in grid format
 */
export class DataGrid extends React.PureComponent<DataGridProps, DataGridState> {
    private pageIndexRef = React.createRef<HTMLInputElement>();

    // Initial state of datagrid
    state: DataGridState = {
        selectAll: false,
        allColumns: this.props.columns,
        allRows: this.props.rows !== undefined ? this.props.rows : [],
        itemText: this.props.itemText !== undefined ? this.props.itemText : "items",
        pagination:
            this.props.pagination !== undefined
                ? {
                      currentPage:
                          this.props.pagination.currentPage !== undefined ? this.props.pagination.currentPage : 1,
                      pageSize: this.props.pagination.pageSize !== undefined ? this.props.pagination.pageSize : 10,
                      totalItems: this.props.pagination.totalItems !== undefined ? this.props.pagination.totalItems : 0,
                      pageSizes:
                          this.props.pagination.pageSizes !== undefined
                              ? this.props.pagination.pageSizes
                              : [10, 20, 50, 100],
                      firstItem: 0,
                      lastItem: 0,
                      totalPages: 0,
                  }
                : undefined,
    };

    componentWillMount() {
        this.setInitalState();
        if (this.props.pagination != undefined) this.setInitalStateForPagination();
    }

    // Function to return all selected rows
    getSelectedRows = (): DataGridRow[] => {
        const {allRows} = this.state;
        let selectedRows = new Array();
        if (this.state.selectAll) {
            selectedRows = allRows;
        } else {
            selectedRows = allRows.filter(row => row["isSelected"] === true);
        }
        return selectedRows;
    };

    // Function to update datagrid rows
    updateRows = (rows: DataGridRow[]) => {
        const updatedRows = this.updateRowIDs(rows);

        this.setState({
            allRows: [...updatedRows],
            selectAll: updatedRows.length == 0 ? false : this.state.selectAll,
        });
    };

    // Function to update datagrid rows
    updateColumns = (cols: DataGridColumn[]) => {
        const updatedCols = this.updateColumnIDs(cols);

        this.setState({
            allColumns: [...updatedCols],
        });
    };

    // Function to get all rows
    getAllRows = () => {
        return this.state.allRows;
    };

    /* ##########  DataGrid private methods start  ############ */

    // Initialize state of grid
    private setInitalState() {
        const {allRows, allColumns} = this.state;
        let rows = this.updateRowIDs(allRows);

        rows.forEach(function(row) {
            row["isSelected"] = false;
            row["isExpanded"] = false;
        });

        this.setState({
            allRows: [...rows],
            allColumns: [...this.updateColumnIDs(allColumns)],
        });
    }

    // Initialize state of grid with pagination
    private setInitalStateForPagination() {
        const {currentPage, pageSize, totalItems} = this.state.pagination!;

        var firstItem = this.getFirstItemIndex(currentPage, pageSize);
        var lastItem = this.getLastItemIndex(pageSize, totalItems, firstItem);
        let paginationState = this.state.pagination;
        if (paginationState) {
            paginationState.totalPages = this.getTotalPages(totalItems, pageSize);
            paginationState.firstItem = firstItem;
            paginationState.lastItem = lastItem;
        }
        this.setState({pagination: paginationState});
    }

    /* ############################# Pagination methods start ####################################*/
    private getTotalPages = (totalItems: number, pageSize: number) => {
        return Math.floor((totalItems + pageSize - 1) / pageSize);
    };

    // Get index of first item in page
    private getFirstItemIndex = (page: number, pageSize: number) => {
        return page * pageSize - (pageSize - 1);
    };

    // Get index of last item in page
    private getLastItemIndex = (pageSize: number, totalItems: number, firstItem: number) => {
        return Math.min(firstItem + pageSize - 1, totalItems);
    };

    // Function to handle change in page sizes
    private handleSelectPageSize = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        this.getPage(this.state.pagination!.currentPage, parseInt(evt.target.value));
    };

    private gotoFirstPage = () => {
        const {pageSize} = this.state.pagination!;
        this.getPage(1, pageSize);
    };

    private gotoLastPage = () => {
        const {pageSize, totalPages} = this.state.pagination!;
        this.getPage(totalPages, pageSize);
    };

    private gotoNextPage = () => {
        const {pageSize, currentPage, totalPages} = this.state.pagination!;
        let nextPage = currentPage + 1;
        if (nextPage > totalPages) nextPage = totalPages;
        this.getPage(nextPage, pageSize);
    };

    private gotoPreviousPage = () => {
        const {pageSize, currentPage, totalPages} = this.state.pagination!;
        let previousPage = currentPage - 1;
        if (previousPage < 1) previousPage = 1;
        this.getPage(previousPage, pageSize);
    };

    // Function to get page data for given page number
    private getPage(pageIndex: number, pageSize: number) {
        if (this.state.pagination && this.props.pagination) {
            const {totalPages, totalItems} = this.state.pagination;
            const {getPageData} = this.props.pagination;
            // set pageIndex to last page if pageIndex is greater than total pages
            if (pageIndex > totalPages! && totalPages) pageIndex = totalPages;

            // set pageIndex to first page if pageIndex is smaller than 1
            if (pageIndex < 1) pageIndex = 1;
            //Set page index in input box
            this.pageIndexRef.current!.value = pageIndex.toString();

            if (getPageData) {
                var firstItem = this.getFirstItemIndex(pageIndex, pageSize);
                var lastItem = this.getLastItemIndex(pageSize, totalItems, firstItem);
                let paginationState = this.state.pagination;
                if (paginationState) {
                    paginationState.pageSize =
                        this.state.pagination.pageSize !== pageSize ? pageSize : this.state.pagination.pageSize;
                    paginationState.currentPage = pageIndex;
                    paginationState.firstItem = firstItem;
                    paginationState.lastItem = lastItem;
                    paginationState.totalPages = this.getTotalPages(totalItems, pageSize);
                }

                getPageData(pageIndex, pageSize).then((data: DataGridRow[]) => {
                    const rows = this.updateRowIDs(data);
                    this.setState({
                        allRows: [...rows],
                        pagination: paginationState,
                    });
                });
            }
            console.log("Pages ", this.getTotalPages(totalItems, pageSize));
            console.log("Page Size ", this.state.pagination.pageSize);
        }
    }

    /* ############################# Pagination methods end ####################################*/

    //toggle collapse of expandable row
    private toggleExpand(rowID: number) {
        const {allRows} = this.state;
        allRows.forEach(row => {
            if (row["rowID"] === rowID) row["isExpanded"] = !row["isExpanded"];
        });
        this.setState({
            allRows: [...allRows],
        });
    }

    // Function to handle select/deselect of all rows
    private handleSelectAll = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const rows = this.state.allRows;
        const value = this.state.selectAll;
        const {onSelectAll} = this.props;
        rows.forEach(row => (row["isSelected"] = !value));
        this.setState(
            {
                selectAll: !value,
                allRows: rows,
            },
            () => onSelectAll && onSelectAll(),
        );
    };

    // Function to handle select/deselect of single row
    private handleSelectSingle = (evt: React.ChangeEvent<HTMLInputElement>, rowID: any) => {
        const rows = this.state.allRows;
        const {onRowSelect, selectionType} = this.props;
        rows.forEach(row => {
            if (row["rowID"] === rowID) {
                row["isSelected"] = !row["isSelected"];
            } else if (selectionType === GridSelectionType.SINGLE) {
                row["isSelected"] = false;
            }
        });

        this.setState(
            {
                allRows: [...rows],
                selectAll: allTrueOnKey(rows, "isSelected"),
            },
            () => onRowSelect && onRowSelect(),
        );
    };

    // Function to handle sorting
    private handleSort = (
        evt: React.MouseEvent<HTMLElement>,
        columnName: string,
        columnID: any,
        sortFunction: Function,
        defaultSortOrder: SortOrder,
    ) => {
        const {allRows, allColumns} = this.state;
        if (columnID != undefined) {
            let nextSortOrder = SortOrder.DESC;
            const currentSortOrder = allColumns[columnID].sort!.defaultSortOrder;

            if (currentSortOrder === SortOrder.NONE || currentSortOrder === SortOrder.DESC)
                nextSortOrder = SortOrder.ASC;

            const rows = this.updateRowIDs(sortFunction(allRows, nextSortOrder, columnName));
            // update sort order
            allColumns[columnID].sort!.defaultSortOrder = nextSortOrder;

            this.setState({
                allRows: [...rows],
                allColumns: [...allColumns],
            });
        }
    };

    private updateRowIDs(rows: DataGridRow[]) {
        // set rowID = index in array
        rows.map((row: DataGridRow, index: number) => {
            row["rowID"] = index;
        });
        return rows;
    }

    private updateColumnIDs(cols: DataGridColumn[]) {
        // set columnID = index in array
        cols.map((cols: DataGridColumn, index: number) => {
            cols["columnID"] = index;
        });
        return cols;
    }

    // Get width of column
    private getColWidth(columnName: string) {
        const {allColumns} = this.state;
        const column = allColumns.find(col => col.columnName === columnName);

        return column && column.style && column.style.width ? column.style.width : undefined;
    }
    /* ##########  DataGrid private methods end  ############ */

    /* ##########  DataGrid DOM methods start  ############ */
    //funtion to render expandable icon cell
    private buildExpandableCell(rowID: number, isExpanded: boolean): React.ReactElement {
        return (
            <div className={ClassNames.DATAGRID_EXPANDABLE_CARET} role="gridcell" key={rowID}>
                <Button
                    key="expand"
                    className={ClassNames.DATAGRID_EXPANDABLE_CARET_BUTTON}
                    onClick={() => this.toggleExpand(rowID)}
                    icon={{
                        shape: "caret",
                        className: ClassNames.DATAGRID_EXPANDABLE_CARET_ICON,
                        dir: isExpanded ? Direction.DOWN : Direction.RIGHT,
                    }}
                />
            </div>
        );
    }

    // function to render selectAll column
    private buildSelectColumn(): React.ReactElement {
        const {selectionType} = this.props;
        const {selectAll} = this.state;
        return (
            <div
                role="columnheader"
                className={classNames([
                    ClassNames.DATAGRID_COLUMN, //prettier
                    ClassNames.DATAGRID_SELECT,
                    ClassNames.DATAGRID_FIXED_COLUMN,
                ])}
            >
                <span className={ClassNames.DATAGRID_COLUMN_TITLE}>
                    {selectionType === GridSelectionType.MULTI && (
                        <CheckBox
                            id="select_all"
                            onChange={evt => this.handleSelectAll(evt)}
                            ariaLabel="Select All"
                            checked={selectAll !== undefined ? selectAll : undefined}
                        />
                    )}
                </span>
                <div className={ClassNames.DATAGRID_COLUMN_SEPARATOR} />
            </div>
        );
    }

    // Function to render empty column header
    private buildEmptyColumn(): React.ReactElement {
        return (
            <div
                role="columnheader"
                className={classNames([
                    ClassNames.DATAGRID_COLUMN, //prettier
                    ClassNames.DATAGRID_SELECT,
                    ClassNames.DATAGRID_FIXED_COLUMN,
                ])}
            >
                <span className={ClassNames.DATAGRID_COLUMN_TITLE} />
                <div className={ClassNames.DATAGRID_COLUMN_SEPARATOR} />
            </div>
        );
    }

    // function to render select cell
    private buildSelectCell(rowID: number, isSelected: any): React.ReactElement {
        const {selectionType} = this.props;
        if (selectionType === GridSelectionType.MULTI) {
            return (
                <CheckBox
                    id={rowID.toString()}
                    ariaLabel="Select"
                    onChange={evt => this.handleSelectSingle(evt, rowID)}
                    checked={isSelected !== undefined ? isSelected : undefined}
                />
            );
        }
        return (
            <RadioButton
                value={rowID}
                id={rowID.toString()}
                onChange={evt => this.handleSelectSingle(evt, rowID)}
                checked={isSelected !== undefined ? isSelected : undefined}
            />
        );
    }

    // function to build datagrid body
    private buildDataGridBody(): React.ReactElement {
        const {allRows, itemText} = this.state;
        return (
            <div className={ClassNames.DATAGRID}>
                <div className={ClassNames.DATAGRID_TABLE_WRAPPER}>
                    <div className={ClassNames.DATAGRID_TABLE} role="grid">
                        {this.buildDataGridHeader()}
                        {allRows.length !== 0 ? (
                            allRows.map((row: DataGridRow, index: number) => {
                                return this.buildDataGridRow(row, index);
                            })
                        ) : (
                            <div className={ClassNames.DATAGRID_PLACEHOLDER_CONTAINER}>
                                <div
                                    className={classNames([ClassNames.DATAGRID_PLACEHOLDER, ClassNames.DATAGRID_EMPTY])}
                                >
                                    <div
                                        className={classNames([
                                            ClassNames.DATAGRID_PLACEHOLDER_IMG,
                                            ClassNames.DATAGRID_NG_STAR_INSERTED,
                                        ])}
                                    />
                                    {`${"We couldn't find any"} ${itemText} ${"!"}`}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Function to build datagrid header
    private buildDataGridHeader(): React.ReactElement {
        const {selectionType, rowType} = this.props;
        const {allColumns} = this.state;
        return (
            <div className={ClassNames.DATAGRID_HEADER} role="rowgroup">
                <div className={ClassNames.DATAGRID_ROW} role="row">
                    <div className={ClassNames.DATAGRID_ROW_MASTER}>
                        <div className={ClassNames.DATAGRID_ROW_STICKY} />
                        <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                            {selectionType && this.buildSelectColumn()}
                            {rowType && rowType === GridRowType.EXPANDABLE && this.buildEmptyColumn()}
                            {allColumns &&
                                allColumns.map((column: any, index: number) => {
                                    return this.buildDataGridColumn(column, index);
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Function to build datagrid colums
    private buildDataGridColumn(column: DataGridColumn, index: number): React.ReactElement {
        const {columnName, columnID, className, style, sort, filter} = column;
        return (
            <div
                role="columnheader"
                className={classNames([ClassNames.DATAGRID_COLUMN, className])}
                aria-sort="none"
                style={{...style}}
                key={"col-" + index}
            >
                <div className={ClassNames.DATAGRID_COLUMN_FLEX}>
                    {sort != undefined ? (
                        <Button
                            key="sort"
                            defaultBtn={false}
                            className={classNames([
                                ClassNames.DATAGRID_COLUMN_TITLE,
                                ClassNames.DATAGRID_NG_STAR_INSERTED,
                            ])}
                            onClick={evt =>
                                this.handleSort(evt, columnName, columnID, sort.sortFunction, sort.defaultSortOrder)
                            }
                        >
                            {columnName}
                            {sort.defaultSortOrder !== SortOrder.NONE && (
                                <Icon
                                    shape={sort.defaultSortOrder == SortOrder.DESC ? "arrow down" : "arrow up"}
                                    className={classNames([
                                        ClassNames.DATAGRID_SORT_ICON,
                                        ClassNames.DATAGRID_NG_STAR_INSERTED,
                                    ])}
                                />
                            )}
                        </Button>
                    ) : (
                        <span className={ClassNames.DATAGRID_COLUMN_TITLE}>{columnName}</span>
                    )}
                    {filter && filter}
                    <div className={ClassNames.DATAGRID_COLUMN_SEPARATOR}>
                        <div aria-hidden="true" className={ClassNames.DATAGRID_COLUMN_HANDLE} />
                        <div className={ClassNames.DATAGRID_COLUMN_RESIZE} />
                    </div>
                </div>
            </div>
        );
    }

    // function to build datagrid rows
    private buildDataGridRow(row: DataGridRow, index: number): React.ReactElement {
        const {selectionType, rowType} = this.props;
        const {rowID, rowData, className, style, isSelected, isExpanded, expandableContent} = row;
        return (
            <div
                role="rowgroup"
                className={classNames([ClassNames.DATAGRID_ROW, isSelected && ClassNames.DATAGRID_SELECTED, className])}
                aria-owns={"clr-dg-row" + index}
                style={style}
                key={"row-" + index}
            >
                <div className={ClassNames.DATAGRID_ROW_MASTER} role="row" id="clr-dg-row1">
                    <div className={ClassNames.DATAGRID_ROW_STICKY} />
                    <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                        <div className={ClassNames.DATAGRID_SCROLLING_CELLS}>
                            {selectionType &&
                                this.buildDataGridCell(
                                    this.buildSelectCell(rowID!, isSelected),
                                    index,
                                    "select",
                                    classNames([
                                        ClassNames.DATAGRID_SELECT, //prettier
                                        ClassNames.DATAGRID_FIXED_COLUMN,
                                    ]),
                                )}
                            {rowType &&
                                rowType === GridRowType.EXPANDABLE &&
                                this.buildExpandableCell(rowID!, isExpanded!)}
                            {rowData &&
                                rowData.map((cell: any, index: number) => {
                                    return this.buildDataGridCell(
                                        cell.cellData,
                                        index,
                                        cell.columnName,
                                        cell.className,
                                        cell.style,
                                    );
                                })}
                        </div>
                        {/* //Insert Expandable item view */}
                        {rowType && rowType === GridRowType.EXPANDABLE && expandableContent && isExpanded && (
                            <div className={ClassNames.DATAGRID_ROW_FLEX}>
                                <div className={ClassNames.DATAGRID_EXPANDABLE_CARET} />
                                {expandableContent}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // function to build datagrid cell
    private buildDataGridCell(
        cellData: any,
        index: number,
        columnName: string,
        className?: string,
        style?: any,
    ): React.ReactElement {
        let width: any = "";
        if (columnName) width = this.getColWidth(columnName);
        return (
            <div
                role="gridcell"
                key={"cell-" + index}
                className={`${className} ${ClassNames.DATAGRID_CELLS}`}
                style={{width: width, ...style}}
            >
                {cellData}
            </div>
        );
    }

    // function to build datagrid pagination footer
    private buildDataGridPagination(): React.ReactElement {
        const {className, style} = this.props.pagination!;
        const {itemText} = this.state;
        const {totalItems, firstItem, lastItem, totalPages, currentPage, pageSizes, pageSize} = this.state.pagination!;
        return (
            <div
                _ngcontent-clarity-c8=""
                style={style}
                className={classNames([ClassNames.DATAGRID_PAGINATION, className])}
            >
                <div className={ClassNames.PAGINATION_SIZE}>
                    <div _ngcontent-clarity-c8="">
                        {` ${itemText}  ${" per page"} `}
                        <div className={classNames([ClassNames.CLR_SELECT_WRAPPER])}>
                            <select
                                className={classNames([ClassNames.CLR_PAGE_SIZE_SELECT])}
                                onChange={evt => this.handleSelectPageSize(evt)}
                            >
                                {pageSizes!.map((size: number, index: number) => {
                                    return (
                                        <option key={index} value={size}>
                                            {size}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={classNames([ClassNames.PAGINATION_DESC])}>
                    {`${firstItem} - ${lastItem} ${" of "} ${totalItems} ${itemText}`}{" "}
                </div>
                <div className={classNames([ClassNames.PAGINATION_LIST])}>
                    <Button
                        key="down"
                        className={ClassNames.PAGINATION_FIRST}
                        icon={{shape: "step-forward-2 down"}}
                        disabled={currentPage == 1 ? true : false}
                        onClick={this.gotoFirstPage}
                    />
                    <Button
                        key="left"
                        className={ClassNames.PAGINATION_PREVIOUS}
                        icon={{shape: "angle left"}}
                        disabled={currentPage == 1 ? true : false}
                        onClick={this.gotoPreviousPage}
                    />
                    <input
                        className={ClassNames.PAGINATION_CURRENT}
                        size={2}
                        defaultValue={this.state.pagination!.currentPage.toString()}
                        type="text"
                        ref={this.pageIndexRef}
                        aria-label="Current Page"
                        onBlur={evt => this.getPage(parseInt(evt.target.value), pageSize)}
                    />
                    &nbsp;/&nbsp;<span aria-label="Total Pages">{totalPages}</span>
                    <Button
                        key="right"
                        className={ClassNames.PAGINATION_NEXT}
                        icon={{shape: "angle right"}}
                        disabled={currentPage == totalPages ? true : false}
                        onClick={this.gotoNextPage}
                    />
                    <Button
                        key="up"
                        className={ClassNames.PAGINATION_LAST}
                        icon={{shape: "step-forward-2 up"}}
                        disabled={currentPage == totalPages ? true : false}
                        onClick={this.gotoLastPage}
                    />
                </div>
            </div>
        );
    }

    // function to build datagrid footer
    private buildDataGridFooter(): React.ReactElement {
        // Need to take this from state in future
        const {footer, pagination} = this.props;
        return (
            <div
                className={`${ClassNames.DATAGRID_FOOTER} ${footer && footer.className && footer.className}`}
                style={footer && footer.style && footer.style}
            >
                <div className={ClassNames.DATAGRID_FOOTER_DESC}>
                    {footer && footer.footerData && footer.footerData}
                </div>
                {pagination && this.buildDataGridPagination()}
            </div>
        );
    }

    // render datagrid
    render() {
        const {className, style, rowType} = this.props;
        return (
            <div
                className={classNames([
                    ClassNames.DATAGRID_HOST, // prettier
                    rowType === GridRowType.COMPACT && ClassNames.DATAGRID_COMPACT,
                    className,
                ])}
                style={style}
            >
                {this.buildDataGridBody()}
                {this.buildDataGridFooter()}
                <div className={ClassNames.DATAGRID_CAL_TABLE}>
                    <div className={ClassNames.DATAGRID_CAL_HEADER} />
                </div>
            </div>
        );
    }
}
