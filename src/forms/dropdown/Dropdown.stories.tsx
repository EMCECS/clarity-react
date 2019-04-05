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
import {Dropdown, DropdownMenu, DropdownItem, MenuItemType} from ".";
import {action} from "@storybook/addon-actions";

storiesOf("Dropdown", module)
    .add("Simple Dropdown", () => (
        <div>
            <Dropdown label="Dropdown" onItemClick={action("onItemClick - Dropdown.")}>
                <DropdownMenu>
                    <DropdownItem menuItemType={MenuItemType.HEADER} label="Dropdown header" />
                    <DropdownItem menuItemType={MenuItemType.ITEM} isHeaderChild={true} label="Action" />
                    <DropdownItem
                        menuItemType={MenuItemType.ITEM}
                        isHeaderChild={true}
                        label="Disabled Link"
                        isDisabled={true}
                    />
                    <DropdownItem menuItemType={MenuItemType.DIVIDER} />
                    <DropdownItem onClick={action("onClick - Lorem")} label="Lorem" />
                    <Dropdown label="Lorem ipsum." isNested={true}>
                        <DropdownMenu>
                            <DropdownItem onClick={action("onClick - Foo.")} label="Foo." />
                            <Dropdown label="Bar" isNested={true}>
                                <DropdownMenu>
                                    <DropdownItem onClick={action("click - Baz")} label="Baz" />
                                    <DropdownItem onClick={action("click - Caz")} label="Caz" />
                                    <DropdownItem menuItemType={MenuItemType.DIVIDER} />
                                    <Dropdown label="Jaz" isNested={true}>
                                        <DropdownMenu>
                                            <DropdownItem onClick={action("click - Caz")} label="Tazmania" />
                                        </DropdownMenu>
                                    </Dropdown>
                                </DropdownMenu>
                            </Dropdown>
                        </DropdownMenu>
                    </Dropdown>
                </DropdownMenu>
            </Dropdown>
        </div>
    ))

    .add("Icon Dropdown", () => (
        <div>
            <Dropdown button={{icon: "house", link: true}} onItemClick={action("onItemClick - Dropdown.")}>
                <DropdownMenu>
                    <DropdownItem menuItemType={MenuItemType.ITEM} isHeaderChild={true} label="Action" />
                    <DropdownItem menuItemType={MenuItemType.DIVIDER} />
                    <DropdownItem onClick={action("onClick - Lorem")} label="Lorem" />
                    <Dropdown label="Lorem ipsum." isNested={true}>
                        <DropdownMenu>
                            <DropdownItem onClick={action("onClick - Foo.")} label="Foo." />
                        </DropdownMenu>
                    </Dropdown>
                </DropdownMenu>
            </Dropdown>
        </div>
    ))
    .add("Link Button Dropdown", () => (
        <div>
            <Dropdown label="dropdown toggle" button={{link: true}} onItemClick={action("onItemClick - Dropdown.")}>
                <DropdownMenu>
                    <DropdownItem menuItemType={MenuItemType.ITEM} isHeaderChild={true} label="Action" />
                    <DropdownItem menuItemType={MenuItemType.DIVIDER} />
                    <DropdownItem onClick={action("onClick - Lorem")} label="Lorem" />
                    <Dropdown label="Lorem ipsum." isNested={true}>
                        <DropdownMenu>
                            <DropdownItem onClick={action("onClick - Foo.")} label="Foo." />
                        </DropdownMenu>
                    </Dropdown>
                </DropdownMenu>
            </Dropdown>
        </div>
    ));
