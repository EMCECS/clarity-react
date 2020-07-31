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
 * @param { id } id for toggle;
 * @param { label } label for toggle;
 * @param { name } name for toggle;
 * @param { ariaLabelledby } aria label;
 * @param { disabled } enable disable property;
 * @param { checked } is checked property;
 * @param { defaultChecked } default checked property;
 * @param { dataqa } quality engineering property
 */
type ToggleProps = {
    id?: string;
    label?: string;
    name?: string;
    ariaLabelledby?: string;
    disabled?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    dataqa?: string;
    onChange?: (newValue: boolean) => void;
    onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;
};

type ToggleState = {
    checked: boolean;
};

export class Toggle extends React.PureComponent<ToggleProps, ToggleState> {
    constructor(props: ToggleProps) {
        super(props);
        this.state = {checked: this.getValue()};
    }

    componentDidUpdate(prevProps: ToggleProps) {
        const {checked, defaultChecked} = this.props;

        if (checked !== prevProps.checked || defaultChecked !== prevProps.defaultChecked) {
            this.setState({checked: this.getValue()});
        }
    }

    getValue(): boolean {
        const {checked, defaultChecked} = this.props;
        let value: boolean = false;
        if (checked) {
            value = checked;
        } else if (defaultChecked) {
            value = defaultChecked;
        }
        return value;
    }

    handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const hardValue = this.props.checked !== undefined;
        const newValue = evt.target.checked;
        if (hardValue) {
            evt.preventDefault();
            if (this.props.onChange) this.props.onChange(newValue);
        } else {
            this.setState({checked: newValue});
        }
    }

    render() {
        const {label, name, ariaLabelledby, disabled, onClick} = this.props;
        const {checked} = this.state;
        const setId = this.props.id;
        return (
            <UID>
                {id => (
                    <div className={ClassNames.CLR_TOGGLE_WRAPPER}>
                        <input
                            type="checkbox" //prettier
                            id={setId ? setId : id}
                            name={name}
                            checked={checked !== false}
                            onChange={this.handleChange.bind(this)}
                            className={ClassNames.CLR_TOGGLE}
                            aria-labelledby={ariaLabelledby}
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
