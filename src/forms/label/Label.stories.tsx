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
import {Label, LabelColor, LabelStatus} from "./Label";
import {action} from "@storybook/addon-actions";
import {Badge, BadgeColor} from "../../emphasis/badges";

storiesOf("Label", module)
    .add("Labels (not clickable)", () => (
        <div>
            <Label>Austin</Label>
            <Label>New York</Label>
            <Label>Palo Alto</Label>
            <Label>San Francisco</Label>
            <Label>Seattle</Label>
        </div>
    ))
    .add("Color Options", () => (
        <div>
            <Label>Austin</Label>
            <Label color={LabelColor.PURPLE}>New York</Label>
            <Label color={LabelColor.BLUE}>Palo Alto</Label>
            <Label color={LabelColor.ORANGE}>San Francisco</Label>
            <Label color={LabelColor.LIGHT_BLUE}>Seattle</Label>
        </div>
    ))
    .add("Clickable Labels", () => (
        <div>
            <Label onClick={action("Austin - click")}>Austin</Label>
            <Label color={LabelColor.PURPLE} onClick={action("New York - click")}>
                New York
            </Label>
            <Label color={LabelColor.BLUE} onClick={action("Palo Alto - click")}>
                Palo Alto
            </Label>
            <Label color={LabelColor.ORANGE} onClick={action("San Francisco - click")}>
                San Francisco
            </Label>
            <Label color={LabelColor.LIGHT_BLUE} onClick={action("Seattle - click")}>
                Seattle
            </Label>
        </div>
    ))
    .add("Dismissing Labels", () => (
        <div style={{width: "30px"}}>
            <Label
                color={LabelColor.BLUE}
                onClick={(evt: React.MouseEvent<HTMLElement>) => {
                    const target = (evt.target as any) as HTMLElement;
                    if (target.tagName !== "A") {
                        target.parentElement!.style.display = "none";
                    } else {
                        target.style.display = "none";
                    }
                }}
                dismissable={true}
            >
                james@test.com
            </Label>
            <Label
                color={LabelColor.BLUE}
                onClick={(evt: React.MouseEvent<HTMLElement>) => {
                    const target = (evt.target as any) as HTMLElement;
                    if (target.tagName !== "A") {
                        target.parentElement!.style.display = "none";
                    } else {
                        target.style.display = "none";
                    }
                }}
                dismissable={true}
            >
                jimmy@test.com
            </Label>
        </div>
    ))
    .add("Status Labels (not clickable)", () => (
        <div>
            <Label status={LabelStatus.INFO}>Info</Label>
            <Label status={LabelStatus.SUCCESS}>Success</Label>
            <Label status={LabelStatus.WARNING}>Warning</Label>
            <Label status={LabelStatus.DANGER}>Error</Label>
        </div>
    ))
    .add("Labels with Badges", () => (
        <div>
            <Label color={LabelColor.PURPLE} onClick={action("Austin - click")}>
                Austin
                <Badge color={BadgeColor.PURPLE}>3</Badge>
            </Label>
            <Label color={LabelColor.BLUE} onClick={action("New York - click")}>
                New York
                <Badge color={BadgeColor.BLUE}>32</Badge>
            </Label>
            <Label color={LabelColor.ORANGE} onClick={action("San Francisco - click")}>
                San Francisco
                <Badge color={BadgeColor.ORANGE}>12</Badge>
            </Label>
            <Label color={LabelColor.LIGHT_BLUE} onClick={action("Seattle - click")}>
                Seattle
                <Badge color={BadgeColor.LIGHT_BLUE}>59</Badge>
            </Label>
            <Label onClick={action("Minneapolis - click")}>
                Minneapolis
                <Badge>59</Badge>
            </Label>
        </div>
    ))
    .add("Custom styled labels", () => (
        <div>
            <Label status={LabelStatus.INFO} style={{color: "black", height: "40px"}}>
                Info
            </Label>
            <Label style={{color: "#fff", background: "#6ea204", border: "1px solid #6ea204", fontWeight: "800"}}>
                Healthy
            </Label>
            <Label style={{color: "#fff", background: "#ff0000", border: "1px solid #ff0000", fontWeight: "800"}}>
                Critical
            </Label>
            <Label style={{color: "gray", background: "#ffff", border: "1px solid gray", width: "100px"}}>Main</Label>
            <Label
                status={LabelStatus.INFO}
                style={{
                    color: "#ffffff",
                    background: "gray",
                    border: "1px solid #dcdcdc",
                    width: "100px",
                    fontWeight: "800",
                    height: "35px",
                }}
            >
                sample
            </Label>
        </div>
    ));
