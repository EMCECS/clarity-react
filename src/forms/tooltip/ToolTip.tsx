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

type ToolTipProps = {
    direction?: ToolTipDirection;
    size?: ToolTipSize;
    status?: ToolTipStatus;
    style?: any;
    iconSize?: number;
    shape?: string;
    className?: string;
};

export enum ToolTipDirection {
    TOP_RIGHT = "top-right",
    TOP_LEFT = "top-left",
    BOTTOM_RIGHT = "bottom-right",
    BOTTOM_LEFT = "bottom-left",
    TOP = "top",
    BOTTOM = "bottom",
    RIGHT = "right",
    LEFT = "left",
}

export enum ToolTipSize {
    EXTRA_SMALL = "xs",
    SMALL = "sm",
    MEDIUM = "md",
    LARGE = "lg",
}

export enum ToolTipStatus {
    INFO = "info",
    OK = "ok",
    WARNING = "warning",
    ERROR = "error",
}

export const ToolTip: React.FunctionComponent<ToolTipProps> = ({
    direction,
    size,
    style,
    shape,
    iconSize,
    className,
    status,
    children,
}) => {
    let setShape: string = shape ? shape : "info-circle";
    return (
        <a
            href="javascript://"
            role="tooltip"
            aria-haspopup="true"
            className={classNames([
                className && className,
                "tooltip", //prettier
                direction && "tooltip-" + direction,
                size && "tooltip-" + size,
            ])}
            style={style}
        >
            <Icon shape={setShape} size={iconSize} />
            <span
                className={classNames([
                    "tooltip-content", //prettier
                    status && status,
                ])}
            >
                {children}
            </span>
        </a>
    );
};
