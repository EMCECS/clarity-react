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
import {classNames, allTrueOnKey, allFalseOnKey} from "../utils";
import {ClassNames} from "./ClassNames";
import {Button} from "../forms/button";
import {DataGridRow, DataGridColumn} from "./DataGrid";
import {CheckBox} from "../forms/checkbox";

/**
 * General component description :
 * HideShowColumns :
 * component to render hide and show columns menu
 */

/**
 * Props for HideShowColumns :
 * @param {columns} datagrid columns
 * @param {updateColumns} Function to update datagrid columns
 * @param {className} CSS class names
 */
export type HideShowColumnsProps = {
    columns: DataGridColumn[];
    updateColumns: (columns: DataGridColumn[]) => void;
    className?: string;
};

/**
 * State for HideShowColumns :
 * @param {columns} datagrid columns
 * @param {isOpen} true if hide and columns menu is open
 * @param {transformVal} CSS value for transform attribute
 * @param {SelectAll} true if all columns has selected
 */
type HideShowColumnsState = {
    isOpen: boolean;
    columns: DataGridColumn[];
    transformVal: string;
    SelectAll: boolean;
};

export class HideShowColumns extends React.PureComponent<HideShowColumnsProps, HideShowColumnsState> {
    private refParent = React.createRef<HTMLDivElement>();
    private refChild = React.createRef<HTMLDivElement>();

    // Initial state for HideShowColumns
    state: HideShowColumnsState = {
        isOpen: false,
        columns: this.props.columns,
        transformVal: "translateX(0px) translateY(0px)",
        SelectAll: allTrueOnKey(this.props.columns, "isVisible"),
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
            // Calculate left and top for hide and show columns menu
            const HideShowColumnsMenuTop =
                this.refParent.current!.getClientRects()[0].top - this.refChild.current!.getClientRects()[0].width + 50;
            const HideShowColumnsMenuLeft = this.refParent.current!.getClientRects()[0].left;
            const transformVal =
                "translateX(" + HideShowColumnsMenuLeft + "px) " + "translateY(" + HideShowColumnsMenuTop + "px)";
            this.setState({transformVal: transformVal});
        }
    }

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

    // Handle for select All button
    private handleSelectAll = () => {
        this.updateDatagridColumns("All");
    };

    // Handle for select single column
    private handleSingleSelect = (columnName: string) => {
        this.updateDatagridColumns(columnName);
    };

    private updateDatagridColumns = (columnName: string) => {
        const {columns} = this.state;
        const {updateColumns} = this.props;

        columns.forEach((column: DataGridColumn) => {
            if (columnName === column.columnName) {
                column.isVisible = !column.isVisible;
            } else if (columnName === "All") {
                column.isVisible = true;
            }
        });

        if (!allFalseOnKey(columns, "isVisible")) {
            this.setState(
                {
                    columns: [...columns],
                    SelectAll: allTrueOnKey(columns, "isVisible"),
                },
                () => updateColumns && updateColumns(columns),
            );
        }
    };

    // function to build column list
    private buildColumnList(column: DataGridColumn, index: number): React.ReactElement {
        return (
            <li>
                <div className={ClassNames.CLR_CHECKBOX_WRAPPER} key={"selectCol_" + index}>
                    <CheckBox
                        id={column.columnName}
                        ariaLabel="Select"
                        label={column.columnName}
                        onChange={evt => this.handleSingleSelect(column.columnName)}
                        checked={column.isVisible !== undefined ? column.isVisible : undefined}
                    />
                </div>
            </li>
        );
    }

    render() {
        const {isOpen, columns, transformVal, SelectAll} = this.state;
        const {className} = this.props;

        return (
            <div>
                <div ref={this.refParent} className={classNames([ClassNames.COLUMN_SWITCH_WRAPPER])}>
                    <Button
                        className={ClassNames.COLUMN_TOGGLE}
                        onClick={this.handleButtonClick}
                        icon={{
                            shape: "view-columns",
                        }}
                    />
                </div>
                {isOpen && (
                    <div>
                        <span className={ClassNames.OFFSCREEN_FOCUS_REBOUNDER} />
                        <div
                            ref={this.refChild}
                            className={classNames([
                                ClassNames.COLUMN_SWITCH,
                                ClassNames.CLR_POPOVER_CONTENT,
                                className,
                            ])}
                            role="dialog"
                            style={{
                                top: 0,
                                bottom: "auto",
                                right: "auto",
                                left: 0,
                                transform: transformVal,
                            }}
                        >
                            <div className={ClassNames.SWITCH_HEADER}>
                                Select Columns
                                <Button
                                    className={ClassNames.SWITCH_BUTTON}
                                    onClick={this.handleButtonClick}
                                    icon={{
                                        shape: "close",
                                    }}
                                />
                            </div>

                            <ul className={ClassNames.SWITCH_CONTENT}>
                                {columns &&
                                    columns.map((column: DataGridColumn, index: number) => {
                                        return this.buildColumnList(column, index);
                                    })}
                            </ul>

                            <div className={ClassNames.SWITCH_FOOTER}>
                                <Button
                                    className={ClassNames.SWITCH_BUTTON}
                                    link
                                    disabled={SelectAll}
                                    onClick={this.handleSelectAll}
                                >
                                    Select All
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
