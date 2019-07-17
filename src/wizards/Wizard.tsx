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
import {classNames} from "../utils";
import {ClassNames} from "./ClassNames";
import {Button, ButtonState} from "../forms/button";
import {VerticalNav} from "../layout/vertical-nav";
import {NavLink, NavLinkType} from "../layout/nav";

export type WizardStep = {
    stepName: string;
    stepComponent: React.ReactNode;
    stepId: number;
    stepCompleted: boolean;
    isStepValid?: Function /* This function should return boolen value. And use to determine if step is valid or not */;
};

type WizardProps = {
    show?: boolean;
    size?: WizardSize;
    title?: string;
    steps: WizardStep[];
    defaultStep?: number;
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
};

type WizardState = {
    show: boolean;
    currentStep: number;
    showFinishButton: boolean;
    showPriviousButton: boolean;
    showNextButton: boolean;
    allSteps: WizardStep[];
};

export enum WizardSize {
    MEDIUM = "md",
    LARGE = "lg",
    XLARGE = "xl",
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
        defaultStep: 1,
    };

    // Initial state of wizard
    state: WizardState = {
        show: this.props.show !== undefined ? this.props.show : false,
        currentStep: this.props.defaultStep! - 1 || 0,
        showFinishButton: false,
        showPriviousButton: false,
        showNextButton: true,
        allSteps: this.props.steps,
    };

    /* ##########  Wizard lifestyle hooks start  ############ */
    componentWillMount() {
        this.createRefDiv();
    }

    createRefDiv() {
        if (this.divRef === null) {
            const el = document.createElement("div");
            document.body.appendChild(el);
            this.divRef = el;
        }
        document.body.classList.add(ClassNames.NO_SCROLLING);
    }

    cleanup() {
        if (this.divRef !== null) {
            document.body.removeChild(this.divRef);
            this.divRef = null;
        }
        document.body.classList.remove(ClassNames.NO_SCROLLING);
    }

    componentWillUnmount() {
        this.cleanup();
    }

    /* ##########  Wizard lifestyle hooks end  ############ */

    /* ##########  Wizard private methods start  ############ */

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

    nextButtonClick() {
        const {onNext, steps} = this.props;
        const nextStepId = this.state.currentStep + 1;
        console.log("in Next");
        console.log(nextStepId);

        // Check validity of current step before going next
        const validState = this.checkStepValidity(this.state.allSteps[this.state.currentStep]);

        if (validState && nextStepId <= steps.length - 1) this.modifyButtonStates(this.state.allSteps[nextStepId]);

        onNext && onNext();
    }

    priviousButtonClick() {
        const {onPrevious} = this.props;
        const priviousStepId = this.state.currentStep - 1;

        if (priviousStepId >= 0) this.modifyButtonStates(this.state.allSteps[priviousStepId]);

        onPrevious && onPrevious();
    }

    // Close the wizard on finish
    finishButtonClick() {
        const {onFinish} = this.props;
        onFinish && onFinish();
        this.close();
    }

    modifyButtonStates(step: WizardStep) {
        const {steps} = this.props;
        console.log("in modify button");
        console.log(step.stepId);
        if (step.stepId == 0) {
            /* for first step : If currenst step is first step of workflow
          then hide privious button and show next button */
            this.setState({
                showPriviousButton: false,
                showNextButton: true,
                showFinishButton: false,
                currentStep: step.stepId,
            });
        } else if (step.stepId == steps.length - 1) {
            /* for last step : If currenst step is last step of workflow
          then hide next button and show privious and finish buttons */
            this.setState({
                showPriviousButton: true,
                showFinishButton: true,
                showNextButton: false,
                currentStep: step.stepId,
            });
        } else {
            /* for in between step : If currenst step is not last or first step of workflow
        then show next , privious buttons and hide finish button */
            this.setState({
                showPriviousButton: true,
                showNextButton: true,
                showFinishButton: false,
                currentStep: step.stepId,
            });
        }
    }

    navigationClick(step: WizardStep) {
        // TODO : Do we need to check validity here ?
        this.modifyButtonStates(step);
    }

    getStepNavClasses(step: WizardStep) {
        let classNames = [ClassNames.WIZARD_STEPNAV_LINK];

        if (this.state.currentStep == step.stepId) classNames.push(ClassNames.ACTIVE);
        if (this.state.allSteps[step.stepId].stepCompleted) classNames.push(ClassNames.COMPLETE);
        if (this.props.navLinkClasses) classNames.push(this.props.navLinkClasses);
        // TODO: Add class error if step is not valid
        return classNames;
    }

    // Check validity of given step
    checkStepValidity(step: WizardStep) {
        let validationState = true;
        if (this.state.allSteps[step.stepId].isStepValid !== undefined)
            validationState = this.state.allSteps[step.stepId].isStepValid!();

        this.setState({
            allSteps: [...this.state.allSteps, (this.state.allSteps[step.stepId].stepCompleted = validationState)],
        });

        return validationState;
    }

    // Build DOM for Wizard footer
    buildWizardFooter(): React.ReactElement {
        const {cancelButtonText, nextButtonText, previousButtonText, finishButtonText} = this.props;

        return (
            <div className={ClassNames.WIZARD_FOOTER}>
                <div className={ClassNames.WIZARD_FOOTER_BUTTON}>
                    <Button key={cancelButtonText} link onClick={this.close.bind(this)}>
                        {cancelButtonText}{" "}
                    </Button>

                    {this.state.showPriviousButton && (
                        <Button key={previousButtonText} onClick={this.priviousButtonClick.bind(this)}>
                            {previousButtonText}{" "}
                        </Button>
                    )}

                    {this.state.showNextButton && (
                        <Button key={nextButtonText} primary onClick={this.nextButtonClick.bind(this)}>
                            {nextButtonText}{" "}
                        </Button>
                    )}

                    {this.state.showFinishButton && (
                        <Button
                            key={finishButtonText}
                            state={ButtonState.SUCCESS}
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
    buildWizardNav(): React.ReactElement {
        const {steps, title, showNav} = this.props;

        return (
            <VerticalNav className={ClassNames.WIZARD_STEPNAV_WRAPPER}>
                <h3 className={ClassNames.WIZARD_TITLE}> {title} </h3>
                {showNav && (
                    <div className={ClassNames.WIZARD_STEPNAV}>
                        {steps.map((step, key) => {
                            return (
                                <NavLink
                                    type={NavLinkType.stepNavLink}
                                    className={classNames(this.getStepNavClasses(step))}
                                    onClick={this.navigationClick.bind(this, step)}
                                >
                                    {step.stepName}
                                </NavLink>
                            );
                        })}
                    </div>
                )}
            </VerticalNav>
        );
    }

    // Build DOM for wizard step
    buildWizardSteps(): React.ReactElement {
        const {steps} = this.props;

        return (
            <div className={ClassNames.WIZARD_CONTENT}>
                {steps.map((step, key) => {
                    const hideStep = step.stepId == this.state.currentStep ? false : true;
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

    buildWizard(): React.ReactElement {
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
                            <div className={ClassNames.WIZARD_OUTER_WRAPPER} style={{height: "100%", width: "100%"}}>
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
                                            <h3 className={ClassNames.MODAL_TITLE} style={{paddingTop: "0.5rem"}}>
                                                <span className={ClassNames.MODAL_TITLE_TEXT}>
                                                    {steps[this.state.currentStep].stepName}
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
                                        className="modal-ghost modal-ghost-1 ng-trigger ng-trigger-ghostPageOneState"
                                        style={{left: "-24px"}}
                                    />
                                    <div
                                        _ngcontent-c7=""
                                        className="modal-ghost modal-ghost-2 ng-trigger ng-trigger-ghostPageTwoState"
                                        style={{left: "-24px", top: "24px", bottom: "24px"}}
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
