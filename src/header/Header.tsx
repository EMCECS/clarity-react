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

// Props for Header component
type HeaderProps = {
    className?: string;
    style?: any;
    children?: React.ReactNode | React.ReactNode[];
};

export enum HeaderColor {
    Header1 = "header header-1",
    Header2 = "header header-2",
    Header3 = "header header-3",
    Header4 = "header header-4",
    Header5 = "header header-5",
    Header6 = "header header-6",
    Header7 = "header header-7",
}

export class Header extends React.PureComponent<HeaderProps> {
    render() {
        const {className, style, children} = this.props;
        return (
            <header className={className} style={style}>
                {children}
            </header>
        );
    }
}
