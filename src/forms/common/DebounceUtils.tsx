/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

const defaultDebounce = 500; // miliseconds

export class DebounceUtils {
    debounceTimer: any = null;

    /**
     * This method only suports the debounce with Events
     * @param evt - SyntheticEvent Event which is input to the called function
     * @param func - Function to be applied post debouce time is over
     * @param debounceTime - optional debounceTime in miliseconds, defaultDebounce will be used if not provided
     */
    public debounce = (evt: React.SyntheticEvent, func: Function | undefined, debounceTime: number | undefined) => {
        // if function passed is not set by parent
        if (!func) {
            return func;
        }
        const waitTime = debounceTime || defaultDebounce;

        // this is needed to retain the Synthetic events
        evt.persist();
        const triggerFunction = (evt: any) => {
            func.apply(null, [evt]);
        };

        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => triggerFunction(evt), waitTime);
    };
}
