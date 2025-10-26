import { useRef, useEffect } from "react";

/**
 * @hook useRafInterval
 * @description Runs a callback function at a specified interval using `requestAnimationFrame`.
 * This approach provides smoother and more efficient timing compared to `setInterval`,
 * especially for animations or UI updates tied to frame rendering.
 *
 * @param {() => void} callback - Function to be executed on each interval.
 * @param {number} delay - Time interval (in milliseconds) between each execution.
 *
 * @example
 * useRafInterval(() => {
 *   console.log("Frame-based interval triggered!");
 * }, 1000);
 */
export function useRafInterval(callback: () => void, delay: number) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        let id: number;
        let start: number;

        function tick(now: number) {
            if (!start) start = now;
            if (now - start >= delay) {
                savedCallback.current();
                start = now;
            }
            id = requestAnimationFrame(tick);
        }

        id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, [delay]);
}
