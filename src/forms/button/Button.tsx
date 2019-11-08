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
import {ReactNode} from "react";
import {classNames} from "../../utils";
import {Icon, IconProps} from "../../icon";

export type ButtonProps = {
    block?: boolean;
    className?: string;
    disabled?: boolean;
    flat?: boolean;
    inverse?: boolean;
    link?: boolean;
    onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
    onSubmit?: () => void;
    primary?: boolean;
    size?: ButtonSize;
    state?: ButtonState;
    children?: ReactNode | ReactNode[];
    icon?: IconProps;
    defaultBtn?: boolean;
    show?: boolean;
    type?: string;
    dataqa?: string;
};

export enum ButtonState {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    DANGER = "danger",
}

export enum ButtonSize {
    SMALL = "sm",
}

// TODO: add loading support

export class Button extends React.PureComponent<ButtonProps> {
    static defaultProps = {
        defaultBtn: true,
        show: true,
    };

    private static getClassNames(props: ButtonProps): (string | false | undefined)[] {
        return [
            props.defaultBtn && "btn",
            props.defaultBtn && props.icon && "btn-icon",
            props.className,
            ...["block", "flat", "inverse", "link", "primary"].map(field => {
                const value = (props as any)[field];
                if (typeof value === "boolean" && value) return `btn-${field}`;
                return undefined;
            }),
            ...["size", "state"].map(field => {
                const value = (props as any)[field];
                if (typeof value !== "undefined" && value !== null) return `btn-${value}`;
                return undefined;
            }),
        ];
    }

    render() {
        const {disabled, children, onClick, onSubmit, icon, show, type} = this.props;
        return show ? (
            <button
                disabled={disabled}
                className={classNames(Button.getClassNames(this.props))}
                data-qa={this.props.dataqa}
                onClick={onClick}
                onSubmit={onSubmit}
                type={type}
            >
                {icon && <Icon {...icon} />}
                {children}
            </button>
        ) : null;
    }
}
