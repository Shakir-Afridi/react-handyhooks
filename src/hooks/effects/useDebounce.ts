/**
 * @file useDebounce.ts
 * @description A React hook that debounces a changing value over a given delay.
 *              Useful for performance optimization in search inputs, filters, or resize events.
 *
 * @example
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 500);
 *
 * useEffect(() => {
 *   if (debouncedSearch) {
 *     fetchData(debouncedSearch);
 *   }
 * }, [debouncedSearch]);
 */

import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a value over a specified delay.
 *
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds before updating the debounced value.
 * @returns The debounced value that updates only after the specified delay.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Update debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cancel timeout if value changes before delay ends
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
