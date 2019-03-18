import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {MainContainer} from ".";
import {Nav, NavLevel, NavLink, NavType} from "../nav";

storiesOf('MainContainer', module)
    .add('Main Container', () =>
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
    )
;
