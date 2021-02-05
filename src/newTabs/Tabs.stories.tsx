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
import {NewTabs, TabOrientation, TabType, TabDetails} from ".";
import {TabPane} from "./TabPane";
import {Tabs} from "../tabs";

const tabsData: TabDetails[] = [
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
];

const staticTabsData: TabDetails[] = [
    {
        name: "Dashboard",
        id: "dashboard",
        isSelected: true,
    },
    {
        name: "Management",
        id: "mgmt",
        isDisabled: false,
        tabType: TabType.STATIC,
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
    onTabClick: (evt: React.MouseEvent<HTMLElement>, clickedTab: TabDetails, updatedTabs: TabDetails[]): void => {
        store.set({
            simpleTabs: [...updatedTabs],
        });
    },
});

storiesOf("New Tabs", module)
    .add("Tab Vertical", () => (
        <State store={store}>
            {state => (
                <NewTabs id="verticalTabs" tabs={state.simpleTabs} tabOrientation={TabOrientation.VERTICAL}>
                    <TabPane id={"dashboard"}>DASH</TabPane>
                    <TabPane id={"mgmt"}>MGMT</TabPane>
                    <TabPane id={"cloud"}>CLD</TabPane>
                    <TabPane id={"infra"}>INF</TabPane>
                </NewTabs>
            )}
        </State>
    ))
    .add("Tab Horizontal", () => (
        <State store={store}>
            {state => (
                <NewTabs id="horizontalTabs" tabs={state.simpleTabs} tabOrientation={TabOrientation.HORIZONTAL}>
                    <TabPane id={"dashboard"}>DASH</TabPane>
                    <TabPane id={"mgmt"}>MGMT</TabPane>
                    <TabPane id={"cloud"}>CLD</TabPane>
                    <TabPane id={"infra"}>INF</TabPane>
                </NewTabs>
            )}
        </State>
    ))
    .add("Tab Static", () => (
        <State store={store}>
            {state => (
                <NewTabs id="staticTabs" tabs={state.staticTabs} tabOrientation={TabOrientation.HORIZONTAL}>
                    <TabPane id={"dashboard"}>DASH</TabPane>
                    <TabPane id={"mgmt"}>MGMT</TabPane>
                    <TabPane id={"cloud"}>CLD</TabPane>
                    <TabPane id={"infra"}>INF</TabPane>
                </NewTabs>
            )}
        </State>
    ))
    .add("Tab Overflow", () => (
        <State store={store}>
            {state => (
                <NewTabs
                    id="overflowTabs"
                    tabs={state.simpleTabs}
                    tabOrientation={TabOrientation.HORIZONTAL}
                    overflowTabsFrom={2}
                >
                    <TabPane id={"dashboard"}>DASH</TabPane>
                    <TabPane id={"mgmt"}>MGMT</TabPane>
                    <TabPane id={"cloud"}>CLD</TabPane>
                    <TabPane id={"infra"}>INF</TabPane>
                </NewTabs>
            )}
        </State>
    ))
    .add("Tab New", () => (
        <State store={store}>
            {state => (
                <NewTabs id="overflowTabs" tabs={state.simpleTabs} tabOrientation={TabOrientation.HORIZONTAL}>
                    <TabPane id={"dashboard"}>DASH</TabPane>
                    <TabPane id={"mgmt"}>MGMT</TabPane>
                    <TabPane id={"cloud"}>CLD</TabPane>
                    <TabPane id={"infra"}>INF</TabPane>
                </NewTabs>
            )}
        </State>
    ));
