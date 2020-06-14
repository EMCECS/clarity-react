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
import {ReactElement, ReactNode} from "react";
import {classNames} from "../utils";
import {ClassNames, Styles} from "./ClassNames";
import WizardNavigation from "./WizardNavigation";
import WizardHeader from "./WizardHeader";
import WizardFooter, {InheritedWizardFooterProps} from "./WizardFooter";
import {WizardStep} from "./index";

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
 * @param {validationType} validation type for wizard steps
 * @param {dataqa} Quality Engineering field
 */
type WizardProps = {
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
    onClose?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onComplete?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onNext?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onPrevious?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    previousText?: string;
    completeClassName?: string;
    cancelText?: string;
    showCancel?: boolean;
    cancelClassName?: string;
    customFooter?: React.ReactElement;
    navLinkClasses?: string;
    validationType?: WizardValidationType;
    showStepTitle?: boolean;
    showTitle?: boolean;
    show: boolean;
    size: WizardSize;
    style?: Object;
    title?: string;
};

/**
 * State for Wizard :
 * @param {currentStepID} ID of active step in wizard startig form 0
 */
type WizardState = {
    currentStepID: number;
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

const modalContentWrapperClassNames = classNames([ClassNames.MODAL_CONTENT_WRAPPER, ClassNames.NG_TNS]);
const modalContentClassNames = classNames([ClassNames.MODAL_CONTENT, ClassNames.NG_TNS]);

export class Wizard extends React.PureComponent<WizardProps, WizardState> {
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
        validationType: WizardValidationType.NONE,
        // onClose: () => {
        //     by default do nothing on click, since a non-closable wizard won't
        //     be clickable
        // },
        onComplete: () => {
            // by default do nothing on click, since a non-closable wizard won't
            // be clickable
        },
        onPrevious: () => {
            // by default do nothing on click, since a non-closable wizard won't
            // be clickable
        },
        onNext: () => {
            // by default do nothing on click, since a non-closable wizard won't
            // be clickable
        },
    };

    constructor(props: WizardProps) {
        super(props);
        this.state = {
            currentStepID: props.defaultStepID || 0,
        };
    }

    // Function to keep scroll bar on top on step change
    scrollToTop() {
        document.getElementsByClassName("modal-body")[0].scrollTo(0, 0);
    }

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

    handleNext = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const {onNext} = this.props;
        const {currentStepID} = this.state;
        this.setState({currentStepID: currentStepID + 1});
        onNext && onNext(evt);
    };

    handlePrevious = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const {onPrevious} = this.props;
        const {currentStepID} = this.state;
        if (currentStepID > 0) {
            this.setState({currentStepID: currentStepID - 1});
        }
        onPrevious && onPrevious(evt);
    };

    handleSelectStep = (stepID: number) => {
        this.setState({currentStepID: stepID});
    };

    render() {
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

        // determine which buttons to show based on our position in the steps
        const {currentStepID} = this.state;
        // get a list of all of the step IDs in component children
        const maybeSteps = React.Children.map(children, child => {
            if (React.isValidElement<WizardStep>(child)) {
                return (child as ReactElement<WizardStep>).props;
            }
        }) as ReadonlyArray<WizardStep>;
        const steps = (maybeSteps ? maybeSteps : []).filter(el => el !== null); // compact down the step list

        // extract the position & info about the current step
        const showComplete = (steps.length > 0 && currentStepID === steps[steps.length - 1].id) || undefined;
        const showPrevious = (steps.length > 0 && currentStepID !== steps[0].id) || undefined;
        const showNext = (steps.length > 0 && currentStepID !== steps[steps.length - 1].id) || undefined;
        const stepTitle = (steps.length > 0 && steps[currentStepID] && steps[currentStepID].name) || undefined;

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
                                            onSelectStep={this.handleSelectStep}
                                            show={showNavigation}
                                            showTitle={showTitle}
                                            title={title}
                                        >
                                            {children}
                                        </WizardNavigation>
                                        <div className={modalContentClassNames}>
                                            <WizardHeader
                                                title={stepTitle}
                                                showTitle={showStepTitle}
                                                onClose={onClose}
                                                closable={closable}
                                            />
                                            <div className={ClassNames.MODAL_BODY}>
                                                <div className={ClassNames.WIZARD_CONTENT}>
                                                    {React.Children.map(children, child => {
                                                        if (!React.isValidElement<WizardStep>(child)) {
                                                            return child;
                                                        }
                                                        return React.cloneElement<WizardStep>(
                                                            child as ReactElement<WizardStep>,
                                                            Object.assign({}, child.props, {currentStepID}),
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <WizardFooter
                                                currentStepID={currentStepID}
                                                disableNext={false}
                                                disableComplete={false}
                                                showCancel={showCancel}
                                                showComplete={showComplete}
                                                showNext={showNext}
                                                showPrevious={showPrevious}
                                                onClose={onClose}
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
}
