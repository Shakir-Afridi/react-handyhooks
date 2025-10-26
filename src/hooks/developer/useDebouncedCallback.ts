/**
 * @file useDebouncedCallback.ts
 * @description
 * A custom React hook that returns a debounced version of a callback function.
 * Useful for scenarios like search inputs, resize handlers, or any event
 * that should not trigger the callback immediately but after a delay.
 *
 * @example
 * const handleChange = (value: string) => console.log(value);
 * const debouncedChange = useDebouncedCallback(handleChange, 500);
 *
 * <input onChange={(e) => debouncedChange(e.target.value)} />
 */

import { useRef, useCallback, useEffect } from "react";

/**
 * Returns a memoized debounced function that delays invoking `fn`
 * until after `delay` milliseconds have elapsed since the last time
 * the debounced function was called.
 *
 * @template T - The type of the callback function.
 * @param fn - The callback function to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns A debounced version of the provided callback.
 */
export function useDebouncedCallback<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Cleanup timeout when component unmounts or delay changes
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [delay]);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => fn(...args), delay);
        },
        [fn, delay]
    );
}
