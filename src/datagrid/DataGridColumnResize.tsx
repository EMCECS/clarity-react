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
import {ClassNames, Styles} from "./ClassNames";
import {DataGridColumn} from "./DataGrid";

/**
 * General component description :
 * DataGridColumnResize :
 * component to manage dynamic chnages in datagrid width
 */

// Min column width in px
const MIN_COLUMN_WIDTH = 96;

/**
 * Props for DataGridColumnResize :
 * @param {column} datagrid column
 * @param {height} datagrid height
 * @param {updateColumn} callback function to update datagrid column width
 * @param {className} CSS class names
 * @param {style} CSS style
 */
export type DataGridColumnResizeProps = {
    column: DataGridColumn;
    height: number | null;
    updateColumn?: (column: DataGridColumn) => void;
    className?: string;
    style?: any;
};

/**
 * State for DataGridColumnResize :
 * @param {startX} start position for tracker
 * @param {moveX} moved position for tracker
 * @param {showTracker} show width tracker if true
 * @param {isLessThanMinWidth} show width tracker in red if true
 */
type DataGridColumnResizeState = {
    startX: number;
    moveX: number;
    showTracker: boolean;
    isLessThanMinWidth: boolean;
};

export class DataGridColumnResize extends React.PureComponent<DataGridColumnResizeProps, DataGridColumnResizeState> {
    // Initial state for DataGridColumnResize
    state: DataGridColumnResizeState = {
        startX: 0,
        moveX: 0,
        showTracker: false,
        isLessThanMinWidth: false,
    };

    // Function to calculate new width for datagrid column
    calculateResizedBy = (clientX: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            const {startX} = this.state;
            const {column} = this.props;
            let resizedBy = clientX - startX;
            let isLessThanMinWidth = false;

            // calculate new width
            if (column && column.width) {
                const minWidth = column.width - MIN_COLUMN_WIDTH;
                let newWidth = column.width + resizedBy;

                if (minWidth !== undefined && resizedBy < -minWidth) {
                    resizedBy = -minWidth;
                    isLessThanMinWidth = true;
                }
                newWidth = column.width + resizedBy;
                resolve({resizedBy, isLessThanMinWidth, newWidth});
            }
        });
    };

    // onDrag event handler
    moveTracker = (event: React.DragEvent) => {
        this.calculateResizedBy(event.clientX).then(result => {
            this.setState({
                moveX: result.resizedBy,
                isLessThanMinWidth: result.isLessThanMinWidth,
            });
        });
    };

    // Function to show width tracker on drag start
    showTracker = (event: React.DragEvent) => {
        this.setState({
            startX: event.clientX,
            moveX: 0,
            showTracker: true,
        });
    };

    // Function to hide width tracker on drag end
    hideTracker = (event: React.DragEvent) => {
        const {column, updateColumn} = this.props;
        if (column) {
            this.calculateResizedBy(event.clientX).then(result => {
                column.width = Math.abs(result.newWidth);
                column.className = ClassNames.STRICT_WIDTH_CLASS;
                this.setState(
                    {
                        showTracker: false,
                        moveX: 0,
                        startX: 0,
                    },
                    () => updateColumn && updateColumn(column),
                );
            });
        }
    };

    render() {
        const {height} = this.props;
        const {moveX, showTracker, isLessThanMinWidth} = this.state;
        const transformVal = "translateX(" + moveX + "px)";

        return (
            <div className={classNames([ClassNames.DATAGRID_COLUMN_SEPARATOR, ClassNames.DATAGRID_NG_STAR_INSERTED])}>
                <div
                    aria-hidden="true"
                    draggable={true}
                    onDragStart={(evt: React.DragEvent) => this.showTracker(evt)}
                    onDrag={(evt: React.DragEvent) => this.moveTracker(evt)}
                    onDragEndCapture={(evt: React.DragEvent) => this.hideTracker(evt)}
                    className={classNames([ClassNames.DATAGRID_COLUMN_HANDLE, showTracker && ClassNames.BEING_DRAGGED])}
                />
                {
                    <div
                        className={classNames([
                            ClassNames.NG_TNS_C81_13,
                            ClassNames.DRAGGABLE_GHOST,
                            ClassNames.NG_TRIGGER,
                            ClassNames.NG_TRIGGER_LEAVE_ANIMATION,
                            ClassNames.DATAGRID_NG_STAR_INSERTED,
                        ])}
                        style={Styles.DRAGGABLE_GHOST}
                    >
                        <div
                            aria-hidden="true"
                            draggable={true}
                            className={classNames([ClassNames.DATAGRID_COLUMN_HANDLE, ClassNames.NG_TNS_C81_13])}
                        />
                    </div>
                }
                <span className={ClassNames.CLR_SR_ONLY}></span>
                <div
                    className={classNames([
                        ClassNames.DATAGRID_COLUMN_RESIZE,
                        isLessThanMinWidth && ClassNames.DATAGRID_COL_WIDTH_EXCEEDED_MAX,
                    ])}
                    style={{
                        display: showTracker ? "block" : "none",
                        height: height ? height + "px" : "auto",
                        transform: transformVal,
                    }}
                />
            </div>
        );
    }
}
