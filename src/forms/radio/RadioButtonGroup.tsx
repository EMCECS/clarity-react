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
import {RadioButton} from "./RadioButton";
import * as utils from "../../utils";
import {ReactElement, ReactNode} from "react";

/**
 * RadioButtonGroup Props
 * defaultValue: default value of radio group
 * children: nested radio button or group
 * className: css property
 * disabled: property to enable disable radio button group
 * checked: if true checked else false
 * helperText: helper text of radio group
 * inline: inline style
 * label: label of radio button group
 * name: name of radio group
 * dataqa: quality engineering testing field
 */
type RadioButtonGroupProps = {
    defaultValue?: any;
    children?: React.ReactNode[];
    className?: string;
    disabled?: boolean;
    helperText?: ReactNode;
    inline?: boolean;
    label?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    dataqa: string;
};

const initialState = {value: null};

type RadioButtonGroupState = Readonly<typeof initialState>;

export class RadioButtonGroup extends React.PureComponent<RadioButtonGroupProps> {
    readonly state: RadioButtonGroupState = initialState;

    constructor(props: RadioButtonGroupProps) {
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
        const {children, className, disabled, name} = this.props;
        if (typeof children === "undefined" || children === null) {
            return [];
        }
        return React.Children.map(children, (child: ReactNode, index: number) => {
            const childEl = child as ReactElement;
            if (childEl.type === RadioButton) {
                return React.cloneElement(childEl as React.ReactElement<any>, {
                    checked: value === childEl.props.value,
                    className: className,
                    disabled: disabled,
                    id: name + "-" + index,
                    name: name,
                    onChange: this.handleChange,
                });
            }
            console.log(child);
            return child;
        });
    }

    private static renderHelperText(helperText: ReactNode): ReactNode {
        return (
            <div className="clr-subtext-wrapper">
                <span className="clr-subtext">{helperText}</span>
            </div>
        );
    }

    private static renderLabel(label: string) {
        return <label className="clr-control-label">{label}</label>;
    }

    render() {
        const {className, disabled, helperText, inline, label, dataqa} = this.props;
        let classNames = ["clr-control-container", className];
        if (disabled) classNames.push("clr-form-control-disabled");
        if (inline) classNames.push("clr-control-inline");
        return (
            <div className="clr-form-control" data-qa={dataqa}>
                {label && RadioButtonGroup.renderLabel(label)}
                <div className={utils.classNames(classNames)}>{this.renderChildren()}</div>
                {helperText && RadioButtonGroup.renderHelperText(helperText)}
            </div>
        );
    }
}
