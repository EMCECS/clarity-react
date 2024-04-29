/**
 * Copyright (c) 2018 - 2022 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

export const NUMBER_RE = /^[0-9]\d*$/;
export type ReactChildren = React.ReactNode | (React.ReactNode[] & React.ReactNode);

// Keybord Key Names
export enum KEYBOARD_KEYS {
    ESCAPE = "Escape",
    TAB = "Tab",
    ENTER = "Enter",
    SPACE = " ",
    BACKSPACE = "Backspace",
    DELETE = "Delete",
}

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
 * Function to check if input is a number.
 * @param input - The input to be checked.
 * @returns True if the input is a number, false otherwise.
 */
export function isNumber(input: any): boolean {
    // Test if the input matches the regular expression for a number.
    return NUMBER_RE.test(input);
}

/**
 * Function to check if a key event allows only number inputs.
 * @param evt - The key event to be checked.
 * @returns True if the event allows only number inputs, false otherwise.
 */
export function allowOnlyIntegers(evt: any) {
    // Get the ASCII code of the key pressed.
    var ASCIICode = evt.which ? evt.which : evt.keyCode;

    // Check if the key pressed is not a number (ASCII values between 48 and 57).
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
        // Return false if the key pressed is not a number.
        evt.preventDefault();
    }

    // Return true if the key pressed is a number.
    return true;
}
