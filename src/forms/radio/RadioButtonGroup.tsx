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
 * @param {defaultValue} default value of radio group
 * @param {selectedValue} selected value for radio group
 * @param {children} nested radio button or group
 * @param {className} css property
 * @param {disabled} property to enable disable radio button group
 * @param {checked} if true checked else false
 * @param {helperText} helper text of radio group
 * @param {inline} inline style
 * @param {label} label of radio button group
 * @param {name} name of radio group
 * @param {dataqa} quality engineering testing field
 */
type RadioButtonGroupProps = {
    defaultValue?: any;
    selectedValue?: any;
    children?: React.ReactNode[];
    className?: string;
    disabled?: boolean;
    helperText?: ReactNode;
    inline?: boolean;
    label?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    dataqa?: string;
};

const initialState = {value: null};

type RadioButtonGroupState = Readonly<typeof initialState>;

export class RadioButtonGroup extends React.PureComponent<RadioButtonGroupProps> {
    readonly state: RadioButtonGroupState = initialState;

    constructor(props: RadioButtonGroupProps) {
        super(props);
        const {defaultValue, selectedValue} = props;
        this.state = {value: selectedValue ? selectedValue : defaultValue};
    }

    componentDidUpdate(prevProps: RadioButtonGroupProps) {
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

    private renderChildren(): React.ReactElement<RadioButton>[] | undefined | null {
        const {value} = this.state;
        const {children, className, disabled, name} = this.props;
        if (typeof children === "undefined" || children === null) {
            return [];
        }
        return React.Children.map(children, (child: ReactNode, index: number) => {
            const childEl = child as ReactElement;
            if (childEl.type === RadioButton) {
                return React.cloneElement(childEl as React.ReactElement<RadioButton>, {
                    // @ts-ignore // childEl is of type RadioButton
                    checked: value === childEl.props.value,
                    className: className,
                    disabled: disabled ? disabled : childEl.props.disabled,
                    id: name + "-" + index,
                    name: name,
                    onChange: this.handleChange,
                });
            }
            return child;
        }) as React.ReactElement<RadioButton>[];
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
