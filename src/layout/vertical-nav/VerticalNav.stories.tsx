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
