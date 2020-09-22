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
import {UID} from "react-uid";
import {classNames} from "../../utils";
import {Icon} from "../../icon";
import {ClassNames} from "./ClassNames";

/**
 * General component description :
 * DataList :
 * The datalist element offers a flexible input when users need to filter
 * and select from a large list of pre-defined options.
 * Or, they need to input a custom value
 * (not provided in the pre-defined list) for the input.
 */

/**
 * Props for DataList option:
 * @param {value} option value
 * @param {selected} true if option is selected
 * @param {style} CSS styles
 * @param {className} CSS classname
 **/
type DataListOptionProps = {
    value?: string;
    selected?: boolean;
    className?: string;
    style?: any;
};

// Datalist option component
export const DataListOption: React.FunctionComponent<DataListOptionProps> = ({
    value,
    selected,
    children,
    className,
    style,
}) => {
    return (
        <option
            value={value}
            selected={selected}
            className={classNames([ClassNames.NG_STAR_INSERTED, className])}
            style={style}
        >
            {children}
        </option>
    );
};

/**
 * Enum for datalist autocomplete status
 */
export enum DataListAutoComplete {
    ON = "on",
    OFF = "off",
}

/**
 * Props for DataList:
 * @param {placeHolder} placeHolder for datalist
 * @param {label} label for datalist
 * @param {name} name for datalist
 * @param {required} true if datalist is mandatory field
 * @param {isError} true if there is error in datalist
 * @param {errorText} error message for datalist
 * @param {helperText} helper message for datalist
 * @param {onChange} function to handle onChange event
 * @param {onBlur} function to handle onBlur event
 * @param {dataqa} quality engineering parameter
 * @param {style} CSS styles
 * @param {className} CSS classname
 * @param {autoComplete} if "off" disable browser autocomplete
 * @param {defaultValue} if it will be used to set default value of input element, useful in case of edit workflows
 **/
type DataListProps = {
    placeHolder?: string;
    label?: string;
    name?: string;
    required?: boolean;
    isError?: boolean;
    errorText?: string;
    helperText?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (evt: React.FocusEvent<HTMLInputElement>) => void;
    autoComplete?: DataListAutoComplete;
    dataqa?: string;
    className?: string;
    style?: any;
    defaultValue?: string;
};

/**
 * State for DataList:
 * @param {hasFocus} true if datalist has focus on it
 **/
type DataListState = {
    hasFocus: boolean;
};

// DataList component
export class DataList extends React.PureComponent<DataListProps, DataListState> {
    constructor(props: DataListProps) {
        super(props);
        this.state = {
            hasFocus: false,
        };
    }

    private handleFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
        this.setState({hasFocus: true});
    };

    private handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
        const {onBlur} = this.props;
        this.setState({hasFocus: false}, () => {
            onBlur && onBlur(evt);
        });
    };

    private renderHelperText(helperText: string): React.ReactNode {
        return <span className={classNames([ClassNames.CLR_SUBTEXT, ClassNames.NG_STAR_INSERTED])}>{helperText}</span>;
    }

    private renderLabel(labelString: string): React.ReactNode {
        return (
            <label
                className={classNames([
                    ClassNames.CLR_CONTROL_LABEL,
                    ClassNames.DATALIST_LABEL_COL,
                    ClassNames.NG_STAR_INSERTED,
                ])}
            >
                {labelString}
            </label>
        );
    }

    private renderDataList(): React.ReactNode {
        const {
            placeHolder,
            name,
            isError,
            errorText,
            helperText,
            required,
            className,
            style,
            children,
            onChange,
            autoComplete,
            defaultValue,
        } = this.props;

        const {hasFocus} = this.state;

        return (
            <div className={ClassNames.CLR_INPUT_WRAPPER}>
                <UID>
                    {listId => (
                        <div
                            className={classNames([
                                ClassNames.CLR_INPUT_GROUP,
                                hasFocus && ClassNames.CLR_FOCUS,
                                className,
                            ])}
                            style={style}
                        >
                            <input
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                onChange={onChange}
                                placeholder={placeHolder}
                                name={name}
                                required={required}
                                list={listId}
                                style={{width: "100%"}}
                                className={classNames([
                                    ClassNames.CLR_INPUT,
                                    ClassNames.NG_VALID,
                                    ClassNames.NG_TOUCHED,
                                    ClassNames.NG_DIRTY,
                                ])}
                                aria-describedby="clr-form-control-3-helper"
                                type="text"
                                autoComplete={autoComplete ? autoComplete : DataListAutoComplete.OFF}
                                defaultValue={defaultValue ? defaultValue : ""}
                            />
                            <datalist id={listId}>{children}</datalist>
                        </div>
                    )}
                </UID>
                <Icon className={ClassNames.CLR_VALIDATE_ICON} shape="exclamation-circle" />
                {isError
                    ? errorText && this.renderHelperText(errorText)
                    : helperText && this.renderHelperText(helperText)}
            </div>
        );
    }

    render() {
        const {label, isError, dataqa} = this.props;

        return (
            <div
                data-qa={dataqa}
                className={classNames([
                    ClassNames.NG_VALID,
                    ClassNames.CLR_FORM,
                    ClassNames.CLR_FORM_HORIZONTAL,
                    ClassNames.NG_TOUCHED,
                    ClassNames.NG_DIRTY,
                ])}
            >
                <div
                    className={classNames([
                        ClassNames.CLR_DATALIST_CONTAINER,
                        ClassNames.CLR_FORM_CONTROL,
                        ClassNames.CLR_ROW,
                    ])}
                >
                    {label && this.renderLabel(label)}

                    <div
                        className={classNames([
                            ClassNames.CLR_CONTROL_CONTAINER,
                            isError && ClassNames.CLR_ERROR,
                            ClassNames.DATALIST_COL,
                        ])}
                    >
                        {this.renderDataList()}
                    </div>
                </div>
            </div>
        );
    }
}
