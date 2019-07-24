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
import * as ReactDOM from "react-dom";
import {Icon} from "../icon";
import {classNames, allTrue} from "../utils";
import {ClassNames, Styles} from "./ClassNames";
import {Button, ButtonState} from "../forms/button";
import {VerticalNav} from "../layout/vertical-nav";

type WizardStep = {
    stepName: string;
    stepComponent: React.ReactNode;
    stepId: number;
    stepCompleted?: boolean;
    customStepNav?: WizardStepNavDetails;
    disableNav?: boolean;
    isStepValid?: Function /* This function should return boolen value. And use to determine if step is valid or not */;
    onStepSubmit?: Function /* Function to perform on submittion of step at click of Next or Finish */;
};

type WizardStepNavDetails = {
    stepNavIcon?: string;
    stepNavTitle?: string;
    stepNavChildren?: React.ReactNode;
};

type WizardProps = {
    show?: boolean;
    size?: WizardSize;
    title?: string;
    steps: WizardStep[];
    defaultStepId?: number;
    showNav?: boolean;
    closable?: boolean;
    previousButtonText?: string;
    onPrevious?: Function;
    nextButtonText?: string;
    onNext?: Function;
    finishButtonText?: string;
    onFinish?: Function;
    cancelButtonText?: string;
    onClose?: Function;
    navLinkClasses?: string;
    validationType?: WizardValidationType;
};

type WizardState = {
    show: boolean;
    currentStepId: number;
    showFinishButton: boolean;
    disableFinishButton: boolean;
    showPreviousButton: boolean;
    showNextButton: boolean;
    disableNextButton: boolean;
    allSteps: WizardStep[];
};

export enum WizardSize {
    MEDIUM = "md",
    LARGE = "lg",
    XLARGE = "xl",
}

export enum WizardValidationType {
    ASYNC = "Asynchronous",
    SYNC = "Synchronous",
    NONE = "None",
}

export class Wizard extends React.PureComponent<WizardProps> {
    private divRef: HTMLDivElement | null = null;

    // By default Wizard will have following prop values
    static defaultProps = {
        previousButtonText: "BACK",
        nextButtonText: "NEXT",
        cancelButtonText: "CANCEL",
        finishButtonText: "FINISH",
        size: WizardSize.MEDIUM,
        showNav: true,
        defaultStepId: 0,
        validationType: WizardValidationType.NONE,
    };

    // Default state of wizard - Need this to reset Wizard state
    private initialState: WizardState = {
        show: this.props.show !== undefined ? this.props.show : false,
        currentStepId: this.props.defaultStepId!,
        showFinishButton: this.props.defaultStepId === this.props.steps.length - 1 ? true : false,
        disableFinishButton: false,
        showPreviousButton: false,
        showNextButton: this.props.defaultStepId === this.props.steps.length - 1 ? false : true,
        disableNextButton: false,
        allSteps: this.props.steps,
    };

    // Initial state of wizard
    state: WizardState = this.initialState;

    /* ##########  Wizard lifestyle hooks start  ############ */
    componentWillMount() {
        this.createRefDiv();
        this.initStepsState();
    }

    private createRefDiv() {
        if (this.divRef === null) {
            const el = document.createElement("div");
            document.body.appendChild(el);
            this.divRef = el;
        }
        document.body.classList.add(ClassNames.NO_SCROLLING);
    }

    private cleanup() {
        if (this.divRef !== null) {
            document.body.removeChild(this.divRef);
            this.divRef = null;
        }
        document.body.classList.remove(ClassNames.NO_SCROLLING);
    }

    // Initialize state of wizard steps
    private initStepsState() {
        const {validationType, steps} = this.props;
        // For 1st step disable Next button for synchronous validation
        const disableNext = validationType === WizardValidationType.SYNC ? true : false;
        steps.map((step, key) => {
            // Enable Nav for first step in case of Synchronous validation
            const disableNav =
                (step.stepId === 0 && validationType === WizardValidationType.SYNC) ||
                [WizardValidationType.ASYNC, WizardValidationType.NONE].includes(validationType!)
                    ? false
                    : true;

            this.setState({
                disableNextButton: this.state.disableNextButton !== disableNext ? disableNext : undefined,
                allSteps: [
                    ...this.state.allSteps,
                    ((this.state.allSteps[step.stepId].stepCompleted = false),
                    (this.state.allSteps[step.stepId].disableNav = disableNav)),
                ],
            });
        });
    }
    componentWillUnmount() {
        this.cleanup();
    }

    /* ##########  Wizard lifestyle hooks end  ############ */

    /* ##########  Wizard private methods start  ############ */
    private getStepObj(stepId: number) {
        return this.state.allSteps[stepId];
    }

    // Close the wizard
    close() {
        const {onClose} = this.props;
        this.setState({show: false});
        onClose && onClose();
    }

    // Make wizard visible
    show() {
        this.setState({show: true});
    }

    // Reset Wizard state
    resetWizard() {
        const {steps} = this.props;
        steps.map((step, key) => {
            this.setState({
                allSteps: [...this.state.allSteps, (this.state.allSteps[step.stepId].stepCompleted = false)],
            });
        });
        this.setState(this.initialState);
    }

    nextButtonClick() {
        const {onNext, steps} = this.props;
        const nextStepId = this.state.currentStepId + 1;
        const currenstStep = this.getStepObj(this.state.currentStepId);
        // Check validity of current step before going next
        const {validState, disableNextStep} = this.checkStepValidity(this.state.currentStepId);

        if (!disableNextStep && nextStepId <= steps.length - 1) {
            this.modifyButtonStates(nextStepId);
            currenstStep.onStepSubmit && currenstStep.onStepSubmit();
            onNext && onNext();
        }
    }

    previousButtonClick() {
        const {onPrevious} = this.props;
        const previousStepId = this.state.currentStepId - 1;

        if (previousStepId >= 0) this.modifyButtonStates(previousStepId);
        onPrevious && onPrevious();
    }

    // Close the wizard on finish
    finishButtonClick() {
        const {onFinish, validationType} = this.props;
        let finishWizard: boolean;
        const currenstStep = this.getStepObj(this.state.currentStepId);
        const {validState, disableNextStep} = this.checkStepValidity(this.state.currentStepId);

        if (validationType === WizardValidationType.ASYNC) {
            var {validationData, allStepsValid} = this.checkValidityOfAllSteps();
            finishWizard = allStepsValid;
        } else {
            finishWizard = !disableNextStep;
        }

        if (finishWizard) {
            currenstStep.onStepSubmit && currenstStep.onStepSubmit();
            onFinish && onFinish();
            this.close();
        }
    }

    private modifyButtonStates(stepId: number) {
        const {steps, validationType} = this.props;
        const step = this.getStepObj(stepId);

        if (stepId === 0) {
            /* for first step : If currenst step is first step of workflow
          then hide privious button and show next button */
            this.setState({
                showPreviousButton: false,
                showNextButton: true,
                disableNextButton: !step.stepCompleted && validationType == WizardValidationType.SYNC ? true : false,
                showFinishButton: false,
                currentStepId: step.stepId,
            });
        } else if (stepId === steps.length - 1) {
            /* for last step : If currenst step is last step of workflow
          then hide next button and show privious and finish buttons */
            this.setState({
                showPreviousButton: true,
                showFinishButton: true,
                disableFinishButton: !step.stepCompleted && validationType == WizardValidationType.SYNC ? true : false,
                showNextButton: false,
                currentStepId: step.stepId,
            });
        } else {
            /* for in between step : If currenst step is not last or first step of workflow
        then show next , privious buttons and hide finish button */
            this.setState({
                showPreviousButton: true,
                showNextButton: true,
                disableNextButton: !step.stepCompleted && validationType == WizardValidationType.SYNC ? true : false,
                showFinishButton: false,
                currentStepId: step.stepId,
            });
        }
    }

    private navigationClick(stepId: number) {
        this.modifyButtonStates(stepId);
    }

    private getStepNavClasses(stepId: number) {
        let classNames = [ClassNames.WIZARD_STEPNAV_LINK];

        if (this.state.currentStepId === stepId) classNames.push(ClassNames.ACTIVE);
        if (this.state.allSteps[stepId].stepCompleted) classNames.push(ClassNames.COMPLETE);
        if (this.props.navLinkClasses) classNames.push(this.props.navLinkClasses);
        // TODO: Add class error if step is not valid
        return classNames;
    }

    // Check validity of given step
    checkStepValidity(stepId: number) {
        const {validationType, steps} = this.props;
        let validationState = true;
        let disableNext = false;
        let currenstStep = this.getStepObj(stepId);
        let nextStep = stepId == steps.length - 1 ? currenstStep : this.state.allSteps[stepId + 1];

        if (currenstStep.isStepValid !== undefined) validationState = currenstStep.isStepValid!();
        if (!validationState && validationType === WizardValidationType.SYNC) disableNext = true;
        if (currenstStep.stepCompleted !== validationState) {
            this.setState({
                disableNextButton: this.state.disableNextButton !== disableNext ? disableNext : undefined,
                disableFinishButton: this.state.disableFinishButton !== disableNext ? disableNext : undefined,
                allSteps: [
                    ...this.state.allSteps,
                    ((currenstStep.stepCompleted = validationState), (nextStep.disableNav = disableNext)),
                ],
            });
        }

        return {
            validState: validationState,
            disableNextStep: disableNext,
        };
    }

    // Check validity of All steps
    checkValidityOfAllSteps() {
        const {steps} = this.props;
        let validationData: {[key: number]: boolean} = {};

        steps.map((step, key) => {
            const {validState, disableNextStep} = this.checkStepValidity(step.stepId);
            validationData[step.stepId] = validState;
        });
        const allStepsValid = allTrue(validationData);
        return {
            validationData: validationData,
            allStepsValid: allStepsValid,
        };
    }

    // Build DOM for Wizard footer
    private buildWizardFooter(): React.ReactElement {
        const {cancelButtonText, nextButtonText, previousButtonText, finishButtonText} = this.props;

        return (
            <div className={ClassNames.WIZARD_FOOTER}>
                <div className={ClassNames.WIZARD_FOOTER_BUTTON}>
                    <Button key={cancelButtonText} link onClick={this.close.bind(this)}>
                        {cancelButtonText}{" "}
                    </Button>

                    {this.state.showPreviousButton && (
                        <Button key={previousButtonText} onClick={this.previousButtonClick.bind(this)}>
                            {previousButtonText}{" "}
                        </Button>
                    )}

                    {this.state.showNextButton && (
                        <Button
                            key={nextButtonText}
                            primary
                            disabled={this.state.disableNextButton}
                            onClick={this.nextButtonClick.bind(this)}
                        >
                            {nextButtonText}{" "}
                        </Button>
                    )}

                    {this.state.showFinishButton && (
                        <Button
                            key={finishButtonText}
                            state={ButtonState.SUCCESS}
                            disabled={this.state.disableFinishButton}
                            onClick={this.finishButtonClick.bind(this)}
                        >
                            {finishButtonText}
                        </Button>
                    )}
                </div>{" "}
                {/*Close modal-footer-buttons*/}
                {/*Close modal-footer*/}
            </div>
        );
    }

    // Build DOM for Wizard NAV
    private buildWizardNav(): React.ReactElement {
        const {steps, title, showNav} = this.props;

        return (
            <VerticalNav className={ClassNames.WIZARD_STEPNAV_WRAPPER}>
                <h3 className={ClassNames.WIZARD_TITLE}> {title} </h3>
                {showNav && (
                    <div className={ClassNames.WIZARD_STEPNAV}>
                        {steps.map((step, key) => {
                            return (
                                <div className={classNames(this.getStepNavClasses(step.stepId))}>
                                    <Button
                                        disabled={this.state.allSteps[step.stepId].disableNav}
                                        link={true}
                                        className="clr-wizard-stepnav-link"
                                        onClick={this.navigationClick.bind(this, step.stepId)}
                                        icon={
                                            step.customStepNav !== undefined && step.customStepNav.stepNavIcon
                                                ? step.customStepNav.stepNavIcon
                                                : undefined
                                        }
                                    >
                                        &nbsp;
                                        {step.customStepNav !== undefined && step.customStepNav.stepNavTitle
                                            ? step.customStepNav.stepNavTitle
                                            : step.stepName}{" "}
                                        &nbsp;
                                        {step.customStepNav !== undefined && step.customStepNav!.stepNavChildren}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </VerticalNav>
        );
    }

    // Build DOM for wizard step
    private buildWizardSteps(): React.ReactElement {
        const {steps} = this.props;

        return (
            <div className={ClassNames.WIZARD_CONTENT}>
                {steps.map((step, key) => {
                    const hideStep = step.stepId === this.state.currentStepId ? false : true;
                    return (
                        <div
                            role="tabpanel"
                            id={step.stepId.toString()}
                            aria-hidden={hideStep}
                            aria-labelledby="stepId"
                            className={`${ClassNames.ACTIVE} ${ClassNames.WIZARD_PAGE}`}
                        >
                            {step.stepComponent}
                        </div>
                    );
                })}
            </div>
        );
    }

    private buildWizard(): React.ReactElement {
        const {size, closable, steps, children} = this.props;
        const wizardSize = "wizard-" + size;
        const modalSize = "modal-" + size;

        return (
            <React.Fragment>
                <div className={`${ClassNames.WIZARD} ${wizardSize} ${ClassNames.WIZARD_OPEN}`}>
                    <div className={ClassNames.WIZARD_MODAL}>
                        <div
                            className={`${ClassNames.WIZARD_MODAL_DIALOG} ${modalSize}`}
                            role="dialog"
                            aria-hidden="false"
                            aria-labelledby="clr-id-3"
                        >
                            <div className={ClassNames.WIZARD_OUTER_WRAPPER} style={Styles.WIZARD_OUTER_WRAPPER}>
                                <div className={ClassNames.MODAL_CONTENT_WRAPPER}>
                                    {this.buildWizardNav()}
                                    <div className={ClassNames.MODAL_CONTENT}>
                                        <div className={ClassNames.MODAL_HEADER}>
                                            <button
                                                aria-label="Close"
                                                className="close"
                                                type="button"
                                                onClick={this.close.bind(this)}
                                            >
                                                <Icon aria-hidden={true} shape="close" />
                                            </button>
                                            <h3 className={ClassNames.MODAL_TITLE} style={Styles.MODAL_TITELE}>
                                                <span className={ClassNames.MODAL_TITLE_TEXT}>
                                                    {steps[this.state.currentStepId].stepName}
                                                </span>
                                            </h3>
                                        </div>{" "}
                                        {/*Close modal-header */}
                                        <div className={ClassNames.MODAL_BODY}>{this.buildWizardSteps()}</div>{" "}
                                        {/*Close modal-body*/}
                                        {this.buildWizardFooter()}
                                    </div>{" "}
                                    {/*Close modal-content*/}
                                </div>{" "}
                                {/*Close modal-content-wrapper */}
                                <div className={ClassNames.MODAL_GHOST_WRAPPER}>
                                    <div
                                        _ngcontent-c7=""
                                        className={ClassNames.MODAL_GHOST_1}
                                        style={Styles.MODAL_GHOST_1}
                                    />
                                    <div
                                        _ngcontent-c7=""
                                        className={ClassNames.MODAL_GHOST_2}
                                        style={Styles.MODAL_GHOST_2}
                                    />
                                </div>
                            </div>{" "}
                            {/*Close modal-outer-wrapper */}
                        </div>{" "}
                        {/*Close modal dialog */}
                        <div className={ClassNames.MODAL_BACKDROP} aria-hidden="true" />
                    </div>{" "}
                    {/*Close modal div */}
                </div>{" "}
                {/*Close Size div */}
            </React.Fragment>
        );
    }

    /* ##########  Wizard private methods end  ############ */

    render() {
        return this.props.show ? ReactDOM.createPortal(this.buildWizard(), this.divRef!) : null;
    }
}
