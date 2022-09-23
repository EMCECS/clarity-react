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
import {MainContainer} from ".";
import {Nav, NavLevel, NavLink, NavType} from "../nav";

storiesOf("MainContainer", module).add("Main Container", () => (
    <MainContainer
        title="Storybook"
        headerNav={
            <Nav navLevel={NavLevel.PRIMARY} navType={NavType.HEADER}>
                <NavLink>Link 1</NavLink>
                <NavLink>Link 2</NavLink>
            </Nav>
        }
        subNav={
            <Nav navLevel={NavLevel.SECONDARY} navType={NavType.SUB}>
                <NavLink>Link 3</NavLink>
                <NavLink>Link 4</NavLink>
            </Nav>
        }
    />
));
