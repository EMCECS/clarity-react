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
import {classNames} from "../utils";

// Props for Header component
type HeaderProps = {
    className?: string;
    style?: any;
    children?: React.ReactNode | React.ReactNode[];
    color?: HeaderColor;
};

export enum HeaderColor {
    HEADER1 = "header header-1",
    HEADER2 = "header header-2",
    HEADER3 = "header header-3",
    HEADER4 = "header header-4",
    HEADER5 = "header header-5",
    HEADER6 = "header header-6",
    HEADER7 = "header header-7",
}

export class Header extends React.PureComponent<HeaderProps> {
    static defaultProps = {
        color: HeaderColor.HEADER1,
    };
    render() {
        const {className, style, children, color} = this.props;
        return (
            <header className={classNames([className, color])} style={style}>
                {children}
            </header>
        );
    }
}
