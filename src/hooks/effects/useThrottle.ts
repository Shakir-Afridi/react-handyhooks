/**
 * @file useThrottle.ts
 * @description A React hook that throttles a changing value over a given delay.
 *              Ensures the value updates at most once within the specified interval.
 *
 * @example
 * const [scrollY, setScrollY] = useState(window.scrollY);
 * const throttledScrollY = useThrottle(scrollY, 200);
 *
 * useEffect(() => {
 *   const onScroll = () => setScrollY(window.scrollY);
 *   window.addEventListener('scroll', onScroll);
 *   return () => window.removeEventListener('scroll', onScroll);
 * }, []);
 *
 * useEffect(() => {
 *   console.log("Throttled scroll position:", throttledScrollY);
 * }, [throttledScrollY]);
 */

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to throttle a value — updates only once per specified delay.
 *
 * @param value - The value to throttle.
 * @param delay - The minimum time interval (in milliseconds) before updating again.
 * @returns The throttled value that updates at most once per delay interval.
 */
export function useThrottle<T>(value: T, delay: number = 300): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastExecuted = useRef<number>(Date.now());

    useEffect(() => {
        const now = Date.now();
        const remaining = delay - (now - lastExecuted.current);

        if (remaining <= 0) {
            // Update immediately if delay has passed
            setThrottledValue(value);
            lastExecuted.current = now;
        } else {
            // Otherwise, schedule update after remaining time
            const timeout = setTimeout(() => {
                setThrottledValue(value);
                lastExecuted.current = Date.now();
            }, remaining);

            // Cleanup pending timeout if dependencies change
            return () => clearTimeout(timeout);
        }
    }, [value, delay]);

    return throttledValue;
}

export default useThrottle;
