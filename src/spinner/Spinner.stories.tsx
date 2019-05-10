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
import {Spinner, SpinnerType, SpinnerSize} from "./Spinner";

storiesOf("Spinner", module)
    .add("Page spinners", () => (
        <div>
            <Spinner />
        </div>
    ))
    .add("Inline spinners", () => (
        <div>
            <Spinner type={SpinnerType.INLINE}>Loading ...</Spinner>
        </div>
    ))
    .add("Spinners on a dark background", () => (
        <div style={{background: "#313131"}}>
            <Spinner type={SpinnerType.INVERSE} />
        </div>
    ))
    .add("Spinner sizes", () => (
        <div>
            <Spinner size={SpinnerSize.LARGE} />
            <Spinner size={SpinnerSize.MEDIUM} />
            <Spinner size={SpinnerSize.SMALL} />
        </div>
    ));
