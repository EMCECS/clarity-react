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

type RadioButtonProps = {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    label?: string;
    labelClass?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    id?: string;
    value: any;
    children?: ReactNode;
    style?: any;
    inButtonGroup?: boolean;
};

export class RadioButton extends React.PureComponent<RadioButtonProps> {
    static defaultProps = {
        inButtonGroup: false,
    };

    key: string | undefined;

    constructor(props: RadioButtonProps) {
        super(props);
        this.key = props.id;
    }

    private static getClassNames(props: RadioButtonProps): (string | undefined)[] {
        return [
            props.className,
            props.inButtonGroup ? "radio btn" : "clr-radio-wrapper",
            props.disabled ? "clr-form-control-disabled" : undefined,
        ];
    }

    render() {
        const {
            checked, //prettier hack
            children,
            disabled,
            label,
            labelClass,
            onChange,
            name,
            id,
            value,
            inButtonGroup,
            style,
        } = this.props;
        const labelClassNames = utils.classNames([
            !inButtonGroup && "clr-control-label", // prettier hack
            labelClass,
        ]);
        return (
            <div className={utils.classNames(RadioButton.getClassNames(this.props))}>
                <input
                    className="radio"
                    name={name}
                    id={id}
                    defaultChecked={checked}
                    value={value}
                    disabled={disabled}
                    type="radio"
                    onChange={onChange}
                    style={style}
                />
                {label && (
                    <label className={labelClassNames} htmlFor={id}>
                        {label}
                    </label>
                )}
                {children}
            </div>
        );
    }
}
