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
import {ReactElement} from "react";
import {NavLink} from "./NavLink";

export type NavProps = {
    // The level of navigation invoked.
    navLevel: NavLevel;

    // The navigation type (header, sub side).
    navType: NavType;
    className?: string;
};

export enum NavLevel {
    PRIMARY = "1",
    SECONDARY = "2",
}

export enum NavType {
    HEADER = "NAV_TYPE_HEADER",
    SIDE = "NAV_TYPE_SIDE",
    SUB = "NAV_TYPE_SUB",
}

export class Nav extends React.PureComponent<NavProps> {
    private static classForNavType(navType: NavType): string {
        switch (navType) {
            case NavType.HEADER:
                return "header-nav";
            case NavType.SIDE:
                return "sidenav";
            case NavType.SUB:
                return "subnav";
            default:
                return "header-nav";
        }
    }

    private static classForNavLevel(navLevel: NavLevel): string {
        return "clr-nav-level-" + navLevel;
    }

    private static maybeWrapInList(navType: NavType, children: React.ReactNode): React.ReactNode {
        if (navType === NavType.SUB) {
            const wrappedChildren = React.Children.map(children, child => {
                const childEl = child as ReactElement;
                if (childEl.type === NavLink) return <li className="nav-item">{child}</li>;
                return child;
            });
            return <ul className={"nav"}>{wrappedChildren}</ul>;
        }
        return children;
    }

    render() {
        const {children, navLevel, navType, className} = this.props;
        const classList: string[] = [Nav.classForNavType(navType), Nav.classForNavLevel(navLevel), className as any];
        return <nav className={utils.classNames(classList)}>{Nav.maybeWrapInList(navType, children)}</nav>;
    }
}
