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
import {ToolTip, ToolTipDirection, ToolTipSize} from "./ToolTip";

storiesOf("ToolTip", module)
    .add("Tooltip sizes", () => (
        <div style={{paddingTop: "75px"}}>
            <div style={{float: "left"}}>
                <ToolTip size={ToolTipSize.EXTRA_SMALL}>Lorem</ToolTip>
                Extra Small
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.SMALL}>Lorem ipsum sit</ToolTip>
                Small
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM}>Loren ipsum dolor sit amet, ipsum</ToolTip>
                Medium
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.LARGE}>Loren ipsum dolor sit amet, consectetur adipisicing elit</ToolTip>
                Large
            </div>
        </div>
    ))
    .add("Tooltip directions", () => (
        <div style={{paddingTop: "75px"}}>
            <div style={{float: "left"}}>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} direction={ToolTipDirection.TOP_RIGHT}>
                    Lorem
                </ToolTip>
                Top Right
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} direction={ToolTipDirection.BOTTOM_RIGHT}>
                    Lorem
                </ToolTip>
                Bottom Right
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} direction={ToolTipDirection.RIGHT}>
                    Loren
                </ToolTip>
                Right
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} direction={ToolTipDirection.TOP_LEFT}>
                    Loren
                </ToolTip>
                Top Left
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} direction={ToolTipDirection.BOTTOM_LEFT}>
                    Loren
                </ToolTip>
                Bottom Left
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} direction={ToolTipDirection.LEFT}>
                    Loren
                </ToolTip>
                Left
            </div>
        </div>
    ))
    .add("Tooltip customization", () => (
        <div style={{paddingTop: "75px"}}>
            <div style={{float: "left"}}>
                <ToolTip size={ToolTipSize.EXTRA_SMALL} iconSize={30}>
                    Lorem
                </ToolTip>
                Extra Small
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.SMALL} style={{color: "gray"}}>
                    Lorem ipsum sit
                </ToolTip>
                Small
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.MEDIUM} shape="check-circle">
                    Loren ipsum dolor sit amet, ipsum
                </ToolTip>
                Medium
            </div>
            <div style={{float: "left", marginLeft: "20px"}}>
                <ToolTip size={ToolTipSize.LARGE} iconSize={30} shape="exclamation-triangle" style={{color: "orange"}}>
                    Loren ipsum dolor sit amet, consectetur adipisicing elit
                </ToolTip>
                Large
            </div>
        </div>
    ));
