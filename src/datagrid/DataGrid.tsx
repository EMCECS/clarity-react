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
import * as ReactDOM from "react-dom";
import {ClassNames} from "./ClassNames";

type DataGridProps = {
    className?: string;
    style?: any;
};

type DataGridColumnProps = {
    sorting?: boolean;
    filtering?: boolean;
    className?: string;
    style?: any;
};

type DataGridRowProps = {
    className?: string;
    style?: any;
};

type DataGridFooterProps = {
    className?: string;
    style?: any;
};

type DataGridCellProps = {
    className?: string;
    style?: any;
};

export const DataGridBody: React.FunctionComponent = ({children}) => {
    return (
        <div className={ClassNames.DATAGRID}>
            <div className={ClassNames.DATAGRID_TABLE_WRAPPER}>
                <div className={ClassNames.DATAGRID_TABLE} role="grid">
                    {children}
                </div>
            </div>
        </div>
    );
};

export const DataGridColumnHeader: React.FunctionComponent = ({children}) => {
    return (
        <div className={ClassNames.DATAGRID_HEADER} role="rowgroup">
            <div className={ClassNames.DATAGRID_ROW} role="row">
                <div className={ClassNames.DATAGRID_ROW_MASTER}>
                    <div className={ClassNames.DATAGRID_ROW_STICKY} />
                    <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export const DataGridColumn: React.FunctionComponent<DataGridColumnProps> = ({children, className, style}) => {
    return (
        <div
            _ngcontent-clarity-c4=""
            role="columnheader"
            className={`${ClassNames.DATAGRID_COLUMN} ${className}`}
            aria-sort="none"
            style={style}
        >
            <div className={ClassNames.DATAGRID_COLUMN_FLEX}>
                <span className={ClassNames.DATAGRID_COLUMN_TITLE}>{children}</span>
                <div className={ClassNames.DATAGRID_COLUMN_SEPARATOR}>
                    <div aria-hidden="true" className={ClassNames.DATAGRID_COLUMN_HANDLE} />
                    <div className={ClassNames.DATAGRID_COLUMN_RESIZE} />
                </div>
            </div>
        </div>
    );
};

export const DataGridRowContainer: React.FunctionComponent = ({children}) => {
    return (
        <div>
            {children}
            <div className={ClassNames.DATAGRID_PLACEHOLDER_CONTAINER}>
                <div className={ClassNames.DATAGRID_PLACEHOLDER} />
            </div>
        </div>
    );
};

export const DataGridRow: React.FunctionComponent<DataGridRowProps> = ({children, className, style}) => {
    return (
        <div
            _ngcontent-clarity-c4=""
            role="rowgroup"
            className={`${ClassNames.DATAGRID_ROW} ${className}`}
            aria-owns="clr-dg-row1"
            style={style}
        >
            <div className={ClassNames.DATAGRID_ROW_MASTER} role="row" id="clr-dg-row1">
                <div className={ClassNames.DATAGRID_ROW_STICKY} />
                <div className={ClassNames.DATAGRID_ROW_SCROLLABLE}>
                    <div className={ClassNames.DATAGRID_SCROLLING_CELLS}>{children}</div>
                </div>
            </div>
        </div>
    );
};

export const DataGridCell: React.FunctionComponent<DataGridCellProps> = ({children, className, style}) => {
    return (
        <div
            _ngcontent-clarity-c4=""
            role="gridcell"
            className={`${ClassNames.DATAGRID_CELLS} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

export const DataGridFooter: React.FunctionComponent<DataGridFooterProps> = ({children, className, style}) => {
    return (
        <div _ngcontent-clarity-c4="" className={`${ClassNames.DATAGRID_FOOTER} ${className}`} style={style}>
            <div className={ClassNames.DATAGRID_FOOTER_DESC}>{children}</div>
        </div>
    );
};

export class DataGrid extends React.PureComponent<DataGridProps> {
    render() {
        const {children, className, style} = this.props;
        return (
            <div className={`${ClassNames.DATAGRID_HOST} ${className}`} style={style} _ngcontent-clarity-c4="">
                {children}
                <div className={ClassNames.DATAGRID_CAL_TABLE}>
                    <div className={ClassNames.DATAGRID_CAL_HEADER} />
                </div>
            </div>
        );
    }
}
