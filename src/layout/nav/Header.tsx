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
import {ClassNames} from ".";
import {classNames} from "../../utils";

export type NavHeaderProps = {
    // onHamburgerToggle handles toggle actions for the left side navigation
    // "hamburger" icon"
    onHamburgerToggle?: () => void;

    // onRightSideToggle handles toggle actions for the left side navigation
    // vertical ellipsis icon
    onRightSideToggle?: () => void;

    // onCloseAll handles a call made to close all in this component. The logic
    // for handling the closeAll action is within the parent object, and will
    // have an effect on navList property.
    onCloseAll?: () => void;
    primaryShown: boolean;
    secondaryShown: boolean;
    style?: any;
    color?: HeaderColor;
    className?: string;
};
export enum HeaderColor {
    HEADER1 = "header-1",
    HEADER2 = "header-2",
    HEADER3 = "header-3",
    HEADER4 = "header-4",
    HEADER5 = "header-5",
    HEADER6 = "header-6",
    HEADER7 = "header-7",
}

export class Header extends React.PureComponent<NavHeaderProps> {
    render() {
        const {
            primaryShown,
            secondaryShown,
            onCloseAll,
            onHamburgerToggle,
            onRightSideToggle,
            className,
            color,
            style,
        } = this.props;
        return (
            <header className={classNames([ClassNames.Header, color, className])} style={style}>
                {primaryShown && (
                    <button className={ClassNames.HamburgerTrigger} type="button" onClick={onHamburgerToggle}>
                        <span />
                    </button>
                )}
                {this.props.children}
                {secondaryShown && (
                    <button className={ClassNames.OverflowTrigger} type="button" onClick={onRightSideToggle}>
                        <span />
                    </button>
                )}
                <div className="header-backdrop" onClick={onCloseAll} />
            </header>
        );
    }
}
