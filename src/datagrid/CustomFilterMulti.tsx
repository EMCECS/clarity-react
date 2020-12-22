/**
 * Copyright (c) 2020 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

import * as React from "react";
import {CheckBox} from "../forms/checkbox";
import {DataGridCustomFilterProps} from "./DataGridFilter";

/**
 * State for CustomFilterMulti:
 * @param {values} list of filtered values
 */
type CustomFilterMultiState = {
    values: string[];
};

// constant for color options
const COLOR_OPTIONS: string[] = ["Orange", "Blue"];

/**
 * General component description :
 * CustomFilterMulti :
 * Demo of implementation of custom filter with multi select option for datagrid
 */
export class CustomFilterMulti extends React.PureComponent<DataGridCustomFilterProps, CustomFilterMultiState> {
    constructor(props: DataGridCustomFilterProps) {
        super(props);
        this.state = {
            values: this.props.filterValue || [],
        };
    }

    // Function to handle changes in filter value
    private handleFilterChange = (evt: React.ChangeEvent<any>, value: string) => {
        const {onChange} = this.props;
        let {values} = this.state;

        const itemIndex: number = values.indexOf(value);
        const checked: boolean = evt.target.checked;

        if (checked && itemIndex === -1) {
            values.push(value);
        } else if (!checked && itemIndex !== -1) {
            values.splice(itemIndex, 1);
        }

        this.setState(
            {
                values: [...values],
            },
            onChange && onChange(values),
        );
    };

    render() {
        const {values} = this.state;

        return (
            <div style={{width: "130px", padding: "1em"}}>
                {COLOR_OPTIONS.map((color: string) => {
                    return (
                        <CheckBox
                            label={color}
                            onClick={evt => this.handleFilterChange(evt, color)}
                            checked={values.includes(color)}
                        />
                    );
                })}
            </div>
        );
    }
}
