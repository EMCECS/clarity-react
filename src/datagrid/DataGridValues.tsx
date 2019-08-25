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
import {Icon} from "../icon";

export const normalColumns = [
    {
        content: "User ID",
    },
    {
        content: "Name",
    },
    {
        content: "Creation Date",
    },
    {
        content: "Favorite color",
    },
];

export const normalRows = [
    {
        content: [
            {
                content: 41512,
            },
            {
                content: "Georgia",
            },
            {
                content: "Sep 11, 2008",
            },
            {
                content: "Blue",
            },
        ],
        keyElement: "Georgia",
    },
    {
        content: [
            {
                content: 16166,
            },
            {
                content: "Brynn",
            },
            {
                content: "Aug 2, 2014",
            },
            {
                content: "Orange",
            },
        ],
        keyElement: "Brynn",
    },
];

export const footer = {
    content: "Total 2 users",
};

export const customRows = [
    {
        content: [
            {
                content: 41512,
            },
            {
                content: "Georgia",
            },
            {
                content: "Sep 11, 2008",
            },
            {
                content: (
                    <div>
                        <Icon shape="time" />
                        {"Critical"}
                    </div>
                ),
            },
        ],
        keyElement: "Georgia",
    },
    {
        content: [
            {
                content: 16166,
            },
            {
                content: "Brynn",
            },
            {
                content: "Aug 2, 2014",
            },
            {
                content: (
                    <div>
                        <Icon shape="time" />
                        {"Critical"}
                    </div>
                ),
            },
        ],
        keyElement: "Brynn",
    },
];
