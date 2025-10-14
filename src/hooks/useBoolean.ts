/**
 * @file useBoolean.ts
 * @description A React hook for managing boolean state with handy utilities to toggle, set true, and set false.
 *
 * @example
 * const { value, setTrue, setFalse, toggle } = useBoolean(false);
 *
 * // Usage in a component:
 * <button onClick={toggle}>Toggle</button>
 * <button onClick={setTrue}>Enable</button>
 * <button onClick={setFalse}>Disable</button>
 */

import { useCallback, useState } from "react";

/**
 * The return type of the useBoolean hook.
 */
export interface UseBooleanReturn {
    /** The current boolean value */
    value: boolean;
    /** Sets the value to true */
    setTrue: () => void;
    /** Sets the value to false */
    setFalse: () => void;
    /** Toggles the current value */
    toggle: () => void;
    /** Manually sets a specific boolean value */
    setValue: (newValue: boolean) => void;
}

/**
 * A React hook for managing boolean state with convenient setter functions.
 *
 * @param initialValue The initial boolean state (default: false)
 * @returns An object containing the current value and functions to modify it
 */
export function useBoolean(initialValue: boolean = false): UseBooleanReturn {
    const [value, setValue] = useState<boolean>(initialValue);

    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);
    const toggle = useCallback(() => setValue((prev) => !prev), []);

    return { value, setTrue, setFalse, toggle, setValue };
}

export default useBoolean;
