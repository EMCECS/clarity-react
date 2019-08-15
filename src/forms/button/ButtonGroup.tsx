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
import {RadioButton} from "../radio";
import {classNames} from "../../utils";

type ButtonGroupProps = {
    className?: string;
    children?: React.ReactNode[];
    style?: any;
    defaultValue?: any;
    label?: string;
    disabled?: boolean;
    isRadio?: boolean;
    name: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const initialState = {value: null};

type ButtonGroupState = Readonly<typeof initialState>;

export class ButtonGroup extends React.PureComponent<ButtonGroupProps> {
    readonly state: ButtonGroupState = initialState;

    constructor(props: ButtonGroupProps) {
        super(props);
        const {defaultValue} = props;
        if (defaultValue) this.state = {value: defaultValue};
    }

    private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: evt.target.value});
        const {onChange} = this.props;
        if (onChange) onChange(evt);
    };

    private renderChildren(): React.ReactNode[] {
        const {value} = this.state;
        const {children, name} = this.props;
        if (typeof children === "undefined" || children === null) {
            return [];
        }
        return React.Children.map(children, (child: React.ReactNode, index: number) => {
            const childEl = child as React.ReactElement;
            if (childEl.type === RadioButton) {
                return React.cloneElement(childEl as React.ReactElement<any>, {
                    checked: value === childEl.props.value,
                    id: name + "-" + index,
                    name: name,
                    onChange: this.handleChange,
                    inButtonGroup: true,
                });
            }
            return child;
        });
    }

    render() {
        const {className, style} = this.props;
        return (
            <div className={classNames(["btn-group", className])} style={style}>
                {this.renderChildren()}
            </div>
        );
    }
}
