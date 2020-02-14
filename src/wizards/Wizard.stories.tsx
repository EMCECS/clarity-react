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
import {storiesOf} from "@storybook/react";
import {State, Store} from "@sambego/storybook-state";
import {Wizard, WizardSize, WizardValidationType} from "./Wizard";
import {Button} from "../forms/button";
import {Badge, BadgeStatus, BadgeColor} from "../emphasis/badges";
import {CustomStepComponent} from "./CustomStepComponent";

const CustomStepComponentRef = React.createRef<CustomStepComponent>();
// Refrence to call step validation methods of wizard
const wizardSingleRefSync = React.createRef<Wizard>();

// Refrence to call resetWizard() of Wizard component
const wizardRef = React.createRef<Wizard>();

// Refrence to call step validation methods of wizard
const wizardRefSync = React.createRef<Wizard>();

// Refrence to call close methods of wizard
const wizardRefClose = React.createRef<Wizard>();

const SingleStep = [
    {
        stepName: "page 1",
        stepId: 0,
        stepComponent: <CustomStepComponent ref={CustomStepComponentRef} wizardRef={wizardSingleRefSync} stepId={0} />,
        onStepSubmit: () => CustomStepComponentRef.current!.resetComponent(),
        isStepValid: () => true,
    },
];

const stepsMedium = [
    {stepName: "page 1", stepId: 0, stepComponent: <p> Page 1</p>},
    {stepName: "page 2", stepId: 1, stepComponent: <p> Page 2</p>},
    {stepName: "page 3", stepId: 2, stepComponent: <p> Page 3</p>},
];

const stepsLarge = [
    {stepName: "page 1", stepId: 0, stepComponent: <p> Page 1</p>},
    {stepName: "page 2", stepId: 1, stepComponent: <p> Page 2</p>},
    {stepName: "page 3", stepId: 2, stepComponent: <p> Page 3</p>},
];

const stepsXLarge = [
    {stepName: "page 1", stepId: 0, stepComponent: <p> Page 1</p>, showStepTitle: false},
    {stepName: "page 2", stepId: 1, stepComponent: <p> Page 2</p>},
    {stepName: "page 3", stepId: 2, stepComponent: <p> Page 3</p>},
];

const stepsNavIcon = [
    {
        stepName: "Play",
        stepId: 0,
        stepComponent: <p> Play </p>,
        customStepNav: {
            stepNavIcon: "play",
            stepNavTitle: "Start",
            stepNavChildren: <Badge status={BadgeStatus.BADGE_INFO}>2</Badge>,
        },
    },
    {
        stepName: "Stop",
        stepId: 1,
        stepComponent: <p> Stop </p>,
        customStepNav: {stepNavIcon: "stop", stepNavChildren: <Badge color={BadgeColor.ORANGE}>3</Badge>},
    },
    {
        stepName: "Power",
        stepId: 2,
        stepComponent: <p> Power </p>,
        customStepNav: {stepNavIcon: "power", stepNavChildren: <Badge status={BadgeStatus.BADGE_DANGER}>15</Badge>},
    },
];

const stepsSyncValidation = [
    {
        stepName: "Step 1",
        stepId: 0,
        stepComponent: (
            <Button
                onClick={() => {
                    wizardRefSync.current!.checkStepValidity(0);
                }}
            >
                {" "}
                Finish Step 1{" "}
            </Button>
        ),
        isStepValid: () => true,
    },
    {
        stepName: "Step 2",
        stepId: 1,
        stepComponent: (
            <div>
                {" "}
                <Button
                    onClick={() => {
                        wizardRefSync.current!.checkStepValidity(1);
                    }}
                >
                    {" "}
                    Finish Step 2{" "}
                </Button>{" "}
            </div>
        ),
        isStepValid: () => true,
    },
    {
        stepName: "Step 3",
        stepId: 2,
        stepComponent: (
            <Button
                onClick={() => {
                    wizardRefSync.current!.checkStepValidity(2);
                }}
            >
                {" "}
                Finish Step 3{" "}
            </Button>
        ),
        isStepValid: () => true,
    },
];

const stepsAsyncValidation = [
    {stepName: "Step 1", stepId: 0, stepComponent: <p> Step 1 </p>, isStepValid: () => true},
    {stepName: "Step 2", stepId: 1, stepComponent: <p> Step 2 </p>, isStepValid: () => false},
    {
        stepName: "Step 3",
        stepId: 2,
        stepComponent: (
            <p>
                {" "}
                Step 3 <div> Error at Step 2</div>{" "}
            </p>
        ),
        isStepValid: () => true,
    },
];

// Function to close and reset wizard
const closeWizard = () => {
    return new Promise((resolve, reject) => {
        wizardRefClose.current!.close();
        wizardRefClose.current!.resetWizard();
        resolve();
    });
};

const stepclosewizard = [
    {stepName: "page 1", stepId: 0, stepComponent: <p> Page 1</p>, onStepSubmit: closeWizard},
    {stepName: "page 2", stepId: 1, stepComponent: <p> Page 2</p>, onStepSubmit: closeWizard},
    {stepName: "page 3", stepId: 2, stepComponent: <p> Page 3</p>, onStepSubmit: closeWizard},
];

const storeMedium = new Store({show: false});
const storeLarge = new Store({show: false});
const storeXlarge = new Store({show: false});
const storeSingleStep = new Store({show: false});
const storeDefaultState = new Store({show: false});
const storeCustomButtons = new Store({show: false});
const storeWithoutNav = new Store({show: false});
const storeNavWithIcon = new Store({show: false});
const storeSyncValidation = new Store({show: false});
const storeAsyncValidation = new Store({show: false});
const storeResetWizard = new Store({show: false});
const storeCloseWizard = new Store({show: false});

storiesOf("Wizard", module)
    .add("Wizard Sizes", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <Button onClick={() => storeMedium.set({show: true})}>MEDIUM</Button>
                <Button onClick={() => storeLarge.set({show: true})}>LARGE</Button>
                <Button onClick={() => storeXlarge.set({show: true})}>XLARGE</Button>
                <State store={storeMedium} key="store-1">
                    <Wizard
                        size={WizardSize.MEDIUM}
                        title="Medium-Sized Wizard"
                        steps={stepsMedium}
                        onClose={() => storeMedium.set({show: false})}
                    />
                </State>
                <State store={storeLarge} key="store-2">
                    <Wizard
                        size={WizardSize.LARGE}
                        title="Large-Sized Wizard"
                        steps={stepsLarge}
                        onClose={() => storeLarge.set({show: false})}
                    />
                </State>
                <State store={storeXlarge} key="store-3">
                    <Wizard
                        size={WizardSize.XLARGE}
                        title="XLarge-Sized Wizard"
                        steps={stepsXLarge}
                        onClose={() => storeXlarge.set({show: false})}
                    />
                </State>
            </div>
        </div>
    ))
    .add("Wizard with Single step ", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <Button onClick={() => storeSingleStep.set({show: true})}> Single Step </Button>
                <State store={storeSingleStep}>
                    <Wizard
                        ref={wizardSingleRefSync}
                        size={WizardSize.MEDIUM}
                        title="Wizard with Single Step"
                        steps={SingleStep}
                        validationType={WizardValidationType.SYNC}
                        onClose={() => storeSingleStep.set({show: false})}
                    />
                </State>
            </div>
        </div>
    ))
    .add("Wizard with deafult step ", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <Button onClick={() => storeDefaultState.set({show: true})}> OPEN AT STEP 2 </Button>
                <State store={storeDefaultState}>
                    <Wizard
                        size={WizardSize.MEDIUM}
                        title="Open Wizard at step 2"
                        steps={stepsMedium}
                        onClose={() => storeDefaultState.set({show: false})}
                        defaultStepId={1}
                    />
                </State>
            </div>
        </div>
    ))
    .add("Overriding wizard buttons", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <Button onClick={() => storeCustomButtons.set({show: true})}> Custom Wizard buttons </Button>
                <State store={storeCustomButtons}>
                    <Wizard
                        size={WizardSize.MEDIUM}
                        title="Custom and default buttons"
                        steps={stepsMedium}
                        onClose={() => storeCustomButtons.set({show: false})}
                        nextButtonText={"Custom Next"}
                        finishButtonText={"Done"}
                    />
                </State>
            </div>
        </div>
    ))
    .add("Wizard without NAV", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <Button onClick={() => storeWithoutNav.set({show: true})}> Wizard without NAV </Button>
                <State store={storeWithoutNav}>
                    <Wizard
                        size={WizardSize.MEDIUM}
                        title="Wizard Without Navigation Links"
                        steps={stepsMedium}
                        onClose={() => storeWithoutNav.set({show: false})}
                        showNav={false}
                    />
                </State>
            </div>
        </div>
    ))
    .add("Wizard with custom NAV", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <Button onClick={() => storeNavWithIcon.set({show: true})}> Wizard with Icon NAV </Button>
                <State store={storeNavWithIcon}>
                    <Wizard
                        size={WizardSize.MEDIUM}
                        title="Wizard with Icon Navigation Links"
                        steps={stepsNavIcon}
                        onClose={() => storeNavWithIcon.set({show: false})}
                    />
                </State>
            </div>
        </div>
    ))
    .add("Wizard with Reset", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <Button onClick={() => storeResetWizard.set({show: true})}> Reset on Finish </Button>
                <State store={storeResetWizard}>
                    <Wizard
                        ref={wizardRef}
                        size={WizardSize.MEDIUM}
                        title="Reset Wizard on Finish"
                        steps={stepsMedium}
                        onClose={() => storeResetWizard.set({show: false})}
                        onFinish={() => wizardRef.current!.resetWizard()}
                    />
                </State>
            </div>
        </div>
    ))
    .add("Wizard which will close on any step", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <Button onClick={() => storeCloseWizard.set({show: true})}> Wizard with Close on any Step </Button>
                <State store={storeCloseWizard}>
                    <Wizard
                        size={WizardSize.MEDIUM}
                        title="Wizard which can close on any step"
                        steps={stepclosewizard}
                        ref={wizardRefClose}
                        onClose={() => storeCloseWizard.set({show: false})}
                        nextButtonText={"Apply"}
                        finishButtonText={"Apply"}
                        showPreviousButton={false}
                    />
                </State>
            </div>
        </div>
    ))
    .add("Wizard Validation", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <Button onClick={() => storeSyncValidation.set({show: true})}> Synchronous validation </Button>
                <Button onClick={() => storeAsyncValidation.set({show: true})}> Asynchronous validation </Button>
                <State store={storeSyncValidation}>
                    <Wizard
                        ref={wizardRefSync}
                        size={WizardSize.MEDIUM}
                        title="Wizard with synchronous validation"
                        steps={stepsSyncValidation}
                        validationType={WizardValidationType.SYNC}
                        onClose={() => storeSyncValidation.set({show: false})}
                    />
                </State>

                <State store={storeAsyncValidation}>
                    <Wizard
                        size={WizardSize.MEDIUM}
                        title="Wizard with Asynchronous Validation"
                        steps={stepsAsyncValidation}
                        validationType={WizardValidationType.ASYNC}
                        onClose={() => storeAsyncValidation.set({show: false})}
                    />
                </State>
            </div>
        </div>
    ));
