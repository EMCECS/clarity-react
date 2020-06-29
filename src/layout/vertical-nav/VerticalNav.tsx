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
import {Icon, Direction} from "../../icon";
import {NavLink, NavLinkProps} from "../nav";
import {VerticalNavGroup, VerticalNavGroupProps} from ".";

/**
 * @param {isCollapsible} for collapsing;
 * @param {collapseButtonOnBottom} for collapse button;
 * @param {className} for css classname;
 * @param {dataqa} for Quality Engineering
 * @param {style} for css style;
 */
type VerticalNavProps = {
    isCollapsible?: boolean;
    collapseButtonOnBottom?: boolean;
    className?: string;
    dataqa?: string;
    style?: any;
};

type VerticalNavState = {
    isCollapsed: boolean;
    hasNavGroups: boolean;
    hasIcons: boolean;
};

export class VerticalNav extends React.PureComponent<VerticalNavProps, VerticalNavState> {
    constructor(props: VerticalNavProps) {
        super(props);
        this.state = this.initializeState();
    }

    private initializeState(): VerticalNavState {
        let result: VerticalNavState = {
            hasNavGroups: false,
            hasIcons: false,
            isCollapsed: false,
        };
        const {children} = this.props;
        React.Children.map(children, (child: React.ReactNode) => {
            const childEl = child as React.ReactElement;
            if (childEl) {
                if (childEl.type === VerticalNavGroup) {
                    result.hasNavGroups = true;
                    if ((childEl.props as VerticalNavGroupProps).iconShape) result.hasIcons = true;
                } else if (childEl.type === NavLink) {
                    if ((childEl.props as NavLinkProps).iconShape) result.hasIcons = true;
                }
            }
        });
        return result;
    }

    getClassList() {
        let classList: string[] = [VerticalNavCodes.CLR_VERTICAL_NAV];
        const {collapseButtonOnBottom} = this.props;
        const {isCollapsed, hasNavGroups, hasIcons} = this.state;
        if (collapseButtonOnBottom) {
            classList.push(VerticalNavCodes.NAV_TRIGGER_BOTTOM);
        }
        if (hasNavGroups) {
            classList.push(VerticalNavCodes.HAS_NAV_GROUPS);
        }
        if (hasIcons) {
            classList.push(VerticalNavCodes.HAS_ICONS);
        }
        if (isCollapsed) {
            classList.push(VerticalNavCodes.IS_COLLAPSED);
        }
        if (this.props.className) {
            classList.push(this.props.className);
        }
        return classList;
    }

    toggleVertical() {
        const {isCollapsed} = this.state;
        this.setState({isCollapsed: !isCollapsed});
    }

    openVertical() {
        this.setState({isCollapsed: false});
    }

    private renderChildren(): React.ReactNode[] | undefined | null {
        const {isCollapsed} = this.state;
        const {children} = this.props;
        if (typeof children === "undefined" || children === null) {
            return [];
        }
        return React.Children.map(children, (child: React.ReactNode, index: number) => {
            const childEl = child as React.ReactElement;
            if (childEl) {
                if (childEl.type === VerticalNavGroup) {
                    return React.cloneElement(childEl as React.ReactElement<any>, {
                        verticalIsCollapsed: isCollapsed,
                        openVerticalNav: this.openVertical.bind(this),
                    });
                }
            }
            return child;
        });
    }

    render() {
        const {isCollapsed} = this.state;
        const {dataqa, style} = this.props;
        return (
            <div className={this.getClassList().join(" ")} style={style} data-qa={dataqa}>
                {this.props.isCollapsible && (
                    <button type="button" className="nav-trigger" onClick={this.toggleVertical.bind(this)}>
                        <Icon
                            shape="angle-double"
                            className="nav-trigger-icon"
                            dir={isCollapsed ? Direction.RIGHT : Direction.LEFT}
                        />
                    </button>
                )}
                <div className="nav-content">
                    {this.renderChildren()}
                    {this.state.isCollapsed && <button onClick={this.openVertical.bind(this)} className="nav-btn" />}
                </div>
            </div>
        );
    }
}

export class VerticalNavCodes {
    public static CLR_VERTICAL_NAV: string = "clr-vertical-nav";
    public static HAS_ICONS: string = "has-icons";
    public static HAS_NAV_GROUPS: string = "has-nav-groups";
    public static IS_COLLAPSED: string = "is-collapsed";
    public static NAV_TRIGGER_BOTTOM: string = "nav-trigger--bottom";
}
