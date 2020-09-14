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
import {State, Store} from "@sambego/storybook-state";
import {Tabs, TabOrientation, TabType, TabDetails} from ".";

const tabsData: TabDetails[] = [
    {
        name: "Dashboard",
        isSelected: true,
        component: <p>Content for Dashboard tab.</p>,
    },
    {
        name: "Management",
        component: <p>Content for Management tab.</p>,
    },
    {
        name: "Cloud",
        component: <p>Content for Cloud tab.</p>,
    },
    {
        name: "Infrastructure",
        isDisabled: true,
        component: <p>Content for Infrastructure tab.</p>,
    },
];

const staticTabsData: TabDetails[] = [
    {
        name: "Dashboard",
        isSelected: true,
        component: <p>Content for Dashboard tab.</p>,
    },
    {
        name: "Management",
        isDisabled: false,
        component: <p>Content for Management tab.</p>,
        tabType: TabType.STATIC,
    },
    {
        name: "Cloud",
        component: <p>Content for Cloud tab.</p>,
        tabType: TabType.STATIC,
    },
    {
        name: "Infrastructure",
        isDisabled: true,
        component: <p>Content for Infrastructure tab.</p>,
    },
];

const store = new Store({
    simpleTabs: tabsData,
    staticTabs: staticTabsData,
    onTabClick: (evt: React.MouseEvent<HTMLElement>, tabs: TabDetails[]): void => {
        store.set({
            simpleTabs: [...tabs],
        });
    },
});

storiesOf("Tabs", module)
    .add("Tab Vertical", () => (
        <State store={store}>
            {state => (
                <Tabs
                    id="verticalTabs"
                    tabs={state.simpleTabs}
                    tabOrientation={TabOrientation.VERTICAL}
                    onTabClick={state.onTabClick}
                />
            )}
        </State>
    ))
    .add("Tab Horizontal", () => (
        <State store={store}>
            {state => (
                <Tabs
                    id="horizontalTabs"
                    tabs={state.simpleTabs}
                    tabOrientation={TabOrientation.HORIZONTAL}
                    onTabClick={state.onTabClick}
                />
            )}
        </State>
    ))
    .add("Tab Static", () => (
        <State store={store}>
            {state => (
                <Tabs
                    id="staticTabs"
                    tabs={state.staticTabs}
                    tabOrientation={TabOrientation.HORIZONTAL}
                    onTabClick={state.onTabClick}
                />
            )}
        </State>
    ))
    .add("Tab Overflow", () => (
        <State store={store}>
            {state => (
                <Tabs
                    id="overflowTabs"
                    tabs={state.simpleTabs}
                    tabOrientation={TabOrientation.HORIZONTAL}
                    onTabClick={state.onTabClick}
                    overflowTabsFrom={2}
                />
            )}
        </State>
    ));
