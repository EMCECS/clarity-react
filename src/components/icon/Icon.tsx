import * as React from "react";

export interface IconProps {
    shape: string;
    className: string;
    dir?: Direction;
}

export default class Icon extends React.PureComponent<IconProps> {
    constructor(props: IconProps) {
        super(props);
    }
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
