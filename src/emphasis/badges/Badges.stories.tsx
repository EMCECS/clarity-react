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
import {Badge, BadgeColor, BadgeStatus} from "./badges";

storiesOf("Badges", module)
    .add("Color Badges", () => (
        <div>
            <Badge>1</Badge>
            <Badge color={BadgeColor.PURPLE}>15</Badge>
            <Badge color={BadgeColor.BLUE}>2</Badge>
            <Badge color={BadgeColor.ORANGE}>3</Badge>
            <Badge color={BadgeColor.LIGHT_BLUE}>12</Badge>
            <Badge color={BadgeColor.BADGE_1}>90</Badge>
            <Badge color={BadgeColor.BADGE_2}>51</Badge>
            <Badge color={BadgeColor.BADGE_3}>25</Badge>
            <Badge color={BadgeColor.BADGE_4}>32</Badge>
            <Badge color={BadgeColor.BADGE_5}>57</Badge>
        </div>
    ))
    .add("Status Badges", () => (
        <div>
            <Badge status={BadgeStatus.BADGE_INFO}>2</Badge>
            <Badge status={BadgeStatus.BADGE_SUCCESS}>3</Badge>
            <Badge status={BadgeStatus.BADGE_WARNING}>12</Badge>
            <Badge status={BadgeStatus.BADGE_DANGER}>15</Badge>
        </div>
    ));
