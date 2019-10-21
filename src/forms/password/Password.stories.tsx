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

storiesOf("Password", module)
    .add("a simple password input", () => <Password name="password" onChange={action("changed")} />)
    .add("a simple password box with value", () => (
        <Password name="Password" value="Password123" onChange={action("changed")} />
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
            style={{width: "80%"}}
            error={true}
            onBlur={action("select with error - blur")}
            onChange={action("select with error - change")}
            errorHelperText="This field is reuired"
        />
    ))
    .add("Password box without show password icon", () => <Password name="Password" showPassword={false} />);
