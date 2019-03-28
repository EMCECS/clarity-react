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
import {classNames, isInTreeDOM} from "../../utils";
import {Icon} from "../../icon";
import {ClassNames} from "./ClassNames";
import {DropdownItem, DropdownMenu, propogationChain, DropdownMenuProps} from ".";
import {ReactElement, ReactNode} from "react";
import {ButtonProps, Button} from "../button";
import {STOP_PROPAGATION} from ".";

export type DropdownProps = {
    label?: string;
    isNested?: boolean;
    className?: string;
    button?: ButtonProps;
} & DropdownMenuProps;

const initialState = {
    isOpen: false,
};

type DropdownState = Readonly<typeof initialState>;

export class Dropdown extends React.PureComponent<DropdownProps> {
    static defaultProps = {
        closeOnItemClick: true,
        closeOnBackdrop: true,
        itemsPath: "",
        _level: 0,
        isNested: false,
    };

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
        const el = ReactDOM.findDOMNode(this);
        if (!el || typeof el === "string") {
            console.warn("wrong element type");
            return;
        }
        if (!isInTreeDOM(el, target)) {
            this.toggle(false);
        }
    };

    getClassListMain(): (string | undefined)[] {
        const {className} = this.props;
        const {isOpen} = this.state;
        return [
            ClassNames.DROPDOWN, // prettier hack
            isOpen ? ClassNames.OPEN : undefined,
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

    private renderChildren(): React.ReactNode[] {
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
            console.log(child);
            return child;
        });
    }

    render() {
        const {label, isNested, button} = this.props;
        const buttonProps = {
            ...button,
        };
        return (
            <div className={classNames(this.getClassListMain())} style={{position: "static"}}>
                {isNested ? (
                    <DropdownItem isExpandable={true} onClick={this.handleButtonClick.bind(this)}>
                        {label}
                    </DropdownItem>
                ) : button ? (
                    <Button {...buttonProps} onClick={this.handleButtonClick.bind(this)}>
                        {label}
                        <Icon shape="caret down" />
                    </Button>
                ) : (
                    <Button
                        className={classNames(this.getClassListButton())}
                        onClick={this.handleButtonClick.bind(this)}
                    >
                        {label}
                        <Icon shape="caret down" />
                    </Button>
                    // <button
                    //     className={classNames(this.getClassListButton())}
                    //     type="button"
                    //     onClick={this.handleButtonClick.bind(this)}
                    // >
                    //     {label}
                    //     <Icon shape="caret" />
                    // </button>
                )}
                {this.renderChildren()}
            </div>
        );
    }
}
