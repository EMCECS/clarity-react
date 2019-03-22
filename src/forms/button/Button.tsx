/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import * as React from 'react';
import {ReactElement, ReactNode} from 'react';
import * as utils from '../../utils';
import {Icon} from "../../icon";

type ButtonProps = {
    block?: boolean
    className?: string
    disabled?: boolean
    flat?: boolean
    inverse?: boolean
    link?: boolean
    onClick?: () => void
    onSubmit?: () => void
    primary?: boolean
    size?: ButtonSize
    state?: ButtonState
    submit?: boolean
    children: ReactNode | ReactNode[]
};

export enum ButtonState {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    DANGER = "danger"
}

export enum ButtonSize {
    SMALL = "sm"
}

// TODO: add loading support

export class Button extends React.PureComponent<ButtonProps> {

    private static getClassNames(props: ButtonProps, icon: boolean): (string | undefined)[] {
        const iconClass = icon ? "btn-icon" : undefined;
        return [
            "btn",
            iconClass,
            props.className,
            ...[
                "block",
                "flat",
                "inverse",
                "link",
                "primary"
            ].map(field => {
                const value = (props as any)[field];
                if (typeof value === "boolean" && value)
                    return `btn-${field}`;
                return undefined;
            }),
            ...[
                "size",
                "state",
            ].map(field => {
                const value = (props as any)[field];
                if (typeof value !== "undefined" && value !== null)
                    return `btn-${value}`;
                return undefined;
            })
        ];
    }

    private static detectIcon(children: ReactNode | ReactNode[]): boolean {
        if (typeof children === "undefined" || children === null) {
            return false;
        }
        React.Children.forEach(children, child => {
            const childEl = child as ReactElement;
            if (childEl.type === Icon)
                return true;
            return undefined;
        });
        return false;
    }

    render() {
        const {
            disabled,
            children,
            onClick,
            onSubmit,
            submit,
        } = this.props;
        const icon = Button.detectIcon(children);
        const classNames = utils.classNames(Button.getClassNames(this.props, icon));
        return <button
            disabled={disabled}
            className={classNames}
            onClick={onClick}
            onSubmit={onSubmit}
            type={submit ? "submit" : undefined}
        >
            {children}
        </button>
    }
}