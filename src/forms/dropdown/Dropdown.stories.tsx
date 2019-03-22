import * as React from "react";
import {storiesOf} from "@storybook/react";
import {Dropdown, DropdownMenu, DropdownItem, MenuItemType} from ".";
import {action} from "@storybook/addon-actions";

storiesOf("Dropdown", module).add("Dropdown", () => (
    <div>
        <Dropdown label="Dropdown">
            <DropdownMenu>
                <DropdownItem menuItemType={MenuItemType.HEADER}>Dropdown header</DropdownItem>
                <DropdownItem menuItemType={MenuItemType.HEADER} isHeaderChild={true}>
                    Action
                </DropdownItem>
                <DropdownItem menuItemType={MenuItemType.HEADER} isHeaderChild={true} isDisabled={true}>
                    Disabled Link
                </DropdownItem>
                <DropdownItem menuItemType={MenuItemType.DIVIDER} />
                <DropdownItem>Lorem</DropdownItem>
                <Dropdown label="Lorem ipsum." isNested={true}>
                    <DropdownMenu>
                        <DropdownItem>Foo.</DropdownItem>
                        <Dropdown label="Bar" isNested={true}>
                            <DropdownMenu>
                                <DropdownItem>Baz</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </DropdownMenu>
                </Dropdown>
            </DropdownMenu>
        </Dropdown>
    </div>
));
