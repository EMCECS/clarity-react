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
    isBoxed?: boolean;
    required?: boolean; // auto-check on blur if there's a value
    error?: boolean; // force error state of component
    defaultHelperText?: string; // shown when state isError is false
    errorHelperText?: string; // shown when state isError is true
    onBlur?: (evt: React.FocusEvent<HTMLSelectElement>) => void;
    onChange?: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    style?: any;
    width?: string;
    showDefaultSelect?: boolean;
    name?: string;
    dataqa?: string;
};

export class Select extends React.PureComponent<SelectProps> {
    constructor(props: SelectProps) {
        super(props);
    }

    private buildSelect(className: any, setId: string) {
        const {
            value, // prettier
            onBlur,
            onChange,
            error,
            children,
            showDefaultSelect,
            name,
            required,
            id,
        } = this.props;

        return (
            <select
                value={value} // prettier
                id={setId || id}
                name={name}
                required={required}
                onChange={onChange}
                onBlur={onBlur}
                className={className}
                style={{width: error ? "75%" : "100%"}}
            >
                {!showDefaultSelect && <option selected disabled hidden style={{display: "none"}} value="" />}
                {children}
            </select>
        );
    }

    render() {
        const {
            label, // prettier
            defaultHelperText,
            errorHelperText,
            isBoxed,
            error,
            className,
            style,
            width,
            id,
            dataqa,
        } = this.props;

        return (
            <UID>
                {setId =>
                    isBoxed ? (
                        <div className="form-group" style={{width: width}} data-qa={dataqa}>
                            <label>{label}</label>
                            <div className={classNames(["select", className])} style={{width: width, ...style}}>
                                {this.buildSelect(className, setId)}
                            </div>
                        </div>
                    ) : (
                        <div className="clr-form-control" data-qa={dataqa}>
                            {label && (
                                <label htmlFor={setId || id} className="clr-control-label">
                                    {label}
                                </label>
                            )}
                            <div
                                style={{width: "100%"}}
                                className={classNames([
                                    "clr-control-container", //prettier
                                    error && "clr-error",
                                ])}
                            >
                                <div
                                    className={classNames(["clr-select-wrapper", className])}
                                    style={{width: width, ...style}}
                                >
                                    {this.buildSelect(classNames(["clr-select", className]), setId)}

                                    <Icon className="clr-validate-icon" shape="exclamation-circle" />
                                </div>
                                {error ? (
                                    <span className="clr-subtext">{errorHelperText}</span>
                                ) : (
                                    defaultHelperText && <span className="clr-subtext">{defaultHelperText}</span>
                                )}
                            </div>
                        </div>
                    )
                }
            </UID>
        );
    }
}
