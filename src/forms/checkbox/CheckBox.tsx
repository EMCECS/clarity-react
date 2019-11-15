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
import {ClassNames} from "./ClassNames";

/**
 * CheckBox Props
 * @param {label} label of checkbox
 * @param {name} name of checkbox
 * @param {id} id of checkbox
 * @param {checked} if true checked else false
 * @param {defaultChecked} default checked value
 * @param {ariaLabel} arial label
 * @param {ariaLabelledby} arial label details
 * @param {disabled} property to enable disable checkbox
 * @param {className} css property
 * @param {dataqa} quality engineering testing field
 */
type CheckBoxProps = {
    label?: string;
    name?: string;
    id?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    ariaLabelledby?: string;
    ariaLabel?: string;
    disabled?: boolean;
    className?: string;
    dataqa?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;
};

type CheckBoxState = {
    value: boolean;
};

export class CheckBox extends React.PureComponent<CheckBoxProps, CheckBoxState> {
    private myRef = React.createRef<HTMLInputElement>();

    private handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const newValue = !this.state.value;
        this.setState({
            value: newValue,
        });
    }

    constructor(props: CheckBoxProps) {
        super(props);
        this.state = {value: false};
    }

    render() {
        const {
            label, //prettier
            name,
            ariaLabelledby,
            ariaLabel,
            disabled,
            onClick,
            checked,
            onChange,
            className,
            dataqa,
        } = this.props;
        const setId = this.props.id;
        const {value} = this.state;
        return (
            <UID>
                {id => (
                    <div className={ClassNames.CLR_CHECKBOX_WRAPPER}>
                        <input
                            type="checkbox" // prettier
                            id={setId ? setId : id}
                            name={name}
                            ref={this.myRef}
                            checked={checked !== undefined ? checked : value}
                            onChange={onChange !== undefined ? onChange : this.handleChange.bind(this)}
                            className={ClassNames.CLR_CHECKBOX}
                            aria-labelledby={ariaLabelledby}
                            aria-label={ariaLabel}
                            disabled={disabled}
                            data-qa={dataqa}
                            onClick={onClick}
                        />
                        <label className={ClassNames.CLR_CONTROL_LABEL} htmlFor={setId ? setId : id}>
                            {label}
                        </label>
                    </div>
                )}
            </UID>
        );
    }
}
