import * as React from "react";
import {Icon} from "../../icon";
import {ClassNames} from "./ClassNames";
import {classNames} from "../../utils";
import {CheckBox} from "../checkbox";
import {Toggle} from "../toggle";

type FormControlProps = {
    label?: string;
    inline?: boolean;
    error?: boolean;
    disabled?: boolean;
};

export class FormControl extends React.PureComponent<FormControlProps> {
    render() {
        const {disabled, label, error, inline, children} = this.props;
        return (
            <div
                className={classNames([
                    ClassNames.CLR_FORM_CONTROL, // prettier
                    disabled && ClassNames.CLR_FORM_CONTROL_DISABLED,
                ])}
            >
                {label && <label className={ClassNames.CLR_CONTROL_LABEL}>{label}</label>}
                <div
                    className={classNames([
                        ClassNames.CLR_CONTROL_CONTAINER, //prettier
                        error && ClassNames.CLR_ERROR,
                        inline && ClassNames.CLR_CONTROL_INLINE,
                    ])}
                >
                    {disabled ? FormControl.renderChildrenDisabled(children) : children}
                </div>
            </div>
        );
    }

    private static renderChildrenDisabled(children: React.ReactNode): React.ReactNode {
        const childrenDisable = React.Children.map(children, child => {
            const childEl = child as React.ReactElement;
            if (childEl.type === CheckBox || childEl.type === Toggle || childEl.type === SubTextWrapper) {
                return React.cloneElement(childEl as React.ReactElement<HTMLInputElement>, {
                    disabled: true,
                });
            }
        });
        return childrenDisable;
    }
}

type SubTextWrapperProps = {
    shape?: string;
    text?: string;
    errorTitle?: string;
};

export const SubTextWrapper: React.FunctionComponent<SubTextWrapperProps> = ({shape, text, errorTitle, children}) => {
    return (
        <div className={ClassNames.CLR_SUBTEXT_WRAPPER}>
            {shape && <Icon className={ClassNames.CLR_VALIDATE_ICON} shape={shape} title={errorTitle} />}
            <span className={ClassNames.CLR_SUBTEXT}>{text}</span>
        </div>
    );
};
