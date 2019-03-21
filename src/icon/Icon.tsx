import * as React from "react";
import "@clr/icons/clr-icons.min.css";
import "@webcomponents/custom-elements/custom-elements.min.js";
import "@clr/icons/clr-icons.min.js";

export interface IconProps {
    shape: string;
    size?: number;
    className?: string;
    dir?: Direction;
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
