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
import {classNames} from "../../utils";
import {Icon} from "../../icon";

/**
 * Label Props
 * color: color of label
 * status: status of label
 * dismissable: if true label is dismissable
 * style: css style
 * className: css property
 * dataqa: quality engineering testing field
 */
type LabelProps = {
    color?: LabelColor;
    status?: LabelStatus;
    onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
    dismissable?: boolean;
    style?: any;
    className?: string;
    dataqa?: string;
};

export enum LabelColor {
    PURPLE = "purple",
    BLUE = "blue",
    ORANGE = "orange",
    LIGHT_BLUE = "light-blue",
}

export enum LabelStatus {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    DANGER = "danger",
}

export class Label extends React.PureComponent<LabelProps> {
    render() {
        const {color, status, onClick, dismissable, style, className, children, dataqa} = this.props;
        let styled: any;
        let Tag: any;
        if (onClick) {
            Tag = "a";
            styled = {
                ...style,
                cursor: "pointer",
            };
        } else {
            Tag = "span";
            styled = {
                ...style,
            };
        }
        return (
            <Tag
                data-qa={dataqa}
                className={classNames([
                    className, // prettier
                    "label",
                    color && "label-" + color,
                    status && "label-" + status,
                    onClick && !dismissable && "clickable",
                ])}
                onClick={onClick}
                style={styled}
            >
                {children}
                {dismissable && <Icon shape="close" />}
            </Tag>
        );
    }
}
