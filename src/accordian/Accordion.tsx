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
 * @param {accordionMultiPanel} if yes multipanel enebled else not
 * @param {dataqa} quality engineering testing field
 * @param {titleClassName} css propert for title of accordion
 */
type AccordionProps = {
    style?: any;
    className?: string;
    content: accordionContent[];
    accordionMultiPanel?: boolean;
    dataqa?: string;
    titleClassName?: string;
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

    //Handle click on individual panel
    handleButtonClick = (clickedItemIndex: number, accordionMultiPanel?: boolean) => {
        let {panelItems} = this.state;

        panelItems.forEach((item: any, index: number) => {
            if (accordionMultiPanel) {
                //allow all to set isOpen
                if (index === clickedItemIndex) {
                    item.isOpen = !item.isOpen;
                    item.content = this.getItemContent(index, item.title, item.isOpen);
                }
            } else {
                //allow only first isOpen to set to panel if multiple isOpen are passed
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

    //render accordion panels
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

    //render expandable accordion content
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

    //get content for each accordion panel
    getItemContent = (index: any, title: any, isOpen: boolean | undefined) => {
        const {accordionMultiPanel, titleClassName} = this.props;
        const panelClass = classNames([ClassNames.ACCORDION_PANEL_INNER, isOpen && ClassNames.ACCORDION_PANEL_OPEN]);
        return (
            <div role="group" className={panelClass} key={index}>
                <div className={ClassNames.ACCORDION_HEADER}>
                    <button
                        className={ClassNames.ACCORDION_HEADER_BUTTON}
                        type="button"
                        aria-disabled="false"
                        aria-controls="clr-accordion-content"
                        aria-expanded={isOpen}
                        onClick={() => this.handleButtonClick(index, accordionMultiPanel)}
                    >
                        <span className={ClassNames.ACCORDION_SR} />
                        <span className={ClassNames.ACCORDION_STATUS}>
                            <Icon
                                className={ClassNames.ACCORDION_ANGLE}
                                dir={isOpen ? Direction.UP : Direction.RIGHT}
                                shape="angle"
                            />
                            <span className={ClassNames.ACCORDION_NUMBER} />
                        </span>
                        <div className={classNames([ClassNames.ACCORDION_TITLE, titleClassName])}>{title}</div>
                    </button>
                </div>
            </div>
        );
    };

    //get each panel data to pass it to accordion content
    getPanelContent = (index: number, contentItem: accordionContent, isOpen?: boolean) => {
        return {
            content: this.getItemContent(index, contentItem.title, contentItem.isOpen),
            isOpen: isOpen,
            title: contentItem.title,
            component: contentItem.itemComponent,
        };
    };

    //get initial accordion content
    getAccordionContent = () => {
        const {content, accordionMultiPanel} = this.props;
        let isAnyPanelOpened = false;
        const panelContent = content.map((contentItem, index) => {
            if (accordionMultiPanel) {
                //allow all panels to open
                return this.getPanelContent(index, contentItem, contentItem.isOpen);
            } else {
                //allow only single panel to open
                if (!isAnyPanelOpened) {
                    if (contentItem.isOpen) {
                        isAnyPanelOpened = true;
                        return this.getPanelContent(index, contentItem, contentItem.isOpen);
                    } else {
                        return this.getPanelContent(index, contentItem, false);
                    }
                } else {
                    return this.getPanelContent(index, contentItem, false);
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
