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
import * as ReactDOM from "react-dom";
import {classNames} from "../../utils";
import {Icon} from "../../icon";
import {ClassNames} from "./ClassNames";
import {DropdownItem, DropdownMenu, propogationChain, DropdownMenuProps} from ".";
import {ReactElement, ReactNode} from "react";
import {ButtonProps, Button} from "../button";
import {STOP_PROPAGATION} from ".";

/**
 * DropDown Props
 * @param {label} label of dropdown
 * @param {isNested} property to nest dropdown
 * @param {className} css property
 * @param {button} dropdown button
 * @param {showCaret} caret property
 * @param {direction} direction to open a menu
 * @param {dataqa} quality engineering testing field
 */
export type DropdownProps = {
    label?: any;
    isNested?: boolean;
    className?: string;
    button?: ButtonProps;
    showCaret?: boolean;
    direction?: Direction;
    dataqa?: string;
} & DropdownMenuProps;

const initialState = {
    isOpen: false,
};

// Open the menu in the respective direction.
export enum Direction {
    BOTTOM_LEFT = "bottom-left",
    BOTTOM_RIGHT = "bottom-right",
    TOP_LEFT = "top-left",
    TOP_RIGHT = "top-right",
    LEFT_BOTTOM = "left-bottom",
    LEFT_TOP = "left-top",
    RIGHT_TOP = "right-top",
    RIGHT_BOTTOM = "right-bottom",
}

type DropdownState = Readonly<typeof initialState>;

export class Dropdown extends React.PureComponent<DropdownProps> {
    static defaultProps = {
        closeOnItemClick: true,
        closeOnBackdrop: true,
        itemsPath: "",
        _level: 0,
        isNested: false,
        showCaret: true,
    };

    private ddRef = React.createRef<HTMLDivElement>();

    readonly state: DropdownState = initialState;

    handleButtonClick() {
        this.toggle();
    }

    toggle(isOpen = !this.state.isOpen) {
        this.setState({isOpen}, this.afterToggle);
    }

    afterToggle = () => {
        if (this.state.isOpen) this.subscribeDocumentClick();
        else this.unsubscribeDocumentClick();
    };

    subscribeDocumentClick = () => {
        window.addEventListener("click", this.handleDocumentClick as any, true);
    };

    unsubscribeDocumentClick = () => {
        window.removeEventListener("click", this.handleDocumentClick as any, true);
    };

    handleDocumentClick = (evt: React.MouseEvent<HTMLElement>) => {
        if (!this.state.isOpen || !this.props.closeOnBackdrop) return;
        const target = (evt.target as any) as HTMLElement;
        const el = this.ddRef.current;
        if (!el || typeof el === "string") {
            return;
        }
        if (!el.contains(target)) {
            this.toggle(false);
        }
    };

    getClassListMain(): (string | undefined)[] {
        const {className, _level, direction} = this.props;
        const {isOpen} = this.state;
        return [
            _level === 0 && className === "btn-group-overflow" ? undefined : ClassNames.DROPDOWN, // prettier hack
            isOpen ? ClassNames.OPEN : undefined,
            direction && direction,
            className ? className : undefined,
        ];
    }

    getClassListButton(): (string | undefined)[] {
        const {isOpen} = this.state;
        return [ClassNames.BUTTON, ClassNames.BUTTON_OUTLINE_PRIMARY, isOpen ? ClassNames.ACTIVE : undefined];
    }

    handleItemClick = async (item: DropdownItem, itemPath: string = "") => {
        const r = await propogationChain(item, itemPath, [this.props.onItemClick]);
        if (r === STOP_PROPAGATION) return;
        if (this.props.closeOnItemClick) {
            this.toggle(false);
        }
        return undefined;
    };

    private renderChildren(): React.ReactNode[] | undefined | null {
        const {children, itemsPath, isNested, _level} = this.props;
        if (typeof children === "undefined" || children === null) {
            return [];
        }
        return React.Children.map(children, (child: ReactNode, index: number) => {
            const childEl = child as ReactElement;
            if (childEl.type === DropdownMenu) {
                return React.cloneElement(childEl as React.ReactElement<any>, {
                    onItemClick: this.handleItemClick,
                    itemsPath: isNested ? `${itemsPath}/${this.props.label}` : undefined,
                    _level: _level + 1,
                });
            }
            return child;
        });
    }

    render() {
        const {label, isNested, button, showCaret, dataqa} = this.props;
        const caretShape = showCaret && <Icon shape={this.state.isOpen ? "caret up" : "caret down"} />;
        const buttonProps = {
            ...button,
        };
        return (
            <div ref={this.ddRef} className={classNames(this.getClassListMain())} data-qa={dataqa}>
                {isNested ? (
                    <DropdownItem isExpandable={true} onClick={this.handleButtonClick.bind(this)}>
                        {label}
                    </DropdownItem>
                ) : button ? (
                    <Button {...buttonProps} onClick={this.handleButtonClick.bind(this)}>
                        {label}
                        {caretShape}
                    </Button>
                ) : (
                    <Button
                        className={classNames(this.getClassListButton())}
                        onClick={this.handleButtonClick.bind(this)}
                    >
                        {label}
                        {caretShape}
                    </Button>
                )}
                {this.renderChildren()}
            </div>
        );
    }
}
