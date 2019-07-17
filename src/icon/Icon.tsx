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
import "@clr/icons/clr-icons.min.css";
import "@webcomponents/custom-elements/custom-elements.min.js";
import "@clr/icons/clr-icons.min.js";

export interface IconProps {
    shape: string;
    size?: number;
    className?: string;
    style?: any;
    dir?: Direction;
    onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
}

export class Icon extends React.PureComponent<IconProps> {
    render() {
        return React.createElement("clr-icon", {
            class: this.props.className,
            ...this.props,
        });
    }
}

export enum Direction {
    LEFT = "left",
    RIGHT = "right",
    DOWN = "down",
}
