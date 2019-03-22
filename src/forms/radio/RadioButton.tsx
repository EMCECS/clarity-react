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

type RadioButtonProps = {
    checked?: boolean
    className?: string
    disabled?: boolean
    label: string
    labelClass?: string
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
    name?: string
    id?: string
    value: any
    children?: ReactNode
};

export class RadioButton extends React.PureComponent<RadioButtonProps> {
    type: string = "RadioButton";
    key: string | undefined;

    constructor(props: RadioButtonProps) {
        super(props);
        this.key = props.id;
    }

    render() {
        const {
            checked,
            children,
            className,
            disabled,
            label,
            labelClass,
            onChange,
            name,
            id,
            value
        } = this.props;
        let classNames = ["clr-radio-wrapper", className];
        if (disabled)
            classNames.push("clr-form-control-disabled");

        const labelClassNames =
            utils.classNames(["clr-control-label", labelClass]);
        return (
            <div className={utils.classNames(classNames)}>
                <input className="radio" name={name}
                       id={id}
                       defaultChecked={checked}
                       value={value}
                       disabled={disabled}
                       type="radio"
                       onChange={onChange}
                /><label className={labelClassNames} htmlFor={id}>{label}</label>
                {children}
            </div>
        );
    }
}