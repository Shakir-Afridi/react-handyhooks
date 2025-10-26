/**
 * @file useToggle.ts
 * @description A simple React hook to manage boolean toggle state.
 *              Useful for toggling visibility, modals, switches, etc.
 *
 * @example
 * const [isOpen, toggleOpen] = useToggle(false);
 *
 * // To toggle value
 * toggleOpen();
 *
 * // To explicitly set value
 * toggleOpen(true);
 *
 * @returns [value, toggle]
 * - value: current boolean state
 * - toggle: function to toggle or set boolean value
 */

import { useState, useCallback } from "react";

/**
 * Custom hook for managing boolean state with toggle functionality.
 *
 * @param initialValue - The initial boolean value (default: false)
 * @returns [value, toggle]
 * - `value`: The current boolean state.
 * - `toggle`: A function to toggle the state or set it explicitly.
 */
export function useToggle(
    initialValue: boolean = false
): [boolean, (nextValue?: boolean) => void] {
    const [value, setValue] = useState<boolean>(initialValue);

    /**
     * Toggles the current boolean state.
     * If a specific value is provided, it sets it directly.
     *
     * @param nextValue - Optional boolean value to set directly
     */
    const toggle = useCallback((nextValue?: boolean) => {
        setValue((prev) =>
            typeof nextValue === "boolean" ? nextValue : !prev
        );
    }, []);

    return [value, toggle];
}

export default useToggle;
