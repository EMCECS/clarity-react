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
import {Select, SelectOption} from "../forms/select";

/**
 * General component description :
 * CustomFilter :
 * Demo of implementation of custom filter for datagrid
 */

/**
 * Props for CustomFilter :
 * @param {datagridFilterRef} Refrence for DataGridFilter component. We need this to call method which will update datagird filter.
 * In case of Custom filter component: the custom filter component owner needs to take care of following things.
 * 1. Custom filter component should preseve filter value inside state of component and pass it to DataGridFilter
 * 2. Custom filter component should implement its onChange event handler.
 * 3. Custom filter's onChange event handler should call 'updateFilter' method of DataGridFilter.
 */
export type CustomFilterProps = {
    datagridFilterRef: any;
};

/**
 * state for CustomFilter :
 * @param {customFilterValue} filter string
 */
type CustomFilterState = {
    customFilterValue: any;
};

export class CustomFilter extends React.PureComponent<CustomFilterProps, CustomFilterState> {
    state: CustomFilterState = {
        customFilterValue: undefined,
    };

    private handleFilterChnage = (evt: React.ChangeEvent<any>) => {
        const {datagridFilterRef} = this.props;
        const value = evt.target.value;
        if (datagridFilterRef) {
            this.setState({customFilterValue: value}, () => datagridFilterRef.current!.updateFilter(value));
        }
    };

    render() {
        const {customFilterValue} = this.state;
        return (
            <div style={{width: "166px"}}>
                <Select onChange={evt => this.handleFilterChnage(evt)} value={customFilterValue}>
                    <SelectOption value="" />
                    <SelectOption value="Brad">Brad</SelectOption>
                    <SelectOption value="Georgia">Georgia</SelectOption>
                    <SelectOption value="Brynn">Brynn</SelectOption>
                </Select>
            </div>
        );
    }
}
