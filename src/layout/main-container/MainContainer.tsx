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
import * as utils from "../../utils";
import {ClassNames as NavClassNames, Header, Nav, NavLevel} from "../nav";
import {ClassNames} from ".";

export type MainContainerProps = {
    actions?: React.ReactNode
    title: string;
    headerNav?: any;
    sideNav?: any;
    subNav?: any;
};

const initialState = {
    leftNavOpen: false,
    rightNavOpen: false,
};

export type navsShown = {primary: boolean; secondary: boolean};

type MainContainerState = Readonly<typeof initialState>;

export class MainContainer extends React.PureComponent<MainContainerProps> {
    readonly state: MainContainerState = initialState;

    handleHamburgerToggle = () => {
        const {leftNavOpen} = this.state;
        this.setState({leftNavOpen: !leftNavOpen});
    };

    handleRightSideToggle = () => {
        const {rightNavOpen} = this.state;
        this.setState({rightNavOpen: !rightNavOpen});
    };

    closeAll = () => {
        this.setState({leftNavOpen: false, rightNavOpen: false});
    };

    getClassList(): (string | undefined)[] {
        const {leftNavOpen, rightNavOpen} = this.state;
        return [
            ClassNames.CONTAINER_CLASS,
            leftNavOpen ? NavClassNames.HamburgerMenu : undefined,
            rightNavOpen ? NavClassNames.OverflowMenu : undefined,
        ];
    }

    render() {
        const {
            actions,
            children,
            headerNav,
            sideNav,
            subNav,
            title
        } = this.props;
        const {primary, secondary} = MainContainer.detectNavs(headerNav, sideNav, subNav);
        return (
            <div className={utils.classNames(this.getClassList())}>
                <Header
                    primaryShown={primary}
                    secondaryShown={secondary}
                    onHamburgerToggle={this.handleHamburgerToggle}
                    onRightSideToggle={this.handleRightSideToggle}
                    onCloseAll={this.closeAll}
                >
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <span className="logo dell-emc-logo" />
                            <span className="title">{title}</span>
                        </a>
                    </div>
                    {headerNav && headerNav}
                    <div className="header-actions">
                        {actions}
                    </div>
                </Header>
                {subNav && subNav}
                <div className="content-container">
                    <div className="content-area">
                        {children}
                    </div>
                    {sideNav && sideNav}
                </div>
            </div>
        );
    }

    private static detectNavs(...navs: (Nav | undefined)[]): navsShown {
        return navs.reduce(
            (acc, nav) => {
                if (typeof nav === "undefined") return acc;
                if (nav.props.navLevel === NavLevel.PRIMARY) return Object.assign({}, acc, {primary: true});
                if (nav.props.navLevel === NavLevel.SECONDARY) return Object.assign({}, acc, {secondary: true});
                return acc;
            },
            {primary: false, secondary: false},
        );
    }
}
