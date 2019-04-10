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
import {UID} from "react-uid";
import {Icon} from "../../icon";
import {classNames} from "../../utils";
import {ClassNames} from "../../layout/nav";

type SelectOption = {
    value?: string;
    selected?: boolean;
};

export const SelectOption: React.FunctionComponent<SelectOption> = ({value, selected, children}) => {
    return (
        <option value={value} selected={selected}>
            {children}
        </option>
    );
};

type SelectProps = {
    label?: string;
    id?: string;
    value?: any;
    required?: boolean; // auto-check on blur if there's a value
    error?: boolean; // force error state of component
    defaultHelperText?: string; // shown when state isError is false
    errorHelperText?: string; // shown when state isError is true
    onChange?: (evt: React.ChangeEvent<HTMLElement>) => void;
};

type SelectState = {
    isError?: boolean;
};

export class Select extends React.PureComponent<SelectProps, SelectState> {
    constructor(props: SelectProps) {
        super(props);
        this.state = {
            isError: this.props.error,
        };
    }
    handleBlur(evt: React.FocusEvent<HTMLSelectElement>) {
        const {required} = this.props;
        if (required && evt.target.value === "") {
            this.setState({isError: true});
        } else {
            this.setState({isError: false});
        }
    }
    handleChange(evt: React.ChangeEvent<HTMLSelectElement>) {
        const {onChange} = this.props;
        if (evt.target.value !== "") {
            this.setState({isError: false});
        }
        if (onChange) onChange(evt);
    }
    render() {
        const {label, value, defaultHelperText, errorHelperText, children} = this.props;
        const {isError} = this.state;
        const setId = this.props.id;
        return (
            <UID>
                {id => (
                    <div className="clr-form-control">
                        {label && (
                            <label htmlFor={setId ? setId : id} className="clr-control-label">
                                {label}
                            </label>
                        )}
                        <div
                            className={classNames([
                                "clr-control-container", //prettier
                                isError && "clr-error",
                            ])}
                        >
                            <div className="clr-select-wrapper">
                                <select
                                    value={value}
                                    id={setId ? setId : id}
                                    onChange={this.handleChange.bind(this)}
                                    onBlur={this.handleBlur.bind(this)}
                                    className="clr-select"
                                >
                                    <option selected disabled hidden style={{display: "none"}} value="" />
                                    {children}
                                </select>
                                <Icon className="clr-validate-icon" shape="exclamation-circle" />
                            </div>
                            {isError ? (
                                <span className="clr-subtext">{errorHelperText}</span>
                            ) : (
                                defaultHelperText && <span className="clr-subtext">{defaultHelperText}</span>
                            )}
                        </div>
                    </div>
                )}
            </UID>
        );
    }
}
