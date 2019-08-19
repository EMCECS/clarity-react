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
import {Button} from "../forms/button";
import {Icon, IconProps} from "../icon";

type AccordionPanelProps = {
    className?: string;
    style?: any;
};

export const AccordionPanel: React.FunctionComponent<AccordionPanelProps> = ({style, className, children}) => {
    return (
        <div className={classNames([ClassNames.ACCORDION_PANEL, className])} style={style}>
            <div role="group" className={classNames([ClassNames.ACCORDION_PANEL_INNER, className])}>
                {children}
            </div>
        </div>
    );
};

type AccordionTitleProps = {
    className?: string;
    style?: any;
};

export const AccordionTitle: React.FunctionComponent<AccordionTitleProps> = ({style, className, children}) => {
    return (
        <div className={ClassNames.ACCORDION_HEADER}>
            <button type="button" className={ClassNames.ACCORDION_HEADER_BUTTON}>
                <span className={ClassNames.SR_ONLY}> </span>
                <span className={ClassNames.ACCORDION_STATUS}>
                    <Icon className={ClassNames.ACCORDION_ANGLE} shape="angle" />
                    <div className={classNames([ClassNames.ACCORDION_TITLE, className])} style={style}>
                        {children}
                    </div>
                </span>
            </button>
        </div>
    );
};

type AccordionContentProps = {
    className?: string;
    style?: any;
};

export const AccordionContent: React.FunctionComponent<AccordionContentProps> = ({style, className, children}) => {
    return (
        <div className={ClassNames.ACCORDION_CONTENT_OUTER_DIV}>
            <div className={ClassNames.ACCORDION_INNER_CONTENT}>
                <div className={classNames([ClassNames.ACCORDION_CONTENT, className])} style={style}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export type AccordionProps = {
    style?: any;
    className?: string;
    header?: any;
    onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
};

export class Accordion extends React.PureComponent<AccordionProps> {
    handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        const {onClick} = this.props;
        onClick && onClick(evt);
    };

    render() {
        const {className, header, onClick, style, children} = this.props;
        return (
            <div
                className={classNames([
                    ClassNames.ACCORDION, // prettier
                    className,
                ])}
                style={style}
            >
                {children}
            </div>
        );
    }
}
