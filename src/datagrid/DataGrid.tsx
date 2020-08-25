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
import {ClassNames, Styles} from "./ClassNames";
import {classNames, allTrueOnKey} from "../utils";
import {CheckBox} from "../forms/checkbox";
import {RadioButton} from "../forms/radio";
import {Button} from "../forms/button";
import {Icon, Direction} from "../icon";
import {Spinner, SpinnerSize} from "../spinner/Spinner";
import {HideShowColumns} from "./HideShowColumns";
import {DataGridColumnResize} from "./DataGridColumnResize";

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
 * @param {selectedRowCount} number of selected rows across all pages
 * @param {dataqa} quality engineering tag
 */
type DataGridProps = {
    className?: string;
    style?: any;
    selectionType?: GridSelectionType;
    columns: DataGridColumn[];
    rows?: DataGridRow[];
    footer?: DataGridFooter;
    onRowSelect?: (selectedRow?: DataGridRow) => any;
    onSelectAll?: (areAllSelected?: boolean) => any;
    keyfield?: string;
    rowType?: GridRowType;
    itemText?: string;
    pagination?: DataGridPaginationProps;
    selectedRowCount?: number;
    dataqa?: string;
};

/**
 * type for DataGridColumn :
 * @param {columnName} column data
 * @param {sort} does colum support sorting
 * @param {className} CSS class name
 * @param {columns} column details
 * @param {style} CSS style
 * @param {filter} Filter component
 * @param {isVisible} if true column will be visible else hide it
 * @param {width} Width of datagrid column the default width will be 100px
 */
export type DataGridColumn = {
    columnName: string;
    columnID?: number; // For internal use
    sort?: DataGridSort;
    className?: string;
    style?: any;
    filter?: React.ReactNode;
    isVisible?: boolean;
    width?: number;
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
    isSelected?: boolean;
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
 * @param {hideShowColBtn} Hide and Show column button
 */
export type DataGridFooter = {
    footerData?: any;
    className?: string;
    style?: any;
    hideShowColumns?: DataGRidHideShowColumns;
    showFooter: boolean;
};

/**
 * type for DataGridFooter hide show columns :
 * @param {updateDataGridColumns} Function to update datagrid columns in parent
 */
export type DataGRidHideShowColumns = {
    hideShowColBtn: boolean;
    updateDataGridColumns?: (columns: DataGridColumn[]) => void;
};

/**
 * type for DataGridSort :
 * @param {defaultSortOrder} if data in column by default sorted
 * @param {sortFunction} function to perform sorting
 * @param {isCurrentlySorted} checks if column is currently sorted or not
 */
export type DataGridSort = {
    defaultSortOrder: SortOrder;
    isSorted?: boolean;
    sortFunction: (rows: DataGridRow[], order: SortOrder, columnName: string) => Promise<DataGridRow[]>;
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
 * @param {compactFooter} if true will render compact pagination footer
 */
type DataGridPaginationProps = {
    className?: string;
    style?: any;
    currentPage?: number;
    pageSize?: number;
    pageSizes?: number[];
    totalItems: number;
    compactFooter?: boolean;
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
 * @param {isLoading} if true shows loading spinner else shows datagrid
 */
type DataGridState = {
    selectAll: boolean;
    allColumns: DataGridColumn[];
    allRows: DataGridRow[];
    itemText: string;
    pagination?: DataGridPaginationState;
    isLoading: boolean;
};

type DataGridPaginationState = {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    firstItem: number;
    lastItem: number;
    totalPages: number;
    pageSizes?: number[];
    compactFooter?: boolean;
};

// Default width of datagrid column in px
export const DEFAULT_COLUMN_WIDTH = 100;

/**
 * DataGrid Componnet :
 * Displays data in grid format
 */
export class DataGrid extends React.PureComponent<DataGridProps, DataGridState> {
    private pageIndexRef = React.createRef<HTMLInputElement>();
    private datagridTableRef = React.createRef<HTMLDivElement>();

    // Initial state of datagrid
    state: DataGridState = {
        isLoading: true,
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
                          this.props.pagination.pageSizes !== undefined ? this.props.pagination.pageSizes : undefined,
                      firstItem: 0,
                      lastItem: 0,
                      totalPages: 1,
                      compactFooter:
                          this.props.pagination.compactFooter !== undefined
                              ? this.props.pagination.compactFooter
                              : false,
                  }
                : undefined,
    };

    componentWillMount() {
        this.setInitalState();
        if (this.props.pagination !== undefined) this.setInitalStateForPagination();
    }

    componentDidMount() {
        this.hideLoader();
    }

    componentDidUpdate(prevProps: DataGridProps) {
        const {rows, columns, pagination} = this.props;
        if (rows && rows !== prevProps.rows) {
            this.updateRows(rows, pagination && pagination.totalItems);
        }

        if (columns && columns !== prevProps.columns) {
            this.updateColumns(columns);
        }
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
    updateRows = (rows: DataGridRow[], totalItems?: number) => {
        const updatedRows = this.updateRowIDs(rows);
        let {pagination} = this.state;

        // update pagination footer
        if (pagination && totalItems !== undefined) {
            const {pageSize, compactFooter} = pagination;

            pagination.totalPages = this.getTotalPages(totalItems, pageSize);

            // Set current page to 1 if it is greater than total pages
            const currentPage = pagination.currentPage > pagination.totalPages ? 1 : pagination.currentPage;
            const firstItem = this.getFirstItemIndex(currentPage, pageSize);
            const lastItem = this.getLastItemIndex(pageSize, totalItems, firstItem);

            pagination.firstItem = firstItem;
            pagination.lastItem = lastItem;
            pagination.currentPage = currentPage;
            pagination.totalItems = totalItems;

            if (this.pageIndexRef.current) {
                this.pageIndexRef.current.value = currentPage.toString();
            }
            pagination.compactFooter = compactFooter !== undefined ? compactFooter : false;
        }

        this.setState({
            allRows: [...updatedRows],
            selectAll: rows.length == 0 ? false : allTrueOnKey(updatedRows, "isSelected"),
            pagination: pagination ? pagination : undefined,
        });
    };

    // Function to update datagrid rows
    updateColumns = (cols: DataGridColumn[]) => {
        const {footer} = this.props;

        // Update visibility and sorting details of columns
        const columnsWithVisibility = this.setColumnVisibility(cols);
        const columnsWithSort = this.setSortingState(columnsWithVisibility);
        const updatedCols = this.updateColumnIDs(columnsWithSort);

        this.setState(
            {
                allColumns: [...updatedCols],
            },
            () => {
                footer &&
                    footer.hideShowColumns &&
                    footer.hideShowColumns.updateDataGridColumns &&
                    footer.hideShowColumns.updateDataGridColumns(updatedCols);
            },
        );
    };

    // Function to update datagrid column width
    updateColumnWidth = (col: DataGridColumn) => {
        const {allColumns} = this.state;
        if (col && col.columnID !== undefined) {
            allColumns[col.columnID].width = col.width;
            this.setState({
                allColumns: [...allColumns],
            });
        }
    };

    // Function to get all rows
    getAllRows = () => {
        return this.state.allRows;
    };

    // Function to hide loading spinner on datagrid
    hideLoader() {
        this.setState({isLoading: false});
    }

    // Function to show loading spinner on datagrid
    showLoader() {
        this.setState({isLoading: true});
    }

    /* ##########  DataGrid private methods start  ############ */

    // Initialize state of grid
    private setInitalState() {
        const {allRows, allColumns} = this.state;
        let rows = this.updateRowIDs(allRows);
        const columns = this.updateColumnIDs(this.setColumnVisibility(allColumns));
        columns.forEach(function(col) {
            if (col.width === undefined) {
                col["width"] = DEFAULT_COLUMN_WIDTH;
            }
        });

        rows.forEach(function(row) {
            row["isSelected"] = row.isSelected !== undefined ? row.isSelected : false;
            row["isExpanded"] = false;
        });

        this.setState({
            allRows: [...rows],
            allColumns: [...columns],
            selectAll: allTrueOnKey(rows, "isSelected"),
        });
    }

    // Initialize state of grid with pagination
    private setInitalStateForPagination() {
        let {pagination} = this.state;
        if (pagination) {
            const {currentPage, pageSize, totalItems, compactFooter} = pagination;
            const firstItem = this.getFirstItemIndex(currentPage, pageSize);
            const lastItem = this.getLastItemIndex(pageSize, totalItems, firstItem);

            pagination.totalPages = this.getTotalPages(totalItems, pageSize);
            pagination.firstItem = firstItem;
            pagination.lastItem = lastItem;
            pagination.compactFooter = compactFooter !== undefined ? compactFooter : false;
            this.setState({pagination: pagination});
        }
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

    // Function to handle pageIndex change in input box on blur event
    private handlePageChangeOnBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
        this.handlePageChange();
    };

    // Function to handle pageIndex change in input box on Enter ot Tab key press event
    private handlePageChangeOnKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        // Check for 'Enter' or 'tab' key
        const keyCode = evt.keyCode;
        if (keyCode == 13 || keyCode == 9) {
            this.handlePageChange();
        }
    };

    // Function to handle pageIndex change in input box
    private handlePageChange = () => {
        const {pageSize, currentPage} = this.state.pagination!;
        const pageIndex = this.pageIndexRef.current && parseInt(this.pageIndexRef.current.value);
        if (pageIndex) {
            if (isNaN(pageIndex)) {
                this.pageIndexRef.current!.value = currentPage.toString();
            } else {
                this.getPage(pageIndex, pageSize);
            }
        }
    };

    // Function to get page data for given page number
    private getPage(pageIndex: number, pageSize: number) {
        if (this.state.pagination && this.props.pagination) {
            this.showLoader();
            const {totalItems} = this.state.pagination;
            const {getPageData} = this.props.pagination;
            const totalPages =
                this.state.pagination.pageSize !== pageSize
                    ? this.getTotalPages(totalItems, pageSize)
                    : this.state.pagination.totalPages;

            // set pageIndex to last page if pageIndex is greater than total pages
            if (pageIndex > totalPages! && totalPages) {
                pageIndex = totalPages;
            }

            // set pageIndex to first page if pageIndex is smaller than 1
            if (pageIndex < 1) {
                pageIndex = 1;
            }

            //Set page index in input box
            if (this.pageIndexRef.current) {
                this.pageIndexRef.current.value = pageIndex.toString();
            }

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
                        selectAll: allTrueOnKey(rows, "isSelected"),
                    });
                    this.hideLoader();
                });
            }
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
            () => onSelectAll && onSelectAll(!value),
        );
    };

    // Function to handle select/deselect of single row
    private handleSelectSingle = (evt: React.ChangeEvent<HTMLInputElement>, rowID: any) => {
        const rows = this.state.allRows;
        const {onRowSelect, selectionType} = this.props;
        let selectedRow: DataGridRow;
        rows.forEach(row => {
            if (row["rowID"] === rowID) {
                row["isSelected"] = !row["isSelected"];
                selectedRow = row;
            } else if (selectionType === GridSelectionType.SINGLE) {
                row["isSelected"] = false;
            }
        });

        this.setState(
            {
                allRows: [...rows],
                selectAll: allTrueOnKey(rows, "isSelected"),
            },
            () => onRowSelect && onRowSelect(selectedRow),
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
        this.showLoader();
        const {allRows, allColumns} = this.state;
        if (columnID != undefined) {
            // Set currentlySorted flag for all columns as false
            allColumns.forEach(col => {
                if (col.sort) {
                    col.sort.isSorted = false;
                }
            });

            let nextSortOrder =
                defaultSortOrder === SortOrder.NONE || defaultSortOrder === SortOrder.DESC
                    ? SortOrder.ASC
                    : SortOrder.DESC;

            sortFunction(allRows, nextSortOrder, columnName).then((data: DataGridRow[]) => {
                const rows = this.updateRowIDs(data);

                // update sort order
                allColumns[columnID].sort!.defaultSortOrder = nextSortOrder;
                allColumns[columnID].sort!.isSorted = true;

                this.setState({
                    allRows: [...rows],
                    allColumns: [...allColumns],
                });
                this.hideLoader();
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

    private updateColumnIDs(columns: DataGridColumn[]) {
        // set columnID = index in array
        columns.map((column: DataGridColumn, index: number) => {
            column["columnID"] = index;
        });
        return columns;
    }

    private setColumnVisibility(columns: DataGridColumn[]) {
        columns.map((column: DataGridColumn, index: number) => {
            // if isVisible is not provided in props then set it to true
            column["isVisible"] = column.isVisible !== undefined ? column.isVisible : true;
        });
        return columns;
    }

    // Get object of column
    private getColObject(columnName: string) {
        const {allColumns} = this.state;
        const column = allColumns.find(col => col.columnName === columnName);

        return column;
    }

    // Get width of column
    private getColWidth(columnName: string) {
        const column = this.getColObject(columnName);
        return column && column.width;
    }

    // Check if column is visible
    private isColVisible(columnName: string) {
        const column = this.getColObject(columnName);
        return column && column.isVisible;
    }

    // Update sorting state of columns
    private setSortingState(columns: DataGridColumn[]) {
        const {allColumns} = this.state;
        columns.map((column: DataGridColumn, index: number) => {
            if (column.sort) {
                const col = allColumns.find(({columnName}) => columnName === column.columnName);
                column.sort = col && col.sort;
            }
        });
        return columns;
    }

    /* ##########  DataGrid private methods end  ############ */

    /* ##########  DataGrid DOM methods start  ############ */
    //funtion to render expandable icon cell
    private buildExpandableCell(rowID: number, isExpanded: boolean, expandableContent: any): React.ReactElement {
        return (
            <div className={ClassNames.DATAGRID_EXPANDABLE_CARET} role="gridcell" key={rowID}>
                {expandableContent && (
                    <Button
                        key={`${"expand-"} ${rowID}`}
                        className={ClassNames.DATAGRID_EXPANDABLE_CARET_BUTTON}
                        onClick={() => this.toggleExpand(rowID)}
                        icon={{
                            shape: "caret",
                            className: ClassNames.DATAGRID_EXPANDABLE_CARET_ICON,
                            dir: isExpanded ? Direction.DOWN : Direction.RIGHT,
                        }}
                    />
                )}
            </div>
        );
    }

    // function to render selectAll column
    private buildSelectColumn(): React.ReactElement {
        const {selectionType} = this.props;
        const {selectAll} = this.state;
        return (
            <div className={ClassNames.DATAGRID_ROW_STICKY}>
                <div
                    role="columnheader"
                    className={classNames([
                        ClassNames.DATAGRID_COLUMN, //prettier
                        ClassNames.DATAGRID_SELECT,
                        ClassNames.DATAGRID_FIXED_COLUMN,
                        ClassNames.DATAGRID_NG_STAR_INSERTED,
                    ])}
                >
                    <span className={ClassNames.DATAGRID_COLUMN_TITLE}>
                        {selectionType === GridSelectionType.MULTI && (
                            <div
                                className={classNames([
                                    ClassNames.CLR_CHECKBOX_WRAPPER,
                                    ClassNames.DATAGRID_NG_STAR_INSERTED,
                                ])}
                            >
                                <CheckBox
                                    id="select_all"
                                    onChange={evt => this.handleSelectAll(evt)}
                                    ariaLabel="Select All"
                                    className={ClassNames.CLR_SELECT}
                                    checked={selectAll !== undefined ? selectAll : undefined}
                                />
                            </div>
                        )}
                    </span>
                    <div className={ClassNames.DATAGRID_COLUMN_SEPARATOR} />
                </div>
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
        return (
            <div className={ClassNames.DATAGRID_ROW_STICKY}>
                <div
                    role="gridcell"
                    className={classNames([
                        ClassNames.DATAGRID_SELECT,
                        ClassNames.DATAGRID_FIXED_COLUMN,
                        ClassNames.DATAGRID_CELL,
                        ClassNames.DATAGRID_NG_STAR_INSERTED,
                    ])}
                >
                    {selectionType === GridSelectionType.MULTI ? (
                        <div
                            className={classNames([
                                ClassNames.CLR_CHECKBOX_WRAPPER,
                                ClassNames.DATAGRID_NG_STAR_INSERTED,
                            ])}
                        >
                            <CheckBox
                                id={rowID.toString()}
                                ariaLabel="Select"
                                className={ClassNames.CLR_SELECT}
                                onChange={evt => this.handleSelectSingle(evt, rowID)}
                                checked={isSelected !== undefined ? isSelected : undefined}
                            />
                        </div>
                    ) : (
                        <div
                            className={classNames([ClassNames.CLR_RADIO_WRAPPER, ClassNames.DATAGRID_NG_STAR_INSERTED])}
                        >
                            <RadioButton
                                value={rowID}
                                id={rowID.toString()}
                                className={ClassNames.CLR_SELECT}
                                onChange={evt => this.handleSelectSingle(evt, rowID)}
                                checked={isSelected !== undefined ? isSelected : undefined}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // function to build datagrid body
    private buildDataGridBody(): React.ReactElement {
        const {allRows} = this.state;
        return (
            <div className={ClassNames.DATAGRID}>
                <div className={ClassNames.DATAGRID_TABLE_WRAPPER}>
                    <div ref={this.datagridTableRef} className={ClassNames.DATAGRID_TABLE} role="grid">
                        {this.buildDataGridHeader()}
                        {allRows.map((row: DataGridRow, index: number) => {
                            return this.buildDataGridRow(row, index);
                        })}
                        {this.buildPlaceHolderContainer()}
                    </div>
                </div>
            </div>
        );
    }

    // Function to build placeholder container
    private buildPlaceHolderContainer(): React.ReactElement {
        const {allRows} = this.state;

        return (
            <div
                className={classNames([
                    ClassNames.DATAGRID_PLACEHOLDER_CONTAINER,
                    ClassNames.DATAGRID_NG_STAR_INSERTED,
                ])}
            >
                <div
                    className={classNames([
                        ClassNames.DATAGRID_PLACEHOLDER,
                        allRows.length === 0 && ClassNames.DATAGRID_EMPTY,
                    ])}
                >
                    {allRows.length === 0 && this.buildEmptyPlaceholder()}
                </div>
            </div>
        );
    }

    // Function to create placeholder for empty datagrid
    private buildEmptyPlaceholder(): React.ReactElement {
        const {itemText} = this.state;
        const placeholderText = "We couldn't find any " + itemText + " !";
        return (
            <React.Fragment>
                <div
                    className={classNames([ClassNames.DATAGRID_PLACEHOLDER_IMG, ClassNames.DATAGRID_NG_STAR_INSERTED])}
                />
                {placeholderText}
            </React.Fragment>
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
                        {selectionType && this.buildSelectColumn()}
                        <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                            {rowType && rowType === GridRowType.EXPANDABLE && this.buildEmptyColumn()}
                            {allColumns &&
                                allColumns.map((column: DataGridColumn, index: number) => {
                                    return column.isVisible ? this.buildDataGridColumn(column, index) : undefined;
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Function to build datagrid colums
    private buildDataGridColumn(column: DataGridColumn, index: number): React.ReactElement {
        const {columnName, columnID, className, style, sort, filter, width} = column;
        const columnHeight =
            this.datagridTableRef && this.datagridTableRef.current && this.datagridTableRef.current.clientHeight;

        return (
            <div
                role="columnheader"
                className={classNames([ClassNames.DATAGRID_COLUMN, ClassNames.DATAGRID_NG_STAR_INSERTED, className])}
                aria-sort="none"
                style={{...style, width: width + "px"}}
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
                            {sort.isSorted && sort.defaultSortOrder !== SortOrder.NONE && (
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
                    <DataGridColumnResize height={columnHeight} column={column} updateColumn={this.updateColumnWidth} />
                </div>
            </div>
        );
    }

    // function to build datagrid rows
    private buildDataGridRow(row: DataGridRow, index: number): React.ReactElement {
        const {selectionType, rowType} = this.props;
        const {rowID, rowData, className, style, isSelected, isExpanded, expandableContent} = row;
        let rowStyle = style;
        if (index === 0) {
            rowStyle = {...style, borderTop: "none"};
        }
        return (
            <div
                role="rowgroup"
                className={classNames([
                    ClassNames.DATAGRID_ROW,
                    ClassNames.DATAGRID_NG_STAR_INSERTED,
                    isSelected && ClassNames.DATAGRID_SELECTED,
                    className,
                ])}
                aria-owns={"clr-dg-row" + index}
                style={rowStyle}
                key={"row-" + index}
            >
                <div
                    className={classNames([ClassNames.DATAGRID_ROW_MASTER, ClassNames.DATAGRID_NG_STAR_INSERTED])}
                    role="row"
                >
                    {selectionType && this.buildSelectCell(rowID!, isSelected)}
                    <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                        <div className={ClassNames.DATAGRID_SCROLLING_CELLS}>
                            {rowType &&
                                rowType === GridRowType.EXPANDABLE &&
                                this.buildExpandableCell(rowID!, isExpanded!, expandableContent)}
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
        const columnObj = this.getColObject(columnName);
        const width = this.getColWidth(columnName);
        const isColVisible = this.isColVisible(columnName);

        return (
            <div
                role="gridcell"
                key={"cell-" + index}
                className={classNames([
                    ClassNames.DATAGRID_CELL,
                    ClassNames.DATAGRID_NG_STAR_INSERTED,
                    isColVisible !== undefined && !isColVisible && ClassNames.DATAGRID_HIDDEN_COLUMN,
                    columnObj && columnObj.className,
                    className,
                ])}
                style={{...style, width: width + "px"}}
            >
                {cellData}
            </div>
        );
    }

    // Function to build pageSizes select
    private buildPageSizesSelect(): React.ReactElement {
        const {pageSizes, pageSize} = this.state.pagination!;
        const {itemText} = this.state;

        return (
            <div className={ClassNames.PAGINATION_SIZE}>
                <div _ngcontent-clarity-c8="">
                    {` ${itemText}  ${" per page"} `}
                    <div className={classNames([ClassNames.CLR_SELECT_WRAPPER])}>
                        <select
                            className={classNames([ClassNames.CLR_PAGE_SIZE_SELECT])}
                            onChange={evt => this.handleSelectPageSize(evt)}
                        >
                            {pageSizes!.map((size: number, index: number) => {
                                const selected = size === pageSize ? true : false;
                                return (
                                    <option key={index} value={size} selected={selected}>
                                        {size}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    private buildCompactPageButtons(): React.ReactElement {
        const {currentPage, totalPages} = this.state.pagination!;
        return (
            <div className={classNames([ClassNames.PAGINATION_LIST])}>
                <Button
                    key="left-compact"
                    className={ClassNames.PAGINATION_PREVIOUS}
                    icon={{shape: "angle left"}}
                    disabled={currentPage == 1 ? true : false}
                    onClick={this.gotoPreviousPage}
                />
                <span>{currentPage}</span>
                <Button
                    key="right-compact"
                    className={ClassNames.PAGINATION_NEXT}
                    icon={{shape: "angle right"}}
                    disabled={currentPage === totalPages ? true : false}
                    onClick={this.gotoNextPage}
                />
            </div>
        );
    }

    // Function to build Next, previous, last and first page buttons
    private buildPageButtons(): React.ReactElement {
        const {currentPage, totalPages} = this.state.pagination!;
        return (
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
                    defaultValue={currentPage.toString()}
                    type="text"
                    ref={this.pageIndexRef}
                    aria-label="Current Page"
                    onBlur={evt => this.handlePageChangeOnBlur(evt)}
                    onKeyDown={evt => this.handlePageChangeOnKeyDown(evt)}
                />
                &nbsp;/&nbsp;<span aria-label="Total Pages">{totalPages}</span>
                <Button
                    key="right"
                    className={ClassNames.PAGINATION_NEXT}
                    icon={{shape: "angle right"}}
                    disabled={currentPage === totalPages ? true : false}
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
        );
    }

    // function to build datagrid pagination footer
    private buildDataGridPagination(): React.ReactElement {
        const {className, style, compactFooter} = this.props.pagination!;
        const {itemText} = this.state;
        let {totalItems, firstItem, lastItem, pageSize, pageSizes} = this.state.pagination!;
        if (totalItems === 0) {
            firstItem = lastItem = 0;
        }
        const paginationLabel = compactFooter
            ? firstItem + "-" + lastItem + " / " + totalItems
            : firstItem + "-" + lastItem + " of " + totalItems + " " + itemText;

        return (
            <div
                _ngcontent-clarity-c8=""
                style={style}
                className={classNames([ClassNames.DATAGRID_PAGINATION, className])}
            >
                {!compactFooter && pageSizes && totalItems >= pageSize && this.buildPageSizesSelect()}

                {compactFooter ? (
                    <div className={ClassNames.DATAGRID_NG_STAR_INSERTED} style={Styles.PAGINATION_DESCRIPTION_COMPACT}>
                        {paginationLabel}
                    </div>
                ) : (
                    <div className={classNames([ClassNames.PAGINATION_DESC])}>{paginationLabel}</div>
                )}

                {compactFooter ? this.buildCompactPageButtons() : this.buildPageButtons()}
            </div>
        );
    }

    // function to build Hide and show columns menu
    private buildHideShowColumnsBtn(): React.ReactElement {
        const {allColumns} = this.state;
        return <HideShowColumns columns={allColumns} updateColumns={this.updateColumns} />;
    }

    // function to build selected row count
    private buildSelectedRowCount(): React.ReactElement {
        const {selectedRowCount, selectionType} = this.props;
        const showSelectedRowsCount =
            selectedRowCount && selectedRowCount > 0 && selectionType === GridSelectionType.MULTI ? true : false;
        return showSelectedRowsCount ? (
            <div className={classNames([ClassNames.DATAGRID_FORM_CONTROL, ClassNames.DATAGRID_NG_STAR_INSERTED])}>
                <div className={ClassNames.DATAGRID_FOOTER_CHECKBOX}>
                    <CheckBox checked disabled label={selectedRowCount!.toString()} />
                </div>
            </div>
        ) : (
            <React.Fragment></React.Fragment>
        );
    }

    private buildFooterContent(): React.ReactElement {
        const {footer} = this.props;
        const {allRows, itemText} = this.state;
        const footerDescription = allRows.length.toString() + " " + itemText;
        let content;

        if (footer !== undefined) {
            content = footer.footerData !== undefined ? footer.footerData : footerDescription;
        }

        return <div> {content} </div>;
    }

    // function to build datagrid footer
    private buildDataGridFooter(): React.ReactElement {
        const {footer} = this.props;
        const {pagination} = this.state;
        let renderPaginationFooter = false;
        if (pagination) {
            const {totalItems, pageSize} = pagination;
            if (totalItems && pageSize && totalItems >= pageSize) {
                renderPaginationFooter = true;
            }
        }

        return (
            <div
                className={`${ClassNames.DATAGRID_FOOTER} ${footer && footer.className && footer.className}`}
                style={footer && footer.style && footer.style}
            >
                {footer &&
                    footer.hideShowColumns &&
                    footer.hideShowColumns.hideShowColBtn &&
                    this.buildHideShowColumnsBtn()}

                {this.buildSelectedRowCount()}

                <div className={ClassNames.DATAGRID_FOOTER_DESC}>
                    {renderPaginationFooter ? this.buildDataGridPagination() : this.buildFooterContent()}
                </div>
            </div>
        );
    }

    buildDataGridSpinner(): React.ReactElement {
        return (
            <div className={classNames([ClassNames.DATAGRID_SPINNER, ClassNames.DATAGRID_NG_STAR_INSERTED])}>
                <Spinner size={SpinnerSize.MEDIUM} />
            </div>
        );
    }

    // render datagrid
    render() {
        const {className, style, rowType, footer, dataqa} = this.props;
        const {isLoading} = this.state;
        return (
            <div
                className={classNames([
                    ClassNames.DATAGRID_HOST, // prettier
                    rowType === GridRowType.COMPACT && ClassNames.DATAGRID_COMPACT,
                    className,
                ])}
                style={style}
                data-qa={dataqa}
            >
                <div className={ClassNames.DATAGRID_OUTER_WRAPPER}>
                    <div className={ClassNames.DATAGRID_INNER_WRAPPER}>
                        {this.buildDataGridBody()}
                        {footer && footer.showFooter && this.buildDataGridFooter()}
                        <div className={ClassNames.DATAGRID_CAL_TABLE}>
                            <div className={ClassNames.DATAGRID_CAL_HEADER} />
                        </div>
                        {isLoading && this.buildDataGridSpinner()}
                    </div>
                </div>
            </div>
        );
    }
}
