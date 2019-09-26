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
import {Input} from "../forms/input/Input";

type CustomStepComponentState = {
    value: string;
};

export class CustomStepComponent extends React.PureComponent<any, CustomStepComponentState> {
    state: CustomStepComponentState = {
        value: " ",
    };

    resetComponent() {
        this.setState({value: " "});
    }

    private handleChnage = (evt: React.ChangeEvent<any>) => {
        const value = evt.target.value;
        this.setState({value: value});
    };

    render() {
        const {value} = this.state;
        return (
            <div style={{width: "166px"}}>
                <Input name="somevalue" value={value} onChange={this.handleChnage} />
            </div>
        );
    }
}
