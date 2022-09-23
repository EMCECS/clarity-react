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
import {classNames} from "../utils";
import {ClassNames} from "./ClassNames";

export const CardImage: React.FunctionComponent = ({children}) => {
    return <div className={ClassNames.CARD_IMAGE}>{children}</div>;
};

type CardBlockProps = {
    className?: string;
    style?: any;
};

export const CardBlock: React.FunctionComponent<CardBlockProps> = ({style, className, children}) => {
    return (
        <div className={classNames([ClassNames.CARD_BLOCK, className])} style={style}>
            {children}
        </div>
    );
};

type CardTitleProps = {
    className?: string;
    style?: any;
};

export const CardTitle: React.FunctionComponent<CardTitleProps> = ({style, className, children}) => {
    return (
        <div className={classNames([ClassNames.CARD_TITLE, className])} style={style}>
            {children}
        </div>
    );
};

type CardTextProps = {
    className?: string;
    style?: any;
};

export const CardText: React.FunctionComponent<CardTextProps> = ({style, className, children}) => {
    return (
        <div className={classNames([ClassNames.CARD_TEXT, className])} style={style}>
            {children}
        </div>
    );
};

type CardFooterProps = {
    className?: string;
    style?: any;
};

export const CardFooter: React.FunctionComponent<CardFooterProps> = ({style, className, children}) => {
    return (
        <div className={classNames([ClassNames.CARD_FOOTER, className])} style={style}>
            {children}
        </div>
    );
};

export type CardMediaBlockProps = {
    image?: string;
    title?: string;
    text?: string;
    wrap?: boolean;
    className?: string;
};

export const CardMediaBlock: React.FunctionComponent<CardMediaBlockProps> = ({
    image,
    title,
    text,
    wrap,
    className,
    children,
}) => {
    return (
        <div
            className={classNames([
                className, //prettier
                ClassNames.CARD_MEDIA_BLOCK,
                wrap && "wrap",
            ])}
        >
            <img src={image} className={ClassNames.CARD_MEDIA_IMAGE} />
            <div className={ClassNames.CARD_MEDIA_DESC}>
                <span className={ClassNames.CARD_MEDIA_TITLE}>{title}</span>
                <span className={ClassNames.CARD_MEDIA_TEXT}>{text}</span>
                {children}
            </div>
        </div>
    );
};

export type CardProps = {
    style?: any;
    className?: string;
    header?: any;
    onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
};

export class Card extends React.PureComponent<CardProps> {
    handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        const {onClick} = this.props;
        onClick && onClick(evt);
    };

    render() {
        const {className, header, onClick, style, children} = this.props;
        return (
            <div
                className={classNames([
                    ClassNames.CARD, // prettier
                    onClick && ClassNames.CLICKABLE,
                    className,
                ])}
                style={style}
                onClick={this.handleClick.bind(this)}
            >
                {header && <div className={ClassNames.CARD_HEADER}>{header}</div>}
                {children}
            </div>
        );
    }
}
