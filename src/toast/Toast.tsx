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
import {Icon} from "../icon";
import {classNames} from "../utils";
import {ClassNames} from "../modals/ClassNames";
import {ReactNode} from "react";

export enum Direction {
    TOP_RIGHT = "top-right",
    BOTTOM_LEFT = "bottom-left",
    BOTTOM_RIGHT = "bottom-right",
    TOP_LEFT = "top-left",
}

export enum MessageType {
    SUCCESS = "success",
    WARNING = "warning",
    DANGER = "danger",
    INFO = "info",
}

const DEFAULT_HIDE_TIME = 3000;

/**
 * @param {showToast} for showing toast;
 * @param {duration} for time;
 * @param {position} for Direction;
 * @param {type} for MessageType;
 * @param {icon} for icon;
 * @param {text} for text;
 * @param {onClose} for close function;
 * @param {style} for css style;
 * @param {className} for css style;
 * @param {dataqa} for Qulaity engineering;
 */
type ToastProps = {
    showToast?: boolean;
    duration?: number;
    position?: Direction;
    type?: MessageType;
    icon?: string;
    text: string;
    onClose?: Function;
    style?: any;
    className?: string;
    dataqa?: string;
};

type ToastState = {
    showToast: boolean;
};

export class Toast extends React.PureComponent<ToastProps> {
    private divRef: HTMLDivElement | null = null;
    // Remove the warning for setState on componentUnmount using isMounted
    private _isMounted = false;

    state: ToastState = {
        showToast: this.props.showToast !== undefined ? this.props.showToast : false,
    };

    // Default value for props if no value is given
    static defaultProps = {
        showToast: false,
        type: MessageType.SUCCESS,
        position: Direction.TOP_RIGHT,
        duration: DEFAULT_HIDE_TIME,
    };

    componentWillUpdate(nextProps: ToastProps, nextState: ToastState) {
        if (this.showToast(nextProps, nextState)) {
            this.createElement();

            if (nextProps.showToast === true && nextProps.showToast !== nextState.showToast) {
                //set the timer for the toast
                this.setTimer(nextProps.duration!);
            }
        } else {
            this.cleanup();
        }
    }

    componentWillMount() {
        this.createElement();
    }

    createElement() {
        if (this.divRef === null) {
            const el = document.createElement("div");
            document.body.appendChild(el);
            this.divRef = el;
            document.body.classList.add(ClassNames.NO_SCROLLING);
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    setTimer(hideTime: number) {
        setTimeout(() => {
            this.close();
        }, hideTime);
    }

    cleanup() {
        if (this.divRef !== null) {
            document.body.removeChild(this.divRef);
            this.divRef = null;
            document.body.classList.remove(ClassNames.NO_SCROLLING);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.cleanup();
    }

    buildToast(): React.ReactElement {
        const {text, icon, position, type, duration, showToast, style, className, dataqa} = this.props;

        let styled = {
            ...style,
            padding: "20px 20px",
            zIndex: 2000,
            position: "fixed",
        };

        //create styles based on the position given
        let place = position!.includes("bottom") ? "bottom" : "top";
        styled[place] = 0;
        place = position!.includes("right") ? "right" : "left";
        styled[place] = 0;

        return (
            <div className={classNames(["alert", `alert-${type}`, className])} style={styled} data-qa={dataqa}>
                {icon && <span style={{paddingRight: "5px"}}>{<Icon shape={icon} />}</span>}
                {text}
            </div>
        );
    }

    close() {
        const {onClose} = this.props;
        if (this._isMounted) {
            this.setState({showToast: false});
            onClose && onClose();
        }
    }

    showToast(props = this.props, state = this.state): boolean {
        if (props.showToast !== undefined) {
            return props.showToast;
        }
        return state.showToast;
    }

    render(): ReactNode {
        return this.showToast() ? ReactDOM.createPortal(this.buildToast(), this.divRef!) : null;
    }
}
