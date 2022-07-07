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
import {VerticalNav, VerticalNavGroup} from ".";
import {NavLink} from "../nav";
import {MainContainer} from "../main-container";

// TODO: figure out link formatting
storiesOf("Vertical Navigation", module)
    .add("a simple vertical nav", () => (
        <VerticalNav>
            <NavLink>Link 1</NavLink>
            <NavLink>Link 2</NavLink>
        </VerticalNav>
    ))
    .add("a vertical nav with groups", () => (
        <VerticalNav>
            <VerticalNavGroup groupName="Group 1">
                <NavLink>Link 1</NavLink>
                <NavLink>Link 2</NavLink>
            </VerticalNavGroup>
            <VerticalNavGroup groupName="Group 2">
                <NavLink>Link 3</NavLink>
                <NavLink>Link 4</NavLink>
            </VerticalNavGroup>
        </VerticalNav>
    ))
    .add("a vertical nav with expanded group", () => (
        <VerticalNav>
            <VerticalNavGroup groupName="Group 1">
                <NavLink>Link 1</NavLink>
                <NavLink>Link 2</NavLink>
            </VerticalNavGroup>
            <VerticalNavGroup groupName="Group 2" isExpanded={true}>
                <NavLink>Link 3</NavLink>
                <NavLink>Link 4</NavLink>
            </VerticalNavGroup>
        </VerticalNav>
    ))
    .add("incorporated vertical nav", () => (
        <MainContainer
            title="Project Pokémon"
            sideNav={
                <VerticalNav isCollapsible={true}>
                    <NavLink iconShape="user">Normal</NavLink>
                    <NavLink iconShape="bolt" className="active">
                        Electric
                    </NavLink>
                    <NavLink iconShape="sad-face">Poison</NavLink>
                    <NavLink iconShape="bug">Grass</NavLink>
                    <NavLink iconShape="shield">Fighting</NavLink>
                    <NavLink iconShape="certificate">Credit</NavLink>
                </VerticalNav>
            }
        >
            <h2>Electric</h2>
            <p>
                There are relatively few Electric Pokémon; in fact only four were added in the third generation. Most
                are based on rodents or inanimate objects. Electric Pokémon are very good defensively, being weak only
                to Ground moves.
            </p>
        </MainContainer>
    ));
