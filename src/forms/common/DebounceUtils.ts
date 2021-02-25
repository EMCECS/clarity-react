/**
 * Copyright (c) 2021 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

const defaultDebounce = 500; // miliseconds
const DebounceDisabled: boolean = false;

export class DebounceUtils {
    debounceTimer: any = null;

    /**
     * This method only suports the debounce with Events
     * @param evt - SyntheticEvent Event which is input to the called function
     * @param func - Function to be applied post debouce time is over
     * @param debounce - Boolean value to decide if debounce is needed or not
     * @param debounceTime - optional debounceTime in miliseconds, defaultDebounce will be used if not provided
     */
    public debounce = (
        evt: React.SyntheticEvent,
        func: Function | undefined,
        debounce?: boolean,
        debounceTime?: number,
    ) => {
        // if function passed is not set by parent
        if (!func) {
            return func;
        }

        // if debounce option is disabled
        if (debounce === true) {
            const waitTime = debounceTime || defaultDebounce;

            // this is needed to retain the Synthetic events
            evt.persist();
            const triggerFunction = (evt: any) => {
                func.apply(this, [evt]);
            };

            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => triggerFunction(evt), waitTime);
        } else {
            func.apply(this, [evt]);
            return;
        }
    };
}
