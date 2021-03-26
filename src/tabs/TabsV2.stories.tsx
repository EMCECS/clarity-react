/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
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
import {TabsV2, TabV2Orientation, TabV2Type, TabV2Details} from ".";
import {TabPane} from "./TabPane";

const tabsData: TabV2Details[] = [
    {
        name: "Dashboard",
        id: "dashboard",
        isSelected: true,
    },
    {
        name: "Management",
        id: "mgmt",
    },
    {
        name: "Cloud",
        id: "cloud",
    },
    {
        name: "Infrastructure",
        id: "infra",
        isDisabled: true,
    },
    {
        name: "Metrics",
        id: "metrics",
    },
    {
        name: "Policies",
        id: "policies",
    },
];

const staticTabsData: TabV2Details[] = [
    {
        name: "Dashboard",
        id: "dashboard",
        isSelected: true,
    },
    {
        name: "Management",
        id: "mgmt",
        isDisabled: false,
        tabType: TabV2Type.STATIC,
    },
    {
        name: "Cloud",
        id: "cloud",
    },
    {
        name: "Infrastructure",
        id: "infra",
        isDisabled: true,
    },
];

const store = new Store({
    simpleTabs: tabsData,
    staticTabs: staticTabsData,
    onTabClick: (evt: React.MouseEvent<HTMLElement>, clickedTab: TabV2Details, updatedTabs: TabV2Details[]): void => {
        store.set({
            simpleTabs: [...updatedTabs],
        });
    },
});

storiesOf("TabsV2", module)
    .add("TabV2 Vertical", () => (
        <State store={store}>
            {state => (
                <TabsV2 id="verticalTabs" tabs={state.simpleTabs} tabOrientation={TabV2Orientation.VERTICAL}>
                    <TabPane id={"dashboard"}>{"DASHBOARD"}</TabPane>
                    <TabPane id={"mgmt"}>{"MANAGEMENT"}</TabPane>
                    <TabPane id={"cloud"}>{"CLOUD"}</TabPane>
                    <TabPane id={"infra"}>{"INFRASTRUCTURE"}</TabPane>
                </TabsV2>
            )}
        </State>
    ))
    .add("TabV2 Horizontal", () => (
        <State store={store}>
            {state => (
                <TabsV2 id="horizontalTabs" tabs={state.simpleTabs} tabOrientation={TabV2Orientation.HORIZONTAL}>
                    <TabPane id={"dashboard"}>{"DASHBOARD"}</TabPane>
                    <TabPane id={"mgmt"}>{"MANAGEMENT"}</TabPane>
                    <TabPane id={"cloud"}>{"CLOUD"}</TabPane>
                    <TabPane id={"infra"}>{"INFRASTRUCTURE"}</TabPane>
                </TabsV2>
            )}
        </State>
    ))
    .add("TabV2 Static", () => (
        <State store={store}>
            {state => (
                <TabsV2 id="staticTabs" tabs={state.staticTabs} tabOrientation={TabV2Orientation.HORIZONTAL}>
                    <TabPane id={"dashboard"}>{"DASHBOARD"}</TabPane>
                    <TabPane id={"mgmt"}>{"MANAGEMENT"}</TabPane>
                    <TabPane id={"cloud"}>{"CLOUD"}</TabPane>
                    <TabPane id={"infra"}>{"INFRASTRUCTURE"}</TabPane>
                </TabsV2>
            )}
        </State>
    ))
    .add("TabV2 Overflow", () => (
        <State store={store}>
            {state => (
                <TabsV2
                    id="overflowTabs"
                    tabs={state.simpleTabs}
                    tabOrientation={TabV2Orientation.HORIZONTAL}
                    overflowTabsFrom={2}
                >
                    <TabPane id={"dashboard"}>{"DASHBOARD"}</TabPane>
                    <TabPane id={"mgmt"}>{"MANAGEMENT"}</TabPane>
                    <TabPane id={"cloud"}>{"CLOUD"}</TabPane>
                    <TabPane id={"infra"}>{"INFRASTRUCTURE"}</TabPane>
                    <TabPane id={"metrics"}>{"METRICS"}</TabPane>
                    <TabPane id={"policies"}>{"POLICIES"}</TabPane>
                </TabsV2>
            )}
        </State>
    ));
