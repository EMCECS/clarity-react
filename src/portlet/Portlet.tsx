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
import {Styles} from "./ClassNames";
import {Icon, Direction} from "../icon";

type PortletProps = {
    style?: any;
    className?: string;
    header: any;
};

type PortletState = {
    toggleContent: boolean;
    iconStyle: any;
};

export class Portlet extends React.PureComponent<PortletProps, PortletState> {
    state: PortletState = {
        toggleContent: true,
        iconStyle: Styles.ICON_STYLE,
    };

    handleClick = () => {
        const {toggleContent} = this.state;
        this.setState(prevState => ({toggleContent: !prevState.toggleContent}));
        if (toggleContent) {
            this.setState({
                iconStyle: {
                    ...Styles.ICON_STYLE,
                    transform: "rotate(180deg)",
                },
            });
        } else {
            this.setState({
                iconStyle: Styles.ICON_STYLE,
            });
        }
    };

    render() {
        const {className, header, children} = this.props;
        const {toggleContent, iconStyle} = this.state;
        return (
            <div style={Styles.MAIN_DIV}>
                <div style={Styles.HEADER_DIV} aria-expanded={toggleContent} onClick={this.handleClick}>
                    <span>
                        <Icon dir={Direction.UP} shape="angle" style={iconStyle} />
                    </span>
                    <span>{header}</span>
                </div>
                <div className={classNames([className])} style={Styles.CONTENT_DIV}>
                    {toggleContent && children}
                </div>
            </div>
        );
    }
}
