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
 * @param {width} if Size is custom, then width need to be provided in props
 * @param {height} if Size is custom, then height need to be provided in props
 * @param {className} if className is provided, the add custom class with existing classes
 * @param {type} if type is provided, modal rendered will be of given type
 * @param {showIcon} by defualt it is true if type is provided, make it false to not show icon
 * @param {customIcon} sets custom icons to modal title
 */
type ModalProps = {
    isOpen?: boolean;
    size?: ModalSize;
    title?: string;
    closable?: boolean;
    onClose?: Function;
    dataqa?: string;
    width?: number;
    height?: number;
    className?: string;
    type?: ModalType;
    showIcon?: boolean;
    customIcon?: React.ReactNode;
};

type ModalState = {
    isOpen: boolean;
};

export enum ModalSize {
    SMALL = "modal-sm",
    LARGE = "modal-lg",
    XLARGE = "modal-xl",
    CUSTOM = "custom",
}

export enum ModalType {
    INFO = "modal-type-info",
    WARNING = "modal-type-warning",
    DANGER = "modal-type-danger",
    DEFAULT = "modal-type-default",
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

    getTitleIconByType(type: ModalType | undefined): React.ReactNode {
        switch (type) {
            case ModalType.INFO:
                return <Icon aria-hidden={true} shape="info-standard" />;
            case ModalType.WARNING:
                return <Icon aria-hidden={true} shape="warning-standard" />;
            case ModalType.DANGER:
                return <Icon aria-hidden={true} shape="error-standard" />;
            default:
                return undefined;
        }
    }

    /*Function to build title for modal
      overwrites type icons if custom icon is provided, doesn't renders any icon if showIcon is set to false
    */
    buildModalTitle(): React.ReactElement {
        const {type, customIcon, title, showIcon} = this.props;
        const showTitleIcon = showIcon && type;
        const titleIcon: React.ReactNode | undefined = customIcon ? customIcon : this.getTitleIconByType(type);

        if (showTitleIcon && titleIcon) {
            return (
                <div className={ClassNames.MODAL_TITLE_ICON}>
                    {titleIcon}
                    <h3 className={ClassNames.MODAL_TITLE}>{title}</h3>
                </div>
            );
        } else {
            return <h3 className={ClassNames.MODAL_TITLE}>{title}</h3>;
        }
    }

    buildModal(): React.ReactElement {
        const {size, closable, children, dataqa, width, height, className, type} = this.props;
        return (
            <React.Fragment>
                <div className={ClassNames.MODAL} data-qa={dataqa}>
                    <div
                        className={classNames([
                            ClassNames.MODAL_DIALOG, //prettier
                            size && size,
                            className && className,
                        ])}
                        style={size === ModalSize.CUSTOM ? {width: `${width}px`, height: `${height}px`} : {}}
                        role="dialog"
                        aria-hidden="true"
                    >
                        <div className={classNames([ClassNames.MODAL_CONTENT, type && type])}>
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
                                {this.buildModalTitle()}
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
