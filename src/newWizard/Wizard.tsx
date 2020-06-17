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
import {ReactElement, ReactNode} from "react";
import {classNames} from "../utils";
import {ClassNames, Styles} from "./ClassNames";
import WizardNavigation, {WizardNavigationStep} from "./WizardNavigation";
import WizardHeader from "./WizardHeader";
import WizardStep from "./WizardStep";
import WizardFooter, {InheritedWizardFooterProps, WizardFooterProps} from "./WizardFooter";

/**
 * General component description :
 * Wizard :
 * Wizards are used to help users walk through a defined step-by-step process.
 * Each step is in the sidebar on the left. As users complete steps,
 * the steps are marked with a green bar to the left.
 */

/**
 * Props for Wizard :
 * @param {isInline} if true then do not render border of wizard.
 * Used for rendering wizard in vSphere plugin
 * @param {style} CSS styles
 * @param {className} CSS classname
 * @param {show} if true show the wizard
 * @param {size} enum value for size of wizard
 * @param {title} wizard title
 * @param {defaultStepID} on which step wizard should open at first by default it will get open at first step
 * @param {showNavigation} if true it will show left side navigation on wizard
 * @param {closable} if true user can close the wizard
 * @param {onClose} callback function to call on close of wizard
 * @param {previousText} custom text for previous button
 * @param {showPreviousButton} if true show previous button on wizard else hide
 * @param {onPrevious} callback function to call on click of previous button
 * @param {previousClassName} external CSS for previous button
 * @param {nextButtonText} custom text for next button
 * @param {onNext} callback function to call on click of next button
 * @param {nextClassName} external CSS for next button
 * @param {completeText} custom text for finish button
 * @param {onComplete} callback function to call on click of finish button
 * @param {completeClassName} external CSS for finish button
 * @param {cancelText} custom text for cancel button
 * @param {showCancel} if true show cancel button on wizard else hide
 * @param {cancelClassName} external CSS for cancel button
 * @param {customFooter} custom footer for all steps
 * @param {navLinkClasses} external css class for navigation links
 * @param {dataqa} Quality Engineering field
 */
export type WizardProps = {
    className?: string;
    children: ReactNode;
    dataqa?: string;
    defaultStepID?: number;
    showNavigation?: boolean;
    closable?: boolean;
    completeText?: string;
    isInline?: boolean;
    showPrevious?: boolean;
    previousClassName?: string;
    nextText?: string;
    nextClassName?: string;
    onClose?: (wizardState: WizardState, evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onComplete?: (wizardState: WizardState, evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onNext?: (wizardState: WizardState, evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onPrevious?: (wizardState: WizardState, evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    previousText?: string;
    completeClassName?: string;
    cancelText?: string;
    showCancel?: boolean;
    cancelClassName?: string;
    customFooter?: ((wizardState: WizardState, props: WizardFooterProps) => any) | any;
    navLinkClasses?: string;
    showStepTitle?: boolean;
    showTitle?: boolean;
    show: boolean;
    size: WizardSize;
    style?: Object;
    title?: ReactNode;
};

/**
 * State for Wizard :
 * @param {currentStepID} ID of active step in wizard startig form 0
 */
export type WizardState = {
    currentStepID: number;
};

type ProgressionStatus = {
    previousStepExists: boolean;
    nextStepExists: boolean;
    currentStepTitle: ReactNode;
    currentStepIsCompleteAndValid: boolean;
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

const modalContentWrapperClassNames = classNames([ClassNames.MODAL_CONTENT_WRAPPER, ClassNames.NG_TNS]);
const modalContentClassNames = classNames([ClassNames.MODAL_CONTENT, ClassNames.NG_TNS]);

export default class Wizard extends React.PureComponent<WizardProps, WizardState> {
    // By default Wizard will have following prop values
    static defaultProps = {
        isInline: false,
        previousText: "BACK",
        nextText: "NEXT",
        cancelText: "CANCEL",
        completeText: "FINISH",
        size: WizardSize.MEDIUM,
        showNavigation: true,
        showStepTitle: true,
        showTitle: true,
        onComplete: () => {
            // by default do nothing in addition the the default handler
        },
        onPrevious: () => {
            // by default do nothing in addition the the default handler
        },
        onNext: () => {
            // by default do nothing in addition the the default handler
        },
        onClose: () => {
            // by default do nothing in addition the the default handler
        },
    };

    constructor(props: WizardProps) {
        super(props);
        this.state = {
            currentStepID: props.defaultStepID || 0,
        };
    }

    // and this step's position in the list
    // progressionStatus determines the status of the wizard based on the current step properties
    private static progressionStatus(currentStepID: number, steps: ReadonlyArray<WizardStep>): ProgressionStatus {
        if (steps.length > 0 && steps[currentStepID]) {
            const currentStep = steps[currentStepID];
            return {
                previousStepExists: currentStepID !== steps[0].props.id,
                nextStepExists: currentStepID !== steps[steps.length - 1].props.id,
                currentStepIsCompleteAndValid: (currentStep.props.valid && currentStep.props.complete) || false,
                currentStepTitle: currentStep.props.name,
            };
        }
        return {
            previousStepExists: false,
            nextStepExists: false,
            currentStepIsCompleteAndValid: false,
            currentStepTitle: "",
        };
    }

    // footerProps is a convenience method for selecting a subset of properties to pass

    // Function to keep scroll bar on top on step change
    scrollToTop() {
        document.getElementsByClassName("modal-body")[0].scrollTo(0, 0);
    }

    handleNext = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const {onNext} = this.props;
        const {currentStepID} = this.state;
        onNext && onNext(this.state, evt);
        this.setState({currentStepID: currentStepID + 1});
    };

    handlePrevious = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const {onPrevious} = this.props;
        const {currentStepID} = this.state;
        if (currentStepID > 0) {
            onPrevious && onPrevious(this.state, evt);
            this.setState({currentStepID: currentStepID - 1});
        }
    };

    handleComplete = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const {onComplete} = this.props;
        // TODO reset wizard on completion
        onComplete && onComplete(this.state, evt);
        this.setState({currentStepID: 0});
    };

    handleClose = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const {onClose} = this.props;
        const {currentStepID} = this.state;
        onClose && onClose(this.state, evt);
        this.setState({currentStepID: currentStepID + 1});
    };

    handleSelectStep = (stepID: number) => {
        this.setState({currentStepID: stepID});
    };

    render() {
        const {currentStepID} = this.state;
        const {
            children,
            className,
            closable,
            dataqa,
            isInline,
            onClose,
            show,
            showCancel,
            showNavigation,
            showStepTitle,
            showTitle,
            title,
            size,
            style,
        } = this.props;

        // initialize a bunch of class names
        const wizardSize = "wizard-" + size;
        const modalSize = "modal-" + size;
        const wizardClassNames = classNames([
            isInline && `${ClassNames.WIZARD_INLINE} ${ClassNames.WIZARD_NO_SHADOW}`,
            ClassNames.WIZARD,
            wizardSize,
            ClassNames.NG_TNS,
            ClassNames.WIZARD_OPEN,
            className,
        ]);
        const modalClassNames = classNames([ClassNames.WIZARD_MODAL_DIALOG, modalSize]);

        // get a list of all of the step IDs in component children
        let navigable: boolean = true;
        const maybeSteps = React.Children.map(children, child => {
            if (React.isValidElement<WizardStep>(child) && child.type === WizardStep) {
                const step = React.cloneElement<WizardStep>(
                    child as ReactElement<WizardStep>,
                    Object.assign({}, child.props, {
                        currentStepID,
                        navigable,
                    }),
                );
                // subsequent iterations are navigable if all previous iterations are valid
                // @ts-ignore //step is of type WizardStep not ReactElement<WizardStep>
                navigable = navigable && step.props.valid && step.props.complete;
                return step;
            }
        }) as ReadonlyArray<ReactElement<WizardStep>>;
        const allStepsCompleteAndValid = navigable; // if navigable stayed true throughout, then the wizard is completed
        const steps = (maybeSteps ? maybeSteps : []).filter(el => el !== null); // compact the step list
        const {
            currentStepTitle,
            currentStepIsCompleteAndValid,
            nextStepExists,
            previousStepExists,
            // @ts-ignore // steps is actually of type ReadonlyArray<WizardStep> not ReadonlyArray<ReactElement<WizardStep>>
        } = Wizard.progressionStatus(currentStepID, steps);

        const navigationSteps = steps.map((step, index) => (
            // @ts-ignore // since step is of type WizardStep, name and id are ensured on WizardNavigationStep
            <WizardNavigationStep
                key={step.key || index}
                currentStepID={currentStepID}
                onSelectStep={this.handleSelectStep}
                {...step.props}
            />
        ));

        return (
            <React.Fragment>
                {show && (
                    <div data-qa={dataqa} className={wizardClassNames} style={style}>
                        <span className="offscreen-focus-rebounder ng-tns-c167-4 ng-star-inserted" />
                        <div className={ClassNames.WIZARD_MODAL}>
                            <div
                                className={modalClassNames}
                                role="dialog"
                                aria-hidden="false"
                                aria-labelledby="clr-id-3"
                            >
                                <div className="clr-sr-only ng-tns-c167-4" />
                                <div className={ClassNames.WIZARD_OUTER_WRAPPER} style={Styles.WIZARD_OUTER_WRAPPER}>
                                    <div className={modalContentWrapperClassNames}>
                                        <WizardNavigation
                                            currentStepID={currentStepID}
                                            show={showNavigation}
                                            showTitle={showTitle}
                                            title={title}
                                        >
                                            {navigationSteps}
                                        </WizardNavigation>
                                        <div className={modalContentClassNames}>
                                            <WizardHeader
                                                title={currentStepTitle}
                                                showTitle={showStepTitle}
                                                onClose={this.handleClose}
                                                closable={closable}
                                            />
                                            <div className={ClassNames.MODAL_BODY}>
                                                <div className={ClassNames.WIZARD_CONTENT}>{steps}</div>
                                            </div>
                                            <WizardFooter
                                                disableNext={!currentStepIsCompleteAndValid}
                                                disableComplete={!allStepsCompleteAndValid}
                                                showCancel={showCancel}
                                                showComplete={!nextStepExists}
                                                showNext={nextStepExists}
                                                showPrevious={previousStepExists}
                                                onClose={onClose}
                                                onComplete={this.handleComplete}
                                                onNext={this.handleNext}
                                                onPrevious={this.handlePrevious}
                                                {...this.footerProps()}
                                            />
                                        </div>
                                    </div>
                                    <div className={ClassNames.MODAL_GHOST_WRAPPER}>
                                        <div className={ClassNames.MODAL_GHOST_1} style={Styles.MODAL_GHOST_1} />
                                        <div className={ClassNames.MODAL_GHOST_2} style={Styles.MODAL_GHOST_2} />
                                    </div>
                                </div>
                            </div>
                            <div className={ClassNames.MODAL_BACKDROP} aria-hidden="true" />
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }

    // inherited properties from the Wizard to the WizardFooter
    private footerProps(): InheritedWizardFooterProps {
        const {
            cancelText,
            cancelClassName,
            completeClassName,
            completeText,
            customFooter,
            nextClassName,
            nextText,
            previousClassName,
            previousText,
            dataqa,
            showCancel,
        } = this.props;
        return {
            cancelText,
            cancelClassName,
            completeClassName,
            completeText,
            customFooter,
            nextClassName,
            nextText,
            previousClassName,
            previousText,
            dataqa,
            showCancel,
        };
    }
}
