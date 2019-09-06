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
import {DataGridFilter} from "./DataGridFilter";

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
 * @param {data} rows data
 * @param {footer} footer component
 * @param {onRowSelect} Function which will gets called on select/deselect of rows
 * @param {onSelectAll} Function which will gets called on select/deselect of all rows
 * @param {rowType} Expandable or compact row type
 * @param {itemText} label to display for all items
 */
type DataGridProps = {
    className?: string;
    style?: any;
    selectionType?: GridSelectionType;
    pagination?: boolean;
    columns: DataGridColumn[];
    data?: DataGridRow[];
    footer?: DataGridFooter;
    onRowSelect?: Function;
    onSelectAll?: Function;
    keyfield?: string;
    rowType?: GridRowType;
    itemText?: string;
};

/**
 * type for DataGridColumn :
 * @param {columnName} column data
 * @param {sort} does colum support sorting
 * @param {className} CSS class name
 * @param {columns} column details
 * @param {style} CSS style
 * @param {onFilter} Function for custom filtering
 */
type DataGridColumn = {
    columnName: string;
    columnID?: number; // For internal use
    sort?: DataGridSort;
    className?: string;
    style?: any;
    onFilter?: (data: DataGridRow[], columnValue: string) => DataGridRow[];
};

/**
 * type for DataGridRow :
 * @param {content} row data
 * @param {rowID} unique ID to identify row
 * @param {isSelected} set to true if row is selected
 * @param {className} CSS class name
 * @param {style} CSS style
 * @param {expandableContent} Expandable data content
 */
export type DataGridRow = {
    content: DataGridCell[];
    className?: string;
    style?: any;
    rowID?: number; // not to take from user
    isSelected?: boolean; // not to take from user
    expandableContent?: any;
    isExpanded?: boolean;
};

/**
 * type for DataGridCell :
 * @param {content} cell data
 * @param {className} CSS class name
 * @param {style} CSS style
 */
type DataGridCell = {
    content: any;
    columnName: string;
    className?: string;
    style?: any;
};

/**
 * type for DataGridFooter :
 * @param {content} Footer data
 * @param {className} CSS class name
 * @param {style} CSS style
 */
type DataGridFooter = {
    content: any;
    className?: string;
    style?: any;
};

/**
 * type for DataGridSort :
 * @param {defaultSortOrder} if data in column by default sorted
 * @param {sortFunction} function to perform sorting
 */
type DataGridSort = {
    defaultSortOrder: SortOrder;
    sortFunction: (data: DataGridRow[], order: SortOrder, columnName: string) => DataGridRow[];
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
 * @param {EXPANDABLE} for enabling expandable row
 */
export enum GridRowType {
    EXPANDABLE = "expandable",
}

/**
 * State for DataGrid :
 * @param {selectAll} set to true if all rows got selected else false
 * @param {allColumns} column data
 * @param {allRows} row data
 * @param {itemText} label to display for all items
 */
type DataGridState = {
    selectAll: boolean;
    allColumns: DataGridColumn[];
    allRows: DataGridRow[];
    itemText: string;
};

/**
 * DataGrid Componnet :
 * Displays data in grid format
 */
export class DataGrid extends React.PureComponent<DataGridProps, DataGridState> {
    // Default props for datagrid
    static defaultProps = {
        pagination: false,
    };

    // Initial state of datagrid
    state: DataGridState = {
        selectAll: false,
        allColumns: this.props.columns,
        allRows: this.props.data !== undefined ? this.props.data : [],
        itemText: this.props.itemText !== undefined ? this.props.itemText : "items",
    };

    componentWillMount() {
        this.setInitalState();
    }

    // Initialize state of grid
    private setInitalState() {
        const {allRows, allColumns} = this.state;

        this.setState({
            allRows: [...this.updateRowIDs(allRows)],
            allColumns: [...this.updateColumnIDs(allColumns)],
        });
    }

    // Function to return all selected rows
    getSelectedRows(): DataGridRow[] {
        const {allRows} = this.state;
        let selectedRows = new Array();
        if (this.state.selectAll) {
            selectedRows = allRows;
        } else {
            selectedRows = allRows.filter(row => row["isSelected"] === true);
        }
        return selectedRows;
    }

    /* ##########  DataGrid private methods start  ############ */
    //toggle collapse of expandable row
    private toggleExpand(rowID: number) {
        const {allRows} = this.state;
        allRows.forEach(row => {
            if (row["rowID"] === rowID) {
                if (row["isExpanded"]) {
                    row["isExpanded"] = false;
                } else {
                    row["isExpanded"] = true;
                }
            }
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

            const rows = this.updateRowIDs(sortFunction(this.state.allRows, nextSortOrder, columnName));
            // update sort order
            allColumns[columnID].sort!.defaultSortOrder = nextSortOrder;

            this.setState({
                allRows: [...rows],
                allColumns: [...allColumns],
            });
        }
    };

    // Function to handle filter
    private handleFilter = (evt: React.ChangeEvent<HTMLInputElement>, filterFuntion: Function) => {
        const rows = this.updateRowIDs(filterFuntion(this.state.allRows, evt.target.value));

        this.setState({
            allRows: [...rows],
        });
    };

    updateRowIDs(rows: DataGridRow[]) {
        // set rowID = index in array
        rows.map((row: DataGridRow, index: number) => {
            row["rowID"] = index;
        });
        return rows;
    }

    updateColumnIDs(cols: DataGridColumn[]) {
        // set columnID = index in array
        cols.map((cols: DataGridColumn, index: number) => {
            cols["columnID"] = index;
        });
        return cols;
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
        const {selectionType} = this.props;
        const {allColumns} = this.state;
        return (
            <div className={ClassNames.DATAGRID_HEADER} role="rowgroup">
                <div className={ClassNames.DATAGRID_ROW} role="row">
                    <div className={ClassNames.DATAGRID_ROW_MASTER}>
                        <div className={ClassNames.DATAGRID_ROW_STICKY} />
                        <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                            {selectionType && this.buildSelectColumn()}
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
        const {columnName, columnID, className, style, sort, onFilter} = column;
        return (
            <div
                role="columnheader"
                className={classNames([ClassNames.DATAGRID_COLUMN, className])}
                aria-sort="none"
                style={style}
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
                    {onFilter && <DataGridFilter onChange={evt => this.handleFilter(evt, onFilter)} />}

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
        const {rowID, content, className, style, isSelected, isExpanded, expandableContent} = row;
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
                            {rowType &&
                                rowType === GridRowType.EXPANDABLE &&
                                this.buildExpandableCell(rowID!, isExpanded!)}
                            {selectionType &&
                                this.buildDataGridCell(
                                    this.buildSelectCell(rowID!, isSelected),
                                    index,
                                    classNames([
                                        ClassNames.DATAGRID_SELECT, //prettier
                                        ClassNames.DATAGRID_FIXED_COLUMN,
                                    ]),
                                )}
                            {content &&
                                content.map((cell: any, index: number) => {
                                    return this.buildDataGridCell(cell.content, index, cell.className, cell.style);
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
    private buildDataGridCell(content: any, index: number, className?: string, style?: any): React.ReactElement {
        return (
            <div
                role="gridcell"
                key={"cell-" + index}
                className={`${className} ${ClassNames.DATAGRID_CELLS}`}
                style={style}
            >
                {content}
            </div>
        );
    }

    // function to build datagrid footer
    private buildDataGridFooter(): React.ReactElement {
        // Need to take this from state in future
        const {footer} = this.props;
        return (
            <div
                className={`${ClassNames.DATAGRID_FOOTER} ${footer && footer.className && footer.className}`}
                style={footer && footer.style && footer.style}
            >
                <div className={ClassNames.DATAGRID_FOOTER_DESC}>{footer && footer.content && footer.content}</div>
            </div>
        );
    }

    // render datagrid
    render() {
        const {children, className, style} = this.props;
        return (
            <div
                className={classNames([
                    ClassNames.DATAGRID_HOST, // prettier
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
