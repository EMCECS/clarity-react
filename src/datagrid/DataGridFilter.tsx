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
import {Input} from "../forms/input/Input";

type DataGridFilterState = {
    isOpen: boolean;
};

type DataGridFilterProps = {
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    style?: any;
};

export class DataGridFilter extends React.PureComponent<DataGridFilterProps, DataGridFilterState> {
    private refParent = React.createRef<HTMLDivElement>();
    private refChild = React.createRef<HTMLDivElement>();

    state: DataGridFilterState = {
        isOpen: false,
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
            return;
        }
        if (!el.contains(target)) {
            this.toggle(false);
        }
    };

    render() {
        const {isOpen} = this.state;
        const {onChange, style} = this.props;
        return (
            <div ref={this.refParent} className={classNames([ClassNames.CLR_FILTER])} style={{position: "relative"}}>
                <Button
                    className={ClassNames.DATAGRID_FILTER_BUTTON}
                    type="button"
                    onClick={this.handleButtonClick}
                    defaultBtn={false}
                >
                    <Icon className="is-solid" shape="filter-grid" />
                </Button>
                {isOpen && (
                    <div
                        ref={this.refChild}
                        className={classNames([
                            ClassNames.DATARID_FILTER,
                            ClassNames.CLR_POPOVER_CONTENT,
                            ClassNames.DATAGRID_NG_STAR_INSERTED,
                        ])}
                        style={{
                            ...style,
                            zIndex: "1",
                            position: "absolute",
                        }}
                    >
                        <div className={ClassNames.DATAGRID_FILTER_WRAPPER}>
                            <Button
                                className={ClassNames.DATAGRID_FILTER_POPUP_CLOSE}
                                defaultBtn={false}
                                onClick={this.handleButtonClick}
                            >
                                <Icon shape="close" />
                            </Button>
                        </div>
                        <Input
                            className={ClassNames.DATAGRID_FILTER_INPUT}
                            name="search"
                            type="text"
                            onChange={onChange}
                        />
                    </div>
                )}
            </div>
        );
    }
}
