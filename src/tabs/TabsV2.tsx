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
 * @param {onTabClick} callback function from parent to call on tab click
 * @param {overflowTabsfrom} name of tab from which tabs added to overflow menu.
 *         optional prop, if set activates overflow tabs
 * @param {dataqa} quality engineering tag
 */
type TabsV2Prop = {
    tabs: TabV2Details[];
    id: string;
    tabOrientation: TabV2Orientation;
    onTabClick?: (evt: React.MouseEvent<HTMLElement>, clickedTab: TabV2Details) => void;
    overflowTabsFrom?: number;
    dataqa?: string;
};

/**
 * state for tabs
 * @param {isOverflowTabSelected} if true inticate overflow tab button as active
 * @param {selectedTabId} Id of selected tab
 */
type TabsV2State = {
    isOverflowTabSelected: boolean;
    selectedTabId: string;
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

/*
 *  util method to filter tabs and find selected tab if user provided preference
 */

const getSelectedTabId = (tabs: TabV2Details[]): string => {
    const selectedTab: any = tabs.find(tab => tab.isSelected);
    if (selectedTab) {
        return selectedTab.id;
    } else {
        return tabs[0].id;
    }
};

/**
 * TabsV2 Component: Use to divide content into separate views which users navigate between.
 */
export class TabsV2 extends React.PureComponent<TabsV2Prop, TabsV2State> {
    constructor(props: TabsV2Prop) {
        super(props);
        const {tabs} = props;
        const selectedTabID: string = tabs && tabs.length > 0 ? getSelectedTabId(tabs) : tabs[0].id;

        this.state = {
            isOverflowTabSelected: false,
            selectedTabId: selectedTabID,
        };
    }

    componentDidUpdate = () => {
        const {tabs} = this.props;
        const selectedTabID: string = tabs && tabs.length > 0 ? getSelectedTabId(tabs) : tabs[0].id;

        this.setState({
            isOverflowTabSelected: false,
            selectedTabId: selectedTabID,
        });
    };

    //handle tab click
    onTabClicked = (evt: React.MouseEvent<HTMLElement>, clickedTab: TabV2Details, isOverflowedTabClicked: boolean) => {
        const {onTabClick} = this.props;
        this.setState(
            {
                isOverflowTabSelected: isOverflowedTabClicked,
                selectedTabId: clickedTab.id,
            },
            () => onTabClick && onTabClick(evt, clickedTab),
        );
    };

    //Render Tab Button
    private renderTab = (tab: TabV2Details, index: number) => {
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
                    onClick={evt => this.onTabClicked(evt, tab, false)}
                >
                    {tab.name}
                </Button>
            </li>
        );
    };

    //Render Tab bar
    private renderTabsBar = () => {
        const {id, tabOrientation, overflowTabsFrom} = this.props;
        const {tabs} = this.props;
        let isOverflowRendered = false;
        return (
            <ul className={ClassNames.TABMAIN} role="tablist" id={id}>
                {tabs.map((tab: TabV2Details, index: number) => {
                    tabs;
                    if (tabOrientation === TabV2Orientation.HORIZONTAL && index === overflowTabsFrom) {
                        isOverflowRendered = true;
                        return this.renderOverflowTab(tabs.slice(index, tabs.length), index);
                    }

                    //Render normal tab unless overflow tab rendered
                    if (!isOverflowRendered) {
                        return this.renderTab(tab, index);
                    }
                })}
            </ul>
        );
    };

    //Render Overflow Tab
    private renderOverflowTab = (overflowTabs: TabV2Details[], index: number) => {
        const {tabs} = this.props;
        const {isOverflowTabSelected, selectedTabId} = this.state;
        const selectedOverflowTab = tabs.filter(tab => {
            return tab.id === selectedTabId;
        })[0];
        return (
            <li className={ClassNames.TABITEM} key={index}>
                <Dropdown
                    showCaret={true}
                    label={isOverflowTabSelected && selectedOverflowTab && selectedOverflowTab.name}
                    button={{
                        //icon: {shape: "ellipsis-horizontal"},
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
                                    onClick={evt => this.onTabClicked(evt, tab, true)}
                                    isDisabled={tab.isDisabled}
                                />
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </li>
        );
    };

    private renderTabPane(children: utils.ReactChildren, selectedTabId: string): utils.ReactChildren {
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
                {this.renderTabsBar()}
                {this.renderTabPane(children, selectedTabId)}
            </div>
        );
    }
}
