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
import {Select, SelectOption, SelectOptionGroup} from "./Select";
import {action} from "@storybook/addon-actions";

storiesOf("Select", module)
    .add("Basic select", () => (
        <div>
            <Select onChange={action("basic change")}>
                <SelectOption value="1">One</SelectOption>
                <SelectOption value="2">Two</SelectOption>
                <SelectOption value="3">Three</SelectOption>
            </Select>
        </div>
    ))
    .add("Basic select with select option", () => (
        <div>
            <Select onChange={action("basic change")}>
                <SelectOption value="select">select</SelectOption>
                <SelectOption value="1">One</SelectOption>
                <SelectOption value="2">Two</SelectOption>
                <SelectOption value="3">Three</SelectOption>
            </Select>
        </div>
    ))
    .add("Select with custom width", () => (
        <div>
            <Select onChange={action("basic change")} width="30%" label="Basic Select">
                <SelectOption value="1">One</SelectOption>
                <SelectOption value="2">Two</SelectOption>
                <SelectOption value="3">Three</SelectOption>
            </Select>

            <br />
            <Select onChange={action("basic change")} width="50%" isBoxed label="Boxed Select">
                <SelectOption value="1">One</SelectOption>
                <SelectOption value="2">Two</SelectOption>
                <SelectOption value="3">Three</SelectOption>
            </Select>
        </div>
    ))
    .add("Labels", () => (
        <div>
            <Select onChange={action("label select - change")} label="I've got some options">
                <SelectOption value="1">One</SelectOption>
                <SelectOption value="2">Two</SelectOption>
                <SelectOption value="3">Three</SelectOption>
            </Select>
        </div>
    ))
    .add("Full select display", () => (
        <div>
            <Select
                onChange={action("full select - change")}
                defaultHelperText="You have these choices"
                errorHelperText="This field is required!"
                label="I've got some options"
                defaultValue={"2"}
            >
                <SelectOption value="1">One</SelectOption>
                <SelectOption value="2">Two</SelectOption>
                <SelectOption value="3">Three</SelectOption>
            </Select>
        </div>
    ))
    .add("Select with error", () => (
        <div>
            <Select
                error={true}
                errorTitle={"This field is required"}
                width="30%"
                onBlur={action("select with error and custom width - blur")}
                onChange={action("select with error - change")}
                defaultHelperText="You have these choices"
                errorHelperText="This field is required!"
                label="I've got some options"
            >
                <SelectOption value="1">One</SelectOption>
                <SelectOption value="2">Two</SelectOption>
                <SelectOption value="3">Three</SelectOption>
            </Select>

            <Select
                error={true}
                onBlur={action("select with error - blur")}
                onChange={action("select with error - change")}
                defaultHelperText="You have these choices"
                errorHelperText="This field is required!"
                label="I've got some options"
            >
                <SelectOption value="1">One</SelectOption>
                <SelectOption value="2">Two</SelectOption>
                <SelectOption value="3">Three</SelectOption>
            </Select>
        </div>
    ))
    .add("Disabled select", () => (
        <div>
            <Select onChange={action("Disabled select - change")} disabled={true}>
                <SelectOption value="1">One</SelectOption>
                <SelectOption value="2">Two</SelectOption>
                <SelectOption value="3">Three</SelectOption>
            </Select>
        </div>
    ))
    .add("Select Option Group", () => (
        <div>
            <Select onChange={evt => console.log("hh", evt.target.value)}>
                <SelectOptionGroup label="Group 1">
                    <SelectOption value="1">One</SelectOption>
                    <SelectOption value="2">Two</SelectOption>
                    <SelectOption value="3">Three</SelectOption>
                </SelectOptionGroup>
                <SelectOptionGroup label="Group 2">
                    <SelectOption value="7">Seven</SelectOption>
                    <SelectOption value="8">Eight</SelectOption>
                    <SelectOption value="9">Nine</SelectOption>
                </SelectOptionGroup>
            </Select>
        </div>
    ));
