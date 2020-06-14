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
import {Icon, IconProps} from "../icon";
import {classNames, allTrue} from "../utils";
import {ClassNames, Styles} from "./ClassNames";
import {Button, ButtonState} from "../forms/button";
import {VerticalNav} from "../layout/vertical-nav";
import {ReactNode} from "react";

/**
 * General component description :
 * Wizard :
 * Wizards are used to help users walk through a defined step-by-step process.
 * Each step is in the sidebar on the left. As users complete steps,
 * the steps are marked with a green bar to the left.
 */

/**
 * Step details for wizard
 * @param {stepName} Name or title for step this name will be used in
 * left side Navigation as well.
 * @param {stepComponent} React component for step
 * @param {stepId} unique ID to identfy the steo should start from 0
 * @param {showStepTitle} if false do not show step title
 * @param {stepCompleted} flag to check if step is valid and complete
 * @param {customStepNav} custom navigation details for step
 * @param {disableNav} if true then navigation for step is disabled
 * @param {stepFooter} custom footer for step
 * @param {isStepValid} function to check validity of step
 * @param {onStepSubmit} function to perform on step submission
 */
type WizardStep = {
    stepName: string;
    stepComponent: React.ReactNode;
    stepId: number;
    showStepTitle?: boolean;
    stepCompleted?: boolean;
    customStepNav?: WizardStepNavDetails;
    disableNav?: boolean;
    stepFooter?: React.ReactElement;
    isStepValid?: Function /* This function should return boolen value. And use to determine if step is valid or not */;
    onStepSubmit?: () => Promise<any> /* Function to perform on submittion of step at click of Next or Finish */;
};

type WizardStepNavDetails = {
    stepNavIcon?: string;
    stepNavTitle?: string;
    stepNavChildren?: React.ReactNode;
    onNavClick?: () => Promise<any>;
};

/**
 * Props for Wizard :
 * @param {isInline} if true then do not render border of wizard.
 * Used for rendering wizard in vSphere plugin
 * @param {style} CSS styles
 * @param {className} CSS classname
 * @param {show} if true show the wizard
 * @param {size} enum value for size of wizard
 * @param {title} wizard title
 * @param {steps} wizard steps
 * @param {defaultStepId} on which step wiazrd should open at first by default it will get open at first step
 * @param {showNav} if true it will show left side navigation on wizard
 * @param {closable} if true user can close the wizard
 * @param {onClose} callback function to call on close of wizard
 * @param {previousButtonText} custom text for previous button
 * @param {showPreviousButton} if true show previous button on wizard else hide
 * @param {onPrevious} callback function to call on click of previous button
 * @param {previousButtonClassName} extranla CSS for previous button
 * @param {nextButtonText} custom text for next button
 * @param {onNext} callback function to call on click of next button
 * @param {nextButtonClassName} extranla CSS for next button
 * @param {finishButtonText} custom text for finish button
 * @param {onFinish} callback function to call on click of finsih button
 * @param {finishButtonClassName} extranla CSS for finish button
 * @param {cancelButtonText} custom text for cancel button
 * @param {showCancelButton} if true show cancel button on wizard else hide
 * @param {cancelButtonClassName} extranla CSS for cancel button
 * @param {customFooter} custom footer for all steps
 * @param {navLinkClasses} extranal css class for navigation links
 * @param {validationType} validation type for wizard steps
 * @param {dataqa} Quality Engineering field
 */
type WizardProps = {
    isInline?: boolean;
    show?: boolean;
    size?: WizardSize;
    title?: any;
    steps: WizardStep[];
    defaultStepId?: number;
    showNav?: boolean;
    closable?: boolean;
    previousButtonText?: string;
    showPreviousButton?: boolean;
    onPrevious?: () => Promise<any>;
    previousButtonClassName?: string;
    nextButtonText?: string;
    onNext?: () => Promise<any>;
    nextButtonClassName?: string;
    finishButtonText?: string;
    onFinish?: Function;
    finishButtonClassName?: string;
    cancelButtonText?: string;
    showCancelButton?: boolean;
    cancelButtonClassName?: string;
    onClose?: Function;
    customFooter?: React.ReactElement;
    navLinkClasses?: string;
    validationType?: WizardValidationType;
    style?: any;
    className?: string;
    dataqa?: string;
};

/**
 * State for Wizard :
 * @param {show} if true show the wizard else close
 * @param {currentStepId} ID of active step in wizard startig form 0
 * @param {showFinishButton} if true show finish button of wizard
 * @param {showPreviousButton} if true show finish button of wizard
 * @param {showNextButton} if true show next button of wizard
 * @param {showCancelButton} if true show cancel button of wizard
 * @param {disableFinishButton} label to display for all items
 * @param {allSteps} wizard step data
 */
type WizardState = {
    show: boolean;
    currentStepId: number;
    showFinishButton: boolean;
    disableFinishButton: boolean;
    showPreviousButton: boolean;
    showNextButton: boolean;
    showCancelButton: boolean;
    disableNextButton: boolean;
    allSteps: WizardStep[];
};

/**
 * Enum for wizard sizes:
 * @param {MEDIUM} midum size wizard
 * @param {LARGE} large size wizard
 * @param {XLARGE} xtra-large size wizard
 */
export enum WizardSize {
    MEDIUM = "md",
    LARGE = "lg",
    XLARGE = "xl",
}

/**
 * Enum for sorting order :
 * @param {ASYNC} Asynchronous validation
 * @param {SYNC} Synchronous validation
 * @param {NONE} no validation
 */
export enum WizardValidationType {
    ASYNC = "Asynchronous",
    SYNC = "Synchronous",
    NONE = "None",
}

//Quality Engineering Fields
let dataqa_wizard = "prefix";
let dataqa_wizard_btn_cancel = "prefix_btn_cancel";
let dataqa_wizard_btn_previous = "prefix_btn_back";
let dataqa_wizard_btn_next = "prefix_btn_next";
let dataqa_wizard_btn_finish = "prefix_btn_finish";

export class Wizard extends React.PureComponent<WizardProps> {
    private divRef: HTMLDivElement | null = null;

    // By default Wizard will have following prop values
    static defaultProps = {
        isInline: false,
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
        showPreviousButton: this.props.showPreviousButton ? this.props.showPreviousButton : false,
        showCancelButton: this.props.showCancelButton ? this.props.showCancelButton : true,
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
        const {isInline} = this.props;
        if (this.divRef === null) {
            const el = document.createElement("div");
            document.body.appendChild(el);
            this.divRef = el;
        }
        if (isInline) {
            document.body.classList.add(ClassNames.NO_SCROLLING);
        }
    }

    private cleanup() {
        const {isInline} = this.props;
        if (this.divRef !== null) {
            document.body.removeChild(this.divRef);
            this.divRef = null;
        }
        if (isInline) {
            document.body.classList.remove(ClassNames.NO_SCROLLING);
        }
    }

    // Initialize state of wizard steps
    private initStepsState() {
        const {validationType, steps} = this.props;
        // For 1st step disable Next button for synchronous validation
        const disableNext = validationType === WizardValidationType.SYNC ? true : false;
        let disableFinish = this.state.disableFinishButton;

        // In case of single step wizard we need to disable Finish button for synchronous validation
        if (steps.length === 1) {
            disableFinish = disableNext;
        }

        steps.map((step, key) => {
            // Enable Nav for first step in case of Synchronous validation
            const disableNav =
                (step.stepId === 0 && validationType === WizardValidationType.SYNC) ||
                [WizardValidationType.ASYNC, WizardValidationType.NONE].includes(validationType!)
                    ? false
                    : true;

            this.setState({
                disableNextButton: this.state.disableNextButton !== disableNext ? disableNext : undefined,
                disableFinishButton: this.state.disableFinishButton !== disableFinish ? disableFinish : undefined,
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

    // Function to return details of current step
    getCurrentStepDetails() {
        return this.getStepObj(this.state.currentStepId);
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
            if (currenstStep.onStepSubmit) {
                currenstStep
                    .onStepSubmit()
                    .then(() => {
                        onNext && onNext();
                    })
                    .then(() => {
                        this.modifyButtonStates(nextStepId);
                    });
            } else if (onNext) {
                onNext().then(() => {
                    this.modifyButtonStates(nextStepId);
                });
            } else {
                this.modifyButtonStates(nextStepId);
            }
        }
    }

    previousButtonClick() {
        const {onPrevious} = this.props;
        const previousStepId = this.state.currentStepId - 1;

        if (onPrevious) {
            onPrevious().then(() => {
                if (previousStepId >= 0) {
                    this.modifyButtonStates(previousStepId);
                }
            });
        } else {
            this.modifyButtonStates(previousStepId);
        }
    }

    // Close the wizard on finish
    finishButtonClick() {
        const {onFinish, validationType, isInline} = this.props;
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
            if (currenstStep.onStepSubmit) {
                currenstStep.onStepSubmit().then(() => {
                    onFinish && onFinish();
                });
            } else {
                onFinish && onFinish();
            }
            if (!isInline) {
                this.close();
            }
        }
    }

    private modifyButtonStates(stepId: number) {
        const {steps, validationType, showPreviousButton, showCancelButton} = this.props;
        const step = this.getStepObj(stepId);
        this.scrollToTop();

        if (stepId === 0) {
            /* for first step : If currenst step is first step of workflow
          then hide privious button and show next button */
            this.setState({
                showPreviousButton: false,
                showNextButton: true,
                disableNextButton: !step.stepCompleted && validationType == WizardValidationType.SYNC ? true : false,
                showFinishButton: false,
                showCancelButton: showCancelButton !== undefined ? showCancelButton : true,
                currentStepId: step.stepId,
            });
        } else if (stepId === steps.length - 1) {
            /* for last step : If currenst step is last step of workflow
          then hide next button and show privious and finish buttons */
            this.setState({
                showPreviousButton: showPreviousButton !== undefined ? showPreviousButton : true,
                showFinishButton: true,
                disableFinishButton: !step.stepCompleted && validationType == WizardValidationType.SYNC ? true : false,
                showNextButton: false,
                showCancelButton: showCancelButton !== undefined ? showCancelButton : true,
                currentStepId: step.stepId,
            });
        } else {
            /* for in between step : If currenst step is not last or first step of workflow
        then show next , privious buttons and hide finish button */
            this.setState({
                showPreviousButton: showPreviousButton !== undefined ? showPreviousButton : true,
                showNextButton: true,
                disableNextButton: !step.stepCompleted && validationType == WizardValidationType.SYNC ? true : false,
                showFinishButton: false,
                showCancelButton: showCancelButton !== undefined ? showCancelButton : true,
                currentStepId: step.stepId,
            });
        }
    }

    // Function to call on left side navigation click
    navigationClick(stepId: number) {
        const step = this.getStepObj(stepId);

        if (step && step.customStepNav && step.customStepNav.onNavClick) {
            step.customStepNav.onNavClick().then(() => {
                this.modifyButtonStates(stepId);
            });
        } else {
            this.modifyButtonStates(stepId);
        }
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
        const {
            cancelButtonText, // prettier
            nextButtonText,
            previousButtonText,
            finishButtonText,
            nextButtonClassName,
            previousButtonClassName,
            finishButtonClassName,
            cancelButtonClassName,
            customFooter,
        } = this.props;

        const {showPreviousButton, showNextButton, showFinishButton, showCancelButton, currentStepId} = this.state;

        const stepObj = this.getStepObj(currentStepId);
        return (
            <div className={ClassNames.WIZARD_FOOTER}>
                <div className={ClassNames.WIZARD_FOOTER_BUTTON}>
                    {customFooter}
                    {stepObj.stepFooter}
                    {showCancelButton && (
                        <Button
                            key={cancelButtonText}
                            className={cancelButtonClassName}
                            link
                            dataqa={dataqa_wizard_btn_cancel}
                            onClick={this.close.bind(this)}
                        >
                            {cancelButtonText}{" "}
                        </Button>
                    )}

                    {showPreviousButton && (
                        <Button
                            key={previousButtonText}
                            className={previousButtonClassName}
                            dataqa={dataqa_wizard_btn_previous}
                            onClick={this.previousButtonClick.bind(this)}
                        >
                            {previousButtonText}{" "}
                        </Button>
                    )}

                    {showNextButton && (
                        <Button
                            key={nextButtonText}
                            className={nextButtonClassName}
                            primary
                            disabled={this.state.disableNextButton}
                            dataqa={dataqa_wizard_btn_next}
                            onClick={this.nextButtonClick.bind(this)}
                        >
                            {nextButtonText}{" "}
                        </Button>
                    )}

                    {showFinishButton && (
                        <Button
                            key={finishButtonText}
                            className={finishButtonClassName}
                            state={ButtonState.SUCCESS}
                            disabled={this.state.disableFinishButton}
                            dataqa={dataqa_wizard_btn_finish}
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

    // Build icon props if specified in WizardStep
    private buildStepIcon(step: WizardStep): IconProps | undefined {
        if (step.customStepNav !== undefined && step.customStepNav.stepNavIcon)
            return {shape: step.customStepNav.stepNavIcon};
        return undefined;
    }

    // Build DOM for Wizard NAV
    private buildWizardNav(): React.ReactElement {
        const {steps, title, showNav} = this.props;
        return (
            <VerticalNav
                className={classNames([ClassNames.WIZARD_STEPNAV_WRAPPER, ClassNames.NG_TNS])}
                style={Styles.WIZARD_STEPNAV_WRAPPER_STYLE}
            >
                <h2 className={ClassNames.WIZARD_TITLE}>
                    <span style={Styles.WIZARD_TITLE_STYLE}>{title}</span>
                </h2>
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
                                        icon={this.buildStepIcon(step)}
                                    >
                                        &nbsp;
                                        {step.customStepNav !== undefined && step.customStepNav.stepNavTitle
                                            ? step.customStepNav.stepNavTitle
                                            : step.stepName}
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
        const {
            size, // prettier
            closable,
            steps,
            isInline,
            style,
            className,
            dataqa,
        } = this.props;

        //replace prefix with incoming prop
        if (dataqa) this.updateDataQAStrings(dataqa);

        const wizardSize = "wizard-" + size;
        const modalSize = "modal-" + size;
        const buttonStyle: any = () => {
            if (isInline) {
                return {display: "inline-block !important"};
            }
        };

        return (
            <React.Fragment>
                <div
                    data-qa={dataqa_wizard}
                    className={classNames([
                        isInline && `${ClassNames.WIZARD_INLINE} ${ClassNames.WIZARD_NO_SHADOW}`,
                        ClassNames.WIZARD,
                        wizardSize,
                        ClassNames.NG_TNS,
                        ClassNames.WIZARD_OPEN,
                        className,
                    ])}
                    style={style}
                >
                    <span className="offscreen-focus-rebounder ng-tns-c167-4 ng-star-inserted" />
                    <div className={ClassNames.WIZARD_MODAL}>
                        <div
                            className={classNames([ClassNames.WIZARD_MODAL_DIALOG, modalSize])}
                            role="dialog"
                            aria-hidden="false"
                            aria-labelledby="clr-id-3"
                        >
                            <div _ngcontent-clarity-c167="" className="clr-sr-only ng-tns-c167-4" />
                            <div className={ClassNames.WIZARD_OUTER_WRAPPER} style={Styles.WIZARD_OUTER_WRAPPER}>
                                <div className={classNames([ClassNames.MODAL_CONTENT_WRAPPER, ClassNames.NG_TNS])}>
                                    {this.buildWizardNav()}
                                    <div className={classNames([ClassNames.MODAL_CONTENT, ClassNames.NG_TNS])}>
                                        <div className={classNames([ClassNames.MODAL_HEADER, ClassNames.NG_TNS])}>
                                            {closable && (
                                                <button
                                                    aria-label="Close"
                                                    className={classNames([
                                                        ClassNames.CLOSE,
                                                        ClassNames.NG_TNS,
                                                        ClassNames.NG_STAR_INSERTED,
                                                    ])}
                                                    type="button"
                                                    onClick={this.close.bind(this)}
                                                >
                                                    <Icon aria-hidden={true} shape="close" />
                                                </button>
                                            )}
                                            <div
                                                className={classNames([
                                                    ClassNames.MODAL_TITLE_WRAPPER,
                                                    ClassNames.NG_TNS,
                                                ])}
                                            >
                                                <h3
                                                    className={classNames([ClassNames.MODAL_TITLE, ClassNames.NG_TNS])}
                                                    style={Styles.MODAL_TITLE_STYLE}
                                                >
                                                    <span className={ClassNames.MODAL_TITLE_TEXT}>
                                                        {steps[this.state.currentStepId].showStepTitle !== false &&
                                                            steps[this.state.currentStepId].stepName}
                                                    </span>
                                                </h3>
                                            </div>
                                        </div>
                                        {/*Close modal-header */}
                                        <div className={ClassNames.MODAL_BODY}>{this.buildWizardSteps()}</div>{" "}
                                        {/*Close modal-body*/}
                                        {this.buildWizardFooter()}
                                    </div>
                                    {/*Close modal-content*/}
                                </div>
                                {/*Close modal-content-wrapper */}
                                <div className={ClassNames.MODAL_GHOST_WRAPPER}>
                                    <div className={ClassNames.MODAL_GHOST_1} style={Styles.MODAL_GHOST_1} />
                                    <div className={ClassNames.MODAL_GHOST_2} style={Styles.MODAL_GHOST_2} />
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

    updateDataQAStrings(dataqa: string) {
        let prefix = "prefix";
        dataqa_wizard_btn_cancel = dataqa_wizard_btn_cancel.replace(new RegExp("^" + prefix), dataqa);
        dataqa_wizard_btn_previous = dataqa_wizard_btn_previous.replace(new RegExp("^" + prefix), dataqa);
        dataqa_wizard_btn_next = dataqa_wizard_btn_next.replace(new RegExp("^" + prefix), dataqa);
        dataqa_wizard_btn_finish = dataqa_wizard_btn_finish.replace(new RegExp("^" + prefix), dataqa);
        dataqa_wizard = dataqa_wizard.replace(new RegExp("^" + prefix), dataqa);
    }

    // Function to keep scroll bar on top on step change
    scrollToTop() {
        document.getElementsByClassName("modal-body")[0].scrollTo(0, 0);
    }

    /* ##########  Wizard private methods end  ############ */

    render(): ReactNode {
        return this.props.show ? ReactDOM.createPortal(this.buildWizard(), this.divRef!) : null;
    }
}
