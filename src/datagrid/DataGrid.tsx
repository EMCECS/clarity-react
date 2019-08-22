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
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {textFilter, customFilter} from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

type DataGridProps = {
    className?: string;
    style?: any;
    data: any;
    columns: any;
    keyField: string;
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

export class DataGrid extends React.PureComponent<DataGridProps> {
    render() {
        const {data, columns, keyField, className, style} = this.props;
        return (
            <BootstrapTable
                keyField={keyField}
                data={data}
                columns={columns}
                selectRow={{mode: "checkbox"}}
                classes="foo"
                headerClasses={`${ClassNames.DATAGRID_HEADER} ${ClassNames.DATAGRID_ROW} ${
                    ClassNames.DATAGRID_ROW_MASTER
                } ${ClassNames.DATAGRID_ROW_STICKY} ${ClassNames.DATAGRID_ROW_SCROLLABLE} ${
                    ClassNames.DATAGRID_COLUMN
                } ${ClassNames.DATAGRID_COLUMN_FLEX} ${ClassNames.DATAGRID_COLUMN_TITLE} ${
                    ClassNames.DATAGRID_COLUMN_SEPARATOR
                } ${ClassNames.DATAGRID_COLUMN_HANDLE} ${ClassNames.DATAGRID_COLUMN_RESIZE}`}
                wrapperClasses={`${ClassNames.DATAGRID_HOST} ${ClassNames.DATAGRID_CAL_TABLE} ${
                    ClassNames.DATAGRID_CAL_HEADER
                } ${ClassNames.DATAGRID} ${ClassNames.DATAGRID_TABLE_WRAPPER} ${ClassNames.DATAGRID_TABLE}`}
                rowClasses={`${ClassNames.DATAGRID_PLACEHOLDER_CONTAINER} ${ClassNames.DATAGRID_PLACEHOLDER}  ${
                    ClassNames.DATAGRID_ROW
                } ${ClassNames.DATAGRID_ROW_MASTER} ${ClassNames.DATAGRID_ROW_STICKY} ${
                    ClassNames.DATAGRID_ROW_SCROLLABLE
                }`}
                filter={filterFactory()}
            />
        );
    }
}
