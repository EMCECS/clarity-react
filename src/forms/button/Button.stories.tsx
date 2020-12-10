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
import {Button, ButtonSize, ButtonState} from ".";
import {Badge, BadgeColor} from "../../emphasis/badges";

storiesOf("Button", module)
    .add("Simple buttons", () => (
        <div>
            <Button key="basic" onClick={action("basic click")}>
                BASIC
            </Button>
            <Button key="basic-info" state={ButtonState.INFO} onClick={action("basic-info click")}>
                INFO
            </Button>
            <Button key="basic-warning" state={ButtonState.WARNING} onClick={action("basic-warning click")}>
                WARNING
            </Button>
            <Button key="basic-success" state={ButtonState.SUCCESS} onClick={action("basic-success click")}>
                SUCCESS
            </Button>
            <Button key="basic-danger" state={ButtonState.DANGER} onClick={action("basic-danger click")}>
                DANGER
            </Button>
            <Button key="basic-disabled" disabled={true} onClick={action("basic-disabled click")}>
                DISABLED
            </Button>
        </div>
    ))
    .add("Primary buttons", () => (
        <div>
            <Button key="primary" primary onClick={action("primary click")}>
                PRIMARY
            </Button>
            <Button key="primary-info" primary state={ButtonState.INFO} onClick={action("primary-info click")}>
                INFO
            </Button>
            <Button key="primary-warning" primary state={ButtonState.WARNING} onClick={action("primary-warning click")}>
                WARNING
            </Button>
            <Button key="primary-success" primary state={ButtonState.SUCCESS} onClick={action("primary-success click")}>
                SUCCESS
            </Button>
            <Button key="primary-danger" primary state={ButtonState.DANGER} onClick={action("primary-danger click")}>
                DANGER
            </Button>
            <Button key="primary-disabled" primary disabled={true} onClick={action("primary-disabled click")}>
                DISABLED
            </Button>
        </div>
    ))
    .add("Link buttons", () => (
        <div>
            <Button key="link" link onClick={action("link click")}>
                PRIMARY
            </Button>
            <Button key="link-disabled" link disabled={true} onClick={action("link-disabled click")}>
                DISABLED
            </Button>
        </div>
    ))
    .add("Small buttons", () => (
        <div>
            <Button key="small" size={ButtonSize.SMALL} onClick={action("small click")}>
                PRIMARY
            </Button>
            <Button
                key="small-info"
                size={ButtonSize.SMALL}
                state={ButtonState.INFO}
                onClick={action("small-info click")}
            >
                INFO
            </Button>
            <Button
                key="small-warning"
                size={ButtonSize.SMALL}
                state={ButtonState.WARNING}
                onClick={action("small-warning click")}
            >
                WARNING
            </Button>
            <Button
                key="small-success"
                size={ButtonSize.SMALL}
                state={ButtonState.SUCCESS}
                onClick={action("small-success click")}
            >
                SUCCESS
            </Button>
            <Button
                key="small-danger"
                size={ButtonSize.SMALL}
                state={ButtonState.DANGER}
                onClick={action("small-danger click")}
            >
                DANGER
            </Button>
            <Button
                key="small-disabled"
                size={ButtonSize.SMALL}
                disabled={true}
                onClick={action("small-disabled click")}
            >
                DISABLED
            </Button>
        </div>
    ))
    .add("Icon buttons", () => (
        <div>
            <Button key="home" onClick={action("home click")} icon={{shape: "home"}}>
                HOME
            </Button>
            <Button key="cog" primary onClick={action("cog click")} icon={{shape: "cog"}}>
                SETTINGS
            </Button>
            <Button
                key="link"
                primary
                state={ButtonState.SUCCESS}
                onClick={action("link click")}
                icon={{shape: "link"}}
            />
        </div>
    ))
    .add("Simple Button and Icon button without btn and btn-icon class", () => (
        <div>
            <Button key="home" defaultBtn={false} onClick={action("home click")} icon={{shape: "home"}}>
                HOME
            </Button>
            <Button key="basic" defaultBtn={false} onClick={action("basic click")}>
                BASIC
            </Button>
        </div>
    ))
    .add("Buttons with badge", () => (
        <div>
            <Button key="basic" onClick={action("basic click")}>
                BASIC
                <span style={{paddingLeft: "0.5rem"}}>
                    <Badge color={BadgeColor.LIGHT_BLUE}>1</Badge>
                </span>
            </Button>
            <Button key="basic-info" state={ButtonState.INFO} onClick={action("basic-info click")}>
                INFO
                <span style={{paddingLeft: "0.5rem"}}>
                    <Badge color={BadgeColor.LIGHT_BLUE}> 2 </Badge>
                </span>
            </Button>
            <Button key="basic-warning" state={ButtonState.WARNING} onClick={action("basic-warning click")}>
                WARNING
                <span style={{paddingLeft: "0.5rem"}}>
                    <Badge color={BadgeColor.BLUE}> 3 </Badge>
                </span>
            </Button>
            <Button key="basic-success" state={ButtonState.SUCCESS} onClick={action("basic-success click")}>
                SUCCESS
                <span style={{paddingLeft: "0.5rem"}}>
                    <Badge color={BadgeColor.ORANGE}> 4 </Badge>
                </span>
            </Button>
            <Button key="basic-danger" state={ButtonState.DANGER} onClick={action("basic-danger click")}>
                DANGER
                <span style={{paddingLeft: "0.5rem"}}>
                    <Badge color={BadgeColor.ORANGE}> 5 </Badge>
                </span>
            </Button>
            <Button key="basic-disabled" disabled={true} onClick={action("basic-disabled click")}>
                DISABLED
                <span style={{paddingLeft: "0.5rem"}}>
                    <Badge> 6 </Badge>
                </span>
            </Button>
        </div>
    ));
