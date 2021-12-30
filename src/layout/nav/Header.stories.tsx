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
import {Icon} from "../../icon";
import {Header, HeaderColor, Nav, NavLevel, NavLink, NavType} from ".";
import {Dropdown, DropdownMenu, DropdownItem} from "../../forms/dropdown";

storiesOf("Header", module)
    .add("Header Types", () => (
        <React.Fragment>
            <h4> Header Types</h4>
            <div className="main-container">
                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER6}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <Nav navLevel={NavLevel.PRIMARY} navType={NavType.HEADER}>
                        <NavLink className="active">Dashboard</NavLink>
                        <NavLink>Interactive Analytics</NavLink>
                    </Nav>
                    <div className="header-actions">
                        <NavLink className="nav-icon" iconShape="cog" />
                    </div>
                </Header>

                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER6}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <form className="search">
                        <label>
                            <input id="search_input" type="text" placeholder="Search for keywords..." />
                        </label>
                    </form>
                    <div className="header-actions">
                        <NavLink className="nav-icon" iconShape="cog" />
                    </div>
                </Header>

                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER6}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <div className="header-actions">
                        <Dropdown
                            button={{
                                icon: {shape: "cog", style: {right: "2.4rem"}},
                                defaultBtn: false,
                                className: "nav-icon dropdown-toggle",
                            }}
                            onItemClick={action("onItemClick - Dropdown.")}
                        >
                            <DropdownMenu>
                                <DropdownItem label="About" />
                                <DropdownItem label="Preferences" />
                                <DropdownItem label="Log out" />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Header>

                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER6}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <Nav navLevel={NavLevel.PRIMARY} navType={NavType.HEADER}>
                        <NavLink className="nav-icon" iconShape="cloud" />
                        <NavLink className="active nav-icon" iconShape="folder" />
                    </Nav>
                    <form className="search">
                        <label>
                            <input id="search_input" type="text" placeholder="Search for keywords..." />
                        </label>
                    </form>

                    <div className="header-actions">
                        <Dropdown
                            button={{
                                icon: {shape: "user", style: {right: "2.4rem"}},
                                defaultBtn: false,
                                className: "nav-icon dropdown-toggle",
                            }}
                            onItemClick={action("onItemClick - Dropdown.")}
                        >
                            <DropdownMenu>
                                <DropdownItem label="About" />
                                <DropdownItem label="Preferences" />
                                <DropdownItem label="Log out" />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Header>

                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER6}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <div className="header-actions">
                        <NavLink>Log Out</NavLink>
                    </div>
                </Header>

                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER6}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <div className="header-actions">
                        <Dropdown
                            label="john.doe@vmware.com"
                            button={{defaultBtn: false, className: "nav-text dropdown-toggle"}}
                            onItemClick={action("onItemClick - Dropdown.")}
                        >
                            <DropdownMenu>
                                <DropdownItem label="Preferences" />
                                <DropdownItem label="Log out" />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Header>

                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER6}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <div className="header-actions">
                        <a href="javascript://" className="nav-link nav-icon-text">
                            <Icon
                                shape="user"
                                style={{
                                    position: "relative",
                                    top: "22%",
                                    left: "22%",
                                    height: "1rem",
                                    width: "1rem",
                                    transform: "translate(-50%,-50%)",
                                    webkitTransform: "translate(-50%,-50%)",
                                }}
                            />
                            <span className="nav-text" style={{padding: "0 0 0 1.2rem"}}>
                                username
                            </span>
                        </a>
                    </div>
                </Header>
            </div>
        </React.Fragment>
    ))
    .add("Header With Color Options", () => (
        <React.Fragment>
            <h4> Header with Color Options</h4>
            <div className="main-container">
                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER1}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                </Header>
                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER2}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                </Header>
                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER3}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                </Header>
                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER4}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                </Header>
                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER5}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                </Header>
                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER6}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                </Header>
                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER7}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                </Header>
            </div>
        </React.Fragment>
    ))

    .add("Header with Subnav", () => (
        <React.Fragment>
            <h4> Header with Subnav</h4>
            <div className="main-container">
                <Header
                    primaryShown={false}
                    secondaryShown={false}
                    color={HeaderColor.HEADER1}
                    style={{marginTop: "24px"}}
                >
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                </Header>
                <Nav navLevel={NavLevel.SECONDARY} navType={NavType.SUB}>
                    <li className="nav-item">
                        <NavLink className="active">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink>Management</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink>Cloud</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink>Tenants</NavLink>
                    </li>
                </Nav>
            </div>
        </React.Fragment>
    ));
