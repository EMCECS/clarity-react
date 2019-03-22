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
};

export class Header extends React.PureComponent<NavHeaderProps> {
    render() {
        const {primaryShown, secondaryShown, onCloseAll, onHamburgerToggle, onRightSideToggle} = this.props;
        return (
            <header className={ClassNames.Header}>
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
