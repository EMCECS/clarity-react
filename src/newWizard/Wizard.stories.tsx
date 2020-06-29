/**
 * Copyright (c) 2020 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React from "react";
import {storiesOf} from "@storybook/react";
import {Wizard, WizardSize, WizardStep} from ".";
import {State, Store} from "@sambego/storybook-state";
import {Button} from "../forms/button";
import {Input} from "../forms/input/Input";
import {Select, SelectOption} from "../forms/select";
import {WizardFooterProps} from "./WizardFooter";
import {action} from "@storybook/addon-actions";

const store = new Store({
    open: false,
    activeWizard: "",
    basicInfoValid: true,
    basicInfoComplete: false,
    currentWizardStepID: 0,
    handleToggleWizard: (size: string) =>
        store.set({
            open: true,
            activeWizard: size,
        }),
    handleClose: (): void =>
        store.set({
            open: false,
        }),
    handleNext: (): void => {
        action("next");
        store.set({
            currentWizardStepID: store.get("currentWizardStepID") + 1,
        });
    },
    handlePrevious: (): void =>
        action("previous") &&
        store.set({
            currentWizardStepID: store.get("currentWizardStepID") - 1,
        }),
    handleComplete: (): void =>
        action("complete") &&
        store.set({
            open: false,
        }),
    handleSelectStep: (selectedStepID: number): void => {
        action("selected step ", selectedStepID) &&
            store.set({
                currentWizardStepID: selectedStepID,
            });
    },
    handleValidate: (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        if (evt.target.value.length > 2) {
            store.set({
                basicInfoValid: true,
                basicInfoComplete: true,
            });
        } else {
            store.set({
                basicInfoValid: false,
                basicInfoComplete: false,
            });
        }
    },
});

storiesOf("New Wizard", module)
    .add("Wizard Sizes", _props => (
        <State store={store}>
            {state => (
                <React.Fragment>
                    <p>Click to activate a wizard of the described size</p>
                    <Button key={0} primary link onClick={() => state.handleToggleWizard(WizardSize.MEDIUM)}>
                        MEDIUM
                    </Button>
                    <Button key={1} primary link onClick={() => state.handleToggleWizard(WizardSize.LARGE)}>
                        LARGE
                    </Button>
                    <Button key={2} primary link onClick={() => state.handleToggleWizard(WizardSize.XLARGE)}>
                        X-LARGE
                    </Button>

                    <Wizard
                        currentStepID={state.currentWizardStepID}
                        key={3}
                        size={WizardSize.MEDIUM}
                        show={state.open && state.activeWizard === WizardSize.MEDIUM}
                        showCancel={true}
                        onClose={() => state.handleClose()}
                        onNext={state.handleNext}
                        onPrevious={state.handlePrevious}
                        onComplete={state.handleComplete}
                        onNavigateTo={state.handleSelectStep}
                        title="Medium Wizard"
                    >
                        <WizardStep
                            id={0}
                            name="Basic Information"
                            valid={state.basicInfoValid}
                            complete={state.basicInfoComplete}
                        >
                            <React.Fragment>
                                <Input label="Name" name="name" onChange={state.handleValidate} />
                                <Input
                                    label="Height (feet)"
                                    defaultValue={1}
                                    max={10}
                                    min={1}
                                    name="heightFeet"
                                    type="number"
                                    onChange={state.handleValidate}
                                />
                                <Input
                                    label="Height (inches)"
                                    defaultValue={1}
                                    max={10}
                                    min={1}
                                    name="heightInches"
                                    type="number"
                                    onChange={state.handleValidate}
                                />
                                <Input label="Weight" name="weight" placeholder="lbs" onChange={state.handleValidate} />
                                <Select value="3" label="Gender" onChange={state.handleValidate}>
                                    <SelectOption value="1"> Male </SelectOption>
                                    <SelectOption value="2"> Female </SelectOption>
                                    <SelectOption value="3"> Non-binary </SelectOption>
                                </Select>
                            </React.Fragment>
                        </WizardStep>

                        <WizardStep id={1} name="Power" />

                        <WizardStep id={2} name="Weakness" />

                        <WizardStep id={3} name="Summary" />
                    </Wizard>
                    <Wizard
                        currentStepID={state.currentWizardStepID}
                        key={4}
                        size={WizardSize.LARGE}
                        show={state.open && state.activeWizard === WizardSize.LARGE}
                        title="Medium Wizard"
                        onClose={state.handleClose}
                        onNavigateTo={state.handleSelectStep}
                    >
                        <WizardStep id={0} key={0} name={"Page 1"} />
                        <WizardStep id={1} key={1} name={"Page 2"} />
                    </Wizard>
                    <Wizard
                        currentStepID={state.currentWizardStepID}
                        key={5}
                        size={WizardSize.XLARGE}
                        show={state.open && state.activeWizard === WizardSize.XLARGE}
                        title="Medium Wizard"
                        onClose={state.handleClose}
                        onNext={state.handleNext}
                        onPrevious={state.handlePrevious}
                        onComplete={state.handleComplete}
                        onNavigateTo={state.handleSelectStep}
                    >
                        <WizardStep id={0} key={0} name={"Page 1"} />
                        <WizardStep id={1} key={1} name={"Page 2"} />
                    </Wizard>
                </React.Fragment>
            )}
        </State>
    ))
    .add("wizard with rich titles", _props => (
        <State store={store}>
            {state => (
                <React.Fragment>
                    <Button key={0} primary link onClick={() => state.handleToggleWizard(WizardSize.MEDIUM)}>
                        OPEN WIZARD
                    </Button>
                    <Wizard
                        currentStepID={state.currentWizardStepID}
                        key={1}
                        size={WizardSize.MEDIUM}
                        show={state.open}
                        title={<h1>Rich Text Wizard Title</h1>}
                        onClose={() => state.handleClose()}
                        onNext={() => state.handleNext()}
                        onPrevious={() => state.handlePrevious()}
                        onComplete={() => state.handleComplete()}
                        onNavigateTo={state.handleSelectStep}
                    >
                        <WizardStep id={0} key={0} name={"Page 1"} />
                    </Wizard>
                </React.Fragment>
            )}
        </State>
    ))
    .add("wizard with custom footer", _props => (
        <State store={store}>
            {state => (
                <React.Fragment>
                    <Button key={0} primary link onClick={() => state.handleToggleWizard(WizardSize.LARGE)}>
                        OPEN WIZARD
                    </Button>
                    <Wizard
                        currentStepID={state.currentWizardStepID}
                        key={1}
                        size={WizardSize.LARGE}
                        show={state.open}
                        title="Wizard with custom footer"
                        onClose={() => state.handleClose()}
                        onNext={() => state.handleNext()}
                        onPrevious={() => state.handlePrevious()}
                        onComplete={() => state.handleComplete()}
                        customFooter={(props: WizardFooterProps) =>
                            !props.disableComplete && <Input helperText="Save As" name="save-as" />
                        }
                        onNavigateTo={state.handleSelectStep}
                    >
                        <WizardStep
                            id={0}
                            key={0}
                            name={"Page 1"}
                            valid={state.basicInfoValid}
                            complete={state.basicInfoValid}
                        >
                            <Input name="some-input" label="Some Input" onChange={state.handleValidate} />
                        </WizardStep>
                    </Wizard>
                </React.Fragment>
            )}
        </State>
    ));
