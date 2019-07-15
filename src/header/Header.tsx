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
import {ReactNode} from "react";
import {classNames} from "../utils";
import {Icon} from "../icon";

// Props for Header component
type HeaderProps = {
    className?: string;
    style?: any;
    children?: ReactNode | ReactNode[];
};

export const HeaderColor = {
    header1: "header header-1",
    header2: "header header-2",
    header3: "header header-3",
    header4: "header header-4",
    header5: "header header-5",
    header6: "header header-6",
    header7: "header header-7",
};

export class Header extends React.PureComponent<HeaderProps> {
    render() {
        const {className, style, children} = this.props;
        return (
            <React.Fragment>
                <header className={classNames([className])} style={style}>
                    {children}
                </header>
            </React.Fragment>
        );
    }
}
