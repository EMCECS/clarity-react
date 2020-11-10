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
import {Icon} from "../../icon";
import {SignPost, SignPostDirection} from ".";
import {action} from "@storybook/addon-actions";
import {Button} from "../button";

storiesOf("Signposts", module)
    .add("Top left position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.TOP_LEFT}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <Button key="primary" onClick={action("basic click")}>
                        PRIMARY
                    </Button>
                    <p>sample data here ...</p>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ))
    .add("Top middle position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.TOP_MIDDLE}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <p>sample data here ...</p>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ))
    .add("Top right position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.TOP_RIGHT} openAt={<Icon shape="help-info" size={34} />}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ))
    .add("Right top position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.RIGHT_TOP}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <p>sample data here ...</p>
                    <Button key="primary" onClick={action("basic click")}>
                        PRIMARY
                    </Button>
                </SignPost>
            </div>
        </div>
    ))
    .add("Right middle position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.RIGHT_MIDDLE} openAt={<Icon shape="inbox" size={40} />}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <p>sample data here ...</p>
                    <p>sample data here ...</p>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ))
    .add("Right bottom position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.RIGHT_BOTTOM}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ))
    .add("Bottom right position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.BOTTOM_RIGHT}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ))
    .add("Bottom middle position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.BOTTOM_MIDDLE}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <p>sample data here ...</p>
                    <p>sample data here ...</p>
                    <p>sample data here ...</p>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ))
    .add("Bottom left position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.BOTTOM_LEFT}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <p>sample data here ...</p>
                    <Button key="primary" onClick={action("basic click")}>
                        PRIMARY
                    </Button>
                </SignPost>
            </div>
        </div>
    ))
    .add("Left top position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.LEFT_TOP}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ))
    .add("Left middle position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.LEFT_MIDDLE}>
                    <h3 style={{marginTop: "0px"}}>Inline signpost</h3>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ))
    .add("Left bottom position", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.LEFT_BOTTOM} showCloseButton={false}>
                    <h3 style={{marginTop: "0px"}}>No close button</h3>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ))
    .add("SingPost with custom link", () => (
        <div style={{paddingTop: "250px", paddingLeft: "300px"}}>
            <div style={{float: "left"}}>
                <SignPost direction={SignPostDirection.TOP_MIDDLE} openAt={<span> Open SignPost </span>}>
                    <h3 style={{marginTop: "0px"}}>Title</h3>
                    <p>sample data here ...</p>
                </SignPost>
            </div>
        </div>
    ));
