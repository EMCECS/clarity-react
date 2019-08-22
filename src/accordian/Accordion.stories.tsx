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
import {Accordion} from ".";

const accordionContent = [
    {title: "Item 1", itemComponent: <p> Content 1</p>},
    {title: "Item 2", itemComponent: <p> Content 2 </p>},
    {title: "Item 3", itemComponent: <p> Content 3</p>},
];

storiesOf("Accordian", module).add("Accordian", () => <Accordion content={accordionContent} />);
