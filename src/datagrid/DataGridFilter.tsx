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

/**
 * General component description :
 * DataGridFilter :
 * Render filter box for datagrid
 */

/**
 * Props for DataGridFilter :
 * @param {style} CSS style
 * @param {className} CSS classnames
 * @param {datagridRef} Refrence for DataGrid on which filter will gets apply. We need this to call method which will update datagird rows.
 * @param {columnName} columnName on which filter will apply
 * @param {onFilter} Custom filter logic
 * @param {filterType} Type of filter string or custom
 * @param {customFilter} custom Filter component
 * In case of Custom filter component: the custom filter component owner needs to take care of following things.
 * 1. Custom filter component should preseve filter value inside state of component and pass it to DataGridFilter
 * 2. Custom filter component should implement its onChange event handler.
 * 3. Custom filter's onChange event handler should call 'updateFilter' method of DataGridFilter.
 */
export type DataGridFilterProps = {
    style?: any;
    className?: string;
    datagridRef: any;
    columnName: string;
    onFilter: (rows: DataGridRow[], columnValue: any, columnName: string) => Promise<DataGridFilterResult>;
    filterType?: FilterType;
    customFilter?: React.ReactNode;
};

/**
 * Props for DataGridFilter results :
 * @param {rows} datagrid rows after applying filter
 * @param {totalItems} total rows length
 */
export type DataGridFilterResult = {
    rows: DataGridRow[];
    totalItems: number;
};

/**
 * Enum for filter type :
 * @param {STR} to render string filter
 * @param {CUSTOM} to render custom filter
 */
export enum FilterType {
    STR = "String",
    CUSTOM = "Custom",
}

/**
 * State for DataGridFilter:
 * @param {isOpen} check if filter box is open
 * @param {filterValue} filter string
 * @param {transformVal} value for transform css attribute
 */
type DataGridFilterState = {
    isOpen: boolean;
    filterValue: any;
    transformVal: string;
};

export class DataGridFilter extends React.PureComponent<DataGridFilterProps, DataGridFilterState> {
    private refParent = React.createRef<HTMLDivElement>();
    private refChild = React.createRef<HTMLDivElement>();

    static defaultProps = {
        filterType: FilterType.STR,
        className: "",
        style: {},
        customFilter: null,
    };

    // Initial state for filter
    state: DataGridFilterState = {
        isOpen: false,
        filterValue: undefined,
        transformVal: "translateX(0px) translateY(0px)",
    };

    componentWillMount() {
        window.addEventListener("resize", this.resize as any, true);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize as any, true);
    }

    componentDidUpdate() {
        const {isOpen} = this.state;

        if (isOpen) {
            // Calculate left and top for filter box
            const filterBoxTop = this.refParent.current!.getClientRects()[0].top + 15;
            const filterBoxLeft =
                this.refParent.current!.getClientRects()[0].left -
                this.refChild.current!.getClientRects()[0].width +
                20;
            const transformVal = "translateX(" + filterBoxLeft + "px) " + "translateY(" + filterBoxTop + "px)";
            this.setState({transformVal: transformVal});
        }
    }

    getFilterValue = () => {
        return this.state.filterValue;
    };

    updateFilter = (value: any) => {
        const {columnName, datagridRef, onFilter} = this.props;

        // get latest data from grid
        const rows = datagridRef.current!.getAllRows();

        if (onFilter && datagridRef) {
            this.setState({filterValue: value}, () =>
                onFilter(rows, value, columnName).then(data => {
                    // Update datagrid rows
                    const {rows, totalItems} = data;
                    datagridRef.current!.updateRows(rows, totalItems);
                }),
            );
        }
    };

    private handleButtonClick = () => {
        this.toggle();
    };

    private toggle() {
        this.setState(
            prevState => ({
                isOpen: !prevState.isOpen,
            }),
            this.afterToggle,
        );
    }

    private afterToggle = () => {
        if (this.state.isOpen) {
            window.addEventListener("click", this.handleDocumentClick as any, true);
        } else {
            window.removeEventListener("click", this.handleDocumentClick as any, true);
        }
    };

    private resize = () => {
        if (this.state.isOpen) {
            this.toggle();
        }
    };

    private handleDocumentClick = (evt: Event) => {
        if (this.state.isOpen) {
            const target = (evt.target as any) as HTMLElement;
            const el = this.refChild.current;

            if (el && typeof el !== "string" && !el.contains(target)) {
                this.toggle();
            }
        }
    };

    // Function to render filter box
    private openFilter(): React.ReactElement {
        const {filterValue, transformVal} = this.state;
        const {style, className, filterType, customFilter} = this.props;

        return (
            <div>
                <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                <div
                    ref={this.refChild}
                    className={classNames([ClassNames.DATARID_FILTER, ClassNames.CLR_POPOVER_CONTENT, className])}
                    style={{
                        top: 0,
                        bottom: "auto",
                        right: "auto",
                        height: "90px",
                        left: 0,
                        transform: transformVal,
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
                    {filterType === FilterType.STR ? (
                        <input
                            className={ClassNames.CLR_INPUT}
                            name="search"
                            type="text"
                            defaultValue={filterValue}
                            onChange={evt => {
                                this.updateFilter(evt.target.value);
                            }}
                        />
                    ) : (
                        filterType === FilterType.CUSTOM && customFilter && customFilter
                    )}
                </div>
                <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
            </div>
        );
    }

    render() {
        const {isOpen, filterValue} = this.state;
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
                {isOpen && this.openFilter()}
            </div>
        );
    }
}
