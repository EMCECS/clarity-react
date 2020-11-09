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
import {CheckBox} from ".";
import {FormControl, SubTextWrapper} from "../common";

storiesOf("Checkboxes", module)
    .add("Basic checkbox button", () => (
        <div>
            <CheckBox />
        </div>
    ))
    .add("Labels", () => (
        <div>
            <CheckBox label="Label 1" />
            <CheckBox label="Label 2" />
        </div>
    ))
    .add("Full input display", () => (
        <div>
            <FormControl label="Full checkbox example">
                <CheckBox label="option 1" />
                <CheckBox label="option 2" />
                <CheckBox label="option 3" />
                <SubTextWrapper shape="exclamation-circle" text="Helper Text" />
            </FormControl>
        </div>
    ))
    .add("Error state", () => (
        <div>
            <FormControl label="Error checkbox" error={true}>
                <CheckBox label="option 1" />
                <CheckBox label="option 2" />
                <CheckBox label="option 3" />
                <SubTextWrapper shape="exclamation-circle" text="Error message" errorTitle="This field is required" />
            </FormControl>
        </div>
    ))
    .add("Inline checkbox", () => (
        <div>
            <FormControl label="Inline checkbox example" inline={true}>
                <CheckBox label="option 1" />
                <CheckBox label="option 2" />
                <CheckBox label="option 3" />
                <SubTextWrapper shape="exclamation-circle" text="Error message" />
            </FormControl>
        </div>
    ))
    .add("Disabled checkbox", () => (
        <div>
            <FormControl disabled={true} label="Inline checkbox example">
                <CheckBox label="option 1" />
                <CheckBox label="option 2" />
                <CheckBox label="option 3" />
                <SubTextWrapper shape="exclamation-circle" text="Error message" />
            </FormControl>
        </div>
    ));
// .add("Indeterminate checkboxes", () => (
//     <div>
//         <FormControl label="Indeterminate checkbox example">
//             <CheckBox label="option 1" defaultChecked="indeterminate" />
//             <SubTextWrapper shape="exclamation-circle" text="Helper text" />
//         </FormControl>
//     </div>
// ));
