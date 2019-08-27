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
import {CheckBox, CheckboxValue} from "../forms/checkbox";
import {RadioButton} from "../forms/radio";
import {classNames} from "../utils";

type DataGridProps = {
    className?: string;
    style?: any;
    selectionType?: GridSelectionType;
    pagination?: boolean;
    columns: DataGridColumn[];
    data: DataGridRow[];
    footer?: DataGridFooter;
};

type DataGridState = {
    selectAll: boolean;
    allColumns: DataGridColumn[];
    allRows: DataGridRow[];
};

type DataGridColumn = {
    content: React.ReactNode;
    sort?: boolean;
    filter?: boolean;
    className?: string;
    style?: any;
    onFilter?: Function;
};

type DataGridRow = {
    content: DataGridCell[];
    className?: string;
    style?: any;
    keyElement?: string;
};

type DataGridFooter = {
    content: React.ReactNode;
    className?: string;
    style?: any;
};

type DataGridCell = {
    content: React.ReactNode;
    className?: string;
    style?: any;
};

export enum GridSelectionType {
    MULTI = "multi",
    SINGLE = "single",
}
export class DataGrid extends React.PureComponent<DataGridProps, DataGridState> {
    static defaultProps = {
        pagination: false,
    };

    constructor(props: DataGridProps) {
        super(props);
        this.state = {
            selectAll: false,
            allColumns: this.props.columns,
            allRows: this.props.data,
        };
    }

    private handleAllSelectClick = (evt: React.MouseEvent<HTMLInputElement>) => {
        this.setState({selectAll: !this.state.selectAll});
    };

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
                                    row.keyElement,
                                    row.content,
                                    index,
                                    row.className,
                                    row.style,
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

    private getSelectColumn(): React.ReactElement {
        const {selectionType} = this.props;
        if (selectionType === GridSelectionType.MULTI) {
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
                        <CheckBox onClick={evt => this.handleAllSelectClick(evt)} ariaLabel="Select All" />
                    </span>
                    <div className={ClassNames.DATAGRID_COLUMN_SEPARATOR} />
                </div>
            );
        }
        return <div>{""}</div>;
    }

    private handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        evt.target.checked = true;
    }

    private getSelectCell(keyElement: string): React.ReactElement {
        const {selectionType} = this.props;
        const {selectAll} = this.state;
        if (selectionType === GridSelectionType.MULTI) {
            return (
                <CheckBox
                    key={keyElement}
                    ariaLabel="Select"
                    onChange={this.handleChange.bind(this)}
                    value={selectAll !== undefined ? selectAll : undefined}
                />
            );
        }
        return <RadioButton value={keyElement} id={keyElement} />;
    }

    private buildDataGridHeader(): React.ReactElement {
        const {columns, selectionType} = this.props;
        return (
            <div className={ClassNames.DATAGRID_HEADER} role="rowgroup">
                <div className={ClassNames.DATAGRID_ROW} role="row">
                    <div className={ClassNames.DATAGRID_ROW_MASTER}>
                        <div className={ClassNames.DATAGRID_ROW_STICKY} />
                        <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                            {selectionType && this.getSelectColumn()}
                            {columns &&
                                columns.map((column: any) => {
                                    return this.buildDataGridColumn(column.content, column.className, column.style);
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private buildDataGridColumn(content: any, className?: string, style?: any): React.ReactElement {
        return (
            <div
                role="columnheader"
                className={classNames([ClassNames.DATAGRID_COLUMN, className])}
                aria-sort="none"
                style={style}
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

    private buildDataGridRow(
        keyElement: string,
        content: DataGridCell[],
        index: number,
        className?: string,
        style?: any,
    ): React.ReactElement {
        const {selectionType} = this.props;
        return (
            <div
                role="rowgroup"
                className={classNames([ClassNames.DATAGRID_ROW, className])}
                aria-owns={"clr-dg-row" + index}
                style={style}
            >
                <div className={ClassNames.DATAGRID_ROW_MASTER} role="row" id="clr-dg-row1">
                    <div className={ClassNames.DATAGRID_ROW_STICKY} />
                    <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                        <div className={ClassNames.DATAGRID_SCROLLING_CELLS}>
                            {selectionType &&
                                this.buildDataGridCell(
                                    this.getSelectCell(keyElement),
                                    classNames([
                                        ClassNames.DATAGRID_SELECT, //prettier
                                        ClassNames.DATAGRID_FIXED_COLUMN,
                                    ]),
                                )}
                            {content &&
                                content.map((cell: any) => {
                                    return this.buildDataGridCell(cell.content, cell.className, cell.style);
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private buildDataGridCell(content: any, className?: string, style?: any): React.ReactElement {
        console.log(content);
        return (
            <div role="gridcell" className={`${className} ${ClassNames.DATAGRID_CELLS}`} style={style}>
                {content}
            </div>
        );
    }

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
