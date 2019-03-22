/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {VerticalNav, VerticalNavGroup} from ".";
import {NavLink} from "../nav";

// TODO: figure out link formatting
storiesOf('Vertical Navigation', module)
    .add('a simple vertical nav', () =>
        <VerticalNav>
            <NavLink>Link 1</NavLink>
            <NavLink>Link 2</NavLink>
        </VerticalNav>
    )
    .add('a vertical nav with groups', () =>
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
    )
;
