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
import {Tab, TabOrientation, TabType} from ".";

const tabsData = [
    {
        tabName: "Dashboard",
        disableTab: false,
        tabComponent: <div>Content for Dashboard tab.</div>,
    },
    {
        tabName: "Management",
        disableTab: false,
        tabComponent: <div>Content for Management tab.</div>,
    },
    {
        tabName: "Cloud",
        disableTab: false,
        tabComponent: <div>Content for Cloud tab.</div>,
    },
    {
        tabName: "Infrastructure",
        disableTab: false,
        tabComponent: <div>Content for Infrastructure tab.</div>,
    },
];
const staticTabsData = [
    {
        tabName: "Dashboard",
        disableTab: false,
        tabComponent: <div>Content for Dashboard tab.</div>,
    },
    {
        tabName: "Management",
        disableTab: false,
        tabComponent: <div>Content for Management tab.</div>,
    },
    {
        tabName: "Cloud",
        disableTab: true,
        tabComponent: <div>Content for Cloud tab.</div>,
    },
    {
        tabName: "Infrastructure",
        disableTab: true,
        tabComponent: <div>Content for Infrastructure tab.</div>,
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
        <Tab tabs={tabsData} tabOrientation={TabOrientation.HORIZONTAL} tabType={TabType.OVERFLOW} overflowPivot={2} />
    ));
