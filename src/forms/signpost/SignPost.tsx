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
import {classNames} from "../../utils";
import {Button} from "../button";
import {Icon, IconProps} from "../../icon";
import {calculateAxisPosition} from "./AxisPosition";

/**
 * General component description :
 * The signpost is a convenient way to show contextual help to user.
 */

/**
 * Props for SignPost
 *@param {direction} for SignPostDirection
 *@param {style} for css style
 *@param {className} for css class name
 *@param {openAt} element or text to open signPost on its click
 *@param {showCloseButton} for close button
 *@param {onClick} callback function to call on open of signPost
 *@param {onClose} callback function to call on close of signPost
 *@param {dataqa} for Quality Engineering
 *@param {showCustomOpenAt} flag to show custom openAt or default
 */
type SignPostProps = {
    direction?: SignPostDirection;
    style?: any;
    className?: string;
    openAt?: any;
    showCloseButton?: boolean;
    onClick?: Function;
    onClose?: Function;
    dataqa?: string;
    showCustomOpenAt?: boolean;
};

/**
 * State for SignPost
 *@param {isOpen} If true signPost is open else close
 *@param {transformVal} CSS transformX and transformY values for signPost positions
 */
type SignPostState = {
    isOpen: boolean;
    transformVal: string;
};

// Enum for signPost directions
export enum SignPostDirection {
    TOP_LEFT = "top-left",
    TOP_MIDDLE = "top-middle",
    TOP_RIGHT = "top-right",
    RIGHT_TOP = "right-top",
    RIGHT_MIDDLE = "right-middle",
    RIGHT_BOTTOM = "right-bottom",
    BOTTOM_LEFT = "bottom-left",
    BOTTOM_MIDDLE = "bottom-middle",
    BOTTOM_RIGHT = "bottom-right",
    LEFT_TOP = "left-top",
    LEFT_MIDDLE = "left-middle",
    LEFT_BOTTOM = "left-bottom",
}

// SignPost component
export class SignPost extends React.PureComponent<SignPostProps> {
    static defaultProps = {
        direction: SignPostDirection.TOP_LEFT,
        showCloseButton: true,
    };

    private refParent = React.createRef<HTMLDivElement>();
    private refChild = React.createRef<HTMLDivElement>();

    state: SignPostState = {
        isOpen: false,
        transformVal: "translateX(0px) translateY(0px)",
    };

    componentWillUnmount() {
        this.unsubscribeDocumentClick();
    }

    handleOnClick = () => {
        const {onClick} = this.props;

        this.toggle();
        onClick && onClick();
    };

    handleClose = () => {
        const {onClose} = this.props;

        this.setState(
            {
                isOpen: false,
            },
            () => {
                onClose && onClose();
                this.afterToggle();
            },
        );
    };

    toggle(isOpen = !this.state.isOpen) {
        this.setState({isOpen}, this.afterToggle);
    }

    afterToggle = () => {
        if (this.state.isOpen) {
            this.subscribeDocumentClick();
        } else {
            this.unsubscribeDocumentClick();
        }
    };

    subscribeDocumentClick = () => {
        window.addEventListener("click", this.handleDocumentClick as any, true);
    };

    unsubscribeDocumentClick = () => {
        window.removeEventListener("click", this.handleDocumentClick as any, true);
    };

    handleDocumentClick = (evt: React.MouseEvent<HTMLElement>) => {
        if (!this.state.isOpen) return;
        const target = (evt.target as any) as HTMLElement;

        const el = this.refChild.current;
        if (!el || typeof el === "string") {
            return;
        }
        if (!el.contains(target)) {
            this.toggle(false);
        }
    };

    componentDidUpdate() {
        const {isOpen} = this.state;
        if (!isOpen) return;
        const childWidth = (this.refChild.current as HTMLDivElement).clientWidth;
        const childHeight = (this.refChild.current as HTMLDivElement).clientHeight;
        const parentWidth = (this.refParent.current as HTMLDivElement).clientWidth;
        const parentHeight = (this.refParent.current as HTMLDivElement).clientHeight;

        const {direction} = this.props;
        let transformVal =
            direction && calculateAxisPosition(parentHeight, parentWidth, childHeight, childWidth, direction);
        this.setState({transformVal: transformVal});
    }

    buildSignPostTriggerButton = () => {
        const {isOpen} = this.state;
        const {openAt, showCustomOpenAt} = this.props;
        const className = isOpen ? "signpost-action signpost-trigger active" : "signpost-action signpost-trigger";
        return showCustomOpenAt ? (
            <div onClick={this.handleOnClick} className={className}>
                {openAt}
            </div>
        ) : (
            <Button
                className={classNames([
                    "signpost-action", //prettier
                    "btn-small",
                    "btn-link",
                    "signpost-trigger",
                    isOpen && "active",
                ])}
                onClick={this.handleOnClick}
            >
                {openAt ? openAt : <Icon shape="dell-alert-info" size={26} />}
            </Button>
        );
    };

    buildSignPost = () => {
        const {transformVal} = this.state;
        const {
            direction, //prettier
            style,
            className,
            children,
            showCloseButton,
        } = this.props;
        return (
            <div
                ref={this.refChild}
                className={classNames([direction, "signpost-content", "ng-star-inserted", className])}
                style={{
                    ...style,
                    position: "absolute",
                    top: "0px",
                    bottom: "auto",
                    left: "0px",
                    right: "auto",
                    transform: transformVal,
                }}
            >
                <div className="signpost-wrap">
                    <div className="popover-pointer" />
                    {showCloseButton && (
                        <div className="signpost-content-header">
                            <Button className="signpost-action close" defaultBtn={false} onClick={this.handleClose}>
                                <Icon shape="close" />
                            </Button>
                        </div>
                    )}
                    <div className="signpost-content-body">{children}</div>
                </div>
            </div>
        );
    };

    render() {
        const {isOpen} = this.state;
        const {dataqa} = this.props;
        return (
            <div ref={this.refParent} className="signpost" style={{position: "relative"}} data-qa={dataqa}>
                {this.buildSignPostTriggerButton()}
                {isOpen && this.buildSignPost()}
            </div>
        );
    }
}
