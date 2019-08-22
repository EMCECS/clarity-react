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
import {storiesOf} from "@storybook/react";
import {textFilter, customFilter} from "react-bootstrap-table2-filter";
import {DataGrid, ClassNames} from "../datagrid";
import {Icon, Direction} from "../icon";
import {Button} from "../forms/button";

type CustomFilterProps = {
    column: any;
    onFilter: Function;
};

class CustomFilter extends React.PureComponent<CustomFilterProps> {
    inputRef = React.createRef<HTMLInputElement>();
    filter() {
        this.props.onFilter(this.inputRef.current!.value);
    }
    render() {
        return (
            <div>
                <label> Name </label>
                <input key="input" ref={this.inputRef} type="text" placeholder="Input price" />
                <Button link icon={{shape: "filter-grid", className: "is-solid"}} onClick={this.filter.bind(this)} />
                {console.log(this.inputRef.current)}
            </div>
        );
    }
}

const columns = [
    {
        dataField: "id",
        text: "Product ID",
        sort: true,
        footer: "",
        classes: `${ClassNames.DATAGRID_CELLS}`,
        // headerClasses : `${ClassNames.DATAGRID_COLUMN} ${ClassNames.DATAGRID_COLUMN_FLEX} ${ClassNames.DATAGRID_COLUMN_TITLE} ${ClassNames.DATAGRID_COLUMN_SEPARATOR} ${ClassNames.DATAGRID_COLUMN_HANDLE} ${ClassNames.DATAGRID_COLUMN_RESIZE}`
    },
    {
        dataField: "name",
        text: "Product Name",
        sort: true,
        footer: "",
        classes: `${ClassNames.DATAGRID_CELLS}`,
        //headerClasses : `${ClassNames.DATAGRID_COLUMN} ${ClassNames.DATAGRID_COLUMN_FLEX} ${ClassNames.DATAGRID_COLUMN_TITLE} ${ClassNames.DATAGRID_COLUMN_SEPARATOR} ${ClassNames.DATAGRID_COLUMN_HANDLE} ${ClassNames.DATAGRID_COLUMN_RESIZE}`
    },
    {
        dataField: "price",
        text: "Product Price",
        footer: "10 users",
        classes: `${ClassNames.DATAGRID_CELLS}`,
        //headerClasses : `${ClassNames.DATAGRID_COLUMN} ${ClassNames.DATAGRID_COLUMN_FLEX} ${ClassNames.DATAGRID_COLUMN_TITLE} ${ClassNames.DATAGRID_COLUMN_SEPARATOR} ${ClassNames.DATAGRID_COLUMN_HANDLE} ${ClassNames.DATAGRID_COLUMN_RESIZE}`
    },
];

const products = [{id: 1, name: "Item 1", price: 100}, {id: 2, name: "Item 2", price: 102}];

storiesOf("DataGrid", module).add("Basic", () => (
    <div style={{width: "80%"}}>
        <DataGrid columns={columns} data={products} keyField={"id"} />
    </div>
));
