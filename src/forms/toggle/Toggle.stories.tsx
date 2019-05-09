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
import {Toggle} from "./Toggle";
import {FormControl, SubTextWrapper} from "../common";

storiesOf("Toggle", module)
    .add("Basic toggle switch button", () => (
        <div>
            <Toggle />
        </div>
    ))
    .add("Labels", () => (
        <div>
            <Toggle label="Option 1" />
            <Toggle label="Option 2" />
        </div>
    ))
    .add("Full input display", () => (
        <div>
            <FormControl label="Full toggle example">
                <Toggle label="option 1" />
                <Toggle label="option 2" />
                <SubTextWrapper shape="exclamation-circle" text="Helper Text" />
            </FormControl>
        </div>
    ))
    .add("Error state", () => (
        <div>
            <FormControl label="Error toggle" error={true}>
                <Toggle label="option 1" />
                <Toggle label="option 2" />
                <SubTextWrapper shape="exclamation-circle" text="Error message" />
            </FormControl>
        </div>
    ))
    .add("Inline toggle switches", () => (
        <div>
            <FormControl label="Inline toggle example" inline={true}>
                <Toggle label="option 1" />
                <Toggle label="option 2" />
                <SubTextWrapper shape="exclamation-circle" text="Helper text" />
            </FormControl>
        </div>
    ))
    .add("Disabled toggle switches", () => (
        <div>
            <FormControl disabled={true} label="Disabled toggle example">
                <Toggle label="option 1" />
                <Toggle label="option 2" />
                <SubTextWrapper shape="exclamation-circle" text="Helper text" />
            </FormControl>
        </div>
    ));
