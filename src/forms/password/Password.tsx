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
    showPassword?: boolean;
};

type PasswordState = {
    show: boolean;
    type: string;
};
export class Password extends React.PureComponent<PasswordProps, PasswordState> {
    static defaultProps = {
        showPassword: true,
    };

    state: PasswordState = {
        show: false,
        type: "password",
    };

    private showHidePassword = () => {
        this.setState(prevState => ({
            show: !prevState.show,
            type: !prevState.show ? "text" : "password",
        }));
    };

    private static renderHelperText(helperText: ReactNode): ReactNode {
        return <span className="clr-subtext">{helperText}</span>;
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
            showPassword,
        } = this.props;

        const {show, type} = this.state;

        let classNames = ["clr-control-container clr-col-md-10 clr-col-12", error && "clr-error", className];

        return (
            <div className="clr-form-control clr-row">
                {label && Password.renderLabel(label)}
                <div className={utils.classNames(classNames)} style={{width: "100%"}}>
                    <div className="clr-input-wrapper">
                        <div className="clr-input-group">
                            <input
                                maxLength={maxPasswordLength}
                                minLength={minPasswordLength}
                                name={name}
                                value={value}
                                placeholder={placeholder}
                                required={required}
                                type={type}
                                aria-describedby="clr-form-control-8-error"
                                className="clr-input ng-pristine ng-invalid ng-touched"
                                id={id}
                                style={style}
                            />

                            {showPassword && (
                                <Button
                                    link={true}
                                    className="clr-input-group-icon-action"
                                    onClick={this.showHidePassword}
                                    icon={{shape: show ? "eye" : "eye-hide"}}
                                >
                                    <span className="is-off-screen" id="_clr_icon_15">
                                        Show
                                    </span>
                                </Button>
                            )}
                            <Icon className="clr-validate-icon" shape="exclamation-circle" />
                        </div>
                        {error
                            ? errorHelperText && Password.renderHelperText(errorHelperText)
                            : helperText && Password.renderHelperText(helperText)}
                    </div>
                </div>
            </div>
        );
    }
}
