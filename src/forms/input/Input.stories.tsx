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
import {action} from "@storybook/addon-actions";
import {Input} from "./Input";
import {Icon} from "../../icon";

// onChange handler
const handleEvent = (evt: any) => {
    return action(
        `[new Date().toLocaleTimeString()] - evet triggered: ${evt && evt.type}, event value: ${evt &&
            evt.target &&
            evt.target.value}`,
    );
};

storiesOf("Input", module)
    .add("a simple input box", () => <Input name="somevalue" onChange={action("changed")} />)
    .add("a simple input box with value", () => <Input name="somevalue" value="Apple" onChange={action("changed")} />)
    .add("with a label", () => <Input name="somevalue" label="somevalue" onChange={action("changed")} />)
    .add("with placeholder text", () => (
        <Input name="somevalue" placeholder="stuff goes here" onChange={action("changed")} />
    ))
    .add("with helper text", () => (
        <div>
            <Input name="somevalue" helperText="this should help you figure it out" onChange={action("changed")} />
            <br /> <br />
            <Input
                name="somevalue"
                isBoxed
                helperText="this should help you figure it out"
                onChange={action("changed")}
            />
        </div>
    ))
    .add("when disabled", () => <Input name="somevalue" disabled={true} onChange={action("changed")} />)
    .add("input box with icon", () => (
        <Input name="somevalue" onChange={action("changed")} placeholder="Type to search ...">
            <Icon shape="search" style={{marginLeft: "-20px", width: "16px", height: "16px"}} />
        </Input>
    ))
    .add("input with number", () => (
        <Input name="somevalue" type={"number"} min={1} max={10} onChange={action("changed")} defaultValue={1} />
    ))
    .add("input with spell check off", () => <Input name="somevalue" onChange={action("changed")} spellCheck={false} />)
    .add("input box with custom width", () => (
        <div>
            <Input name="somevalue" placeholder="stuff goes here" onChange={action("changed")} style={{width: "40%"}} />
            <br />
            <Input
                name="somevalue"
                isBoxed
                placeholder="stuff goes here"
                onChange={action("changed")}
                style={{width: "40%"}}
            />
            <br />
            <Input
                name="somevalue"
                onChange={action("changed")}
                placeholder="Type to search ..."
                style={{width: "40%"}}
            >
                <Icon shape="search" style={{marginLeft: "-20px", width: "16px", height: "16px"}} />
            </Input>
        </div>
    ))
    .add("input box with error", () => (
        <div>
            <Input
                name="somevalue"
                placeholder="stuff goes here"
                style={{width: "20%"}}
                error={true}
                onBlur={action("select with error - blur")}
                onChange={action("select with error - change")}
                errorHelperText="This field is required"
            />
            <br /> <br />
            <Input
                name="somevalue"
                isBoxed
                error={true}
                errorTitle={"This field is required"}
                errorHelperText="This field is required"
                onBlur={action("select with error - blur")}
                onChange={action("select with error - change")}
            />
            <br />
            <Input
                name="somevalue"
                error={true}
                onBlur={action("select with error - blur")}
                onChange={action("select with error - change")}
                helperText="Provide search value"
            >
                <Icon shape="search" style={{marginLeft: "-20px", width: "16px", height: "16px"}} />
            </Input>
        </div>
    ))
    .add("input with title", () => (
        <Input name="somevalue" onChange={action("changed")} placeholder="input with title" title={"Title for input"} />
    ))
    .add("input with Debounce behaviour", () => {
        return (
            <Input
                name="somevalue"
                onChange={action("changed: after 5 secs", new Date().toLocaleTimeString())}
                placeholder="input with title"
                title={"Title for input"}
                debounceTime={5000}
            />
        );
    })
    .add("input type number with Debounce behaviour off", () => {
        return (
            <Input
                type="number"
                name="numberValue"
                onChange={action(`[new Date().toLocaleTimeString()] - change event triggered`)}
                onKeyDown={action(`[new Date().toLocaleTimeString()] - keyDown event triggered`)}
                onKeyPress={action(`[new Date().toLocaleTimeString()] - keyPress event triggered`)}
                placeholder="Input with type Number"
                title={"Title for input (type Number)"}
                debounce={"false"}
            />
        );
    })

    .add("input type number with Debounce behaviour ON", () => {
        return (
            <Input
                type="number"
                name="numberValue"
                onChange={action(`[new Date().toLocaleTimeString()] - change event triggered`)}
                onKeyDown={action(`[new Date().toLocaleTimeString()] - keyDown event triggered`)}
                onKeyPress={action(`[new Date().toLocaleTimeString()] - keyPress event triggered`)}
                placeholder="Input with type Number"
                title={"Title for input (type Number)"}
                // debounceTime={1000}
                // debounce={"true"}
            />
        );
    });
