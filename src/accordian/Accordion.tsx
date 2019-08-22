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
import {classNames} from "..//utils";
import {ClassNames} from "./ClassNames";
import {Icon, Direction} from "../icon";
import {Button} from "../forms/button";

type AccordianProps = {
    style?: any;
    className?: string;
    content: accordionContent[];
};

type accordionContent = {
    title: string;
    itemComponent: React.ReactNode;
};

type SignPostState = {
    panelItems: any;
    prevItemIndex: any;
};

export class Accordion extends React.Component<AccordianProps> {
    state: SignPostState = {
        prevItemIndex: -1,
        panelItems: [],
    };

    componentDidMount() {
        this.getAccordionContent();
    }
    handleButtonClick = (index: any) => {
        let items = this.state.panelItems;
        if (this.state.prevItemIndex != -1 && this.state.prevItemIndex === index) {
            items[index].isOpen = false;
            items[this.state.prevItemIndex].content = this.getItemContent(
                this.state.prevItemIndex,
                items[this.state.prevItemIndex].title,
                true,
            );
            this.setState({panelItems: items});
        } else {
            if (this.state.prevItemIndex != -1) {
                items[this.state.prevItemIndex].isOpen = false;
                items[this.state.prevItemIndex].content = this.getItemContent(
                    this.state.prevItemIndex,
                    items[this.state.prevItemIndex].title,
                    true,
                );
            }
            items[index].isOpen = true;
            items[index].content = this.getItemContent(index, items[index].title, false);
            this.setState({prevItemIndex: index});
            this.setState({panelItems: items});
        }
        this.accordionPanel();
    };

    private accordionPanel(): React.ReactElement {
        return (
            <div>
                {this.state.panelItems.map((content: any) => {
                    return (
                        <div className={classNames([ClassNames.ACCORDION_PANEL])}>
                            {content.content}
                            {content.isOpen && content.isOpen === true ? (
                                this.accordionContent(content)
                            ) : (
                                <div
                                    className={classNames([ClassNames.ACCORDION_COLLAPSED_CONTENT])}
                                    role="region"
                                    aria-hidden="true"
                                    aria-labelledby="clr-accordion-header"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    private accordionContent(content: any): React.ReactElement {
        return (
            <div
                className={classNames([ClassNames.ACCORDION_COLLAPSED_CONTENT])}
                role="region"
                aria-hidden="false"
                aria-labelledby="clr-accordion-header"
            >
                <div
                    className="clr-accordion-content ng-trigger ng-trigger-toggle ng-star-inserted"
                    style={{display: "block"}}
                >
                    <div className={classNames([ClassNames.ACCORDION_INNER_CONTENT])}>
                        <div className="ng-star-inserted">{content.component}</div>
                    </div>
                </div>
            </div>
        );
    }
    getItemContent = (index: any, title: any, isPrevious: boolean) => {
        let panelClass = isPrevious
            ? "ng-star-inserted clr-accordion-panel-inactive"
            : "ng-star-inserted clr-accordion-panel-inactive clr-accordion-panel-open";
        let expanded = isPrevious ? false : true;

        return (
            <div role="group" className={panelClass} key={index} onClick={() => this.handleButtonClick(index)}>
                <div className={classNames([ClassNames.ACCORDION_HEADER])}>
                    <button
                        className={classNames([ClassNames.ACCORDION_HEADER_BUTTON])}
                        type="button"
                        aria-disabled="false"
                        aria-controls="clr-accordion-content"
                        aria-expanded={expanded}
                    >
                        <span className="clr-sr-only" />
                        <span className={classNames([ClassNames.ACCORDION_STATUS])}>
                            <Icon
                                className={classNames([ClassNames.ACCORDION_ANGLE])}
                                dir={Direction.RIGHT}
                                shape="angle"
                            />
                            <span className="clr-accordion-number"></span>
                        </span>
                        <div className={classNames([ClassNames.ACCORDION_TITLE])}>{title}</div>
                    </button>
                </div>
            </div>
        );
    };

    getAccordionContent = () => {
        const {content} = this.props;
        const panelContent = content.map((content, index) => {
            return {
                content: (
                    <div
                        role="group"
                        className={classNames([ClassNames.ACCORDION_PANEL_INNER])}
                        key={index}
                        onClick={() => this.handleButtonClick(index)}
                    >
                        <div className={classNames([ClassNames.ACCORDION_HEADER])}>
                            <button
                                className={classNames([ClassNames.ACCORDION_HEADER_BUTTON])}
                                type="button"
                                aria-disabled="false"
                                aria-controls="clr-accordion-content"
                                aria-expanded="false"
                            >
                                <span className="clr-sr-only" />
                                <span className={classNames([ClassNames.ACCORDION_STATUS])}>
                                    <Icon
                                        className={classNames([ClassNames.ACCORDION_ANGLE])}
                                        dir={Direction.RIGHT}
                                        shape="angle"
                                    />
                                    <span className="clr-accordion-number"></span>
                                </span>
                                <div className={classNames([ClassNames.ACCORDION_TITLE])}>{content.title}</div>
                            </button>
                        </div>
                    </div>
                ),
                isOpen: false,
                title: content.title,
                component: content.itemComponent,
            };
        });

        this.setState({panelItems: panelContent});
    };
    render() {
        const {className, style} = this.props;
        return (
            <div
                className={classNames([
                    ClassNames.ACCORDION, // prettier
                    className,
                ])}
                style={style}
            >
                {this.accordionPanel()}
            </div>
        );
    }
}
