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
import {Button} from "../forms/button";
import {ClassNames} from "./ClassNames";
import * as utils from "../utils";
import {Dropdown, DropdownMenu, DropdownItem, MenuItemType} from "../forms/dropdown";
import {TabPane} from "./TabPane";

/**
 * props for tabs
 * @param {tabs} List of all TabsV2
 * @param {id} string to identify tab group uniquely
 * @param {tabOrientation} orientation of tab either vertical or horizontal
 * @param {tabClickCallback} callback function from parent to call on tab click
 * @param {overflowTabsfrom} name of tab from which tabs added to overflow menu.
 *         optional prop, if set activates overflow tabs
 * @param {dataqa} quality engineering tag
 */
type TabsV2Prop = {
    tabs: TabV2Details[];
    id: string;
    tabOrientation: TabV2Orientation;
    tabClickCallback?: (evt: React.MouseEvent<HTMLElement>, clickedTab: TabV2Details) => void;
    overflowTabsFrom?: number;
    dataqa?: string;
};

/**
 * state for tabs
 * @param {isOverflowTabSelected} if true inticate overflow tab button as active
 * @param {selectedTabId} Id of selected tab
 * @param {tabsData} array of data for tabs
 */
type TabsV2State = {
    isOverflowTabSelected: boolean;
    selectedTabId: string;
    tabsData: TabV2Details[];
};

/**
 * props for tabs
 * @param {name} name or title of tab to uniquely identify tab
 * @param {id} id to uniquely identify single tab
 * @param {isSelected} true if tab is selected by default
 * @param {isDisabled} true if tab is disabled
 * @param {tabType} Type of tab static or simple
 */
export type TabV2Details = {
    name: any;
    id: string;
    isSelected?: boolean;
    isDisabled?: boolean;
    tabType?: TabV2Type;
};

/**
 * Tab Orientation Types
 * @param {VERTICAL} vertical tabs
 * @param {HORIZONTAL} Horizontal tabs
 */
export enum TabV2Orientation {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal",
}

/**
 * Tab Types
 * @param {STATIC} tabs which has no panel to render
 * @param {SIMPLE} simple tabs user can switch between tabs
 */
export enum TabV2Type {
    STATIC = "static",
    SIMPLE = "simple",
}

/**
 * TabsV2 Component : Use to divide content into separate views which users navigate between.
 */
export class TabsV2 extends React.PureComponent<TabsV2Prop, TabsV2State> {
    constructor(props: TabsV2Prop) {
        super(props);
        this.state = {
            isOverflowTabSelected: false,
            selectedTabId: props.tabs[0].id,
            tabsData: props.tabs,
        };
    }

    //handle overflowed tab click
    overflowTabClicked = (evt: React.MouseEvent<HTMLElement>, clickedTab: TabV2Details) => {
        const {tabs, overflowTabsFrom, tabClickCallback} = this.props;
        let lastActiveTabIndex: number | undefined;
        let activeLastTab: boolean = false;
        tabs.map((tab: TabV2Details, index: number) => {
            if (tab.isSelected) {
                lastActiveTabIndex = index;
            }

            if (clickedTab.id === tab.id) {
                // If tabType is present and if tabType is STATIC then active last selected tab
                if (clickedTab.tabType && clickedTab.tabType === TabV2Type.STATIC) {
                    tab.isSelected = false;
                    activeLastTab = true;
                } else {
                    tab.isSelected = true;
                }
            } else {
                tab.isSelected = false;
            }
        });

        // Active last tab if user clicks on static tab
        if (activeLastTab && lastActiveTabIndex !== undefined) {
            tabs[lastActiveTabIndex].isSelected = true;
        }

        // Display tab selected from overflow list on top
        if (overflowTabsFrom) {
            let clickedTabIndex = tabs.findIndex(tab => tab.id === clickedTab.id);
            var b = tabs[overflowTabsFrom - 1];
            tabs[overflowTabsFrom - 1] = tabs[clickedTabIndex];
            tabs[clickedTabIndex] = b;
        }

        this.setState(
            {
                isOverflowTabSelected: true,
                selectedTabId: clickedTab.id,
                tabsData: tabs,
            },
            () => tabClickCallback && tabClickCallback(evt, clickedTab),
        );
    };

    //handle normal tab click
    normalTabClick = (evt: React.MouseEvent<HTMLElement>, clickedTab: TabV2Details) => {
        const {tabClickCallback} = this.props;
        this.setState(
            {
                isOverflowTabSelected: false,
                selectedTabId: clickedTab.id,
            },
            () => tabClickCallback && tabClickCallback(evt, clickedTab),
        );
    };

    //Render Tab Button
    private renderTabLink = (tab: TabV2Details, index: number) => {
        const {selectedTabId} = this.state;
        const className = tab.id === selectedTabId ? ClassNames.TABACTIVE : ClassNames.TABINACTIVE;
        return (
            <li key={index} role="presentation" className={ClassNames.TABITEM}>
                <Button
                    id={`tab-${tab.id}`}
                    aria-controls={`panel-${tab.id}`}
                    aria-selected={tab.isSelected}
                    className={className}
                    disabled={tab.isDisabled}
                    onClick={evt => this.normalTabClick(evt, tab)}
                >
                    {tab.name}
                </Button>
            </li>
        );
    };

    //Render Tab bar
    private renderTabLinks = () => {
        const {id, tabOrientation, overflowTabsFrom} = this.props;
        const {tabsData} = this.state;
        let isOverflowRendered = false;
        return (
            <ul className={ClassNames.TABMAIN} role="tablist" id={id}>
                {tabsData.map((tab: TabV2Details, index: number) => {
                    tabsData;
                    if (tabOrientation === TabV2Orientation.HORIZONTAL && index === overflowTabsFrom) {
                        isOverflowRendered = true;
                        return this.renderOverflowTab(tabsData.slice(index, tabsData.length), index);
                    }

                    //Render normal tab unless overflow tab rendered
                    if (!isOverflowRendered) {
                        return this.renderTabLink(tab, index);
                    }
                })}
            </ul>
        );
    };

    //Render Overflow Tab
    private renderOverflowTab = (overflowTabs: TabV2Details[], index: number) => {
        return (
            <li className={ClassNames.TABITEM} key={index}>
                <Dropdown
                    showCaret={false}
                    button={{
                        icon: {shape: "ellipsis-horizontal"},
                        link: true,
                        className: ClassNames.TABINACTIVE,
                    }}
                >
                    <DropdownMenu>
                        {overflowTabs.map((tab: TabV2Details, index: number) => {
                            return (
                                <DropdownItem
                                    key={index.toString()}
                                    menuItemType={MenuItemType.ITEM}
                                    isHeaderChild={true}
                                    label={tab.name}
                                    onClick={evt => this.overflowTabClicked(evt, tab)}
                                    isDisabled={tab.isDisabled}
                                />
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </li>
        );
    };

    private static renderTabPane(children: utils.ReactChildren, id: string): utils.ReactChildren {
        // const selectedTabId = tabs.filter(tab => {return tab.isSelected}).map(tab => {return tab.id})[0];
        const selectedTabId = id;
        return React.Children.map(children, child => {
            const childEl = child as React.ReactElement;
            if (childEl.type === TabPane && childEl.props.id === selectedTabId) {
                return childEl;
            }
        });
    }

    render() {
        const {tabOrientation, children, dataqa} = this.props;
        const {selectedTabId} = this.state;
        return (
            <div
                className={tabOrientation === TabV2Orientation.VERTICAL ? ClassNames.VERTICALTAB : undefined}
                data-qa={dataqa}
            >
                {this.renderTabLinks()}
                {TabsV2.renderTabPane(children, selectedTabId)}
            </div>
        );
    }
}
