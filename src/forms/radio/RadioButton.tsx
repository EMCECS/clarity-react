import * as React from 'react';
import * as utils from '../../utils';
import {ReactNode} from "react";

type RadioButtonProps = {
    checked?: boolean
    className?: string
    disabled?: boolean
    label: string
    labelClass?: string
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
    name?: string
    id?: string
    value: any
    children?: ReactNode
};

export class RadioButton extends React.PureComponent<RadioButtonProps> {
    type: string = "RadioButton";
    key: string | undefined;

    constructor(props: RadioButtonProps) {
        super(props);
        this.key = props.id;
    }

    render() {
        const {
            checked,
            children,
            className,
            disabled,
            label,
            labelClass,
            onChange,
            name,
            id,
            value
        } = this.props;
        let classNames = ["clr-radio-wrapper", className];
        if (disabled)
            classNames.push("clr-form-control-disabled");

        const labelClassNames =
            utils.classNames(["clr-control-label", labelClass]);
        return (
            <div className={utils.classNames(classNames)}>
                <input className="radio" name={name}
                       id={id}
                       checked={checked}
                       value={value}
                       disabled={disabled}
                       type="radio"
                       onSelect={onChange}
                /><label className={labelClassNames} htmlFor={id}>{label}</label>
                {children}
            </div>
        );
    }
}