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
import {Card, CardBlock, CardFooter, CardImage, CardMediaBlock, CardText, CardTitle} from ".";
import {Dropdown, DropdownMenu, DropdownItem, MenuItemType} from "../forms/dropdown";
import {Alert, AlertItem, AlertType, AlertSize} from "../emphasis/alert";
import {Icon} from "../icon";
import {Label, LabelStatus} from "../forms/label/Label";

storiesOf("Cards", module)
    .add("Basic Card", () => (
        <div className="clr-row">
            <div className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                <Card header="Header">
                    <CardBlock>
                        <CardTitle>Block</CardTitle>
                        <CardText>
                            Card content can contain text, links, images, data visualizations, lists and more.
                        </CardText>
                    </CardBlock>
                    <CardFooter>
                        <button className="btn btn-sm btn-link" onClick={action("onclick - footer action 1")}>
                            Footer Action 1
                        </button>
                        <button className="btn btn-sm btn-link" onClick={action("onclick - footer action 2")}>
                            Footer Action 2
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    ))
    .add("Clickable Card", () => (
        <div>
            <div className="clr-row">
                <div className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                    <Card onClick={action("onclick - card image top")}>
                        <CardImage>
                            <img src={require("./placeholder_350x150.png")} />
                        </CardImage>
                        <CardBlock>
                            <CardText>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam
                                eos amet sit rem. Ipsam maiores incidunt eum quasi enim! Corporis sunt nisi totam
                                molestias quam commodi maxime mollitia.
                            </CardText>
                        </CardBlock>
                    </Card>
                </div>
                <div className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                    <Card onClick={action("onclick - card image bottom")}>
                        <CardBlock>
                            <CardText>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur magnam
                                eos amet sit rem. Ipsam maiores incidunt eum quasi enim! Corporis sunt nisi totam
                                molestias quam commodi maxime mollitia.{" "}
                            </CardText>
                        </CardBlock>
                        <CardImage>
                            <img src={require("./placeholder_350x150.png")} />
                        </CardImage>
                    </Card>
                </div>
                <div className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                    <Card onClick={action("onclick - card image middle")}>
                        <CardBlock>
                            <CardText>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</CardText>
                        </CardBlock>
                        <CardImage>
                            <img src={require("./placeholder_350x150.png")} />
                        </CardImage>
                        <CardBlock>
                            <CardText>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</CardText>
                        </CardBlock>
                    </Card>
                </div>
            </div>
            <div className="clr-row">
                <Card className="clr-col-md-6 clr-col-12" onClick={action("onclick - card image only")}>
                    <CardImage>
                        <img src={require("./placeholder_350x150.png")} />
                    </CardImage>
                </Card>
            </div>
        </div>
    ))
    .add("Dropdowns in Cards", () => (
        <div className="clr-row">
            <div className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                <Card header="Header">
                    <CardBlock>
                        <CardTitle>Block</CardTitle>
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias officiis temporibus quod
                            inventore, minus commodi similique corrupti repellat saepe facere aliquam minima deserunt
                            esse nemo, vel illum optio necessitatibus deleniti.
                        </CardText>
                    </CardBlock>
                    <CardFooter>
                        <button className="btn btn-sm btn-link">Action 1</button>
                        <button className="btn btn-sm btn-link">Action 2</button>
                        <Dropdown
                            label="dropdown 1"
                            button={{link: true, className: "dropdown-toggle btn-sm"}}
                            onItemClick={action("onItemClick - Dropdown.")}
                            className="top-left"
                        >
                            <DropdownMenu>
                                <DropdownItem menuItemType={MenuItemType.ITEM} label="Item 1" />
                                <DropdownItem menuItemType={MenuItemType.ITEM} label="Item 2" />
                                <DropdownItem menuItemType={MenuItemType.ITEM} label="Item 3" />
                                <DropdownItem menuItemType={MenuItemType.ITEM} label="Item 4" />
                            </DropdownMenu>
                        </Dropdown>
                    </CardFooter>
                </Card>
            </div>
        </div>
    ))
    .add("Card Media Block", () => (
        <div className="clr-row">
            <div className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                <Card header="Header">
                    <CardBlock>
                        <CardMediaBlock
                            image={require("./placeholder_350x150.png")}
                            title="Project A"
                            text="Owner: John Doe"
                        />
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt excepturi labore explicabo
                            temporibus, enim voluptate saepe corrupti illum earum eveniet ab veniam vel nisi fugit
                            accusantium perferendis quas facilis quod.
                        </CardText>
                    </CardBlock>
                    <CardFooter>
                        <button className="btn btn-sm btn-link">Action</button>
                    </CardFooter>
                </Card>
            </div>
            <div className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                <Card header="Header">
                    <CardBlock>
                        <CardMediaBlock
                            image={require("./placeholder_350x150.png")}
                            title="Project B"
                            text="Owner: Jane Doe"
                            wrap={true}
                        />
                        <CardText>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, ipsum?</CardText>
                    </CardBlock>
                    <CardFooter>
                        <button className="btn btn-sm btn-link">Action</button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    ))
    .add("Alerts in Cards", () => (
        <div className="clr-row">
            <div className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                <Card>
                    <CardBlock>
                        <Alert
                            type={AlertType.WARNING} //prettier
                            style={{marginBottom: "2em"}}
                            size={AlertSize.COMPACT}
                            closeable={true}
                        >
                            <AlertItem icon={<Icon shape="exclamation-triangle" />}>
                                Use small alerts in a card
                            </AlertItem>
                        </Alert>
                        <CardMediaBlock
                            image={require("./placeholder_350x150.png")}
                            title="Project A"
                            text="Owner: John Doe"
                            wrap={true}
                        />
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </CardText>
                    </CardBlock>
                    <CardFooter>
                        <a className="card-link">Button One</a>
                        <a className="card-link">Button Two</a>
                    </CardFooter>
                </Card>
            </div>
        </div>
    ))
    .add("Lists in Cards", () => (
        <div className="clr-row">
            <div className="clr-col-lg-4 clr-col-12">
                <Card header="Unordered Lists">
                    <CardBlock>
                        <CardText>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </CardText>
                    </CardBlock>
                    <CardBlock>
                        <ul className="list">
                            <li>Ullamco Laboris</li>
                            <li>
                                Nisi Ut Aliquip
                                <ul className="list">
                                    <li>Exercitation</li>
                                    <li>Laboris</li>
                                    <li>Commodo</li>
                                </ul>
                            </li>
                            <li>Consequat</li>
                            <li>Excepteur sint occaecat cupidatat non proident</li>
                            <li>Enim ad Minim</li>
                            <li>
                                Occeaecat
                                <ul className="list-unstyled">
                                    <li>Exercitation</li>
                                    <li>Laboris</li>
                                    <li>Commodo</li>
                                </ul>
                            </li>
                        </ul>
                    </CardBlock>
                    <CardFooter>
                        <a className="btn btn-primary">Action</a>
                    </CardFooter>
                </Card>
            </div>
            <div className="clr-col-lg-4 clr-col-12">
                <Card header="Ordered Lists">
                    <CardBlock>
                        <CardText>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </CardText>
                    </CardBlock>
                    <CardBlock>
                        <ol className="list">
                            <li>Ullamco Laboris</li>
                            <li>
                                Nisi Ut Aliquip
                                <ol className="list">
                                    <li>Exercitation</li>
                                    <li>Laboris</li>
                                    <li>Commodo</li>
                                </ol>
                            </li>
                            <li>Consequat</li>
                            <li>Excepteur sint occaecat cupidatat non proident</li>
                            <li>Enim ad Minim</li>
                            <li>
                                Occeaecat
                                <ol className="list-unstyled">
                                    <li>Exercitation</li>
                                    <li>Laboris</li>
                                    <li>Commodo</li>
                                </ol>
                            </li>
                        </ol>
                    </CardBlock>
                    <CardFooter>
                        <a className="btn btn-primary">Action</a>
                    </CardFooter>
                </Card>
            </div>
            <div className="clr-col-lg-4 clr-col-12">
                <Card header="Unstyled Lists">
                    <CardBlock>
                        <CardText>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </CardText>
                    </CardBlock>
                    <CardBlock>
                        <ul className="list-unstyled">
                            <li>Ullamco Laboris</li>
                            <li>
                                Nisi Ut Aliquip
                                <ul className="list">
                                    <li>Exercitation</li>
                                    <li>Laboris</li>
                                    <li>Commodo</li>
                                </ul>
                            </li>
                            <li>Consequat</li>
                            <li>Excepteur sint occaecat cupidatat non proident</li>
                            <li>Enim ad Minim</li>
                            <li>
                                Occeaecat
                                <ul className="list-unstyled">
                                    <li>Exercitation</li>
                                    <li>Laboris</li>
                                    <li>Commodo</li>
                                </ul>
                            </li>
                        </ul>
                    </CardBlock>
                    <CardFooter>
                        <a className="btn btn-primary">Action</a>
                    </CardFooter>
                </Card>
            </div>
        </div>
    ))
    .add("List Groups in Cards", () => (
        <div className="clr-row">
            <div className="clr-col-5">
                <Card>
                    <CardImage>
                        <img src={require("./placeholder_350x150.png")} />
                    </CardImage>
                    <CardBlock>
                        <CardTitle>Title</CardTitle>
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, aut. Nihil nemo,
                            necessitatibus earum.
                        </CardText>
                    </CardBlock>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Lorem ipsum dolor.</li>
                        <li className="list-group-item">Lorem ipsum dolor sit.</li>
                        <li className="list-group-item">Lorem ipsum.</li>
                    </ul>
                    <CardFooter>
                        <a className="btn btn-sm btn-link">Action 1</a>
                        <a className="btn btn-sm btn-link">Action 2</a>
                    </CardFooter>
                </Card>
            </div>
        </div>
    ))
    .add("Custom Styled Card", () => (
        <div className="clr-row">
            <div className="clr-col-lg-4 clr-col-md-8 clr-col-12">
                <Card>
                    <CardBlock style={{backgroundColor: "#eeeeee", borderBottom: "1px solid #cccccc"}}>
                        <CardTitle style={{height: "30px"}}>
                            <div style={{float: "left"}}>
                                <a className="btn btn-sm btn-link">My App Object</a>
                            </div>
                            <div style={{float: "right"}}>
                                <Label status={LabelStatus.SUCCESS}>Healthy</Label>
                            </div>
                        </CardTitle>
                    </CardBlock>
                    <CardBlock>
                        <CardMediaBlock
                            image={require("./placeholder_350x150.png")}
                            title="Project A"
                            text="Owner: John Doe"
                            wrap={false}
                        />
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </CardText>
                    </CardBlock>
                    <CardBlock>
                        <CardTitle>Details</CardTitle>
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, aut. Nihil nemo,
                            necessitatibus earum.
                        </CardText>
                    </CardBlock>
                </Card>
            </div>
        </div>
    ));
