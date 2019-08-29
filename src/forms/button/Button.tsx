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
    submit?: boolean;
    children?: ReactNode | ReactNode[];
    icon?: IconProps;
    defaultBtn?: boolean;
    show?: boolean;
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
    private myRef = React.createRef<HTMLButtonElement>();
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

    disabled(value: boolean) {
        this.myRef.current!.disabled = value;
    }

    show(value: boolean) {
        if (value == true) {
            this.myRef.current!.style.display = "";
        } else {
            this.myRef.current!.style.display = "none";
        }
    }

    render() {
        const {disabled, children, onClick, onSubmit, submit, icon, show} = this.props;
        return show ? (
            <button
                ref={this.myRef}
                disabled={disabled}
                className={classNames(Button.getClassNames(this.props))}
                onClick={onClick}
                onSubmit={onSubmit}
                type={submit ? "submit" : undefined}
            >
                {icon && <Icon {...icon} />}
                {children}
            </button>
        ) : null;
    }
}
