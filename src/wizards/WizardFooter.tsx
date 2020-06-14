import React from "react";
import {ClassNames} from "./ClassNames";
import {Button, ButtonState} from "../forms/button";
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
    customFooter?: React.ReactElement;
    nextClassName?: string;
    nextText?: string;
    previousClassName?: string;
    previousText?: string;
    showCancel?: boolean;
    dataqa?: string;
};

export interface WizardFooterProps extends InheritedWizardFooterProps {
    activeStepFooter?: React.ReactElement;
    disableNext?: boolean;
    disableComplete?: boolean;
    onClose: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onComplete: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onNext: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onPrevious: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    showComplete?: boolean;
    showNext?: boolean;
    showPrevious?: boolean;
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
            // curentStepID,
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
        } = this.props;
        return (
            <div className={ClassNames.WIZARD_FOOTER}>
                <div className={ClassNames.WIZARD_FOOTER_BUTTON}>
                    {customFooter}
                    {activeStepFooter}
                    {showCancel && (
                        <Button
                            link
                            key={cancelText}
                            className={cancelClassName}
                            dataqa={dataqa + dataqa_wizard_btn_cancel}
                            onClick={onClose}
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
                        >
                            {previousText + " "}
                        </Button>
                    )}
                    {showNext && (
                        <Button
                            key={nextText}
                            className={nextClassName}
                            primary
                            disabled={disableNext}
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
                            disabled={disableComplete}
                            dataqa={dataqa + dataqa_wizard_btn_finish}
                            onClick={onComplete}
                        >
                            {completeText}
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}
