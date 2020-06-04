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
import * as utils from "../../utils";
import {UID} from "react-uid";
import {ReactNode} from "react";
import {Icon} from "../../icon";

type InputProps = {
    className?: string;
    style?: any;
    type?: string;
    disabled?: boolean;
    helperText?: ReactNode;
    errorHelperText?: string; // shown when state isError is true
    label?: string;
    isBoxed?: boolean;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (evt: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyPress?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name: string;
    id?: string;
    value?: any;
    defaultValue?: any;
    size?: number;
    min?: number;
    max?: number;
    step?: any;
    required?: boolean; // auto-check on blur if there's a value
    error?: boolean; // force error state of component
    dataqa?: string; //quality engineering testing field
};

const initialState = {value: null};

type InputState = Readonly<typeof initialState>;

export class Input extends React.PureComponent<InputProps> {
    readonly state: InputState = initialState;

    private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: evt.target.value});
        const {onChange} = this.props;
        if (onChange) onChange(evt);
    };

    //prevents 'e' button click when input type is number
    private handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const {type, onKeyDown} = this.props;
        if (type === "number" && evt.key === "e") {
            evt.preventDefault();
        }
        onKeyDown && onKeyDown(evt);
    };

    private static renderHelperText(helperText: ReactNode): ReactNode {
        return <span className="clr-subtext">{helperText}</span>;
    }

    private static renderLabel(label: string) {
        return <label className="clr-control-label">{label}</label>;
    }

    private buildInput(className: any, uid: string) {
        const {
            style,
            disabled,
            value,
            defaultValue,
            placeholder,
            size,
            type,
            children,
            name,
            id,
            required,
            onBlur,
            onKeyPress,
            dataqa,
            min,
            max,
            step,
            error,
            errorHelperText,
            helperText,
        } = this.props;
        return (
            <React.Fragment>
                <input
                    type={type || "text"}
                    name={name}
                    id={id || uid}
                    value={value}
                    defaultValue={defaultValue}
                    size={size}
                    disabled={disabled}
                    className={className}
                    placeholder={placeholder}
                    data-qa={dataqa}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    onKeyPress={onKeyPress}
                    onBlur={onBlur}
                    style={style}
                    required={required}
                    min={min}
                    max={max}
                    step={step}
                />
                {children}
                <Icon className="clr-validate-icon" shape="exclamation-circle" />
                {error
                    ? errorHelperText && Input.renderHelperText(errorHelperText)
                    : helperText && Input.renderHelperText(helperText)}
            </React.Fragment>
        );
    }

    render() {
        const {
            className, //prettier
            disabled,
            label,
            isBoxed,
            error,
        } = this.props;
        let classNames = ["clr-control-container", error && "clr-error"];

        if (disabled) {
            classNames.push("clr-form-control-disabled");
        }

        return isBoxed ? (
            <UID>
                {uid => (
                    <div className="form-group">
                        <div className={utils.classNames(classNames)} style={{width: "100%"}}>
                            <label>{label}</label>
                            {this.buildInput(className, uid)}
                        </div>
                    </div>
                )}
            </UID>
        ) : (
            <UID>
                {uid => (
                    <div className="clr-form-control">
                        {label && Input.renderLabel(label)}
                        <div className={utils.classNames(classNames)} style={{width: "100%"}}>
                            <div className="clr-input-wrapper">
                                {this.buildInput(utils.classNames(["clr-input", className]), uid)}
                            </div>
                        </div>
                    </div>
                )}
            </UID>
        );
    }
}
