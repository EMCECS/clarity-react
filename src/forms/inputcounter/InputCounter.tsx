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
import {Button} from "../button";
import {Input} from "../input/Input";

type InputCounterProps = {
    className?: string;
    maxValue: string;
    minValue: string;
    defaultValue?: string | "0";
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    style?: any;
};

type InputCounterState = {
    value: number;
    errorMsg: string;
};

export class InputCounter extends React.PureComponent<InputCounterProps, InputCounterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: parseInt(props.defaultValue),
            errorMsg: "",
        };
    }

    private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(parseInt(evt.target.value))) {
            this.setState({value: parseInt(this.props.minValue)});
        } else if (parseInt(evt.target.value) > parseInt(this.props.maxValue)) {
            let maxValueError = "Value should be < " + this.props.maxValue;
            this.setState({errorMsg: maxValueError});
            this.setState({value: parseInt(evt.target.value)});
        } else if (parseInt(evt.target.value) < parseInt(this.props.minValue)) {
            let minValueError = "Value should be > " + this.props.minValue;
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
        } else if (this.state.value < parseInt(this.props.maxValue)) {
            this.setState({value: this.state.value + 1});
        } else {
            let maxValueError = "Value should be < " + this.props.maxValue;
            this.setState({errorMsg: maxValueError});
        }
    }

    private handleDecrement() {
        if (this.props.minValue === undefined) {
            this.setState({value: this.state.value - 1});
        } else if (this.state.value > parseInt(this.props.minValue)) {
            this.setState({value: this.state.value - 1});
        } else {
            let minValueError = "Value should be > " + this.props.minValue;
            this.setState({errorMsg: minValueError});
        }
    }

    render() {
        const {
            className, //prettier
            maxValue,
            minValue,
            defaultValue,
            onChange,
            name,
            style,
        } = this.props;
        return (
            <div className="clr-form">
                <div className="clr-row" style={style}>
                    <div className="clr-col-md-2" style={{paddingRight: "0%"}}>
                        <input
                            name="counter"
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                            style={{height: "100%", width: "100%"}}
                        />
                    </div>
                    <div className="clr-col-md-3 " style={{paddingRight: "0%", paddingLeft: "0%"}}>
                        <div className="clr-col" style={{paddingRight: "0%", paddingLeft: "0%"}}>
                            <div className="clr-raw-md-6" style={{paddingRight: "0%", paddingLeft: "0%"}}>
                                <input
                                    type="button"
                                    name="increment"
                                    value="+"
                                    onClick={this.handleIncrement.bind(this)}
                                    style={{height: "100%", width: "10%", paddingRight: "0%", paddingLeft: "0%"}}
                                />
                            </div>
                            <div className="clr-raw-md-6" style={{paddingRight: "0%", paddingLeft: "0%"}}>
                                <input
                                    type="button"
                                    name="decrement"
                                    value="-"
                                    onClick={this.handleDecrement.bind(this)}
                                    style={{height: "100%", width: "10%", paddingRight: "0%", paddingLeft: "0%"}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clr-row" style={style}>
                    <label>{this.state.errorMsg} </label>
                </div>
            </div>
        );
    }
}
