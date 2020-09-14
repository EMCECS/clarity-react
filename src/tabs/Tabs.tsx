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
 * props for tabs
 * @param {tabs} List of all Tabs
 * @param {id} string to identify tab group uniquely
 * @param {tabOrientation} orientation of tab either vertical or horizontal
 * @param {onTabClick} callback function from parent to call on tab click
 * @param {overflowTabsFrom} name of tab from which tabs added to overflow menu.
 *         optional prop, if set activates overflow tabs
 */
type TabsProp = {
    tabs: TabDetails[];
    id: string;
    tabOrientation: TabOrientation;
    onTabClick: (evt: React.MouseEvent<HTMLElement>, tabDetails: TabDetails[]) => void;
    overflowTabsFrom?: number;
};

/**
 * state for tabs
 * @param {isOverflowTabSelected} if true inticate overflow tab button as active
 */
type TabsState = {
    isOverflowTabSelected: boolean;
};

/**
 * props for tabs
 * @param {name} name or title of tab
 * @param {component} React element loaded on tab selection
 * @param {isSelected} true if tab is selected by default
 * @param {isDisabled} true if tab is disabled
 */
export type TabDetails = {
    name: any;
    component: React.ReactElement;
    isSelected?: boolean;
    isDisabled?: boolean;
    tabType?: TabType;
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
 * @param {STATIC} tabs which has no panel to render
 * @param {SIMPLE} simple tabs user can switch between tabs
 */
export enum TabType {
    STATIC = "static",
    SIMPLE = "simple",
}

/**
 * Tabs Component : Use to divide content into separate views which users navigate between.
 */
export class Tabs extends React.PureComponent<TabsProp, TabsState> {
    state: TabsState = {
        isOverflowTabSelected: false,
    };

    constructor(props: TabsProp) {
        super(props);
    }

    //Function handelling normal tab click
    tabClicked = (evt: React.MouseEvent<HTMLElement>, clickedTab: TabDetails, isOverflowTab: boolean = false) => {
        const {tabs, onTabClick} = this.props;
        tabs.map((tab: TabDetails) => {
            tab.isSelected = false;
            if (clickedTab.name === tab.name) {
                // If tabType is not present or if tabType is not STATIC then active selected tab
                if (!clickedTab.tabType || (clickedTab.tabType && clickedTab.tabType !== TabType.STATIC)) {
                    tab.isSelected = true;
                }
            }
        });

        this.setState(
            {
                isOverflowTabSelected: isOverflowTab,
            },
            () => onTabClick && onTabClick(evt, tabs),
        );
    };

    //Render Tab Button
    private renderTabLink = (tab: TabDetails, index: number) => {
        const className = tab.isSelected ? ClassNames.TABACTIVE : ClassNames.TABINACTIVE;
        return (
            <li key={index} role="presentation" className={ClassNames.TABITEM}>
                <Button
                    id={`tab-${tab.name}`}
                    aria-controls={`panel-${tab.name}`}
                    aria-selected={tab.isSelected}
                    className={className}
                    disabled={tab.isDisabled}
                    onClick={evt => this.tabClicked(evt, tab)}
                >
                    {tab.name}
                </Button>
            </li>
        );
    };

    //Render Tab bar
    private renderTabLinks = () => {
        const {id, tabOrientation, overflowTabsFrom, tabs} = this.props;
        let isOverflowRendered = false;
        return (
            <ul className={ClassNames.TABMAIN} role="tablist" id={id}>
                {tabs.map((tab: TabDetails, index: number) => {
                    //once overflow tab rendered push all tabs in overflow list
                    if (tabOrientation === TabOrientation.HORIZONTAL && index === overflowTabsFrom) {
                        isOverflowRendered = true;
                        return this.renderOverflowTab(tabs.slice(index, tabs.length), index);
                    }

                    //Render normal tab unless overflow tab rendered
                    if (!isOverflowRendered) {
                        return this.renderTabLink(tab, index);
                    }
                })}
            </ul>
        );
    };

    //Render Tab panels
    private renderTabPanels = () => {
        const {tabs} = this.props;

        return (
            <React.Fragment>
                {tabs.map((tab: TabDetails, index: number) => {
                    return (
                        <section
                            key={index}
                            id={`panel-${tab.name}`}
                            role="tabpanel"
                            className={ClassNames.TAB_PANEL}
                            aria-labelledby={`tab-${tab.name}`}
                            aria-hidden={tab.isSelected ? "false" : "true"}
                        >
                            {tab.component}
                        </section>
                    );
                })}
            </React.Fragment>
        );
    };

    //Render Overflow Tab
    private renderOverflowTab = (overflowTabs: TabDetails[], index: number) => {
        const {isOverflowTabSelected} = this.state;
        const className = isOverflowTabSelected ? ClassNames.TABACTIVE : ClassNames.TABINACTIVE;
        return (
            <li className={ClassNames.TABITEM} key={index}>
                <Dropdown
                    showCaret={false}
                    button={{
                        icon: {shape: "ellipsis-horizontal"},
                        link: true,
                        className: className,
                    }}
                >
                    <DropdownMenu>
                        {overflowTabs.map((tab: TabDetails, index: number) => {
                            return (
                                <DropdownItem
                                    key={index.toString()}
                                    menuItemType={MenuItemType.ITEM}
                                    isHeaderChild={true}
                                    label={tab.name}
                                    onClick={evt => this.tabClicked(evt, tab, true)}
                                    isDisabled={tab.isDisabled}
                                />
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </li>
        );
    };

    render() {
        const {tabOrientation} = this.props;
        return (
            <div className={tabOrientation === TabOrientation.VERTICAL ? ClassNames.VERTICALTAB : undefined}>
                {this.renderTabLinks()}
                {this.renderTabPanels()}
            </div>
        );
    }
}
