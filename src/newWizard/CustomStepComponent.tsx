/**
 * Copyright (c) 2020 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import * as React from "react";
import {Input} from "../forms/input/Input";
import {Button} from "../forms/button";

type CustomStepComponentState = {
    value: string;
};

type CustomStepComponentProps = {
    wizardRef: any;
    stepId: number;
};

export class CustomStepComponent extends React.PureComponent<CustomStepComponentProps, CustomStepComponentState> {
    state: CustomStepComponentState = {
        value: " ",
    };

    resetComponent() {
        return new Promise((resolve, reject) => {
            this.setState({value: " "});
            resolve();
        });
    }

    render() {
        const {value} = this.state;
        const {wizardRef, stepId} = this.props;
        return (
            <div style={{width: "166px"}}>
                Enter something :
                <Input name="somevalue" value={value} onChange={this.handleChange} />
                <br />
                <Button
                    onClick={() => {
                        wizardRef.current!.checkStepValidity(stepId);
                    }}
                >
                    {" "}
                    Finish Step{" "}
                </Button>
            </div>
        );
    }

    private handleChange = (evt: React.ChangeEvent<any>) => {
        const value = evt.target.value;
        this.setState({value: value});
    };
}
