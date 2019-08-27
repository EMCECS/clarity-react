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

export type CheckboxValue = boolean | "indeterminate";

type CheckBoxProps = {
    label?: string;
    name?: string;
    id?: string;
    checked?: CheckboxValue;
    defaultChecked?: CheckboxValue;
    value?: CheckboxValue;
    defaultValue?: CheckboxValue;
    ariaLabelledby?: string;
    ariaLabel?: string;
    disabled?: boolean;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;
};

type CheckBoxState = {
    value: CheckboxValue;
};

export class CheckBox extends React.PureComponent<CheckBoxProps, CheckBoxState> {
    private myRef = React.createRef<HTMLInputElement>();

    constructor(props: CheckBoxProps) {
        super(props);
        this.state = {value: this.getValue()};
    }

    getValue = (props = this.props, state = this.state): CheckboxValue => {
        const valueProp = props.checked !== undefined ? props.checked : props.value;
        const defaultValueProp = props.defaultChecked !== undefined ? props.defaultChecked : props.defaultValue;
        return valueProp !== undefined ? valueProp : (state ? state.value : defaultValueProp) || false;
    };

    state: {
        value: CheckboxValue;
    } = {
        value: this.getValue(this.props, undefined),
    };

    get value(): CheckboxValue {
        return this.getValue();
    }

    componentDidMount() {
        (this.myRef.current as HTMLInputElement).indeterminate = this.getValue() === "indeterminate";
    }

    componentDidUpdate() {
        (this.myRef.current as HTMLInputElement).indeterminate = this.getValue() === "indeterminate";
    }

    handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const hardValue = this.props.value !== undefined || this.props.checked !== undefined;

        const checked = evt.target.checked;
        const indeterminate = evt.target.indeterminate;
        const newValue = indeterminate ? "indeterminate" : checked;

        if (hardValue) {
            evt.preventDefault();
            if (this.props.onChange) this.props.onChange(evt);
        } else {
            this.setState({value: newValue});
        }
    }

    render() {
        const {
            label, //prettier
            name,
            ariaLabelledby,
            ariaLabel,
            disabled,
            onClick,
        } = this.props;
        const setId = this.props.id;
        const value = this.value;
        return (
            <UID>
                {id => (
                    <div className={ClassNames.CLR_CHECKBOX_WRAPPER}>
                        <input
                            type="checkbox" // prettier
                            id={setId ? setId : id}
                            name={name}
                            ref={this.myRef}
                            checked={value !== false}
                            onChange={this.handleChange.bind(this)}
                            className={ClassNames.CLR_CHECKBOX}
                            aria-labelledby={ariaLabelledby}
                            aria-label={ariaLabel}
                            disabled={disabled}
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
