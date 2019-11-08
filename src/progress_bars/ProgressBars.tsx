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

// Props for ProgressBar component
export type ProgressBarProps = {
    value?: number;
    max?: number;
    labeled?: boolean;
    style?: any;
    className?: string;
    status?: ProgressBarStatus;
    type?: ProgressBarType;
    position?: ProgressBarPosition;
    dataqa?: string;
};

export enum ProgressBarType {
    STATIC = "progress-static",
    NORMAL = "progress",
}

export enum ProgressBarStatus {
    SUCCESS = "success",
    WARNING = "warning",
    DANGER = "danger",
}

export enum ProgressBarPosition {
    TOP = "top",
}

export const ProgressBarAnimation = {
    LOOP: "loop",
    FADE_OUT: "progress-fade",
    FLASH: "flash",
    FLASH_DANGER: "flash-danger",
};

export class ProgressBar extends React.PureComponent<ProgressBarProps> {
    // By default Progress Bar will be normal progress bar not static
    static defaultProps = {
        type: ProgressBarType.NORMAL,
    };

    render() {
        const {value, max, status, type, labeled, position, style, className} = this.props;

        // Label style for labled progress bar
        const labelStyle = {display: "block"};

        return (
            <div
                className={classNames([
                    type,
                    status,
                    labeled && "labeled",
                    position,
                    className, // prettier
                ])}
                style={style}
                data-qa={this.props.dataqa}
            >
                {/* Render normal progress bar if type is normal */}
                {type == ProgressBarType.NORMAL && (
                    <progress max={max} value={value}>
                        {" "}
                    </progress>
                )}

                {/* Render static progress bar if type is static */}
                {type == ProgressBarType.STATIC && <div className="progress-meter" data-value={value} />}

                {/* If classname is labeled render label after progres bar */}
                {labeled && <span style={labelStyle}> {value}% </span>}
            </div>
        );
    }
}
