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

/**
 * RadioButton Props
 * @param {checked} if true checked else false
 * @param {className} css property
 * @param {disabled} property to enable disable checkbox
 * @param {label} label of checkbox
 * @param {labelclass} label css style
 * @param {name} name of checkbox
 * @param {value} value of radio button
 * @param {children} nested radio button or group
 * @param {style} css style
 * @param {inButtonGroup} button group property
 * @param {dataqa} quality engineering testing field
 */
type RadioButtonProps = {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    label?: any;
    labelClass?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    id?: string;
    value: any;
    children?: ReactNode;
    style?: any;
    inButtonGroup?: boolean;
    dataqa?: string;
};

export class RadioButton extends React.PureComponent<RadioButtonProps> {
    static defaultProps = {
        inButtonGroup: false,
        disabled: false,
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
            dataqa,
        } = this.props;
        const labelClassNames = utils.classNames([
            !inButtonGroup && "clr-control-label", // prettier hack
            labelClass,
        ]);
        return (
            <div className={utils.classNames(RadioButton.getClassNames(this.props))} data-qa={dataqa}>
                <input
                    className="radio"
                    name={name}
                    id={id}
                    value={value}
                    disabled={disabled}
                    type="radio"
                    onChange={onChange}
                    style={style}
                    checked={checked}
                />
                <label className={labelClassNames} htmlFor={id}>
                    {label && label}
                </label>
                {children}
            </div>
        );
    }
}
