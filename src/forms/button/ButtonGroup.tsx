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

/**
 * @param {className} css stylke
 * @param {children} childern UI
 * @param {style} css style
 * @param {defaultValue} default value for button group
 * @param {selectedValue} selected value for button group
 * @param {label} name for group
 * @param {disabled} enable disable property
 * @param {isRadio} radio group property
 * @param {name} name for group
 * @param {dataqa} quality engineering testing field
 */
type ButtonGroupProps = {
    className?: string;
    children?: React.ReactNode[];
    style?: any;
    defaultValue?: any;
    selectedValue?: any;
    label?: string;
    disabled?: boolean;
    isRadio?: boolean;
    name: string;
    dataqa?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const initialState = {value: null};

type ButtonGroupState = Readonly<typeof initialState>;

export class ButtonGroup extends React.PureComponent<ButtonGroupProps> {
    readonly state: ButtonGroupState = initialState;

    constructor(props: ButtonGroupProps) {
        super(props);
        const {defaultValue, selectedValue} = props;
        this.state = {value: selectedValue ? selectedValue : defaultValue};
    }

    componentDidUpdate(prevProps: ButtonGroupProps) {
        const {selectedValue, defaultValue} = this.props;
        if (selectedValue !== prevProps.selectedValue || defaultValue !== prevProps.defaultValue) {
            this.setState({value: selectedValue ? selectedValue : defaultValue});
        }
    }

    private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: evt.target.value});
        const {onChange} = this.props;
        if (onChange) onChange(evt);
    };

    private renderChildren(): React.ReactNode[] | undefined | null {
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
        const {className, style, dataqa} = this.props;
        return (
            <div className={classNames(["btn-group", className])} style={style} data-qa={dataqa}>
                {this.renderChildren()}
            </div>
        );
    }
}
