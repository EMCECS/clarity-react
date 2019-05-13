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
};

export enum ToolTipDirection {
    TOP_RIGHT = "top-right",
    TOP_LEFT = "top-left",
    BOTTOM_RIGHT = "bottom-right",
    BOTTOM_LEFT = "bottom-left",
    RIGHT = "right",
    LEFT = "left",
}

export enum ToolTipSize {
    EXTRA_SMALL = "xs",
    SMALL = "sm",
    MEDIUM = "md",
    LARGE = "lg",
}

export const ToolTip: React.FunctionComponent<ToolTipProps> = ({direction, size, children}) => {
    return (
        <a
            href="javascript://"
            role="tooltip"
            aria-haspopup="true"
            className={classNames([
                "tooltip", //prettier
                direction && "tooltip-" + direction,
                size && "tooltip-" + size,
            ])}
        >
            <Icon shape="info-circle" size={24} />
            <span className="tooltip-content">{children}</span>
        </a>
    );
};
