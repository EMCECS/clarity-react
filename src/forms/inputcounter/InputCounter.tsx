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

type InputCounterProps = {
    className?: string;
    maxValue?: number;
    minValue?: number;
    defaultValue?: number;
    name?: string;
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
    };
    constructor(props: any) {
        super(props);

        let defaultValue = isNaN(props.defaultValue) ? 0 : Math.max(props.defaultValue, props.minValue);
        this.state = {
            value: defaultValue,
            errorMsg: "",
        };
    }

    private getErrorMessage() {
        if (this.props.errMsg === undefined) {
            return "Value should be ";
        } else {
            return this.props.errMsg;
        }
    }

    private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(parseInt(evt.target.value))) {
            this.setState({
                value: isNaN(this.props.minValue!) ? 0 : this.props.minValue!,
            });
        } else if (parseInt(evt.target.value) > this.props.maxValue!) {
            let maxValueError = this.getErrorMessage() + " <= " + this.props.maxValue;
            this.setState({errorMsg: maxValueError});
            this.setState({value: parseInt(evt.target.value)});
        } else if (parseInt(evt.target.value) < this.props.minValue!) {
            let minValueError = this.getErrorMessage() + " >= " + this.props.minValue;
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
        if (this.props.maxValue === undefined) {
            this.setState({value: this.state.value + 1});
        } else if (this.state.value < this.props.maxValue!) {
            this.setState({value: this.state.value + 1});
        } else {
            let maxValueError = this.getErrorMessage() + " <= " + this.props.maxValue;
            this.setState({errorMsg: maxValueError});
        }
    }

    private handleDecrement() {
        if (this.props.minValue === undefined) {
            this.setState({value: this.state.value - 1});
        } else if (this.state.value > this.props.minValue!) {
            this.setState({value: this.state.value - 1});
        } else {
            let minValueError = this.getErrorMessage() + " >= " + this.props.minValue;
            this.setState({errorMsg: minValueError});
        }
    }

    render() {
        const {maxValue, minValue, defaultValue, onChange, name, errMsg} = this.props;
        let {width} = this.props;
        if (width === undefined) {
            width = "6rem"; //This is defaultWidth
        }
        return (
            <div className="clr-form" style={{width: width}}>
                <div style={{display: "flex"}}>
                    <div style={{display: "inline-block", paddingRight: "0%", paddingLeft: "0%"}}>
                        <input
                            name="counter"
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                            style={{height: "52px", width: "100%", border: "1px solid #d3d3d3"}}
                        />
                    </div>
                    <div style={{display: "inline-block"}}>
                        <Icon
                            shape="plus"
                            style={{height: "26px", border: "1px solid #d3d3d3", paddingRight: "0%", paddingLeft: "0%"}}
                            onClick={this.handleIncrement.bind(this)}
                        />
                        <br />
                        <Icon
                            shape="minus"
                            style={{height: "26px", border: "1px solid #d3d3d3", paddingRight: "0%", paddingLeft: "0%"}}
                            onClick={this.handleDecrement.bind(this)}
                        />
                    </div>
                </div>
                <div>
                    <label>{this.state.errorMsg}</label>
                </div>
            </div>
        );
    }
}
