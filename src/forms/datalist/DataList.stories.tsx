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
import {storiesOf} from "@storybook/react";
import {DataList, DataListOption} from ".";
import {action} from "@storybook/addon-actions";

storiesOf("DataList", module)
    .add("Basic DataList", () => (
        <div>
            <DataList>
                <DataListOption value="Item1" />
                <DataListOption value="Item2" />
                <DataListOption value="Item3" />
            </DataList>
        </div>
    ))
    .add("With place holder text", () => (
        <div>
            <DataList placeHolder="No label">
                <DataListOption value="Item1" />
                <DataListOption value="Item2" />
                <DataListOption value="Item3" />
            </DataList>
        </div>
    ))
    .add("With Error", () => (
        <div>
            <DataList placeHolder="No label" required={true} isError={true} errorText="This field is reuired">
                <DataListOption value="Item1" />
                <DataListOption value="Item2" />
                <DataListOption value="Item3" />
            </DataList>
        </div>
    ))
    .add("With helper text", () => (
        <div>
            <DataList placeHolder="No label" helperText="Select any option or create one">
                <DataListOption value="Item1" />
                <DataListOption value="Item2" />
                <DataListOption value="Item3" />
            </DataList>
        </div>
    ))
    .add("With custom width and label", () => (
        <div>
            <DataList
                placeHolder="No label"
                helperText="Select any option or create one"
                label="Select Item"
                style={{width: "50%"}}
            >
                <DataListOption value="Item1" />
                <DataListOption value="Item2" />
                <DataListOption value="Item3" />
            </DataList>
        </div>
    ))
    .add("With defaultSelected Value", () => (
        <div>
            <DataList
                placeHolder="No label"
                helperText="Select any option or create one"
                label="Select Item"
                defaultValue="Item1"
            >
                <DataListOption value="Item1" />
                <DataListOption value="Item2" />
                <DataListOption value="Item3" />
            </DataList>
        </div>
    ));
