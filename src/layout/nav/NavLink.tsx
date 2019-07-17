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
import {Icon} from "../../icon";
import {classNames} from "../../utils";

export type NavLinkProps = {
    iconShape?: string;
    className?: string;
    type?: NavLinkType;
    onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
};

export enum NavLinkType {
    stepNavLink = "btn btn-link clr-wizard-stepnav-link",
}

export class NavLink extends React.PureComponent<NavLinkProps> {
    render() {
        const {iconShape, className, type, onClick, children} = this.props;

        let cssClass = classNames(["nav-text", type]);
        return iconShape ? (
            <a
                href="javascript:void(0)"
                className={classNames([className, type == NavLinkType.stepNavLink ? "" : "nav-link"])}
                onClick={onClick}
            >
                <Icon shape={iconShape} className="nav-icon" />
                <span className={cssClass}>{children}</span>
            </a>
        ) : (
            <a
                href="javascript:void(0)"
                className={classNames([className, type == NavLinkType.stepNavLink ? "" : "nav-link"])}
                onClick={onClick}
            >
                <div className={cssClass}>{children}</div>
            </a>
        );
    }
}
