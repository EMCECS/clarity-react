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
//import {Modal, ModalSize, ModalBody, ModalFooter} from "./Modal";
import {Button} from "../forms/button";
//import {Wizard, WizardStep, WizardSize} from "./Wizard"

import {Wizard, WizardSize} from "./Wizard";

const stepsMedium = [
    {stepName: "page 1", stepId: 0, stepComponent: <p> Page 1</p>, stepCompleted: false},
    {stepName: "page 2", stepId: 1, stepComponent: <p> Page 2</p>, stepCompleted: false},
    {stepName: "page 3", stepId: 2, stepComponent: <p> Page 3</p>, stepCompleted: false},
];

const stepsLarge = [
    {stepName: "page 1", stepId: 0, stepComponent: <p> Page 1</p>, stepCompleted: false},
    {stepName: "page 2", stepId: 1, stepComponent: <p> Page 2</p>, stepCompleted: false},
    {stepName: "page 3", stepId: 2, stepComponent: <p> Page 3</p>, stepCompleted: false},
];

const stepsXLarge = [
    {stepName: "page 1", stepId: 0, stepComponent: <p> Page 1</p>, stepCompleted: false},
    {stepName: "page 2", stepId: 1, stepComponent: <p> Page 2</p>, stepCompleted: false},
    {stepName: "page 3", stepId: 2, stepComponent: <p> Page 3</p>, stepCompleted: false},
];

const storeMedium = new Store({show: false});

const storeLarge = new Store({show: false});

const storeXlarge = new Store({show: false});

const storeDefaultState = new Store({show: false});

const storeCustomButtons = new Store({show: false});
const storeWithoutNav = new Store({show: false});

storiesOf("Wizard", module)
    .add("Wizard Sizes", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <State store={storeMedium} key="store-1">
                    <Button onClick={() => storeMedium.set({show: true})}>MEDIUM</Button>
                    <Wizard
                        size={WizardSize.MEDIUM}
                        title="Medium-Sized Wizard"
                        steps={stepsMedium}
                        onClose={() => storeMedium.set({show: false})}
                    />
                </State>

                <State store={storeLarge} key="store-2">
                    <Button onClick={() => storeLarge.set({show: true})}>LARGE</Button>
                    <Wizard
                        size={WizardSize.LARGE}
                        title="Large-Sized Wizard"
                        steps={stepsLarge}
                        onClose={() => storeLarge.set({show: false})}
                    />
                </State>

                <State store={storeXlarge} key="store-3">
                    <Button onClick={() => storeXlarge.set({show: true})}>XLARGE</Button>
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
    .add("Wizard with deafult step ", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <State store={storeDefaultState}>
                    <Button onClick={() => storeDefaultState.set({show: true})}> OPEN AT STEP 2 </Button>
                    <Wizard
                        size={WizardSize.MEDIUM}
                        title="Open Wizard at step 2"
                        steps={stepsMedium}
                        onClose={() => storeDefaultState.set({show: false})}
                        defaultStep={2}
                    />
                </State>
            </div>
        </div>
    ))
    .add("Overriding wizard buttons", () => (
        <div className="clr-row">
            <div className="clr-col-12">
                <State store={storeCustomButtons}>
                    <Button onClick={() => storeCustomButtons.set({show: true})}> Custom Wizard buttons </Button>
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
                <State store={storeWithoutNav}>
                    <Button onClick={() => storeWithoutNav.set({show: true})}> Wizard without NAV </Button>
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
    ));
