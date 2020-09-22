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

type SignPostState = {
    isOpen: boolean;
    transformVal: string;
};
/**
 *@param {direction} for SignPostDirection;
 *@param {style} for css style;
 *@param {icon} for IconProps;
 *@param {showCloseButton} for close button;
 *@param {dataqa} for Quality Engineering
 */
type SignPostProps = {
    direction?: SignPostDirection;
    style?: any;
    icon?: IconProps;
    showCloseButton?: boolean;
    dataqa?: string;
};

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

export class SignPost extends React.PureComponent<SignPostProps> {
    static defaultProps = {
        direction: SignPostDirection.TOP_LEFT,
        style: {},
        icon: {shape: "dell-alert-info", size: 26},
        showCloseButton: true,
    };
    private refParent = React.createRef<HTMLDivElement>();
    private refChild = React.createRef<HTMLDivElement>();

    state: SignPostState = {
        isOpen: false,
        transformVal: "translateX(0px) translateY(0px)",
    };

    handleButtonClick = () => {
        this.toggle();
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
            console.warn("wrong element type");
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

    render() {
        const {isOpen, transformVal} = this.state;
        const {
            direction, //prettier
            style,
            children,
            icon,
            showCloseButton,
            dataqa,
        } = this.props;
        return (
            <div ref={this.refParent} className="signpost" style={{position: "relative"}} data-qa={dataqa}>
                <Button
                    className={classNames([
                        "signpost-action", //prettier
                        "btn-small",
                        "btn-link",
                        "signpost-trigger",
                        isOpen && "active",
                    ])}
                    onClick={this.handleButtonClick}
                >
                    {icon && <Icon {...icon} />}
                </Button>
                {isOpen && (
                    <div
                        ref={this.refChild}
                        className={classNames([
                            "signpost-content",
                            direction, //prettier
                        ])}
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
                                    <Button
                                        className="signpost-action close"
                                        defaultBtn={false}
                                        onClick={this.handleButtonClick}
                                    >
                                        <Icon shape="close" />
                                    </Button>
                                </div>
                            )}
                            <div className="signpost-content-body">{children}</div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
