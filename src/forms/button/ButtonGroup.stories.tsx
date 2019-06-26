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
import {Button} from ".";
import {ButtonGroup} from ".";
import {RadioButton} from "../radio/.";
import {DropdownMenu, Dropdown, DropdownItem, MenuItemType} from "../dropdown/.";
import {Icon} from "../../icon";

storiesOf("ButtonGroup", module)
    .add("Outline ButtonGroup", () => (
        <ButtonGroup defaultValue="three" name="number">
            <Button key="one" onClick={action("One click")}>
                One
            </Button>
            <Button key="two" onClick={action("Two click")}>
                Two
            </Button>
            <Button key="three" onClick={action("Three click")}>
                Three
            </Button>
            <Button key="four" onClick={action("Four click")}>
                Four
            </Button>
        </ButtonGroup>
    ))

    .add("Basic Structure ButtonGroup", () => (
        <ButtonGroup className="btn-primary" name="Operation">
            <Button onClick={action("Add click")}>Add</Button>
            <Button onClick={action("Edit click")}>Edit</Button>
            <Button onClick={action("Download click")}>Download</Button>
            <Button onClick={action("Delete click")}>Delete</Button>
        </ButtonGroup>
    ))
    .add("Overflow ButtonGroup", () => (
        <ButtonGroup className="btn-primary" name="Operation">
            <Button>Add</Button>
            <Button>Edit</Button>
            <Dropdown button={{icon: "ellipsis-horizontal"}} onItemClick={action("onItemClick - Dropdown.")}>
                <DropdownMenu>
                    <DropdownItem onClick={action("Download")} label="Download" />
                    <DropdownItem onClick={action("Delete")} label="Delete" />
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
    ))
    .add("Primary ButtonGroup", () => (
        <ButtonGroup className="btn-primary" name="Operation">
            <Button>Add</Button>
            <Button>Edit</Button>
            <Button>Download</Button>
            <Button>Delete</Button>
        </ButtonGroup>
    ))
    .add("Flat ButtonGroup", () => (
        <ButtonGroup className="btn-link" name="Operation">
            <Button>Add</Button>
            <Button>Edit</Button>
            <Button>Download</Button>
            <Button>Delete</Button>
        </ButtonGroup>
    ))
    .add("Small ButtonGroup", () => (
        <ButtonGroup className="btn-outline-primary btn-sm" name="Operation">
            <Button>Add</Button>
            <Button>Edit</Button>
            <Button>Download</Button>
            <Button>Delete</Button>
        </ButtonGroup>
    ))
    .add("Mixed ButtonGroup", () => (
        <ButtonGroup className="btn-primary" name="Operation">
            <Button>Favorite</Button>
            <Button className="btn btn-success">Add</Button>
            <Button className="btn btn-danger">Delete</Button>
        </ButtonGroup>
    ))
    .add("Icon ButtonGroup", () => (
        <ButtonGroup className="btn-primary btn-icon" name="Operation">
            <Button icon="home" />
            <Button icon="cog" />
            <Dropdown
                showCaret={false}
                className="btn-group-overflow"
                button={{icon: "ellipsis-horizontal"}}
                onItemClick={action("onItemClick - Dropdown.")}
            >
                <DropdownMenu>
                    <DropdownItem onClick={action("User")} label="user" />
                    <DropdownItem onClick={action("Cloud")} label="cloud" />
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
    ))
    .add("With Text Icon ButtonGroup", () => (
        <ButtonGroup className="btn-primary btn-icon" name="Operation">
            <Button icon="home">Home</Button>
            <Button icon="cog">Setting</Button>
            <Dropdown
                showCaret={false}
                className="btn-group-overflow"
                button={{icon: "ellipsis-horizontal"}}
                onItemClick={action("onItemClick - Dropdown.")}
            >
                <DropdownMenu>
                    <DropdownItem onClick={action("User")} label="user" />
                    <DropdownItem onClick={action("cloud")} label="cloud" />
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
    ))
    .add("Radio ButtonGroup", () => (
        <ButtonGroup defaultValue="apples" name="fruit" onChange={action("Changed")}>
            <RadioButton key="1" value="apples" label="apples" />
            <RadioButton key="2" value="oranges" label="oranges" />
            <RadioButton key="3" value="kiwi" label="kiwi" />
            <RadioButton key="4" value="pears" label="pears" />
        </ButtonGroup>
    ));
