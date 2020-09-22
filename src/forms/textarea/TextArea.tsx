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
import {classNames} from "../../utils";
import {ClassNames} from "./ClassNames";
import {ReactNode} from "react";
import {Icon} from "../../icon";

/**
 * TextAreaProps: Props for TextArea component
 *@param {className} CSS class name
 *@param {style} CSS style
 *@param {disabled} set true to disable textarea
 *@param {readonly} set true for read-only textarea
 *@param {helperText} helper text message for textarea
 *@param {errorHelperText} error text mesaahe for textarea
 *@param {label} label for textarea
 *@param {placeholder} placeholder for textarea
 *@param {name} unique name for textarea
 *@param {id} unique id for textarea
 *@param {value} value for textarea
 *@param {defaultValue} default value id for textarea
 *@param {rows} visible number of lines in a text area
 *@param {cols} visible width of a text area
 *@param {wrap} specifies how the text in a text area is to be wrapped
 *@param {required} set to true of text area is required/must be filled out
 *@param {error} set to true to show error mesage and icon
 *@param {spellcheck} set to false to off spelling and grammar checking
 *@param {draggable} set to true if element is draggable
 *@param {maxLength} specifies the maximum number of characters allowed in the text area
 *@param {onChange} callback function to call for onChange event
 *@param {onBlur} callback function to call for onblur event
 *@param {onKeyDown} callback function to call for onKeyDown event
 *@param {onKeyPress} callback function to call for onKeyPress event
 *@param {dataqa} for Quality Engineering
 */
type TextAreaProps = {
    className?: string;
    style?: any;
    disabled?: boolean;
    readonly?: boolean;
    helperText?: ReactNode;
    errorHelperText?: string; // shown when state isError is true
    label?: string;
    placeholder?: string;
    name: string;
    id?: string;
    value?: any;
    defaultValue?: any;
    rows?: number;
    cols?: number;
    wrap?: TextWrapType;
    required?: boolean;
    error?: boolean; // force error state of component
    spellcheck?: boolean;
    draggable?: boolean;
    maxLength?: number;
    onChange?: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (evt: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (evt: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyPress?: (evt: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    dataqa?: string; //quality engineering testing field
};

/**
 * Enum for TextWrapType in textarea :
 * Specifies how the text in a text area is to be wrapped
 * @param {HARD} for enabling hard wrap
 * @param {SOFT} for enabling soft wrap
 */
export enum TextWrapType {
    HARD = "hard",
    SOFT = "soft",
}

/**
 * TextArea Componnet :
 *  Component for long text input
 */
export class TextArea extends React.PureComponent<TextAreaProps> {
    // Function to render helper or error text
    private renderHelperText = (helperText: ReactNode): ReactNode => {
        return <span className={ClassNames.CLR_SUBTEXT}>{helperText}</span>;
    };

    // Function to render textarea label
    private renderLabel = (label: string) => {
        return <label className={ClassNames.CLR_CONTROL_LABEL}>{label}</label>;
    };

    // Function to render textarea
    private buildTextArea() {
        const {
            style,
            className,
            disabled,
            value,
            defaultValue,
            placeholder,
            children,
            name,
            id,
            required,
            onBlur,
            onKeyPress,
            onChange,
            onKeyDown,
            dataqa,
            readonly,
            rows,
            cols,
            wrap,
            spellcheck,
            maxLength,
            draggable,
        } = this.props;
        return (
            <React.Fragment>
                <textarea
                    name={name}
                    id={id}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    className={classNames([
                        ClassNames.CLR_TEXTAREA,
                        ClassNames.NG_PRISTINE,
                        ClassNames.NG_VALID,
                        ClassNames.NG_TOUCHED,
                        className,
                    ])}
                    placeholder={placeholder}
                    data-qa={dataqa}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    style={style}
                    required={required}
                    readOnly={readonly}
                    rows={rows}
                    cols={cols}
                    wrap={wrap}
                    spellCheck={spellcheck}
                    maxLength={maxLength}
                    draggable={draggable}
                />
                {children}
                <Icon className={ClassNames.CLR_VALIDATE_ICON} shape="exclamation-circle" />
            </React.Fragment>
        );
    }

    render() {
        const {disabled, label, error, errorHelperText, helperText} = this.props;

        return (
            <div className={ClassNames.CLR_FORM_CONTROL}>
                {label && this.renderLabel(label)}
                <div
                    className={classNames([
                        ClassNames.CLR_CONTROL_CONTAINER,
                        error && ClassNames.CLR_ERROR,
                        disabled && ClassNames.CLR_FORM_DISABLED,
                    ])}
                    style={{width: "100%"}}
                >
                    <div className={ClassNames.CLR_TEXTAREA_WRAPPER}>{this.buildTextArea()}</div>
                    {error
                        ? errorHelperText && this.renderHelperText(errorHelperText)
                        : helperText && this.renderHelperText(helperText)}
                </div>
            </div>
        );
    }
}
