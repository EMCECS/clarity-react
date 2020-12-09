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
import {Password} from "./Password";

//Constants for ASCII of numbers
const ASCII_FOR_ZERO = 48;
const ASCII_FOR_NINE = 57;

// Function to allow only integers [0-9]
export const allowOnlyIntegers = (evt: any) => {
    const charCode = evt.which ? evt.which : evt.keyCode;

    if (charCode < ASCII_FOR_ZERO || charCode > ASCII_FOR_NINE) evt.preventDefault();
};

storiesOf("Password", module)
    .add("a simple password input", () => <Password name="password" onChange={action("changed")} />)
    .add("a simple password box with defaultValue", () => (
        <Password name="Password" defaultValue="Password123" onChange={action("changed")} />
    ))
    .add("with a label", () => <Password name="Password" label="Password" onChange={action("changed")} />)
    .add("with placeholder text", () => (
        <Password name="Password" placeholder="Enter password" onChange={action("changed")} />
    ))
    .add("with helper text", () => (
        <Password
            name="Password"
            helperText="password should have min 8 characters"
            minPasswordLength={8}
            onChange={action("changed")}
        />
    ))
    .add("Password box with custom width", () => (
        <Password name="Password" placeholder="Password" onChange={action("changed")} style={{width: "40%"}} />
    ))
    .add("Password box with error", () => (
        <Password
            name="Password"
            placeholder="Enter Password"
            error={true}
            errorTitle={"This field is required"}
            onBlur={action("select with error - blur")}
            onChange={action("select with error - change")}
            errorHelperText="This field is required"
        />
    ))
    .add("Password box without show password icon", () => <Password name="Password" unmask={false} />)
    .add("Password box which accepts only numbers", () => (
        <Password
            name="Password"
            onKeyPress={allowOnlyIntegers}
            placeholder="Numeric password"
            title={"Numeric password"}
        />
    ))
    .add("Password box with read-only value", () => (
        <Password name="Password" value="Georgia-pass" readOnly={true} style={{border: "none", width: "6%"}} />
    ));
