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
import {DropdownItem, DropdownItemProps, Dropdown, DropdownProps} from ".";
import {ReactElement, ReactNode} from "react";
import {MenuItemType} from "./DropdownItem";
import {classNames} from "../../utils";

export const STOP_PROPAGATION: "stopPropagation" = "stopPropagation";
export type OnItemClickResult =
    | void
    | undefined
    | typeof STOP_PROPAGATION
    | Promise<undefined | typeof STOP_PROPAGATION>;

export type DropdownMenuProps = {
    itemsPath?: string;
    closeOnItemClick?: boolean;
    closeOnBackdrop?: boolean;
    _level: number;
    onItemClick?: (item: DropdownItem, itemPath: string) => OnItemClickResult;
    style?: any;
    className?: string;
};

export async function propogationChain(item: any, itemPath: any, funcs: any[]) {
    for (const func of funcs) {
        if (func) {
            let r;
            r = await func(item, itemPath);
            if (r === STOP_PROPAGATION) return STOP_PROPAGATION;
        }
    }
    return undefined;
}

export class DropdownMenu extends React.PureComponent<DropdownMenuProps> {
    static defaultProps = {
        closeOnItemClick: true,
        closeOnBackdrop: true,
        itemsPath: "",
        _level: 0,
        style: {},
        className: "",
    };
    private renderChildren(): React.ReactNode[] | undefined | null {
        const {
            children, //prettier hack
            itemsPath,
            onItemClick,
            _level,
        } = this.props;
        if (typeof children === "undefined" || children === null) {
            return [];
        }
        return React.Children.map(children, (child: ReactNode, index: number) => {
            const childEl = child as ReactElement;
            if (childEl.type === DropdownItem) {
                if ((childEl.props as DropdownItemProps).menuItemType === MenuItemType.ITEM) {
                    const onClick = (childEl.props as DropdownItemProps).onClick;
                    const key =
                        (childEl.props as DropdownItemProps).label || (childEl.props as DropdownItemProps).key || index;
                    const itemPath = `${itemsPath}/${key}`;
                    return React.cloneElement(childEl as React.ReactElement<DropdownItemProps>, {
                        onClick: (evt: React.MouseEvent<HTMLElement>) => {
                            return propogationChain(childEl, itemPath, [
                                onClick && onClick(evt),
                                this.props.onItemClick,
                            ]);
                        },
                        key: key.toString(),
                    });
                }
            } else if (childEl.type === Dropdown) {
                return React.cloneElement(childEl as React.ReactElement<DropdownProps>, {
                    onItemClick: (clickedItem: DropdownItem, itemPath: string) => {
                        return propogationChain(clickedItem, itemPath, [clickedItem.props.onClick, onItemClick]);
                    },
                    itemsPath: itemsPath,
                    className: _level! % 2 === 0 ? "left-top" : "right-bottom",
                    _level: _level,
                });
            }
            console.log(child);
            return child;
        });
    }

    render() {
        return (
            <div
                className={classNames([
                    "dropdown-menu", //prettier hack
                    this.props.className,
                ])}
                style={this.props.style}
            >
                {this.renderChildren()}
            </div>
        );
    }
}
