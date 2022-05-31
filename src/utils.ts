/**
 * Copyright (c) 2018 - 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import {FilterPosition} from "./datagrid";
import {ICON_CENTER_POSITION} from "./constants";

export type ReactChildren = React.ReactNode | (React.ReactNode[] & React.ReactNode);

export function classNames(classNameList: (false | undefined | null | string)[]) {
    return classNameList.filter(x => typeof x === "string").join(" ");
}

//Find if all the keys in an object are true
export function allTrue(obj: any) {
    for (let key in obj) if (!obj[key]) return false;
    return true;
}

// Find if a particular key in an object array is true for all elements in the array.
export function allTrueOnKey(obj: any, key: any) {
    for (let index in obj) {
        if (!obj[index][key]) {
            return false;
        }
    }
    return true;
}

// Find if a particular key in an object array is false for all elements in the array.
export function allFalseOnKey(obj: any, key: any) {
    for (let index in obj) {
        if (obj[index][key]) {
            return false;
        }
    }
    return true;
}

/**
 * Get X axis position value for supplied object
 * @param {sting} position - Position prop, Accepted values right, left, center
 * @param {number} childWidth - Width of child element in pixels, for center and left alignment
 * @returns {number} x axis position
 * */

export const getXPositionValue = (position: string, childWidth: number): number => {
    if (!position) return 0;

    if (position === FilterPosition.RIGHT) {
        return ICON_CENTER_POSITION;
    }
    if (position === FilterPosition.CENTER) {
        return ICON_CENTER_POSITION - childWidth / 2;
    }
    if (position === FilterPosition.LEFT) {
        return ICON_CENTER_POSITION - childWidth;
    }
    return 0;
};
