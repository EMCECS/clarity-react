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
import {classNames} from "../utils";
import {ClassNames} from "./ClassNames";

// Enum for wizard step type
export enum WizardStepType {
    SUB_STEP = "subStep",
}

export type WizardStepProps = {
    name: string;
    id: number;
    currentStepID?: number;
    complete?: boolean;
    valid?: boolean;
    onNavigationClick?: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onSelectStep?: (step: number, evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    navigationIcon?: string;
    navigationTitle?: string;
    navigationChildren?: ReadonlyArray<React.ReactNode>;
    navigationClasses?: ReadonlyArray<string>;
    navigable?: boolean;
    type?: WizardStepType;
};

export default class WizardStep extends React.PureComponent<WizardStepProps> {
    static defaultProps = {
        complete: false,
        valid: true,
        navigationClasses: [],
    };

    render() {
        const {children, currentStepID, id} = this.props;
        const classNameList = classNames([ClassNames.ACTIVE, ClassNames.WIZARD_PAGE]);
        return (
            <div
                role="tabpanel"
                aria-labelledby="id"
                id={name}
                aria-hidden={id !== currentStepID}
                className={classNameList}
            >
                {children}
            </div>
        );
    }
}
