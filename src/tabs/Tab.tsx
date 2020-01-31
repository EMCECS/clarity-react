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
import {Button} from "../forms/button";
import {ClassNames} from "./ClassNames";
import {Dropdown, DropdownMenu, DropdownItem, MenuItemType} from "../forms/dropdown";

/**
 * state for tabs
 * @param {tabs} List of all Tabs
 * @param {tabComponent} currently selected tab's component
 * @param {overflowTab} overflow tab button
 */
type TabState = {
    tabs: TabPane[];
    tabComponent: React.ReactElement;
    overflowTab?: TabPane;
};

/**
 * props for tabs
 * @param {index} index of tab in array
 * @param {tabName} name or title of tab
 * @param {tabComponent} React element loaded on tab selection
 * @param {isTabSelected} true if tab is selected
 * @param {disableTab} true if tab is disabled
 */
type TabPane = {
    index?: number;
    tabName: string;
    tabComponent: React.ReactElement;
    isTabSelected?: boolean;
    disableTab?: boolean;
};

/**
 * Tab Orientation Types
 * @param {VERTICAL} vertical tabs
 * @param {HORIZONTAL} Horizontal tabs
 */
export enum TabOrientation {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal",
}

/**
 * Tab Types
 * @param {STATIC} User cannot switch between tabs in this static
 * @param {SIMPLE} simple tabs user can switch between tabs
 * @param {OVERFLOW} overflow is configurable so you can assign tabs to the dropdown menu below ellipses.
 */
export enum TabType {
    STATIC = "static",
    SIMPLE = "simple",
    OVERFLOW = "overflow",
}

/**
 * props for tabs
 * @param {tabs} List of all Tabs
 * @param {tabOrientation} orientation of tabs
 * @param {tabType} type of tabs
 * @param {selectedTabIndex} which tab to is selected to show first
 * @param {overflowPivot} after how many tab remaining to put in overflow menu
 */
type TabProp = {
    tabs: TabPane[];
    tabOrientation: TabOrientation;
    tabType: TabType;
    selectedTabIndex?: number;
    overflowPivot?: number;
};

/**
 * Tab Component of clarity divide content into separate views which users navigate between.
 */
export class Tab extends React.PureComponent<TabProp, TabState> {
    constructor(props: TabProp) {
        super(props);
        this.initializeTabs(this.props.tabs);
    }

    //Initialize tabs
    initializeTabs = (tabs: TabPane[]) => {
        // set index in array and selected tab
        const {tabType, selectedTabIndex} = this.props;
        tabs.map((tab: TabPane, index: number) => {
            tab.index = index;
            index === (selectedTabIndex && selectedTabIndex <= tabs.length ? selectedTabIndex : 0)
                ? (tab.isTabSelected = true)
                : (tab.isTabSelected = false);
            tabType == TabType.SIMPLE
                ? (tab.disableTab = false)
                : tab.disableTab
                ? (tab.disableTab = true)
                : (tab.disableTab = false);
        });
        this.state = {
            tabs: [...tabs],
            tabComponent: tabs[selectedTabIndex && selectedTabIndex <= tabs.length ? selectedTabIndex : 0].tabComponent,
            overflowTab: {
                tabName: "overflow",
                tabComponent: <div />,
                isTabSelected: false,
                disableTab: false,
            },
        };
    };

    //Function handelling normal tab click
    tabClicked = (evt: React.MouseEvent<HTMLElement>, clickedTab: TabPane) => {
        const {tabs} = this.state;

        tabs.map((tab: TabPane) => {
            clickedTab.index === tab.index ? (tab.isTabSelected = true) : (tab.isTabSelected = false);
        });
        this.setState({
            tabs: [...tabs],
            tabComponent: clickedTab.tabComponent,
        });
    };

    //Render Tab Button
    private renderTab = (tab: TabPane) => {
        let className;
        tab.isTabSelected ? (className = ClassNames.TABACTIVE) : (className = ClassNames.TABINACTIVE);
        return (
            <li className={ClassNames.TABITEM}>
                <Button className={className} disabled={tab.disableTab} onClick={evt => this.tabClicked(evt, tab)}>
                    {tab.tabName}
                </Button>
            </li>
        );
    };

    //Render Tab bar
    private renderTabList = (tabs: TabPane[]) => {
        const {tabType, overflowPivot} = this.props;
        return (
            <ul className={ClassNames.TABMAIN}>
                {tabs.map((tab: TabPane, index: number) => {
                    if (tabType === TabType.OVERFLOW && overflowPivot && index < overflowPivot)
                        return this.renderTab(tab);
                    if (tabType === TabType.OVERFLOW && overflowPivot && index === overflowPivot)
                        return this.renderOverflowTab(tabs.slice(overflowPivot, tabs.length));
                    if (tabType === TabType.SIMPLE || tabType === TabType.STATIC) return this.renderTab(tab);
                })}
            </ul>
        );
    };

    //Render Overflow Tab
    private renderOverflowTab = (overflowTabs: TabPane[]) => {
        const {overflowTab} = this.state;
        let className: string | undefined;
        if (overflowTab) {
            overflowTab.isTabSelected ? (className = ClassNames.TABACTIVE) : (className = ClassNames.TABINACTIVE);
            return (
                <li className={ClassNames.TABITEM}>
                    <Dropdown
                        showCaret={false}
                        button={{icon: {shape: "ellipsis-horizontal"}, link: true, className: className}}
                    >
                        <DropdownMenu>
                            {overflowTabs.map((tab: TabPane) => {
                                return (
                                    <DropdownItem
                                        menuItemType={MenuItemType.ITEM}
                                        isHeaderChild={true}
                                        label={tab.tabName}
                                        onClick={evt => this.tabClicked(evt, tab)}
                                        isDisabled={tab.disableTab}
                                    />
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </li>
            );
        }
    };

    render() {
        const {tabs, tabComponent} = this.state;
        const {tabOrientation} = this.props;
        return (
            <div className={tabOrientation === TabOrientation.VERTICAL ? ClassNames.VERTICALTAB : ""}>
                {this.renderTabList(tabs)}

                {tabComponent}
            </div>
        );
    }
}
