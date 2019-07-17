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
    .add("a simple inputCounter box ", () => <InputCounter onChange={action("changed")} />)
    .add("a simple inputCounter box with minValue and maxValue 1", () => (
        <InputCounter minValue={10} maxValue={100} defaultValue={12} errMsg="Value should be" />
    ))
    .add("a simple inputCounter box with width", () => <InputCounter minValue={5} maxValue={1000} width="4rem" />)
    .add("a simple inputCounter box with defaultValue < than minValue", () => (
        <InputCounter minValue={5} maxValue={1000} defaultValue={0} />
    ));
