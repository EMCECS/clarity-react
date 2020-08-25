/**
 * Copyright (c) 2020 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React, {ReactNode} from "react";
import {classNames} from "../utils";
import {ClassNames, Styles} from "./ClassNames";
import {VerticalNav} from "../layout/vertical-nav";
import {WizardStepProps, WizardStepType} from "./WizardStep";
import {Button} from "../forms/button";

type WizardNavigationProps = {
    id?: number;
    currentStepID: number;
    currentStepValid?: boolean;
    onSelectStep?: (stepID: number) => void;
    show?: boolean;
    showTitle?: boolean;
    title?: ReactNode;
};

export default class WizardNavigation extends React.PureComponent<WizardNavigationProps> {
    render() {
        const {title, show, children} = this.props;
        const classNamesList = classNames([ClassNames.WIZARD_STEPNAV_WRAPPER, ClassNames.NG_TNS]);
        return (
            <VerticalNav className={classNamesList} style={Styles.WIZARD_STEPNAV_WRAPPER_STYLE}>
                <h2 className={ClassNames.WIZARD_TITLE}>
                    <span style={Styles.WIZARD_TITLE_STYLE}>{title}</span>
                </h2>
                {show && <div className={ClassNames.WIZARD_STEPNAV}>{children}</div>}
            </VerticalNav>
        );
    }
}

export class WizardNavigationStep extends React.PureComponent<WizardStepProps> {
    handleNavigationClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        const {id, onSelectStep} = this.props;
        onSelectStep && onSelectStep(id, evt);
    };

    render() {
        const {name, navigationChildren, navigationIcon, navigationTitle, navigable, type} = this.props;
        return (
            <div
                className={this.navigationClasses()}
                style={type && type === WizardStepType.SUB_STEP ? Styles.WIZARD_SUB_STEP_NAV : undefined}
            >
                <Button
                    disabled={!navigable}
                    link={true}
                    className="clr-wizard-stepnav-link"
                    onClick={this.handleNavigationClick}
                    icon={navigationIcon === undefined ? undefined : {shape: navigationIcon}}
                >
                    {navigationTitle === undefined ? name : navigationTitle}
                    {navigationChildren}
                </Button>
            </div>
        );
    }

    private navigationClasses(): string {
        const {id, currentStepID, complete, valid} = this.props;
        return classNames([
            ClassNames.WIZARD_STEPNAV_LINK,
            id === currentStepID && ClassNames.ACTIVE,
            complete && ClassNames.COMPLETE,
            !valid && ClassNames.ERROR,
        ]);
    }
}
