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
import {Icon} from "../../icon";
import {Input} from "../input/Input";
import "./InputCounter.css";

type InputCounterProps = {
    className?: string;
    maxValue?: number;
    minValue?: number;
    defaultValue?: number;
    errMsg?: string;
    width?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputCounterState = {
    value: number;
    errorMsg: string;
};

export class InputCounter extends React.PureComponent<InputCounterProps, InputCounterState> {
    public static defaultProps: Partial<InputCounterProps> = {
        minValue: Number.MIN_SAFE_INTEGER,
        maxValue: Number.MAX_SAFE_INTEGER,
        errMsg: "Value should be",
        width: "6rem",
    };
    constructor(props: any) {
        super(props);

        //Default Value should be >= to minValue
        let defaultValue = isNaN(props.defaultValue) ? 0 : Math.max(props.defaultValue, props.minValue);
        //Default Value should be <= to minValue
        defaultValue = Math.min(defaultValue, props.maxValue);
        this.state = {
            value: defaultValue,
            errorMsg: "",
        };
    }

    private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(parseInt(evt.target.value))) {
            this.setState({
                value: isNaN(this.props.minValue!) ? 0 : Math.max(this.props.defaultValue, this.props.minValue!),
            });
        } else if (parseInt(evt.target.value) > this.props.maxValue!) {
            let maxValueError = this.props.errMsg + " <= " + this.props.maxValue;
            this.setState({errorMsg: maxValueError});
            this.setState({value: parseInt(evt.target.value)});
        } else if (parseInt(evt.target.value) < this.props.minValue!) {
            let minValueError = this.props.errMsg + " >= " + this.props.minValue;
            this.setState({errorMsg: minValueError});
            this.setState({value: parseInt(evt.target.value)});
        } else {
            this.setState({value: parseInt(evt.target.value)});
            this.setState({errorMsg: ""});
        }
        const {onChange} = this.props;
        if (onChange) onChange(evt);
    };

    private handleIncrement() {
        if (this.state.value < this.props.maxValue!) {
            this.setState({value: this.state.value + 1});
        } else {
            let maxValueError = this.props.errMsg + " <= " + this.props.maxValue;
            this.setState({errorMsg: maxValueError});
        }
    }

    private handleDecrement() {
        if (this.state.value > this.props.minValue!) {
            this.setState({value: this.state.value - 1});
        } else {
            let minValueError = this.props.errMsg + " > " + this.props.minValue;
            this.setState({errorMsg: minValueError});
        }
    }

    render() {
        const {width, maxValue, minValue, defaultValue, onChange, errMsg} = this.props;
        return (
            <div className="clr-form" style={{width: width}}>
                <div className="ic-flex">
                    <div className="ic-div">
                        <input
                            className="ic-input"
                            name="counter"
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className="ic-div">
                        <Icon className="ic-icon" shape="plus" onClick={this.handleIncrement.bind(this)} />
                        <br />
                        <Icon className="ic-icon" shape="minus" onClick={this.handleDecrement.bind(this)} />
                    </div>
                </div>
                <div>
                    <label>{this.state.errorMsg}</label>
                </div>
            </div>
        );
    }
}
