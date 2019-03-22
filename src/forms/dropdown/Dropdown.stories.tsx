import * as React from "react";
import {storiesOf} from "@storybook/react";
import {Dropdown, DropdownMenu, DropdownItem, MenuItemType} from ".";

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
                        <DropdownItem value="Foo." />
                    </DropdownMenu>
                </Dropdown>
            </DropdownMenu>
        </Dropdown>
    </div>
));
