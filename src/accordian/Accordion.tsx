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
import {Icon, Direction} from "../icon";

/**
 * Accordian Props
 * @param {style} css style
 * @param {className} css property
 * @param {accordianMultiPanel} if yes multipanel enebled else not
 * @param {dataqa} quality engineering testing field
 */
type AccordionProps = {
    style?: any;
    className?: string;
    content: accordionContent[];
    accordionMultiPanel?: boolean;
    dataqa?: string;
};

type accordionContent = {
    title: React.ReactNode;
    itemComponent: React.ReactNode;
    isOpen?: boolean;
};

type AccordionState = {
    panelItems: any;
};

export class Accordion extends React.Component<AccordionProps, AccordionState> {
    state: AccordionState = {
        panelItems: [],
    };

    componentDidMount() {
        this.getAccordionContent();
    }

    componentDidUpdate(prevProps: AccordionProps) {
        const {content} = this.props;
        if (content && content != prevProps.content) {
            this.getAccordionContent();
        }
    }

    handleButtonCLick = (clickedItemIndex: number, accordionMultiPanel: boolean | undefined) => {
        let {panelItems} = this.state;

        panelItems.forEach((item: any, index: number) => {
            if (accordionMultiPanel) {
                //allow all to set isOpen
                if (index === clickedItemIndex) {
                    item.isOpen = !item.isOpen;
                    item.content = this.getItemContent(index, item.title, item.isOpen);
                }
            } else {
                //allow only first to set isOpen
                if (index === clickedItemIndex) {
                    item.isOpen = !item.isOpen;
                    item.content = this.getItemContent(index, item.title, item.isOpen);
                } else {
                    item.isOpen = false;
                    item.content = this.getItemContent(index, item.title, item.isOpen);
                }
            }
        });
        this.setState({
            panelItems,
        });
    };

    private accordionPanel(): React.ReactElement {
        return (
            <div>
                {this.state.panelItems.map((content: any, index: number) => {
                    return (
                        <div className={classNames([ClassNames.ACCORDION_PANEL])} key={"accordionPanel_" + index}>
                            {content.content}
                            {content.isOpen && content.isOpen === true ? (
                                this.accordionContent(content)
                            ) : (
                                <div
                                    className={classNames([ClassNames.ACCORDION_COLLAPSED_CONTENT])}
                                    aria-hidden="true"
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
            <div className={ClassNames.ACCORDION_COLLAPSED_CONTENT} aria-hidden="false">
                <div className={ClassNames.ACCORDION_TOGGLE_CONTENT} style={{display: "block"}}>
                    <div className={ClassNames.ACCORDION_INNER_CONTENT}>
                        <div className={ClassNames.ACCORDION_COMPONENT}>{content.component}</div>
                    </div>
                </div>
            </div>
        );
    }

    getItemContent = (index: any, title: any, isOpen: boolean | undefined) => {
        const {accordionMultiPanel} = this.props;
        const panelClass = isOpen
            ? classNames([ClassNames.ACCORDION_PANEL_INNER, ClassNames.ACCORDION_PANEL_OPEN])
            : ClassNames.ACCORDION_PANEL_INNER;
        const expanded = isOpen;
        return (
            <div role="group" className={panelClass} key={index}>
                <div className={ClassNames.ACCORDION_HEADER}>
                    <button
                        className={ClassNames.ACCORDION_HEADER_BUTTON}
                        type="button"
                        aria-disabled="false"
                        aria-controls="clr-accordion-content"
                        aria-expanded={expanded}
                        onClick={() => this.handleButtonCLick(index, accordionMultiPanel)}
                    >
                        <span className={ClassNames.ACCORDION_SR} />
                        <span className={ClassNames.ACCORDION_STATUS}>
                            <Icon className={ClassNames.ACCORDION_ANGLE} dir={Direction.RIGHT} shape="angle" />
                            <span className={ClassNames.ACCORDION_NUMBER} />
                        </span>
                        <div className={ClassNames.ACCORDION_TITLE}>{title}</div>
                    </button>
                </div>
            </div>
        );
    };

    getAccordionContent = () => {
        const {content, accordionMultiPanel} = this.props;
        const panelContent = content.map((contentItem, index) => {
            if (accordionMultiPanel) {
                //allow all to set isOpen
                return {
                    content: this.getItemContent(index, contentItem.title, contentItem.isOpen),
                    isOpen: contentItem.isOpen,
                    title: contentItem.title,
                    component: contentItem.itemComponent,
                };
            } else {
                //allow only first to isOpen to set to panel is multiple isOpen are passed
                let isAnyPanelOpened = false;
                if (!isAnyPanelOpened) {
                    if (contentItem.isOpen) {
                        isAnyPanelOpened = true;
                        return {
                            content: this.getItemContent(index, contentItem.title, true),
                            isOpen: true,
                            title: contentItem.title,
                            component: contentItem.itemComponent,
                        };
                    } else {
                        return {
                            content: this.getItemContent(index, contentItem.title, false),
                            isOpen: false,
                            title: contentItem.title,
                            component: contentItem.itemComponent,
                        };
                    }
                } else {
                    return {
                        content: this.getItemContent(index, contentItem.title, false),
                        isOpen: false,
                        title: contentItem.title,
                        component: contentItem.itemComponent,
                    };
                }
            }
        });

        this.setState({panelItems: panelContent});
    };

    render() {
        const {className, style, dataqa} = this.props;
        return (
            <div
                className={classNames([
                    ClassNames.ACCORDION, // prettier
                    className,
                ])}
                style={style}
                data-qa={dataqa}
            >
                {this.accordionPanel()}
            </div>
        );
    }
}
