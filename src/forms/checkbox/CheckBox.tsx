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

type CheckboxValue = boolean | "indeterminate";

type CheckBoxProps = {
    label?: string;
    name?: string;
    id?: string;
    checked?: CheckboxValue;
    defaultChecked?: CheckboxValue;
    ariaLabelledby?: string;
    disabled?: boolean;
    onChange?: (newValue: CheckboxValue) => void;
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

    getValue(): CheckboxValue {
        const {checked, defaultChecked} = this.props;
        const value = this.state ? this.state.value : undefined;
        if (value !== undefined) return value;
        return checked ? checked : defaultChecked ? defaultChecked : false;
    }

    componentDidMount() {
        (this.myRef.current as HTMLInputElement).indeterminate = this.getValue() === "indeterminate";
    }

    componentDidUpdate() {
        (this.myRef.current as HTMLInputElement).indeterminate = this.getValue() === "indeterminate";
    }

    handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const hardValue = this.props.checked !== undefined;
        const checked = evt.target.checked;
        const indeterminate = evt.target.indeterminate;
        const newValue = indeterminate ? "indeterminate" : checked;

        if (hardValue) {
            evt.preventDefault();
            if (this.props.onChange) this.props.onChange(newValue);
        } else {
            this.setState({value: newValue});
        }
    }

    render() {
        const {label, name, ariaLabelledby, disabled} = this.props;
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
                            checked={value !== false}
                            onChange={this.handleChange.bind(this)}
                            className={ClassNames.CLR_CHECKBOX}
                            aria-labelledby={ariaLabelledby}
                            disabled={disabled}
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
