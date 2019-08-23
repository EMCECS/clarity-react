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
    {title: "Item 1", itemComponent: "Content 1"},
    {title: "Item 2", itemComponent: "Content 2"},
    {title: "Item 3", itemComponent: "Content 3"},
];

const nesteAccordionContent = [
    {title: "Item 1", itemComponent: "Content 1"},
    {title: "Item 2", itemComponent: <Accordion content={accordionContent} />},
];

storiesOf("Accordion", module)
    .add("Accordion", () => <Accordion content={accordionContent} />)
    .add("Accordion Multi Panel", () => <Accordion content={accordionContent} accordionMultiPanel={true} />)
    .add("Nested accordion", () => <Accordion content={nesteAccordionContent} />);
