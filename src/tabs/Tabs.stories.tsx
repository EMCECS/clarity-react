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
import {Tab, TabOrientation, TabType} from ".";

const tabsData = [
    {
        name: "Dashboard",
        isDisabled: false,
        component: <div>Content for Dashboard tab.</div>,
    },
    {
        name: "Management",
        isDisabled: false,
        component: <div>Content for Management tab.</div>,
    },
    {
        name: "Cloud",
        isDisabled: false,
        component: <div>Content for Cloud tab.</div>,
    },
    {
        name: "Infrastructure",
        isDisabled: false,
        component: <div>Content for Infrastructure tab.</div>,
    },
];
const staticTabsData = [
    {
        name: "Dashboard",
        isDisabled: false,
        component: <div>Content for Dashboard tab.</div>,
    },
    {
        name: "Management",
        isDisabled: false,
        component: <div>Content for Management tab.</div>,
    },
    {
        name: "Cloud",
        isDisabled: true,
        component: <div>Content for Cloud tab.</div>,
    },
    {
        name: "Infrastructure",
        isDisabled: true,
        component: <div>Content for Infrastructure tab.</div>,
    },
];

storiesOf("Tab", module)
    .add("Tab Vertical", () => (
        <Tab tabs={tabsData} tabOrientation={TabOrientation.VERTICAL} tabType={TabType.SIMPLE} />
    ))
    .add("Tab Horizontal", () => (
        <Tab tabs={tabsData} tabOrientation={TabOrientation.HORIZONTAL} tabType={TabType.SIMPLE} />
    ))
    .add("Tab Static", () => (
        <Tab tabs={staticTabsData} tabOrientation={TabOrientation.HORIZONTAL} tabType={TabType.STATIC} />
    ))
    .add("Tab Overflow", () => (
        <Tab
            tabs={tabsData}
            tabOrientation={TabOrientation.HORIZONTAL}
            tabType={TabType.SIMPLE}
            overflowTabsFrom={"Cloud"}
        />
    ));
