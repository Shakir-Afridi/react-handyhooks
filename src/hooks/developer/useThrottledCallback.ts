/**
 * @file useThrottledCallback.ts
 * @description
 * A custom React hook that returns a throttled version of a callback function.
 * The throttled function ensures that the provided callback (`fn`)
 * is only executed once within the specified delay period, even if called multiple times.
 *
 * This is particularly useful for optimizing performance when handling
 * events like window resizing, scrolling, or continuous user input.
 *
 * @example
 * const handleScroll = useThrottledCallback(() => {
 *   console.log("Scroll event triggered");
 * }, 300);
 *
 * window.addEventListener("scroll", handleScroll);
 */

import { useRef, useCallback } from "react";

/**
 * Returns a memoized throttled version of the provided callback function.
 *
 * @template T - The type of the callback function.
 * @param fn - The callback function to throttle.
 * @param delay - The minimum delay (in milliseconds) between consecutive calls.
 * @returns A throttled callback function.
 */
export function useThrottledCallback<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    const lastCallRef = useRef(0);

    return useCallback(
        (...args: Parameters<T>) => {
            const now = Date.now();
            if (now - lastCallRef.current >= delay) {
                lastCallRef.current = now;
                fn(...args);
            }
        },
        [fn, delay]
    );
}
