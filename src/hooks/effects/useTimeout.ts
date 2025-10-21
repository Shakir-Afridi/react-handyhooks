import { useEffect, useRef, useCallback } from "react";

/**
 * useTimeout Hook
 *
 * Executes a callback function after a specified delay.
 * Automatically handles cleanup and allows for manual cancel/reset.
 *
 * @param callback - Function to execute after the delay
 * @param delay - Delay in milliseconds (or null to disable)
 *
 * @returns {Object} - Control functions:
 *   - clear(): Cancels the timeout
 *   - reset(): Resets and restarts the timeout
 *
 * @example
 * const { clear, reset } = useTimeout(() => console.log("Hello!"), 3000);
 */
export function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    // Keep the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    const clear = useCallback(() => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
        }
    }, []);

    const set = useCallback(() => {
        if (delay === null) return;
        clear();
        timeoutId.current = setTimeout(() => {
            savedCallback.current();
        }, delay);
    }, [delay, clear]);

    // Start timeout on mount or when delay changes
    useEffect(() => {
        set();
        return clear;
    }, [set, clear]);

    return { clear, reset: set };
}
