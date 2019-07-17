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
import {Icon} from "../icon";
import {Dropdown, DropdownMenu, DropdownItem} from "../forms/dropdown";
import {Header, HeaderColor} from "./Header";
import {NavLink} from "../layout/nav";

storiesOf("Header", module)
    .add("Header Types", () => (
        <React.Fragment>
            <div>
                <h4> Header Types</h4>
                <Header color={HeaderColor.HEADER6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <div className="header-nav">
                        <NavLink>
                            <span className="nav-text">Dashboard</span>
                        </NavLink>
                        <NavLink>
                            <span className="nav-text">Interactive Analytics</span>
                        </NavLink>
                    </div>
                    <div className="header-actions">
                        <NavLink>
                            <Icon shape={"cog"} />
                        </NavLink>
                    </div>
                </Header>

                <Header color={HeaderColor.HEADER6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <form className="search">
                        <label>
                            <input id="search_input" type="text" placeholder="Search for keywords#" />
                        </label>
                    </form>
                    <div className="header-actions">
                        <NavLink>
                            <Icon shape="cog" />
                        </NavLink>
                    </div>
                </Header>

                <Header color={HeaderColor.HEADER6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <div className="header-actions">
                        <Dropdown
                            button={{icon: "cog", customBtn: true, className: "nav-icon dropdown-toggle"}}
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

                <Header color={HeaderColor.HEADER6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <div className="header-nav">
                        <NavLink>
                            <Icon shape="cloud" />
                        </NavLink>
                        <NavLink>
                            <Icon shape="folder" />
                        </NavLink>
                    </div>
                    <form className="search">
                        <label>
                            <input id="search_input" type="text" placeholder="Search for keywords..." />
                        </label>
                    </form>

                    <div className="header-actions">
                        <Dropdown
                            button={{
                                icon: "user",
                                customBtn: true,
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

                <Header color={HeaderColor.HEADER6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <div className="header-actions">
                        <NavLink>Log Out</NavLink>
                    </div>
                </Header>

                <Header color={HeaderColor.HEADER6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <div className="header-actions">
                        <Dropdown
                            label="john.doe@vmware.com"
                            button={{customBtn: true, className: "nav-text dropdown-toggle"}}
                            onItemClick={action("onItemClick - Dropdown.")}
                        >
                            <DropdownMenu>
                                <DropdownItem label="Preferences" />
                                <DropdownItem label="Log out" />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Header>

                <Header color={HeaderColor.HEADER6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <NavLink iconShape="vm-bug">
                            <span className="title">Project Clarity</span>
                        </NavLink>
                    </div>
                    <div className="header-actions">
                        <NavLink>
                            <Icon shape="user" style={{left: "18%"}} />
                            <span className="nav-text">username</span>
                        </NavLink>
                    </div>
                </Header>
            </div>
        </React.Fragment>
    ))

    .add("Header with Color Options", () => (
        <React.Fragment>
            <h4> Header with Color Options</h4>
            <Header color={HeaderColor.HEADER1} style={{marginTop: "24px"}}>
                <div className="branding">
                    <NavLink iconShape="vm-bug">
                        <span className="title">Project Clarity</span>
                    </NavLink>
                </div>
            </Header>

            <Header color={HeaderColor.HEADER2} style={{marginTop: "24px"}}>
                <div className="branding">
                    <NavLink iconShape="vm-bug">
                        <span className="title">Project Clarity</span>
                    </NavLink>
                </div>
            </Header>

            <Header color={HeaderColor.HEADER3} style={{marginTop: "24px"}}>
                <div className="branding">
                    <NavLink iconShape="vm-bug">
                        <span className="title">Project Clarity</span>
                    </NavLink>
                </div>
            </Header>

            <Header color={HeaderColor.HEADER4} style={{marginTop: "24px"}}>
                <div className="branding">
                    <NavLink iconShape="vm-bug">
                        <span className="title">Project Clarity</span>
                    </NavLink>
                </div>
            </Header>

            <Header color={HeaderColor.HEADER5} style={{marginTop: "24px"}}>
                <div className="branding">
                    <NavLink iconShape="vm-bug">
                        <span className="title">Project Clarity</span>
                    </NavLink>
                </div>
            </Header>

            <Header color={HeaderColor.HEADER6} style={{marginTop: "24px"}}>
                <div className="branding">
                    <NavLink iconShape="vm-bug">
                        <span className="title">Project Clarity</span>
                    </NavLink>
                </div>
            </Header>

            <Header color={HeaderColor.HEADER7} style={{marginTop: "24px"}}>
                <div className="branding">
                    <NavLink iconShape="vm-bug">
                        <span className="title">Project Clarity</span>
                    </NavLink>
                </div>
            </Header>
        </React.Fragment>
    ))

    .add("Header with Subnav", () => (
        <React.Fragment>
            <h4> Header with Subnav</h4>
            <Header color={HeaderColor.HEADER1} style={{marginTop: "24px"}}>
                <div className="branding">
                    <NavLink iconShape="vm-bug">
                        <span className="title">Project Clarity</span>
                    </NavLink>
                </div>
            </Header>
            <nav className="subnav">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link active">Dashboard</NavLink>
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
                </ul>
            </nav>
        </React.Fragment>
    ));
