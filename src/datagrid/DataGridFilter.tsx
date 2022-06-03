/**
 * Copyright (c) 2018 - 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React from "react";
import {classNames} from "../utils";
import {getXPositionValue} from "./DataGridUtils";
import {DEFAULT_TRANSFORM_XY_POSITIONS} from "./constants";
import {ClassNames} from "./ClassNames";
import {Button} from "../forms/button";
import {DataGridRow} from "./DataGrid";
import {DebounceUtils} from "../forms/common/DebounceUtils";

/**
 * Props for DataGridFilter :
 * @param {*} style - CSS style
 * @param {string} className - CSS classnames
 * @param {*} datagridRef - Reference for DataGrid on which filter will gets apply. We need this to call method which will update datagird rows.
 * @param {string} columnName - columnName on which filter will apply
 * @param {string} placeholder - placeholder for string filter input
 * @param {function} onFilter - Custom filter logic
 * @param {FilterType} filterType - Type of filter string or custom
 * @param {boolean} disabled - boolean value to enable or disable filter
 * @param {boolean} debounce - boolean value to apply debounce behavior
 * @param {number} debounceTime - number value debounceTime/Delay value in milliseconds
 * @param {FilterPosition} position - position of the filter popup
 * @param {*} defaultValue - defaultValue of the filter
 */
export type DataGridFilterProps = {
    style?: any;
    className?: string;
    datagridRef: any;
    columnName: string;
    placeholder?: string;
    onFilter: (rows: DataGridRow[], columnValue: any, columnName: string) => Promise<DataGridFilterResult>;
    filterType?: FilterType;
    showFilter?: boolean;
    disabled?: boolean;
    debounce?: boolean;
    debounceTime?: number;
    position?: FilterPosition;
    defaultValue?: any;
};

/**
 * Props for DataGridFilter results :
 * @param {DataGridRow[]} rows - datagrid rows after applying filter
 * @param {number} totalItems - total rows length
 */
export type DataGridFilterResult = {
    rows: DataGridRow[];
    totalItems: number;
};

/**
 * Enum for filter type :
 * @param {string} STR - to render string filter
 * @param {string} CUSTOM - to render custom filter
 */
export enum FilterType {
    STR = "String",
    CUSTOM = "Custom",
}

// Enum for filter position
export enum FilterPosition {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right",
}
/**
 * State for DataGridFilter:
 * @param {boolean} isOpen - check if filter box is open
 * @param {string} transformVal - value for transform css attribute
 * @param {boolean} isFiltered - boolean value to indicate if filter is applied or not
 */
type DataGridFilterState = {
    isOpen: boolean;
    transformVal: string;
    isFiltered: boolean;
};

/**
 * Props for CustomFilter :
 * @param {function} OnChange - function to call on change of filter value
 * @param {*} filterValue - value to be filter
 */
export type DataGridCustomFilterProps = {
    onChange?: Function;
    filterValue?: any;
};

/**
 * General component description :
 * DataGridFilter :
 * Render filter box for datagrid
 */
export class DataGridFilter extends React.PureComponent<DataGridFilterProps, DataGridFilterState> {
    private refParent = React.createRef<HTMLDivElement>();
    private refChild = React.createRef<HTMLDivElement>();
    private filterValue: any;
    private debounceHandleChange: DebounceUtils = new DebounceUtils();

    static defaultProps: {
        filterType: FilterType;
        className: string;
        style: {};
        customFilter: null;
        showFilter: boolean;
        disabled: boolean;
        position: FilterPosition;
    };

    // Poll till window resizing is stable to find correct width
    private handleResizeInterval = (prevChildWidth: number) => {
        const interval = setInterval(() => {
            let nextChildWidth =
                (this.refChild &&
                    this.refChild.current &&
                    this.refChild.current.getClientRects()[0] &&
                    this.refChild.current.getClientRects()[0].width) ||
                0;
            if (prevChildWidth === nextChildWidth) {
                clearInterval(interval);
                this.updateFilterPosition(nextChildWidth);
            } else {
                prevChildWidth = nextChildWidth;
            }
        }, 10);
    };

    // To avoid infinite loop, set the filter position only once child width is stable
    private updateFilterPosition = (childWidth: number): void => {
        const {position} = this.props;

        // Calculate left and top for filter box
        if (this.refParent && this.refParent.current && this.refParent.current.getClientRects()[0]) {
            const parentPositionFromTop: number = this.refParent.current.getClientRects()[0].height;
            const parentPositionFromLeft = getXPositionValue(position!, childWidth);
            const transformVal = `translateX(${parentPositionFromLeft}px) translateY(${parentPositionFromTop}px)`;

            this.setState({transformVal});
        }
    };

    constructor(props: DataGridFilterProps) {
        super(props);

        // Initial state for filter
        let initialStateData: DataGridFilterState = {
            isOpen: false,
            transformVal: DEFAULT_TRANSFORM_XY_POSITIONS,
            isFiltered: false,
        };

        const {defaultValue} = props;
        if (defaultValue) {
            initialStateData.isFiltered = true;
            this.filterValue = defaultValue;
        } else {
            this.filterValue = undefined;
        }

        this.state = {...initialStateData};
        window.addEventListener("resize", this.resize, true);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize, true);
    }

    componentDidUpdate() {
        const {isOpen, transformVal} = this.state;

        if (isOpen) {
            let prevChildWidth: number =
                (this.refChild &&
                    this.refChild.current &&
                    this.refChild.current.getClientRects()[0] &&
                    this.refChild.current.getClientRects()[0].width) ||
                0;
            // To avoid flicker at initial position of filter
            if (transformVal === DEFAULT_TRANSFORM_XY_POSITIONS) {
                this.updateFilterPosition(prevChildWidth);
            } else {
                // Poll till the size is stable to avoid infinite loop if window resized
                this.handleResizeInterval(prevChildWidth);
            }
        }
    }

    private handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = evt.target.value;
        this.updateFilter(value);
    };

    public updateFilter = (value: any) => {
        const {columnName, datagridRef, onFilter} = this.props;
        datagridRef.current!.showLoader();

        // get latest data from grid
        // TODO: unused code keeping this for backward compatibility
        // Remove rows parameter from onFilter() in future
        const rows = datagridRef.current!.getAllRows();

        if (onFilter && datagridRef) {
            this.filterValue = value;
            this.setState({isFiltered: String(value).length !== 0});

            onFilter(rows, value, columnName).then(data => {
                // Update datagrid rows
                const {rows, totalItems} = data;
                datagridRef.current!.updateRows(rows, totalItems);
                datagridRef.current!.closeDetailPane();
                datagridRef.current!.hideLoader();
            });
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
            window.addEventListener("click", this.handleDocumentClick, true);
        } else {
            window.removeEventListener("click", this.handleDocumentClick, true);
        }
    };

    private resize = (): void => {
        if (this.state.isOpen) {
            this.toggle();
        }
    };

    private handleDocumentClick = (evt: MouseEvent): void => {
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
        const {filterValue} = this;
        const {transformVal} = this.state;
        const {
            style,
            className,
            filterType,
            placeholder,
            columnName,
            children,
            disabled,
            debounce,
            debounceTime,
        } = this.props;

        const childrenWithProps = React.Children.map(children, child => {
            // checking isValidElement is the safe way and avoids a typescript error too
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {onChange: this.updateFilter, filterValue: filterValue});
            }
            return child;
        });

        return (
            <div>
                <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                <div
                    ref={this.refChild}
                    className={classNames([ClassNames.DATARID_FILTER, ClassNames.CLR_POPOVER_CONTENT, className])}
                    style={{
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto",
                        position: "absolute",
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
                            type="search"
                            name={`name-${columnName}`}
                            placeholder={placeholder}
                            defaultValue={filterValue}
                            disabled={disabled || false}
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                                this.debounceHandleChange.debounce(evt, this.handleOnChange, debounce, debounceTime)
                            }
                        />
                    ) : (
                        filterType === FilterType.CUSTOM && childrenWithProps
                    )}
                </div>
                <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
            </div>
        );
    }

    render() {
        const {isOpen, isFiltered} = this.state;
        const {showFilter} = this.props;
        const FilterBtnClasses = classNames([
            ClassNames.DATAGRID_FILTER_BUTTON,
            isFiltered && ClassNames.DATAGRID_FILTERED,
        ]);
        return (
            <div ref={this.refParent} className={classNames([ClassNames.CLR_FILTER])} style={{position: "relative"}}>
                {showFilter && (
                    <Button
                        defaultBtn={false}
                        className={FilterBtnClasses}
                        onClick={this.handleButtonClick}
                        icon={{
                            shape: isFiltered ? "filter-grid-circle" : "filter-grid",
                            className: ClassNames.ICON_SOLID,
                        }}
                    />
                )}
                {showFilter && isOpen && this.openFilter()}
            </div>
        );
    }
}

DataGridFilter.defaultProps = {
    filterType: FilterType.STR,
    className: "",
    style: {},
    customFilter: null,
    showFilter: true,
    disabled: false,
    position: FilterPosition.LEFT,
};
