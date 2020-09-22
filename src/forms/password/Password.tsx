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
import {ReactNode} from "react";
import {Icon} from "../../icon";
import {Button} from "../button";

type PasswordProps = {
    className?: string;
    style?: any;
    type?: string;
    disabled?: boolean;
    helperText?: ReactNode;
    errorHelperText?: string; // shown when state isError is true
    placeholder?: string;
    label?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (evt: React.FocusEvent<HTMLInputElement>) => void;
    name: string;
    id?: string;
    value?: string;
    defaultValue?: string;
    maxPasswordLength?: number;
    minPasswordLength?: number;
    required?: boolean; // auto-check on blur if there's a value
    error?: boolean; // force error state of component
    unmask?: boolean; // if true renders eye icon to hide/show or mask/unmask password
    pattern?: string; // specifies a regular expression that element's value is checked against
    dataqa?: string; //quality engineering testing field
};

type PasswordState = {
    show: boolean;
    type: string;
    value: any;
};

export class Password extends React.PureComponent<PasswordProps, PasswordState> {
    static defaultProps = {
        unmask: true,
    };

    state: PasswordState = {
        show: false,
        type: "password",
        value: null,
    };

    private showHidePassword = () => {
        this.setState(prevState => ({
            show: !prevState.show,
            type: !prevState.show ? "text" : "password",
        }));
    };

    private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {onChange} = this.props;

        this.setState({value: evt.target.value});
        onChange && onChange(evt);
    };

    private static renderHelperText(helperText: ReactNode): ReactNode {
        return <span className="clr-subtext ng-star-inserted">{helperText}</span>;
    }

    private static renderLabel(label: string) {
        return <label className="clr-control-label clr-col-12 clr-col-md-2">{label}</label>;
    }

    render() {
        const {
            className, //prettier
            disabled,
            helperText,
            label,
            value,
            defaultValue,
            errorHelperText,
            error,
            style,
            name,
            required,
            id,
            maxPasswordLength,
            minPasswordLength,
            placeholder,
            unmask,
            pattern,
            dataqa,
        } = this.props;

        const {show, type} = this.state;

        let classNames = ["clr-control-container", error && "clr-error", label && "clr-col-md-10 clr-col-12"];

        if (disabled) classNames.push("clr-form-control-disabled");

        return (
            <div className="clr-form clr-form-horizontal ng-pristine ng-valid ng-touched">
                <div className={utils.classNames(["clr-form-control", label && "clr-row"])}>
                    {label && Password.renderLabel(label)}
                    <div className={utils.classNames(classNames)} style={{width: "100%"}}>
                        <div className="clr-input-wrapper">
                            <div className={utils.classNames(["clr-input-group", className])} style={style}>
                                <input
                                    maxLength={maxPasswordLength}
                                    minLength={minPasswordLength}
                                    name={name}
                                    defaultValue={defaultValue}
                                    value={value}
                                    placeholder={placeholder}
                                    required={required}
                                    type={type}
                                    disabled={disabled}
                                    style={{width: "95%"}}
                                    className="clr-input ng-pristine ng-invalid ng-touched"
                                    id={id}
                                    pattern={pattern}
                                    data-qa={dataqa}
                                    onChange={this.handleChange}
                                />

                                {unmask && (
                                    <Button
                                        defaultBtn={false}
                                        className="clr-input-group-icon-action ng-star-inserted"
                                        onClick={this.showHidePassword}
                                        icon={{shape: show ? "eye" : "eye-hide"}}
                                    >
                                        <span className="is-off-screen">Show</span>
                                    </Button>
                                )}
                                <Icon className="clr-validate-icon ng-star-inserted" shape="exclamation-circle" />
                            </div>
                            {error
                                ? errorHelperText && Password.renderHelperText(errorHelperText)
                                : helperText && Password.renderHelperText(helperText)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
