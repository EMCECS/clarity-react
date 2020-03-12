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
import {ClassNames} from "./ClassNames";
import {classNames} from "../../utils";
import {Button} from "../button";

export type DropdownItemProps = {
    menuItemType: MenuItemType;
    label?: string;
    value?: string;
    key?: string;
    isDisabled?: boolean;
    isExpandable?: boolean;
    isHeaderChild?: boolean;
    isActive?: boolean;
    onClickEvent?: Function;
    onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
};

export enum MenuItemType {
    HEADER,
    DIVIDER,
    ITEM,
}

export class DropdownItem extends React.PureComponent<DropdownItemProps> {
    static defaultProps = {
        isDisabled: false,
        isExpandable: false,
        isHeaderChild: false,
        menuIsOpen: false,
        menuItemType: MenuItemType.ITEM,
    };

    getClassList(): (string | undefined)[] {
        const {menuItemType, isExpandable, isHeaderChild, isActive} = this.props;

        let result: string[] = [];
        switch (menuItemType) {
            case MenuItemType.HEADER:
                if (isHeaderChild) {
                    result.push(ClassNames.DROPDOWN_ITEM);
                    result.push(ClassNames.DROPDOWN_HEADER_CHILD);
                } else {
                    result.push(ClassNames.DROPDOWN_HEADER);
                }
                break;
            case MenuItemType.ITEM:
                result.push(ClassNames.DROPDOWN_ITEM);
                isExpandable && result.push(ClassNames.EXPANDABLE);
                isActive && result.push("active");
                break;
            case MenuItemType.DIVIDER:
                result.push(ClassNames.DROPDOWN_DIVIDER);
                break;
        }
        return result;
    }

    render() {
        const {
            menuItemType, // prettier hack
            isDisabled,
            children,
            onClick,
            label,
            value,
        } = this.props;
        const classList = this.getClassList();
        switch (menuItemType) {
            case MenuItemType.HEADER:
                return (
                    <label className={classNames(classList)}>
                        {label}
                        {children}
                    </label>
                );
            case MenuItemType.DIVIDER:
                return <div className={classNames(classList)} />;
            case MenuItemType.ITEM:
                return (
                    <Button value={value} className={classNames(classList)} disabled={isDisabled} onClick={onClick}>
                        {label}
                        {children}
                    </Button>
                );
        }
    }
}
