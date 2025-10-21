import { useEffect, useRef } from "react";

/**
 * useInterval Hook
 *
 * Runs a callback function at a specified interval, ensuring
 * the latest version of the callback is always used.
 *
 * @param callback - Function to execute on each interval tick.
 * @param delay - Time in milliseconds between each tick. Pass `null` to pause.
 *
 * @example
 * useInterval(() => {
 *   console.log("Tick:", Date.now());
 * }, 1000);
 */
export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void | null>(null);

    // ✅ Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // ✅ Set up the interval
    useEffect(() => {
        if (delay === null) return; // Stop interval when delay is null

        const tick = () => savedCallback.current && savedCallback.current();

        const id = setInterval(tick, delay);
        return () => clearInterval(id); // Cleanup on unmount or delay change
    }, [delay]);
}
