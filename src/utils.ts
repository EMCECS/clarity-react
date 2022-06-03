/**
 * Copyright (c) 2018 - 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

export type ReactChildren = React.ReactNode[] & React.ReactNode;

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
