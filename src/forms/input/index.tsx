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
import * as utils from '../../utils';
import {ReactNode} from "react";

type InputProps = {
    className?: string
    type?: string
    disabled?: boolean
    helperText?: ReactNode
    label?: string
    type?: string
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    name: string
    size?: number
    style?: any
};

const initialState = {value: null};

type InputState = Readonly<typeof initialState>;

export class Input extends React.PureComponent<InputProps> {
    readonly state: InputState = initialState;

    private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: evt.target.value});
        const {onChange} = this.props;
        if (onChange) onChange(evt);
    }

    private static renderHelperText(helperText: ReactNode): ReactNode {
        return (
            <span className="clr-subtext">{helperText}</span>
        );
    }

    private static renderLabel(label: string) {
        return (<label className="clr-control-label">{label}</label>);
    }

    render() {
        const {
            className,
            disabled,
            helperText,
            label,
            placeholder,
            size,
            type,
            style
        } = this.props;
        let classNames = ["clr-control-container", className];
        let styled: any;
        if (disabled)
            classNames.push("clr-form-control-disabled");
        styled = {
             ...style
        }
        return (
            <div className="clr-form-control">
                {label && Input.renderLabel(label)}
                <div className={utils.classNames(classNames)}>
                    <div className="clr-input-wrapper">
                        <input type={type || "text"}
                               id={name}
                               size={size}
                               disabled={disabled}
                               className="clr-input"
                               placeholder={placeholder}
                               onChange={this.handleChange}
                               style = {styled}
                        />
                    </div>
                    {helperText && Input.renderHelperText(helperText)}
                </div>
            </div>
        );
    }
}
