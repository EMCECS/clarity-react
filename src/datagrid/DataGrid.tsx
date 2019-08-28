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
import {CheckBox} from "../forms/checkbox";
import {RadioButton} from "../forms/radio";
import {classNames, allTrueOnKey} from "../utils";

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
 */
type DataGridProps = {
    className?: string;
    style?: any;
    selectionType?: GridSelectionType;
    pagination?: boolean;
    columns: DataGridColumn[];
    data: DataGridRow[];
    footer?: DataGridFooter;
    onRowSelect?: Function;
    onSelectAll?: Function;
};

/**
 * type for DataGridColumn :
 * @param {content} column data
 * @param {sort} does colum support sorting
 * @param {filter} does colum support filtering
 * @param {className} CSS class name
 * @param {columns} column details
 * @param {style} CSS style
 * @param {onFilter} Function for custom filtering
 */
type DataGridColumn = {
    content: any;
    sort?: boolean;
    filter?: boolean;
    className?: string;
    style?: any;
    onFilter?: Function;
};

/**
 * type for DataGridRow :
 * @param {content} row data
 * @param {rowID} unique ID to identify row
 * @param {isSelected} set to true if row is selected
 * @param {className} CSS class name
 * @param {style} CSS style
 */
type DataGridRow = {
    content: DataGridCell[];
    className?: string;
    style?: any;
    rowID?: string;
    isSelected?: boolean;
};

/**
 * type for DataGridCell :
 * @param {content} cell data
 * @param {className} CSS class name
 * @param {style} CSS style
 */
type DataGridCell = {
    content: any;
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
 * Enum for GridSelectionType :
 * @param {MULTI} for enabling multi row select
 * @param {SINGLE} for enabling single row select
 */
export enum GridSelectionType {
    MULTI = "multi",
    SINGLE = "single",
}

/**
 * State for DataGrid :
 * @param {selectAll} set to true if all rows got selected else false
 * @param {allColumns} column data
 * @param {allRows} row data
 */
type DataGridState = {
    selectAll: boolean;
    allColumns: DataGridColumn[];
    allRows: DataGridRow[];
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
        allRows: this.props.data,
    };

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
                const value = !row["isSelected"];
                row["isSelected"] = value;
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
    /* ##########  DataGrid private methods end  ############ */

    /* ##########  DataGrid DOM methods start  ############ */

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
    private buildSelectCell(rowID: string, isSelected: any): React.ReactElement {
        const {selectionType} = this.props;
        if (selectionType === GridSelectionType.MULTI) {
            return (
                <CheckBox
                    id={rowID}
                    ariaLabel="Select"
                    onChange={evt => this.handleSelectSingle(evt, rowID)}
                    checked={isSelected !== undefined ? isSelected : undefined}
                />
            );
        }
        return (
            <RadioButton
                value={rowID}
                id={rowID}
                onChange={evt => this.handleSelectSingle(evt, rowID)}
                checked={isSelected !== undefined ? isSelected : undefined}
            />
        );
    }

    // function to build datagrid body
    private buildDataGridBody(): React.ReactElement {
        const {data} = this.props;
        return (
            <div className={ClassNames.DATAGRID}>
                <div className={ClassNames.DATAGRID_TABLE_WRAPPER}>
                    <div className={ClassNames.DATAGRID_TABLE} role="grid">
                        {this.buildDataGridHeader()}
                        {data ? (
                            data.map((row: any, index: number) => {
                                return this.buildDataGridRow(
                                    row.rowID,
                                    row.content,
                                    index,
                                    row.className,
                                    row.style,
                                    row.isSelected,
                                );
                            })
                        ) : (
                            <div className={ClassNames.DATAGRID_PLACEHOLDER_CONTAINER}>
                                <div className={ClassNames.DATAGRID_PLACEHOLDER} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Function to build datagrid header
    private buildDataGridHeader(): React.ReactElement {
        const {columns, selectionType} = this.props;
        return (
            <div className={ClassNames.DATAGRID_HEADER} role="rowgroup">
                <div className={ClassNames.DATAGRID_ROW} role="row">
                    <div className={ClassNames.DATAGRID_ROW_MASTER}>
                        <div className={ClassNames.DATAGRID_ROW_STICKY} />
                        <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                            {selectionType && this.buildSelectColumn()}
                            {columns &&
                                columns.map((column: any, index: number) => {
                                    return this.buildDataGridColumn(
                                        column.content,
                                        index,
                                        column.className,
                                        column.style,
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Function to build datagrid colums
    private buildDataGridColumn(content: any, index: number, className?: string, style?: any): React.ReactElement {
        return (
            <div
                role="columnheader"
                className={classNames([ClassNames.DATAGRID_COLUMN, className])}
                aria-sort="none"
                style={style}
                key={"col-" + index}
            >
                <div className={ClassNames.DATAGRID_COLUMN_FLEX}>
                    <span className={ClassNames.DATAGRID_COLUMN_TITLE}>{content}</span>
                    <div className={ClassNames.DATAGRID_COLUMN_SEPARATOR}>
                        <div aria-hidden="true" className={ClassNames.DATAGRID_COLUMN_HANDLE} />
                        <div className={ClassNames.DATAGRID_COLUMN_RESIZE} />
                    </div>
                </div>
            </div>
        );
    }

    // function to build datagrid rows
    private buildDataGridRow(
        rowID: string,
        content: DataGridCell[],
        index: number,
        className?: string,
        style?: any,
        isSelected?: boolean,
    ): React.ReactElement {
        const {selectionType} = this.props;
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
                                    this.buildSelectCell(rowID, isSelected),
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
                {this.buildDataGridActionBar()}
                {this.buildDataGridBody()}
                {this.buildDataGridFooter()}
                <div className={ClassNames.DATAGRID_CAL_TABLE}>
                    <div className={ClassNames.DATAGRID_CAL_HEADER} />
                </div>
            </div>
        );
    }
}
