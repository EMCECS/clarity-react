/**
 * Copyright (c) 2018 - 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React from "react";
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
 * @param {hideSelectAll} when true will not show select all checkbox, by default false
 * @param {keyfield} field to uniquely identify row
 * @param {rowType} Expandable or compact row type
 * @param {itemText} label to display for all items
 * @param {pagination} pagination support
 * @param {selectedRowCount} number of selected rows across all pages
 * @param {dataqa} quality engineering tag
 * @param {id} unique ID for datagrid
 * @param {isLoading} if true shows loading spinner else shows datagrid
 */
type DataGridProps = {
    className?: string;
    style?: any;
    selectionType?: GridSelectionType;
    columns: DataGridColumn[];
    rows?: DataGridRow[];
    footer?: DataGridFooter;
    onRowSelect?: (selectedRow: DataGridRow) => void;
    onSelectAll?: (areAllSelected: boolean, selectedRows: DataGridRow[]) => void;
    hideSelectAll?: boolean;
    keyfield?: string;
    rowType?: GridRowType;
    itemText?: string;
    pagination?: DataGridPaginationProps;
    selectedRowCount?: number;
    dataqa?: string;
    id?: string;
    isLoading?: boolean;
};

/**
 * type for DataGridColumn :
 * @param {columnName} column data
 * @param {displayName} display name for column
 * @param {tooltip} tooltip for column
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
    displayName?: any;
    tooltip?: any;
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
 * @param {detailPaneData} data for row detail panel
 * @param {disableRowSelection} If true then hide checkbox or radio button to select row.
 */
export type DataGridRow = {
    rowData: DataGridCell[];
    className?: string;
    style?: any;
    rowID?: number; // not to take from user
    isSelected?: boolean;
    expandableRowData?: ExpandableRowDetails;
    detailPaneData?: DetailPaneData;
    disableRowSelection?: boolean;
};

/**
 * type for datagrid expandable row data :
 * @param {isLoading} if true then show loading icon for expandable row
 * @param {onRowExpand} callback function to fetch expandable row contents
 * @param {onRowContract} callback function for additional logic after row contracts
 * @param {expandableContent} content to show after row expand
 * @param {isExpanded} true if row is already expanded
 * @param {hideRowExpandIcon} if true then hide icon for expandable row
 */
export type ExpandableRowDetails = {
    isLoading?: boolean;
    onRowExpand?: (row: DataGridRow) => Promise<any>;
    onRowContract?: (row: DataGridRow) => void;
    expandableContent?: any;
    isExpanded?: boolean;
    hideRowExpandIcon?: boolean;
};

/**
 * type for datagrid row detail pane data :
 * @param {title} title for detail pane
 * @param {hideDetailPane} if false then render UI for detail panel for row
 * @param {onOpenDetails} callback function to fetch row detail pane contents
 * @param {onCloseDetails} callback function to call on close of detail pane contents
 * @param {detailPaneContent} static content to show in detail pane
 * @param {isOpen} true if detail pane for row is open
 */
export type DetailPaneData = {
    title?: any;
    hideDetailPane?: boolean;
    onOpenDetails?: (row: DataGridRow) => Promise<any>;
    onCloseDetails?: (row: DataGridRow) => void;
    detailPaneContent: any;
    isOpen?: boolean;
};

/**
 * type for DataGridCell :
 * @param {cellData} cell Data to be used for comparison purposes
 * @param {className} CSS class name
 * @param {style} CSS style
 * @param {cellDisplayData} Optional field to be used if user want to display JSX Element. cellData should be set as well
 */
export type DataGridCell = {
    cellData: any;
    cellDisplayData?: JSX.Element;
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
    hideShowColumns?: DataGridHideShowColumns;
    showFooter: boolean;
};

/**
 * type for DataGridFooter hide show columns :
 * @param {updateDataGridColumns} Function to update datagrid columns in parent
 */
export type DataGridHideShowColumns = {
    hideShowColBtn: boolean;
    updateDataGridColumns?: (columns: DataGridColumn[]) => void;
};

/**
 * type for DataGridSort :
 * @param {defaultSortOrder} if data in column by default sorted
 * @param {sortFunction} function to perform sorting
 * @param {isSorted} checks if column is currently sorted or not
 * @param {hideSort} if true hides sort
 */
export type DataGridSort = {
    defaultSortOrder: SortOrder;
    sortFunction: (rows: DataGridRow[], order: SortOrder, columnName: string) => Promise<DataGridRow[]>;
    isSorted?: boolean;
    hideSort?: boolean;
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
 * Enum for RowType :
 * @param {EXPANDABLE} for enabling expandable rows
 * @param {COMPACT} for enabling compact rows
 * @param {ROWS_WITH_DETAIL_PANE} for enabling detail pane for rows
 * @param {EXPANDABLE_ROWS_WITH_DETAIL_PANE} for enabling detail pane for expandable rows
 * @param {COMPACT_ROWS_WITH_DETAIL_PANE} for enabling detail pane for compact rows
 */
export enum GridRowType {
    EXPANDABLE = "expandable",
    COMPACT = "compact",
    ROWS_WITH_DETAIL_PANE = "rows_with_detail_pane",
    EXPANDABLE_ROWS_WITH_DETAIL_PANE = "expandable_rows_with_detail_pane",
    COMPACT_ROWS_WITH_DETAIL_PANE = "compact_rows_with_detail_panes",
}

const isSelectedKey = "isSelected";

// Default label for datagrid items
const DEFAULT_ITEM_TEXT: string = "items";

// Default width of datagrid column in px
export const DEFAULT_COLUMN_WIDTH: number = 100;

// Default pagination constants
export const DEFAULT_CURRENT_PAGE_NUMBER: number = 1;
export const DEFAULT_PAGE_SIZE: number = 10;
export const DEFAULT_TOTAL_ITEMS: number = 0;

/**
 * State for DataGrid :
 * @param {selectAll} set to true if all rows got selected else false
 * @param {allColumns} column data
 * @param {allRows} row data
 * @param {pagination} pagination data
 * @param {isLoading} if true shows loading spinner else shows datagrid
 */
type DataGridState = {
    selectAll: boolean;
    allColumns: DataGridColumn[];
    allRows: DataGridRow[];
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

/**
 * DataGrid Component :
 * Displays data in grid format
 */
export class DataGrid extends React.PureComponent<DataGridProps, DataGridState> {
    private pageIndexRef = React.createRef<HTMLInputElement>();
    private datagridTableRef = React.createRef<HTMLDivElement>();

    constructor(props: DataGridProps) {
        super(props);
        this.state = this.initializeDataGridState();
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

    // Function to initialize datagrid state
    initializeDataGridState = (): DataGridState => {
        const {isLoading} = this.props;
        const rows = this.initializeRowData();
        const columns = this.initializeColumnData();
        const dataGridState: DataGridState = {
            isLoading: isLoading || false,
            selectAll: this.isAllRowsSelected(rows),
            allColumns: [...columns],
            allRows: [...rows],
            pagination: this.initializePaginationData(),
        };
        return dataGridState;
    };

    // Function to initialize rows data in state
    initializeRowData = (): DataGridRow[] => {
        const {rows} = this.props;
        let updatedRows: DataGridRow[] = [];
        if (rows && rows.length) {
            updatedRows = this.updateRowIDs(rows);
            updatedRows.forEach(function(row) {
                const rowSelectionIsDisabled = row.disableRowSelection !== undefined ? row.disableRowSelection : false;
                row.isSelected = !rowSelectionIsDisabled && row.isSelected !== undefined ? row.isSelected : false;
            });
        }
        return updatedRows;
    };

    // Function to initialize columns data in state
    initializeColumnData = (): DataGridColumn[] => {
        const {columns} = this.props;
        let updatedColumns: DataGridColumn[] = [];
        if (columns && columns.length) {
            updatedColumns = this.updateColumnIDs(this.setColumnVisibility(columns));
            updatedColumns.forEach(col => {
                col.width = col.width ? col.width : DEFAULT_COLUMN_WIDTH;
            });
        }
        return updatedColumns;
    };

    // Initialize state of grid with pagination
    private initializePaginationData() {
        const {pagination} = this.props;
        if (pagination) {
            const {currentPage, pageSize, totalItems, compactFooter, pageSizes} = pagination;
            const currentPageNumber: number = currentPage || DEFAULT_CURRENT_PAGE_NUMBER;
            const datagridPageSize: number = pageSize || DEFAULT_PAGE_SIZE;
            const totalItemsInDatagrid: number = totalItems || DEFAULT_TOTAL_ITEMS;

            const firstItem: number = this.getFirstItemIndex(currentPageNumber, datagridPageSize);
            const lastItem: number = this.getLastItemIndex(datagridPageSize, totalItemsInDatagrid, firstItem);

            const paginationState: DataGridPaginationState = {
                currentPage: currentPageNumber,
                pageSize: datagridPageSize,
                totalItems: totalItemsInDatagrid,
                pageSizes: pageSizes,
                compactFooter: compactFooter || false,
                firstItem: firstItem,
                lastItem: lastItem,
                totalPages: this.getTotalPages(totalItemsInDatagrid, datagridPageSize),
            };

            return paginationState;
        }
    }

    // Function to return all selected rows
    getSelectedRows = (): DataGridRow[] => {
        const {allRows} = this.state;
        return allRows.filter(row => row.isSelected === true);
    };

    // Function to return all selection enabled rows
    getSelectionEnabledRows = (allRows: DataGridRow[]): DataGridRow[] => {
        return allRows.filter(row => !row.disableRowSelection);
    };

    // Function to check if all selectable rows are selected or not
    isAllRowsSelected = (allRows: DataGridRow[]): boolean => {
        const rows = this.getSelectionEnabledRows(allRows);
        if (rows && rows.length) {
            return allTrueOnKey(rows, isSelectedKey);
        }
        return false;
    };

    // Function to get all rows
    getAllRows = () => {
        return this.state.allRows;
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
            selectAll: this.isAllRowsSelected(updatedRows),
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

    // Function to hide loading spinner on datagrid
    hideLoader() {
        this.setState({isLoading: false});
    }

    // Function to show loading spinner on datagrid
    showLoader() {
        this.setState({isLoading: true});
    }

    // Function to close any open detail pane
    closeDetailPane = () => {
        if (this.isDetailPaneOpen()) {
            const row = this.getRowDataWithOpenDetailPane();
            row && row.rowID !== undefined && this.handleDetailPaneToggle(row.rowID);
        }
    };

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
        const {pageSize, currentPage} = this.state.pagination!;
        let previousPage = currentPage - 1;
        if (previousPage < 1) previousPage = 1;
        this.getPage(previousPage, pageSize);
    };

    // Function to handle pageIndex change in input box on blur event
    private handlePageChangeOnBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
        const {pagination} = this.state;
        const pageInputFieldValue: number | null =
            this.pageIndexRef.current && parseInt(this.pageIndexRef.current.value);
        const currentPageValue: number | null | undefined = pagination && pagination.currentPage;
        if (pageInputFieldValue !== currentPageValue) {
            this.handlePageChange();
        }
    };

    // Function to handle pageIndex change in input box on Enter ot Tab key press event
    private handlePageChangeOnKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        // Check for 'Enter' or 'tab' key
        const keyCode = evt.keyCode;
        if (keyCode === 13 || keyCode === 9) {
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
                    this.setState(
                        {
                            allRows: [...rows],
                            pagination: paginationState,
                            selectAll: this.isAllRowsSelected(rows),
                        },
                        () => this.closeDetailPane(),
                    );
                    this.hideLoader();
                });
            }
        }
    }

    /* ############################# Pagination methods end ####################################*/

    //toggle collapse of expandable row
    private toggleExpand(rowID: number) {
        let {allRows} = this.state;
        let {expandableRowData} = allRows[rowID];
        if (expandableRowData) {
            expandableRowData.isExpanded = !expandableRowData.isExpanded;
            const {onRowExpand, isExpanded, onRowContract} = expandableRowData;
            if (onRowExpand && isExpanded) {
                // For dynamic loading of expandable row content
                expandableRowData!.isLoading = true;
                // update row data in datagrid state
                allRows[rowID].expandableRowData = expandableRowData;
                this.setState({allRows: [...allRows]}, () => {
                    onRowExpand(allRows[rowID]).then((content: any) => {
                        // Update datagrid row with expandable content
                        expandableRowData!.expandableContent = content;
                        expandableRowData!.isLoading = false;
                        allRows[rowID].expandableRowData = expandableRowData; // update row data in datagrid state
                        this.setState({allRows: [...allRows]});
                    });
                });
            } else if (onRowContract && !isExpanded) {
                //Callback is called as an argument of this.setState callback for state refreshing.
                this.setState({allRows: [...allRows]}, () => {
                    onRowContract(allRows[rowID]);
                });
            } else {
                // For static loading of expandable row contnet
                allRows[rowID].expandableRowData = expandableRowData; // update row data in datagrid state
                this.setState({allRows: [...allRows]});
            }
        }
    }

    // Handler for detail pane toggle
    public handleDetailPaneToggle = (rowID: number) => {
        let {allRows} = this.state;
        let {detailPaneData} = allRows[rowID];

        if (detailPaneData) {
            detailPaneData.isOpen = !detailPaneData.isOpen;
            const {isOpen, onOpenDetails, onCloseDetails} = detailPaneData;

            const updatedRows: DataGridRow[] = allRows.map((row: DataGridRow) => {
                if (row.detailPaneData) {
                    row.detailPaneData.isOpen = false;
                }
                return row;
            });

            if (isOpen) {
                // For open panel
                onOpenDetails &&
                    onOpenDetails(allRows[rowID]).then((content: any) => {
                        if (content) {
                            // For dynamic update of detail content
                            updatedRows[rowID].detailPaneData!.detailPaneContent = content;
                        }
                    });
                updatedRows[rowID].detailPaneData!.isOpen = isOpen;
            }

            this.setState(
                {
                    allRows: [...updatedRows],
                },
                () => !isOpen && onCloseDetails && onCloseDetails(allRows[rowID]),
            );
        }
    };

    // Function to handle select/deselect of all rows
    private handleSelectAll = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let {allRows, selectAll} = this.state;
        const {onSelectAll} = this.props;
        allRows.forEach(row => {
            if (!row.disableRowSelection) {
                row.isSelected = !selectAll;
            }
        });

        this.setState(
            {
                selectAll: !selectAll,
                allRows: [...allRows],
            },
            () => onSelectAll && onSelectAll(!selectAll, allRows),
        );
    };

    // Function to handle select/deselect of single row
    private handleSelectSingle = (evt: React.ChangeEvent<HTMLInputElement>, rowID: any) => {
        let {allRows} = this.state;
        const {onRowSelect, selectionType} = this.props;
        let selectedRow: DataGridRow;
        allRows.forEach(row => {
            if (row.rowID === rowID) {
                row.isSelected = !row.isSelected;
                selectedRow = row;
            } else if (selectionType === GridSelectionType.SINGLE) {
                row.isSelected = false;
            }
        });

        this.setState(
            {
                allRows: [...allRows],
                selectAll: this.isAllRowsSelected(allRows),
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
        if (columnID !== undefined) {
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

                this.setState(
                    {
                        allRows: [...rows],
                        allColumns: [...allColumns],
                    },
                    () => this.closeDetailPane(),
                );
                this.hideLoader();
            });
        }
    };

    private updateRowIDs(rows: DataGridRow[]) {
        // set rowID = index in array
        if (rows && rows.length) {
            rows.map((row: DataGridRow, index: number) => (row.rowID = index));
        }

        return rows;
    }

    private updateColumnIDs(columns: DataGridColumn[]) {
        // set columnID = index in array
        columns.map((column: DataGridColumn, index: number) => (column["columnID"] = index));
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

        // Hide all columns except first visible column if detail pane is open
        const isColumnVisible =
            this.isDetailPaneOpen() && column && column.columnID !== this.getFirstVisibleColumn()!.columnID
                ? false
                : column && column.isVisible;

        return isColumnVisible;
    }

    // Update sorting state of columns
    private setSortingState(columns: DataGridColumn[]) {
        const {allColumns} = this.state;
        columns.map((column: DataGridColumn, index: number) => {
            if (column.sort) {
                const col = allColumns.find(({columnName}) => columnName === column.columnName);
                if (col && col.sort) {
                    col.sort.hideSort = column.sort.hideSort;
                    column.sort = col.sort;
                }
            } else {
                column.sort = undefined;
            }
        });
        return columns;
    }

    // get details of first visible column
    private getFirstVisibleColumn = () => {
        const {allColumns} = this.state;
        return allColumns.find((column: DataGridColumn) => column.isVisible === true);
    };

    // Check if datagrid need to render detail Pane for rows
    private isDatagridWithDetailPane = (): boolean => {
        const {rowType} = this.props;

        return rowType
            ? rowType === GridRowType.ROWS_WITH_DETAIL_PANE ||
                  rowType === GridRowType.EXPANDABLE_ROWS_WITH_DETAIL_PANE ||
                  rowType === GridRowType.COMPACT_ROWS_WITH_DETAIL_PANE
            : false;
    };

    // Get details of row whose detail pane is open
    private getRowDataWithOpenDetailPane = () => {
        if (this.isDatagridWithDetailPane()) {
            return this.state.allRows.find(
                (row: DataGridRow) => row.detailPaneData && row.detailPaneData.isOpen === true,
            );
        }
    };

    // Check if any detail pane is open in datagrid
    private isDetailPaneOpen = (): boolean => {
        return this.isDatagridWithDetailPane() && this.getRowDataWithOpenDetailPane() !== undefined;
    };

    /* ##########  DataGrid private methods end  ############ */

    /* ##########  DataGrid DOM methods start  ############ */

    // Function to render detail pane icon cell
    private buildDetailPaneToggleIcon({rowID, detailPaneData}: DataGridRow): React.ReactElement {
        const {id} = this.props;
        const {isOpen, hideDetailPane} = detailPaneData
            ? detailPaneData
            : {
                  isOpen: false,
                  hideDetailPane: false,
              };
        return (
            <div
                className={classNames([
                    ClassNames.DATAGRID_DETAIL_CARET, //prettier
                    ClassNames.DATAGRID_FIXED_COLUMN,
                    ClassNames.DATAGRID_CELL,
                    ClassNames.DATAGRID_NG_STAR_INSERTED,
                ])}
            >
                {!hideDetailPane && (
                    <Button
                        key={`${id}-${"detail-toggle"}-${rowID}`}
                        defaultBtn={false}
                        onClick={() => rowID !== undefined && this.handleDetailPaneToggle(rowID)}
                        aria-haspopup="dialog"
                        className={classNames([ClassNames.DATAGRID_DETAIL_CARET_BUTTON, isOpen && ClassNames.IS_OPEN])}
                        aria-expanded={isOpen}
                        aria-controls={`clr-id-${rowID}`}
                        icon={{
                            shape: "angle-double",
                            className: ClassNames.DATAGRID_DETAIL_CARET_ICON,
                            dir: isOpen ? Direction.LEFT : Direction.RIGHT,
                        }}
                    />
                )}
            </div>
        );
    }

    // Function to render expandable icon cell
    private buildExpandableCell({rowID, expandableRowData}: DataGridRow): React.ReactElement {
        const {id} = this.props;
        const {hideRowExpandIcon, isExpanded, isLoading} = expandableRowData
            ? expandableRowData
            : {
                  hideRowExpandIcon: false,
                  isExpanded: false,
                  isLoading: false,
              };
        return (
            <div className={ClassNames.DATAGRID_EXPANDABLE_CARET} role="gridcell" key={rowID}>
                {isLoading ? (
                    <Spinner size={SpinnerSize.SMALL} />
                ) : (
                    !hideRowExpandIcon && (
                        <Button
                            key={`${id}-${"expand"}-${rowID}`}
                            className={ClassNames.DATAGRID_EXPANDABLE_CARET_BUTTON}
                            onClick={() => rowID !== undefined && this.toggleExpand(rowID)}
                            icon={{
                                shape: "caret",
                                className: ClassNames.DATAGRID_EXPANDABLE_CARET_ICON,
                                dir: isExpanded ? Direction.DOWN : Direction.RIGHT,
                            }}
                        />
                    )
                )}
            </div>
        );
    }

    // Function to render selectAll column
    private buildSelectColumn(): React.ReactElement {
        const {selectionType, id, hideSelectAll} = this.props;
        const {selectAll} = this.state;
        return (
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
                    {selectionType === GridSelectionType.MULTI && !hideSelectAll && (
                        <div
                            className={classNames([
                                ClassNames.CLR_CHECKBOX_WRAPPER,
                                ClassNames.DATAGRID_NG_STAR_INSERTED,
                            ])}
                        >
                            <CheckBox
                                id={`${id}-datagrid-select-all`}
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

    // Function to render select cell
    private buildSelectCell(row: DataGridRow): React.ReactElement {
        const {selectionType, id} = this.props;
        const wrapperClassName =
            selectionType === GridSelectionType.MULTI ? ClassNames.CLR_CHECKBOX_WRAPPER : ClassNames.CLR_RADIO_WRAPPER;
        return (
            <div
                role="gridcell"
                className={classNames([
                    ClassNames.DATAGRID_SELECT,
                    ClassNames.DATAGRID_FIXED_COLUMN,
                    ClassNames.DATAGRID_CELL,
                    ClassNames.DATAGRID_NG_STAR_INSERTED,
                ])}
            >
                <div className={classNames([wrapperClassName, ClassNames.DATAGRID_NG_STAR_INSERTED])}>
                    {!row.disableRowSelection &&
                        (selectionType === GridSelectionType.MULTI ? (
                            <CheckBox
                                id={`${id}-${row.rowID}-select-checkbox`}
                                ariaLabel="Select"
                                className={ClassNames.CLR_SELECT}
                                onChange={evt => this.handleSelectSingle(evt, row.rowID)}
                                checked={row.isSelected !== undefined ? row.isSelected : undefined}
                            />
                        ) : (
                            <RadioButton
                                value={row.rowID}
                                id={`${id}-${row.rowID}-select-radio`}
                                className={ClassNames.CLR_SELECT}
                                onChange={evt => this.handleSelectSingle(evt, row.rowID)}
                                checked={row.isSelected !== undefined ? row.isSelected : undefined}
                            />
                        ))}
                </div>
            </div>
        );
    }

    // Function to build datagrid body
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
                        "clr-align-items-center",
                        "clr-justify-content-center",
                    ])}
                >
                    {allRows.length === 0 && this.buildEmptyPlaceholder()}
                </div>
            </div>
        );
    }

    // Function to create placeholder for empty datagrid
    private buildEmptyPlaceholder(): React.ReactElement {
        const {itemText = DEFAULT_ITEM_TEXT} = this.props;
        const placeholderText = "No " + itemText + " found!";
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
        const showEmptyHeader: boolean = rowType && rowType !== GridRowType.COMPACT ? true : false;

        return (
            <div className={ClassNames.DATAGRID_HEADER} role="rowgroup">
                <div className={ClassNames.DATAGRID_ROW} role="row">
                    <div className={ClassNames.DATAGRID_ROW_MASTER}>
                        <div className={ClassNames.DATAGRID_ROW_STICKY}>
                            {selectionType && this.buildSelectColumn()}
                            {rowType &&
                                rowType === GridRowType.EXPANDABLE_ROWS_WITH_DETAIL_PANE &&
                                this.buildEmptyColumn()}
                            {showEmptyHeader && this.buildEmptyColumn()}
                        </div>
                        <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                            {allColumns &&
                                allColumns.map((column: DataGridColumn, index: number) => {
                                    // Hide all columns except first visible column if detail pane is open
                                    const showColumn =
                                        this.isDetailPaneOpen() &&
                                        column.columnID !== this.getFirstVisibleColumn()!.columnID
                                            ? false
                                            : column.isVisible;
                                    return showColumn ? this.buildDataGridColumn(column, index) : undefined;
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Function to build datagrid columns
    private buildDataGridColumn(column: DataGridColumn, index: number): React.ReactElement {
        const {columnName, displayName, columnID, className, style, sort, filter, width, tooltip} = column;
        const columnHeight =
            this.datagridTableRef && this.datagridTableRef.current && this.datagridTableRef.current.clientHeight;
        const hideSort: boolean = sort && sort.hideSort !== undefined ? sort.hideSort : false;

        return (
            <div
                role="columnheader"
                className={classNames([ClassNames.DATAGRID_COLUMN, ClassNames.DATAGRID_NG_STAR_INSERTED, className])}
                aria-sort="none"
                style={{...style, width: width + "px"}}
                key={"col-" + index}
            >
                <div className={ClassNames.DATAGRID_COLUMN_FLEX}>
                    {sort !== undefined && !hideSort ? (
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
                            {displayName ? displayName : columnName}
                            {tooltip}
                            {sort.isSorted && sort.defaultSortOrder !== SortOrder.NONE && (
                                <Icon
                                    shape={sort.defaultSortOrder === SortOrder.DESC ? "arrow down" : "arrow up"}
                                    className={classNames([
                                        ClassNames.DATAGRID_SORT_ICON,
                                        ClassNames.DATAGRID_NG_STAR_INSERTED,
                                    ])}
                                />
                            )}
                        </Button>
                    ) : (
                        <span className={ClassNames.DATAGRID_COLUMN_TITLE}>
                            {displayName ? displayName : columnName}
                            {tooltip}
                        </span>
                    )}
                    {filter && filter}
                    <DataGridColumnResize height={columnHeight} column={column} updateColumn={this.updateColumnWidth} />
                </div>
            </div>
        );
    }

    // Function to build datagrid rows
    private buildDataGridRow(row: DataGridRow, index: number): React.ReactElement {
        const {rowType} = this.props;
        const {className, style, isSelected, disableRowSelection, detailPaneData} = row;
        const isExpandableRow: boolean = rowType
            ? rowType === GridRowType.EXPANDABLE || rowType === GridRowType.EXPANDABLE_ROWS_WITH_DETAIL_PANE
            : false;
        const isRowWithDetailPane: boolean = (row && row.detailPaneData && this.isDatagridWithDetailPane()) || false;

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
                    !disableRowSelection && isSelected && ClassNames.DATAGRID_SELECTED,
                    isRowWithDetailPane &&
                        detailPaneData &&
                        detailPaneData.isOpen &&
                        ClassNames.DATAGRID_ROW_DETAIL_OPEN,
                    className,
                ])}
                aria-owns={"clr-dg-row" + index}
                style={rowStyle}
                key={"row-" + index}
            >
                {isExpandableRow ? (
                    <div
                        className={classNames([
                            `ng-tns-c96-${index}`,
                            isExpandableRow && ClassNames.DATAGRID_EXPAND_ANIMATION,
                        ])}
                    >
                        {this.buildRowCells(row, isExpandableRow, isRowWithDetailPane)}
                    </div>
                ) : (
                    this.buildRowCells(row, isExpandableRow, isRowWithDetailPane)
                )}
            </div>
        );
    }

    // Function to build cells of single row
    private buildRowCells(row: DataGridRow, isExpandableRow: boolean, isRowWithDetailPane: boolean) {
        const {rowData} = row;
        const {selectionType} = this.props;
        return (
            <div
                className={classNames([ClassNames.DATAGRID_ROW_MASTER, ClassNames.DATAGRID_NG_STAR_INSERTED])}
                role="row"
            >
                <div className={ClassNames.DATAGRID_ROW_STICKY}>
                    {selectionType && this.buildSelectCell(row)}
                    {isExpandableRow && this.buildExpandableCell(row)}
                    {isRowWithDetailPane && this.buildDetailPaneToggleIcon(row)}
                </div>
                <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                    <div className={ClassNames.DATAGRID_SCROLLING_CELLS}>
                        <div className={ClassNames.DATAGRID_NG_STAR_INSERTED} />
                        <div className={ClassNames.DATAGRID_NG_STAR_INSERTED} />
                        {rowData &&
                            rowData.map((cell: DataGridCell, index: number) => {
                                return this.buildDataGridCell(
                                    cell.cellData,
                                    index,
                                    cell.columnName,
                                    cell.className,
                                    cell.style,
                                    cell.cellDisplayData,
                                );
                            })}
                    </div>
                    {/* //Insert Expandable item view */}
                    {isExpandableRow && this.buildExpandableRow(row)}
                </div>
            </div>
        );
    }

    private buildExpandableRow({expandableRowData}: DataGridRow) {
        const {expandableContent, isExpanded, isLoading} = expandableRowData
            ? expandableRowData
            : {
                  expandableContent: undefined,
                  isExpanded: false,
                  isLoading: false,
              };
        const showExpandableContent = expandableContent && isExpanded && !isLoading;
        return (
            <React.Fragment>
                {showExpandableContent && (
                    <div className={classNames([ClassNames.DATAGRID_ROW_FLEX])}>
                        <div className={ClassNames.CLR_SR_ONLY} />
                        {expandableContent}
                        <div className={ClassNames.CLR_SR_ONLY} />
                    </div>
                )}
            </React.Fragment>
        );
    }

    // Function to build detail pane DOM for row
    private buildDetailPaneForRow() {
        const row: DataGridRow | undefined = this.getRowDataWithOpenDetailPane();
        if (row) {
            const rowID = row.rowID;
            const {title, detailPaneContent, isOpen} = row.detailPaneData
                ? row.detailPaneData
                : {
                      title: undefined,
                      detailPaneContent: undefined,
                      isOpen: false,
                  };
            const showDetailPane: boolean = isOpen && detailPaneContent;

            return (
                <React.Fragment>
                    {showDetailPane && (
                        <div
                            className={classNames([
                                ClassNames.DATAGRID_DETAIL_PANE,
                                ClassNames.DATAGRID_NG_STAR_INSERTED,
                            ])}
                        >
                            <span
                                tabIndex={0}
                                className={classNames([
                                    ClassNames.OFFSCREEN_FOCUS_REBOUNDER,
                                    ClassNames.DATAGRID_NG_STAR_INSERTED,
                                ])}
                            />
                            <div
                                role="dialog"
                                aria-modal="true"
                                className={classNames([
                                    ClassNames.DATAGRID_DETAIL_PANE_CONTENT,
                                    ClassNames.DATAGRID_NG_STAR_INSERTED,
                                ])}
                                id={`${"clr-id-"}-${rowID}`}
                                aria-describedby={`clr-id-${rowID}-title`}
                                tabIndex={-1}
                            >
                                <div className={ClassNames.CLR_SR_ONLY} />
                                <div className={ClassNames.DATAGRID_DETAIL_HEADER}>
                                    <div
                                        className={ClassNames.DATAGRID_DETAIL_HEADER_TITLE}
                                        id={`clr-id-${rowID}-title`}
                                    >
                                        {title}
                                    </div>
                                    <div className={ClassNames.DATAGRID_DETAIL_PANE_CLOSE}>
                                        <Button
                                            aria-label="Close"
                                            className={ClassNames.PAGINATION_NEXT}
                                            icon={{shape: "close"}}
                                            onClick={() => rowID !== undefined && this.handleDetailPaneToggle(rowID)}
                                        />
                                    </div>
                                </div>
                                {/* close header*/}
                                <div className={ClassNames.DATAGRID_DETAIL_BODY}>
                                    <div className={ClassNames.CLR_DG_DETAIL_BODY_WRAPPER}> {detailPaneContent} </div>
                                </div>
                                {/* close body */}
                                <div className={ClassNames.CLR_SR_ONLY} />
                            </div>
                            <span
                                tabIndex={0}
                                className={classNames([
                                    ClassNames.OFFSCREEN_FOCUS_REBOUNDER,
                                    ClassNames.DATAGRID_NG_STAR_INSERTED,
                                ])}
                            />
                        </div>
                    )}
                </React.Fragment>
            );
        }
    }

    // Function to build datagrid cell
    private buildDataGridCell(
        cellData: any,
        index: number,
        columnName: string,
        className?: string,
        style?: any,
        cellDisplayData?: JSX.Element,
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
                {cellDisplayData || cellData}
            </div>
        );
    }

    // Function to build pageSizes select
    private buildPageSizesSelect(): React.ReactElement {
        const {pageSizes, pageSize} = this.state.pagination!;
        const {itemText = DEFAULT_ITEM_TEXT} = this.props;

        return (
            <div className={ClassNames.PAGINATION_SIZE}>
                <div _ngcontent-clarity-c8="">
                    {` ${itemText}  ${" per page"} `}
                    <div className={classNames([ClassNames.CLR_SELECT_WRAPPER])}>
                        <select
                            className={classNames([ClassNames.CLR_PAGE_SIZE_SELECT])}
                            onChange={evt => this.handleSelectPageSize(evt)}
                            defaultValue={pageSize}
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
                    disabled={currentPage === 1 ? true : false}
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
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.gotoFirstPage}
                />
                <Button
                    key="left"
                    className={ClassNames.PAGINATION_PREVIOUS}
                    icon={{shape: "angle left"}}
                    disabled={currentPage === 1 ? true : false}
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
                    disabled={currentPage === totalPages ? true : false}
                    onClick={this.gotoLastPage}
                />
            </div>
        );
    }

    // Function to build datagrid pagination footer
    private buildDataGridPagination(): React.ReactElement {
        const {className, style, compactFooter} = this.props.pagination!;
        const {itemText = DEFAULT_ITEM_TEXT} = this.props;
        const showCompactFooter: boolean = compactFooter || this.isDetailPaneOpen();
        let {totalItems, firstItem, lastItem, pageSize, pageSizes} = this.state.pagination!;
        if (totalItems === 0) {
            firstItem = lastItem = 0;
        }
        const paginationLabel = showCompactFooter
            ? firstItem + "-" + lastItem + " / " + totalItems
            : firstItem + "-" + lastItem + " of " + totalItems + " " + itemText;

        return (
            <div
                _ngcontent-clarity-c8=""
                style={style}
                className={classNames([ClassNames.DATAGRID_PAGINATION, className])}
            >
                {!showCompactFooter && pageSizes && totalItems >= pageSize && this.buildPageSizesSelect()}

                {showCompactFooter ? (
                    <div className={ClassNames.DATAGRID_NG_STAR_INSERTED} style={Styles.PAGINATION_DESCRIPTION_COMPACT}>
                        {paginationLabel}
                    </div>
                ) : (
                    <div className={classNames([ClassNames.PAGINATION_DESC])}>{paginationLabel}</div>
                )}

                {showCompactFooter ? this.buildCompactPageButtons() : this.buildPageButtons()}
            </div>
        );
    }

    // Function to build Hide and show columns menu
    private buildHideShowColumnsBtn(): React.ReactElement {
        const {allColumns} = this.state;
        return <HideShowColumns columns={allColumns} updateColumns={this.updateColumns} />;
    }

    // Function to build selected row count
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
            <React.Fragment />
        );
    }

    private buildFooterContent(): React.ReactElement {
        const {footer, itemText = DEFAULT_ITEM_TEXT} = this.props;
        const {allRows} = this.state;
        const footerDescription = allRows.length.toString() + " " + itemText;
        let content;

        if (footer !== undefined) {
            content = footer.footerData !== undefined ? footer.footerData : footerDescription;
        }

        return <div> {content} </div>;
    }

    // Function to build datagrid footer
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
                    !this.isDetailPaneOpen() &&
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
        const {className, style, rowType, footer, dataqa, isLoading} = this.props;
        const isDataLoading: boolean = isLoading !== undefined ? isLoading : this.state.isLoading;
        const isDetailPaneOpen: boolean = this.isDetailPaneOpen();
        const isCompactDatagrid: boolean =
            (rowType && rowType === GridRowType.COMPACT) || rowType === GridRowType.COMPACT_ROWS_WITH_DETAIL_PANE
                ? true
                : false;

        return (
            <div
                className={classNames([
                    ClassNames.DATAGRID_HOST, // prettier
                    isCompactDatagrid && ClassNames.DATAGRID_COMPACT,
                    isDetailPaneOpen && ClassNames.DATAGRID_DETAIL_OPEN,
                    className,
                ])}
                style={style}
                data-qa={dataqa}
            >
                <div className={ClassNames.DATAGRID_OUTER_WRAPPER}>
                    <div className={ClassNames.DATAGRID_INNER_WRAPPER}>
                        {this.buildDataGridBody()}
                        {footer && footer.showFooter && this.buildDataGridFooter()}
                        {isDataLoading && this.buildDataGridSpinner()}
                    </div>
                    {isDetailPaneOpen && this.buildDetailPaneForRow()}
                </div>
                <div className={ClassNames.DATAGRID_CAL_TABLE}>
                    <div className={ClassNames.DATAGRID_CAL_HEADER} />
                </div>
            </div>
        );
    }
}
