import { useEffect, useRef } from "react";

/**
 * @hook usePreviousDistinct
 * @description A React hook that returns the previous value of a given variable,
 * but only if the new value is distinct based on a custom comparison function.
 * This is useful for avoiding unnecessary updates or detecting meaningful changes.
 *
 * @template T - The type of the tracked value.
 * @param {T} value - The current value to track.
 * @param {(prev: T, next: T) => boolean} [isEqual] - Optional comparison function to determine equality.
 *        If not provided, a strict inequality check (`!==`) is used.
 * @returns {T | undefined} The previous distinct value, or `undefined` if none exists yet.
 *
 * @example
 * const prevName = usePreviousDistinct(name, (a, b) => a.toLowerCase() === b.toLowerCase());
 * console.log("Previous distinct name:", prevName);
 */
function usePreviousDistinct<T>(
    value: T,
    isEqual?: (prev: T, next: T) => boolean
): T | undefined {
    const previousRef = useRef<T | null>(null);
    const currentRef = useRef<T | null>(null);

    useEffect(() => {
        // Update previousRef only if the new value is distinct
        if (!isEqual || !isEqual(currentRef.current as T, value)) {
            previousRef.current = currentRef.current;
        }
        currentRef.current = value;
    }, [value, isEqual]);

    return previousRef?.current || undefined;
}

export default usePreviousDistinct;
