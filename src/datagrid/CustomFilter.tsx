/**
 * Copyright (c) 2020 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import * as React from "react";
import {Select, SelectOption} from "../forms/select";
import {DataGridCustomFilterProps} from "./DataGridFilter";

/**
 * General component description :
 * CustomFilter :
 * Demo of implementation of custom filter for datagrid
 */

export class CustomFilter extends React.PureComponent<DataGridCustomFilterProps> {
    // Function to handle changes in filter value
    private handleFilterChange = (evt: React.ChangeEvent<any>) => {
        const {onChange} = this.props;
        onChange && onChange(evt.target.value);
    };

    render() {
        const {filterValue} = this.props;

        return (
            <div style={{width: "166px"}}>
                <Select onChange={evt => this.handleFilterChange(evt)} defaultValue={filterValue}>
                    <SelectOption value="" />
                    <SelectOption value="Brad">Brad</SelectOption>
                    <SelectOption value="Georgia">Georgia</SelectOption>
                    <SelectOption value="Brynn">Brynn</SelectOption>
                </Select>
            </div>
        );
    }
}
