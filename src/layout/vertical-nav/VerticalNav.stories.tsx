import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {VerticalNav, VerticalNavGroup} from ".";

// TODO: figure out link formatting
storiesOf('Vertical Navigation', module)
    .add('a simple vertical nav', () =>
        <VerticalNav>
            <a href={"./#"} className={"nav-btn"}>
                Link 1
            </a>
            <a href={"./#"} className={"nav-btn"}>
                Link 2
            </a>
        </VerticalNav>
    )
    .add('a vertical nav with groups', () =>
        <VerticalNav>
            <VerticalNavGroup groupName="Group 1">
                <a href={"./#"} className={"nav-btn"}>
                    Link 1
                </a>
                <a href={"./#"} className={"nav-btn"}>
                    Link 2
                </a>
            </VerticalNavGroup>
            <VerticalNavGroup groupName="Group 2">
                <a href={"./#"} className={"nav-btn"}>
                    Link 3
                </a>
                <a href={"./#"} className={"nav-btn"}>
                    Link 4
                </a>
            </VerticalNavGroup>
        </VerticalNav>
    )
;
