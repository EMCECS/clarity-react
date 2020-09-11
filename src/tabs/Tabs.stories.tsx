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
import {storiesOf, forceReRender} from "@storybook/react";
import {State, Store} from "@sambego/storybook-state";
import {action} from "@storybook/addon-actions";
import {Tabs, TabOrientation, TabType, TabPDetails} from ".";

const tabsData: TabPDetails[] = [
    {
        name: "Dashboard",
        isSelected: true,
        component: <div>Content for Dashboard tab.</div>,
    },
    {
        name: "Management",
        component: <div>Content for Management tab.</div>,
    },
    {
        name: "Cloud",
        component: <div>Content for Cloud tab.</div>,
    },
    {
        name: "Infrastructure",
        isDisabled: true,
        component: <div>Content for Infrastructure tab.</div>,
    },
];

const staticTabsData: TabPDetails[] = [
    {
        name: "Dashboard",
        isSelected: true,
        component: <div>Content for Dashboard tab.</div>,
    },
    {
        name: "Management",
        isDisabled: false,
        component: <div>Content for Management tab.</div>,
        tabType: TabType.STATIC,
    },
    {
        name: "Cloud",
        isDisabled: true,
        component: <div>Content for Cloud tab.</div>,
        tabType: TabType.STATIC,
    },
    {
        name: "Infrastructure",
        isDisabled: true,
        component: <div>Content for Infrastructure tab.</div>,
    },
];

const store = new Store({
    simpleTabs: tabsData,
    staticTabs: staticTabsData,
    onTabClick: (evt: React.MouseEvent<HTMLElement>, tabs: TabPDetails[]): void => {
        console.log("tabs in state", tabs);
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
