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
import {TextArea, TextWrapType} from ".";

storiesOf("Textarea", module)
    .add("Basic textarea", () => (
        <div>
            <TextArea name="basic-textarea" />
        </div>
    ))
    .add("Textarea with label", () => (
        <div>
            <TextArea name="basic-textarea" label="Description" />
        </div>
    ))
    .add("Textarea with placeholder", () => (
        <div>
            <TextArea name="basic-textarea" placeholder="Enter here" />
        </div>
    ))
    .add("Textarea with helper Text", () => (
        <div>
            <TextArea name="basic-textarea" label="With helper text" helperText="Helper Text" />
        </div>
    ))
    .add("Textarea with error", () => (
        <div>
            <TextArea
                name="basic-textarea"
                label="TextArea with error"
                errorHelperText="This field is required"
                error={true}
            />
        </div>
    ))
    .add("Textarea with rows and cols", () => (
        <div>
            <TextArea name="basic-textarea" label="TextArea with rows as 5 and cols as 50" rows={5} cols={50} />
        </div>
    ));
