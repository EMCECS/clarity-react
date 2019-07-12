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
import {InputCounter} from "./InputCounter";

storiesOf("InputCounter", module)
    .add("a simple inputCounter box with minValue and maxValue ", () => (
        <InputCounter minValue="10" maxValue="100" defaultValue="33" onChange={action("changed")} />
    ))
    .add("a simple inputCounter box with width", () => (
        <InputCounter minValue="0" maxValue="10" style={{width: "50rem"}} onChange={action("changed")} />
    ));
