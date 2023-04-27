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
import {DatePicker} from "./DatePicker";

storiesOf("Datepicker", module)
    .add("Datepicker", () => (
        <div>
            <DatePicker />
        </div>
    ))
    .add("Datepicker Disabled", () => (
        <div>
            <DatePicker disabled />
        </div>
    ))
    .add("Datepicker with default value", () => (
        <div>
            <DatePicker defaultValue={"04/27/2023"} />
        </div>
    ));
