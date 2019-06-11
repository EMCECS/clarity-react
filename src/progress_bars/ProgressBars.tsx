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
type ProgressBarProps = {
    value?: number;
    max?:number;
    labeled?:boolean;
    style?: any;
    className?: string;
    status?: ProgressBarStatus;
    type?:ProgressBarType;
    animation?:string[];
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

export const ProgressBarAnimation = {
    LOOP: "loop",
    FADE_OUT: "progress-fade",
    FLASH: "flash",
    FLASH_DANGER: "flash-danger",
}

export class ProgressBar extends React.PureComponent<ProgressBarProps> {

    // By default Progress Bar will be normal progress bar not static
    static defaultProps = {
        type:ProgressBarType.NORMAL
    }

    render() {
        const {
               value,
               max,
               status,
               type,
               labeled,
               style,
               className,
               animation
            } = this.props;

        // Label style for labled progress bar
        const labelStyle = { display: "block"}

        let Tag: any;
        let labeledClassName;
        let animationClasses;

        if (labeled){
            labeledClassName = 'labeled'
        }

        if (animation){
            animationClasses = animation.join(' ')
        }

        Tag="div"

        return (
            <Tag
                className={classNames([
                    type,
                    status,
                    labeledClassName,
                    animationClasses,
                    className, // prettier

                ])}

                style={style}
            >


                {/* Render normal progress bar if type is normal */}
                { type == ProgressBarType.NORMAL &&
                    <progress max={max} value={value}> </progress>
                }

                {/* Render static progress bar if type is static */}
                { type == ProgressBarType.STATIC &&
                    <Tag class="progress-meter" data-value={value}></Tag>
                }

                {/* If classname is labeled render label after progres bar */}
                {labeled  &&
                    <span style={labelStyle}> {value}% </span>
                }

            </Tag>
        );
    }
}
