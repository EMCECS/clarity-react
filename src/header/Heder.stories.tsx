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
import {Dropdown, DropdownMenu, DropdownItem, MenuItemType} from "../forms/dropdown";
import {Header, HeaderColor} from "./Header";
import {Card, CardBlock, CardFooter, CardText, CardTitle} from "../cards";

storiesOf("Header", module)
    .add("Header Types", () => (
        <React.Fragment>
            <div>
                <h4> Header Types</h4>
                <Header className={HeaderColor.header6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <Icon shape="vm-bug" />
                            <span className="title">Project Clarity</span>
                        </a>
                    </div>
                    <div className="header-nav">
                        <a href="#" className="active nav-link">
                            <span className="nav-text">Dashboard</span>
                        </a>
                        <a href="#" className="nav-link">
                            <span className="nav-text">Interactive Analytics</span>
                        </a>
                    </div>
                    <div className="header-actions">
                        <a href="#" className="nav-link nav-icon">
                            <Icon shape={"cog"} />
                        </a>
                    </div>
                </Header>

                <Header className={HeaderColor.header6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <Icon shape="vm-bug" />
                            <span className="title">Project Clarity</span>
                        </a>
                    </div>
                    <form className="search">
                        <label>
                            <input id="search_input" type="text" placeholder="Search for keywords#" />
                        </label>
                    </form>
                    <div className="header-actions">
                        <a href="#" className="nav-link nav-icon">
                            <Icon shape="cog" />
                        </a>
                    </div>
                </Header>

                <Header className={HeaderColor.header6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <Icon shape="vm-bug" />
                            <span className="title">Project Clarity</span>
                        </a>
                    </div>
                    <div className="header-actions">
                        <Dropdown
                            button={{icon: "cog", isPrimaryClassRequired: false, className: "nav-icon dropdown-toggle"}}
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

                <Header className={HeaderColor.header6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <Icon shape="vm-bug" />
                            <span className="title">Project Clarity</span>
                        </a>
                    </div>
                    <div className="header-nav">
                        <a href="#" className="nav-link nav-icon">
                            <Icon shape="cloud" />
                        </a>
                        <a href="#" className="active nav-link nav-icon">
                            <Icon shape="folder" />
                        </a>
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
                                isPrimaryClassRequired: false,
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

                <Header className={HeaderColor.header6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <Icon shape="vm-bug" />
                            <span className="title">Project Clarity</span>
                        </a>
                    </div>
                    <div className="header-actions">
                        <a href="#" className="nav-link nav-text">
                            Log Out
                        </a>
                    </div>
                </Header>

                <Header className={HeaderColor.header6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <a href="#" className="nav-link">
                            <Icon shape="vm-bug" />
                            <span className="title">Project Clarity</span>
                        </a>
                    </div>
                    <div className="header-actions">
                        <Dropdown
                            label="john.doe@vmware.com"
                            button={{isPrimaryClassRequired: false, className: "nav-text dropdown-toggle"}}
                            onItemClick={action("onItemClick - Dropdown.")}
                        >
                            <DropdownMenu>
                                <DropdownItem label="Preferences" />
                                <DropdownItem label="Log out" />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Header>

                <Header className={HeaderColor.header6} style={{marginTop: "24px"}}>
                    <div className="branding">
                        <a href="javascript://" className="nav-link">
                            <Icon shape="vm-bug" />
                            <span className="title">Project Clarity</span>
                        </a>
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
                            <span className="nav-text">username</span>
                        </a>
                    </div>
                </Header>
            </div>
        </React.Fragment>
    ))

    .add("Header with Color Options", () => (
        <React.Fragment>
            <h4> Header with Color Options</h4>
            <Header className={HeaderColor.header1} style={{marginTop: "24px"}}>
                <div className="branding">
                    <a href="#" className="nav-link">
                        <Icon shape="vm-bug" />
                        <span className="title">Project Clarity</span>
                    </a>
                </div>
            </Header>

            <Header className={HeaderColor.header2} style={{marginTop: "24px"}}>
                <div className="branding">
                    <a href="#" className="nav-link">
                        <Icon shape="vm-bug" />
                        <span className="title">Project Clarity</span>
                    </a>
                </div>
            </Header>

            <Header className={HeaderColor.header3} style={{marginTop: "24px"}}>
                <div className="branding">
                    <a href="#" className="nav-link">
                        <Icon shape="vm-bug" />
                        <span className="title">Project Clarity</span>
                    </a>
                </div>
            </Header>

            <Header className={HeaderColor.header4} style={{marginTop: "24px"}}>
                <div className="branding">
                    <a href="#" className="nav-link">
                        <Icon shape="vm-bug" />
                        <span className="title">Project Clarity</span>
                    </a>
                </div>
            </Header>

            <Header className={HeaderColor.header5} style={{marginTop: "24px"}}>
                <div className="branding">
                    <a href="#" className="nav-link">
                        <Icon shape="vm-bug" />
                        <span className="title">Project Clarity</span>
                    </a>
                </div>
            </Header>

            <Header className={HeaderColor.header6} style={{marginTop: "24px"}}>
                <div className="branding">
                    <a href="#" className="nav-link">
                        <Icon shape="vm-bug" />
                        <span className="title">Project Clarity</span>
                    </a>
                </div>
            </Header>

            <Header className={HeaderColor.header7} style={{marginTop: "24px"}}>
                <div className="branding">
                    <a href="#" className="nav-link">
                        <Icon shape="vm-bug" />
                        <span className="title">Project Clarity</span>
                    </a>
                </div>
            </Header>
        </React.Fragment>
    ))

    .add("Header with Subnav", () => (
        <React.Fragment>
            <h4> Header with Subnav</h4>
            <Header className={HeaderColor.header1}>
                <div className="branding">
                    <a href="#" className="nav-link">
                        <Icon shape="vm-bug" />
                        <span className="title">Project Clarity</span>
                    </a>
                </div>
            </Header>
            <nav className="subnav">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Management
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Cloud
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Tenants
                        </a>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    ));
