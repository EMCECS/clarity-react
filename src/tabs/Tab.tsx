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
import {Button} from "../forms/button";
import {ClassNames} from "./ClassNames";
import {Dropdown, DropdownMenu, DropdownItem, MenuItemType} from "../forms/dropdown";

/**
 * state for tabs
 * @param {tabs} List of all Tabs
 * @param {component} currently selected tab's component
 * @param {overflowTab} overflow tab button. optional param activates only when overflow prop set.
 */
type TabState = {
    tabs: TabPane[];
    component: React.ReactElement;
    overflowTab?: TabPane;
};

/**
 * props for tabs
 * @param {index} index of tab in array
 * @param {name} name or title of tab
 * @param {component} React element loaded on tab selection
 * @param {isSelected} true if tab is selected
 * @param {isDisabled} true if tab is disabled
 */
type TabPane = {
    name: string;
    component: React.ReactElement;
    isSelected?: boolean;
    isDisabled?: boolean;
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
 * @param {STATIC} tabs are allowed to be disable enabled confitionally in this type.
 * @param {SIMPLE} simple tabs user can switch between tabs, tabs are always enabled.
 */
export enum TabType {
    STATIC = "static",
    SIMPLE = "simple",
}

/**
 * props for tabs
 * @param {tabs} List of all Tabs
 * @param {tabOrientation} orientation of tabs
 * @param {tabType} type of tabs
 * @param {selectedTabName} which tab is selected to show first.optional prop, if set shows given tab explicitly selected
 * @param {overflowTabsFrom} name of tab from which tabs added to overflow menu. optional prop, if set activates overflow tabs
 */
type TabProp = {
    tabs: TabPane[];
    tabOrientation: TabOrientation;
    tabType: TabType;
    selectedTabName?: string;
    overflowTabsFrom?: string;
};

/**
 * Tab Component of clarity divide content into separate views which users navigate between.
 */
export class Tab extends React.PureComponent<TabProp, TabState> {
    constructor(props: TabProp) {
        super(props);
        this.initializeTabs();
    }

    //Initialize tabs
    initializeTabs = () => {
        // set index in array and selected tab
        const {tabs, tabType, selectedTabName} = this.props;

        //set first tab as selected by default
        tabs[0].isSelected = true;
        let initialVisibleTabComponent = tabs[0].component;

        tabs.map((tab: TabPane) => {
            //if initial selected tab name is given by user set it visible first
            if (tab.name === selectedTabName) {
                tab.isSelected = true;
                initialVisibleTabComponent = tab.component;
                tabs[0].isSelected = false;
            }

            //disabled tabs work only for STATIC Type
            tabType === TabType.STATIC && tab.isDisabled ? (tab.isDisabled = true) : (tab.isDisabled = false);
        });
        this.state = {
            tabs: [...tabs],
            component: initialVisibleTabComponent,
            overflowTab: {
                name: "overflow",
                component: <div />,
                isSelected: false,
                isDisabled: false,
            },
        };
    };

    //Function handelling normal tab click
    tabClicked = (evt: React.MouseEvent<HTMLElement>, clickedTab: TabPane) => {
        const {tabs} = this.state;

        tabs.map((tab: TabPane) => {
            clickedTab.name === tab.name ? (tab.isSelected = true) : (tab.isSelected = false);
        });
        this.setState({
            tabs: [...tabs],
            component: clickedTab.component,
        });
    };

    //Render Tab Button
    private renderTab = (tab: TabPane) => {
        const className = tab.isSelected ? ClassNames.TABACTIVE : ClassNames.TABINACTIVE;
        return (
            <li className={ClassNames.TABITEM}>
                <Button className={className} disabled={tab.isDisabled} onClick={evt => this.tabClicked(evt, tab)}>
                    {tab.name}
                </Button>
            </li>
        );
    };

    //Render Tab bar
    private renderTabList = (tabs: TabPane[]) => {
        const {tabType, tabOrientation, overflowTabsFrom} = this.props;
        let isOverflowRendered = false;
        return (
            <ul className={ClassNames.TABMAIN}>
                {tabs.map((tab: TabPane, index: number) => {
                    //once overflow tab rendered push all tans in overflow list
                    if (tabOrientation === TabOrientation.HORIZONTAL && tab.name === overflowTabsFrom) {
                        isOverflowRendered = true;
                        return this.renderOverflowTab(tabs.slice(index, tabs.length));
                    }
                    //Render normal tab unless overflow tab rendered
                    if (!isOverflowRendered) {
                        return this.renderTab(tab);
                    }
                })}
            </ul>
        );
    };

    //Render Overflow Tab
    private renderOverflowTab = (overflowTabs: TabPane[]) => {
        const {overflowTab} = this.state;
        let className: string | undefined;
        if (overflowTab) {
            overflowTab.isSelected ? (className = ClassNames.TABACTIVE) : (className = ClassNames.TABINACTIVE);
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
                                        label={tab.name}
                                        onClick={evt => this.tabClicked(evt, tab)}
                                        isDisabled={tab.isDisabled}
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
        const {tabs, component} = this.state;
        const {tabOrientation} = this.props;
        return (
            <div className={tabOrientation === TabOrientation.VERTICAL ? ClassNames.VERTICALTAB : ""}>
                {this.renderTabList(tabs)}

                {component}
            </div>
        );
    }
}
