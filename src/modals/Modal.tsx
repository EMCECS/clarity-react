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
import {ClassNames} from "./ClassNames";
import {ReactNode} from "react";

/**
 * @param {isOpen} property stating if modal open
 * @param {size} size of modal
 * @param {title} title of modal
 * @param {closable} property stating if modal is closable
 * @param {onClose} function onClose
 * @param {dataqa} Quality Engineering field
 */
type ModalProps = {
    isOpen?: boolean;
    size?: ModalSize;
    title?: string;
    closable?: boolean;
    onClose?: Function;
    dataqa?: string;
};

type ModalState = {
    isOpen: boolean;
};

export enum ModalSize {
    SMALL = "modal-sm",
    LARGE = "modal-lg",
    XLARGE = "modal-xl",
}

export const ModalBody: React.FunctionComponent = ({children}) => {
    return <div className={ClassNames.MODAL_BODY}>{children}</div>;
};

export const ModalFooter: React.FunctionComponent = ({children}) => {
    return <div className={ClassNames.MODAL_FOOTER}>{children}</div>;
};

export class Modal extends React.PureComponent<ModalProps> {
    private divRef: HTMLDivElement | null = null;

    state: ModalState = {
        isOpen: this.props.isOpen !== undefined ? this.props.isOpen : false,
    };

    componentWillUpdate(nextProps: ModalProps, nextState: ModalState) {
        if (this.isOpen(nextProps, nextState)) {
            this.createDivRef();
        } else {
            this.cleanup();
        }
    }

    componentWillMount() {
        this.createDivRef();
    }

    createDivRef() {
        if (this.divRef === null) {
            const el = document.createElement("div");
            document.body.appendChild(el);
            this.divRef = el;
        }
        document.body.classList.add(ClassNames.NO_SCROLLING);
    }

    cleanup() {
        if (this.divRef !== null) {
            document.body.removeChild(this.divRef);
            this.divRef = null;
        }
        document.body.classList.remove(ClassNames.NO_SCROLLING);
    }

    componentWillUnmount() {
        this.cleanup();
    }

    buildModal(): React.ReactElement {
        const {size, closable, title, children, dataqa} = this.props;
        return (
            <React.Fragment>
                <div className={ClassNames.MODAL} data-qa={dataqa}>
                    <div
                        className={classNames([
                            ClassNames.MODAL_DIALOG, //prettier
                            size && size,
                        ])}
                        role="dialog"
                        aria-hidden="true"
                    >
                        <div className={ClassNames.MODAL_CONTENT}>
                            <div className={ClassNames.MODAL_HEADER}>
                                {closable && (
                                    <button
                                        aria-label="Close"
                                        className="close"
                                        type="button"
                                        onClick={this.close.bind(this)}
                                    >
                                        <Icon aria-hidden={true} shape="close" />
                                    </button>
                                )}
                                <h3 className={ClassNames.MODAL_TITLE}>{title}</h3>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
                <div className={ClassNames.MODAL_BACKDROP} aria-hidden="true" />
            </React.Fragment>
        );
    }

    close() {
        const {onClose} = this.props;
        this.setState({isOpen: false});
        onClose && onClose();
    }

    open() {
        this.setState({isOpen: true});
    }

    isOpen(props = this.props, state = this.state): boolean {
        if (props.isOpen !== undefined) return props.isOpen;
        return state.isOpen;
    }

    render(): ReactNode {
        return this.isOpen() ? ReactDOM.createPortal(this.buildModal(), this.divRef!) : null;
    }
}
