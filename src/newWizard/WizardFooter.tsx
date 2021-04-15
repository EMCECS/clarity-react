/**
 * Copyright (c) 2020 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React from "react";
import {ClassNames} from "./ClassNames";
import {Button, ButtonState} from "../forms/button";
import {Spinner, SpinnerSize, SpinnerType} from "../spinner/Spinner";
import {
    dataqa_wizard_btn_cancel,
    dataqa_wizard_btn_finish,
    dataqa_wizard_btn_next,
    dataqa_wizard_btn_previous,
} from "./qualityFields";

export type InheritedWizardFooterProps = {
    cancelText?: string;
    cancelClassName?: string;
    completeClassName?: string;
    completeText?: string;
    customFooter?: ((props: WizardFooterProps) => any) | any;
    nextClassName?: string;
    nextText?: string;
    previousClassName?: string;
    previousText?: string;
    showCancel?: boolean;
    dataqa?: string;
    isLoading?: boolean;
};

export interface WizardFooterProps extends InheritedWizardFooterProps {
    activeStepFooter?: React.ReactElement;
    currentStepID: number;
    disableNext?: boolean;
    disableComplete?: boolean;
    onClose?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onComplete?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onNext?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onPrevious?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    showComplete?: boolean;
    showNext?: boolean;
    showPrevious?: boolean;
    disablePreviousButton?: boolean;
}

export default class WizardFooter extends React.PureComponent<WizardFooterProps> {
    render() {
        const {
            activeStepFooter,
            cancelText,
            cancelClassName,
            completeClassName,
            completeText,
            customFooter,
            disableComplete,
            disableNext,
            nextClassName,
            nextText,
            onClose,
            onComplete,
            onNext,
            onPrevious,
            previousClassName,
            previousText,
            dataqa,
            showCancel,
            showComplete,
            showNext,
            showPrevious,
            isLoading,
            disablePreviousButton,
        } = this.props;

        return (
            <div className={ClassNames.WIZARD_FOOTER}>
                <div className={ClassNames.WIZARD_FOOTER_BUTTON}>
                    {typeof customFooter === "function" && customFooter(this.props)}
                    {typeof customFooter !== "function" && customFooter}
                    {activeStepFooter}
                    {showCancel && (
                        <Button
                            link
                            key={cancelText}
                            className={cancelClassName}
                            dataqa={dataqa + dataqa_wizard_btn_cancel}
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            {cancelText + " "}
                        </Button>
                    )}
                    {showPrevious && (
                        <Button
                            key={previousText}
                            className={previousClassName}
                            dataqa={dataqa + dataqa_wizard_btn_previous}
                            onClick={onPrevious}
                            disabled={isLoading || disablePreviousButton}
                        >
                            {previousText + " "}
                        </Button>
                    )}
                    {showNext && (
                        <Button
                            key={nextText}
                            className={nextClassName}
                            primary
                            disabled={isLoading || disableNext}
                            dataqa={dataqa + dataqa_wizard_btn_next}
                            onClick={onNext}
                        >
                            {nextText + " "}
                        </Button>
                    )}
                    {showComplete && (
                        <Button
                            key={completeText}
                            className={completeClassName}
                            state={ButtonState.SUCCESS}
                            disabled={isLoading || disableComplete}
                            dataqa={dataqa + dataqa_wizard_btn_finish}
                            onClick={onComplete}
                        >
                            {isLoading ? (
                                <Spinner type={SpinnerType.INLINE} size={SpinnerSize.SMALL}>
                                    {completeText}
                                </Spinner>
                            ) : (
                                completeText
                            )}
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}
