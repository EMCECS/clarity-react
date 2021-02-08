const defaultDebounce = 5000; // miliseconds
let debounceTimer: any = null;

// Added the debounce Mechanism with change
export const debounce = (evt: React.SyntheticEvent, func: Function | undefined, debounceTime: number | undefined) => {
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

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => triggerFunction(evt), waitTime);
};
