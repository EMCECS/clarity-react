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
import {DataGridRow} from "./DataGrid";

type DataGridFilterProps = {
    style?: any;
    datagridRef: any;
    columnName: string;
    onFilter: (rows: DataGridRow[], columnValue: any, columnName: string) => DataGridRow[];
};

type DataGridFilterState = {
    isOpen: boolean;
    filterValue: any;
};

export class DataGridFilter extends React.PureComponent<DataGridFilterProps, DataGridFilterState> {
    private refParent = React.createRef<HTMLDivElement>();
    private refChild = React.createRef<HTMLDivElement>();

    state: DataGridFilterState = {
        isOpen: false,
        filterValue: undefined,
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

    handleFilterChnage = (evt: React.ChangeEvent<any>) => {
        const {columnName, datagridRef, onFilter} = this.props;
        const value = evt.target!.value;

        // get latest data from grid
        const rows = datagridRef.current!.getAllRows();

        if (onFilter && datagridRef) {
            this.setState({filterValue: value}, () =>
                datagridRef.current!.updateRows(onFilter(rows, value, columnName)),
            );
        }
    };

    render() {
        const {isOpen, filterValue} = this.state;
        const {onFilter, style} = this.props;
        const FilterBtnClasses = classNames([
            ClassNames.DATAGRID_FILTER_BUTTON,
            filterValue && ClassNames.DATAGRID_FILTERED,
        ]);
        return (
            <div ref={this.refParent} className={classNames([ClassNames.CLR_FILTER])} style={{position: "relative"}}>
                <Button
                    defaultBtn={false}
                    key="filterBtn"
                    className={FilterBtnClasses}
                    onClick={this.handleButtonClick}
                    icon={{
                        shape: filterValue ? "filter-grid-circle" : "filter-grid",
                        className: ClassNames.ICON_SOLID,
                    }}
                />
                {isOpen && (
                    <div>
                        <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                        <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                        <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                        <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                        <div
                            ref={this.refChild}
                            className={classNames([ClassNames.DATARID_FILTER, ClassNames.CLR_POPOVER_CONTENT])}
                            style={{
                                zIndex: "5000",
                                position: "fixed",
                                top: "42px",
                                bottom: "auto",
                                right: "auto",
                                height: "90px",
                                ...style,
                            }}
                        >
                            <div className={ClassNames.DATAGRID_FILTER_WRAPPER}>
                                <Button
                                    className={ClassNames.DATAGRID_FILTER_POPUP_CLOSE}
                                    defaultBtn={false}
                                    onClick={this.handleButtonClick}
                                    icon={{
                                        shape: "close",
                                    }}
                                />
                            </div>
                            <input
                                className={ClassNames.CLR_INPUT}
                                name="search"
                                type="text"
                                defaultValue={filterValue}
                                onChange={evt => {
                                    this.handleFilterChnage(evt);
                                }}
                            />
                        </div>
                        <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                    </div>
                )}
            </div>
        );
    }
}
