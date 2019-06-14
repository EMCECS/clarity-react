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
import {
    ProgressBar,
    ProgressBarStatus,
    ProgressBarType,
    ProgressBarAnimation,
    ProgressBarPosition,
} from "./ProgressBars";
import {Card, CardBlock, CardFooter, CardText, CardTitle} from "../cards";

storiesOf("ProgressBar", module)
    .add("ProgressBar Simple", () => (
        <div>
            <h4> Progress Bar </h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={10} max={100} style={{width: "50%"}}>
                    {" "}
                </ProgressBar>
            </div>
        </div>
    ))
    .add("ProgressBar Labled", () => (
        <div>
            <h4> Labled Progress Bar </h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={10} max={100} labeled={true} style={{width: "50%"}}>
                    {" "}
                </ProgressBar>
            </div>
        </div>
    ))
    .add("Indeterminate (Looping) Progress Bar", () => (
        <div>
            <h4>Indeterminate/Looping</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={100} max={100} className={ProgressBarAnimation.LOOP} style={{width: "50%"}}>
                    {" "}
                </ProgressBar>
            </div>
        </div>
    ))
    .add("Progress Bar with color", () => (
        <div>
            <h4>Normal</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={40} max={100} type={ProgressBarType.NORMAL} style={{width: "50%"}}>
                    {" "}
                </ProgressBar>
            </div>
            <br />

            <h4>Success</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={40} max={100} status={ProgressBarStatus.SUCCESS} style={{width: "50%"}}>
                    {" "}
                </ProgressBar>
            </div>
            <br />

            <h4>Danger/Warning</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={40} max={100} status={ProgressBarStatus.DANGER} style={{width: "50%"}}>
                    {" "}
                </ProgressBar>
            </div>
        </div>
    ))
    .add("Progress Bar with animation", () => (
        <div>
            <h4>Fed out</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={100} max={100} className={ProgressBarAnimation.FADE_OUT} style={{width: "50%"}}>
                    {" "}
                </ProgressBar>
            </div>
            <br />

            <h4>Flash Then Fade</h4>
            <div style={{width: "80%"}}>
                <ProgressBar
                    value={100}
                    max={100}
                    className={`${ProgressBarAnimation.FADE_OUT}  ${ProgressBarAnimation.FLASH}`}
                    style={{width: "50%"}}
                >
                    {" "}
                </ProgressBar>
            </div>
            <br />

            <h4>Flash Red, No Fade</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={100} max={100} className={ProgressBarAnimation.FLASH_DANGER} style={{width: "50%"}}>
                    {" "}
                </ProgressBar>
            </div>

            <h4>Labeled With Success Flash And Fade</h4>
            <div style={{width: "80%"}}>
                <ProgressBar
                    value={100}
                    max={100}
                    className={`${ProgressBarAnimation.FADE_OUT}  ${ProgressBarAnimation.FLASH}`}
                    labeled={true}
                    style={{width: "50%"}}
                >
                    {" "}
                </ProgressBar>
            </div>
        </div>
    ))
    .add("Static Progress Bar", () => (
        <div>
            <h4>Static Progress Bar</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={10} max={100} type={ProgressBarType.STATIC} style={{width: "50%"}}>
                    {" "}
                </ProgressBar>
            </div>
            <br />

            <h4>Labeled, Static Progress Bar</h4>
            <div style={{width: "80%"}}>
                <ProgressBar value={50} max={100} type={ProgressBarType.STATIC} labeled={true} style={{width: "50%"}}>
                    {" "}
                </ProgressBar>
            </div>
            <br />

            <h4>Red Static Progress Bar</h4>
            <div style={{width: "80%"}}>
                <ProgressBar
                    value={80}
                    max={100}
                    type={ProgressBarType.STATIC}
                    status={ProgressBarStatus.DANGER}
                    style={{width: "50%"}}
                >
                    {" "}
                </ProgressBar>
            </div>
        </div>
    ))
    .add("Progress Bar in Cards", () => (
        <div>
            <div className="clr-row">
                <Card header="Header" className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                    <CardBlock>
                        <ProgressBar value={50} max={100} position={ProgressBarPosition.TOP}>
                            {" "}
                        </ProgressBar>
                        <CardTitle>Card title</CardTitle>
                        <CardText>
                            Card content can contain text, links, images, data visualizations, lists and more.
                        </CardText>
                    </CardBlock>
                    <CardFooter>
                        <button className="btn btn-sm btn-link" onClick={action("onclick - footer action 1")}>
                            Footer Action 1
                        </button>
                    </CardFooter>
                </Card>
            </div>

            <div className="clr-row">
                <Card header="Header" className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                    <CardBlock>
                        <CardTitle>Card title</CardTitle>
                        <CardText>
                            Card content can contain text, links, images, data visualizations, lists and more.
                        </CardText>
                    </CardBlock>
                    <CardFooter>
                        <ProgressBar value={40} max={100}>
                            {" "}
                        </ProgressBar>
                        <button className="btn btn-sm btn-link" onClick={action("onclick - footer action 1")}>
                            Footer Action 1
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    ))
    .add("Static Progress Bar in Cards", () => (
        <div>
            <div className="clr-row">
                <Card header="Header" className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                    <CardBlock>
                        <ProgressBar
                            value={50}
                            max={100}
                            type={ProgressBarType.STATIC}
                            position={ProgressBarPosition.TOP}
                        >
                            {" "}
                        </ProgressBar>
                        <CardTitle>Card title</CardTitle>
                        <CardText>
                            Card content can contain text, links, images, data visualizations, lists and more.
                        </CardText>
                    </CardBlock>
                    <CardFooter>
                        <button className="btn btn-sm btn-link" onClick={action("onclick - footer action 1")}>
                            Footer Action 1
                        </button>
                    </CardFooter>
                </Card>
            </div>

            <div className="clr-row">
                <Card header="Header" className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                    <CardBlock>
                        <CardTitle>Card title</CardTitle>
                        <CardText>
                            Card content can contain text, links, images, data visualizations, lists and more.
                        </CardText>
                    </CardBlock>
                    <CardFooter>
                        <ProgressBar value={40} max={100} type={ProgressBarType.STATIC}>
                            {" "}
                        </ProgressBar>
                        <button className="btn btn-sm btn-link" onClick={action("onclick - footer action 1")}>
                            Footer Action 1
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    ));
