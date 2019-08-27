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
        iconStyle: {
            transition: "all .3s ease-in 0s",
            float: "right",
            color: "#007DB8",
        },
    };
    handleClick = () => {
        const {toggleContent} = this.state;
        this.setState({toggleContent: !toggleContent});
        toggleContent
            ? this.setState({
                  iconStyle: {
                      transition: "all .3s ease-in 0s",
                      transform: "rotate(180deg)",
                      float: "right",
                      color: "#007DB8",
                  },
              })
            : this.setState({
                  iconStyle: {
                      transition: "all .3s ease-in 0s",
                      float: "right",
                      color: "#007DB8",
                  },
              });
    };

    render() {
        const {className, style, header, children} = this.props;
        const {toggleContent, iconStyle} = this.state;
        return (
            <div
                style={{
                    borderRadius: ".125rem",
                    border: "1px solid #d7d7d7",
                    position: "relative",
                    display: "block",
                    backgroundColor: "#fff",
                    width: "100%",
                    marginTop: "1rem",
                }}
            >
                <div
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        margin: "0",
                        padding: "12px 10px",
                        position: "relative",
                        overflow: "hidden",
                        justifyContent: "space-between",
                    }}
                    aria-expanded={toggleContent}
                    onClick={this.handleClick}
                >
                    <span>
                        <Icon dir={Direction.UP} shape="angle" style={iconStyle} />
                    </span>
                    <span style={{float: "left"}}>{header}</span>
                </div>
                <div className={classNames([className])} style={{padding: "0 10px 5px"}}>
                    {toggleContent && children}
                </div>
            </div>
        );
    }
}
