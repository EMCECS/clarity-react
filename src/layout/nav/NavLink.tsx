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
};

export class NavLink extends React.PureComponent<NavLinkProps> {
    render() {
        const {iconShape, className, children} = this.props;
        return iconShape ? (
            <a href="#" className={classNames([className, "nav-link"])}>
                <Icon shape={iconShape} className="nav-icon" />
                <span className="nav-text">{children}</span>
            </a>
        ) : (
            <a href="#" className={classNames([className, "nav-link"])}>
                <div className="nav-text">{children}</div>
            </a>
        );
    }
}
