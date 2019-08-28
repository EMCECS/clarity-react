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
import {Button} from "../forms/button";

/**
 * General file description :
 * Data to render diffrent datagrids in storybook
 */

// Column Data
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

// Row Data
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
        rowID: "Georgia",
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
        rowID: "Brynn",
    },
    {
        content: [
            {
                content: 30574,
            },
            {
                content: "Brad",
            },
            {
                content: "Jan 4, 2019",
            },
            {
                content: "Yellow",
            },
        ],
        rowID: "Brad",
    },
];

// Footer data
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
        rowID: "Georgia",
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
        rowID: "Brynn",
    },
];

// Grid Action component
type GridActionsState = {
    selectedRows: any[];
    showEdit: boolean;
};

export class GridActions extends React.PureComponent<any, GridActionsState> {
    state = {
        selectedRows: [],
        showEdit: false,
    };

    updateActions(rows: any) {
        this.setState({
            selectedRows: rows,
            showEdit: rows.length === 1 ? true : false,
        });
    }

    render() {
        const {selectedRows, showEdit} = this.state;
        return (
            <div>
                <Button key="new">NEW</Button>
                {
                    <Button key="edit" show={showEdit}>
                        EDIT
                    </Button>
                }
                <Button
                    key="delete"
                    onClick={() => {
                        alert("Deleted" + selectedRows.length);
                    }}
                >
                    DELELTE
                </Button>
            </div>
        );
    }
}
