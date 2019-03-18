import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {MainContainer} from ".";
import {Nav, NavLevel, NavLink, NavType} from "../nav";

storiesOf('MainContainer', module)
    .add('Main Container', () =>
        <MainContainer
            title="Storybook"
            primaryNav={
                <Nav navLevel={NavLevel.PRIMARY} navType={NavType.HEADER}>
                    <NavLink>Link 1</NavLink>
                    <NavLink>Link 2</NavLink>
                </Nav>
            }
            secondaryNav={
                <Nav navLevel={NavLevel.SECONDARY} navType={NavType.SIDE}>
                    <NavLink>Link 3</NavLink>
                    <NavLink>Link 4</NavLink>
                </Nav>
            }
        >
        </MainContainer>
    )
;
