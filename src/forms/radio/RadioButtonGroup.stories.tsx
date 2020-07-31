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
import {action} from "@storybook/addon-actions";
import {RadioButton, RadioButtonGroup} from ".";

storiesOf("RadioButton", module)
    .add("single radio button", () => <RadioButton label="O" value="one" />)
    .add("radio button without label", () => <RadioButton value="one" />)
    .add("simple with two radio buttons", () => (
        <RadioButtonGroup name="number" onChange={action("changed")}>
            <RadioButton key="one" label="One" value="one" />
            <RadioButton key="two" label="Two" value="two" />
        </RadioButtonGroup>
    ))
    .add("when inline", () => (
        <RadioButtonGroup inline={true} name="number" onChange={action("changed")}>
            <RadioButton key="one" label="One" value="one" />
            <RadioButton key="two" label="Two" value="two" />
        </RadioButtonGroup>
    ))
    .add("with a default value", () => (
        <RadioButtonGroup defaultValue="two" name="number" onChange={action("changed")}>
            <RadioButton key="one" label="One" value="one" />
            <RadioButton key="two" label="Two" value="two" />
        </RadioButtonGroup>
    ))
    .add("when disabled", () => (
        <RadioButtonGroup disabled={true} name="number" onChange={action("changed")}>
            <RadioButton key="one" label="One" value="one" />
            <RadioButton key="two" label="Two" value="two" />
        </RadioButtonGroup>
    ))
    .add("With label", () => (
        <RadioButtonGroup label={"Radio Label"} name="number" onChange={action("changed")}>
            <RadioButton key="one" label="One" value="one" />
            <RadioButton key="two" label="Two" value="two" />
        </RadioButtonGroup>
    ))
    .add("With one radio disabled", () => (
        <RadioButtonGroup label={"Radio Label"} name="number" onChange={action("changed")}>
            <RadioButton key="one" label="One" value="one" disabled={true} />
            <RadioButton key="two" label="Two" value="two" />
        </RadioButtonGroup>
    ))
    .add("With helper text", () => (
        <RadioButtonGroup
            helperText={"This text should help you figure things out"}
            name="number"
            onChange={action("changed")}
        >
            <RadioButton key="one" label="One" value="one" />
            <RadioButton key="two" label="Two" value="two" />
        </RadioButtonGroup>
    ));
