/**
 * @file useEventCallback.ts
 * @description
 * A custom React hook that returns a stable event callback reference.
 * It ensures the callback identity remains constant between renders
 * while always calling the latest version of the provided function.
 *
 * This is especially useful when you need to pass a callback to
 * event listeners or child components without triggering unnecessary re-renders.
 *
 * @example
 * const handleClick = useEventCallback(() => {
 *   console.log("Button clicked!");
 * });
 *
 * <button onClick={handleClick}>Click Me</button>
 */

import { useRef, useCallback } from "react";

/**
 * Returns a memoized callback that always invokes the latest version of `fn`
 * without changing its reference between renders.
 *
 * @template T - The type of the callback function.
 * @param fn - The callback function whose reference should remain stable.
 * @returns A stable callback function that always calls the latest `fn`.
 */
export function useEventCallback<T extends (...args: any[]) => any>(
    fn: T
): (...args: Parameters<T>) => ReturnType<T> {
    const ref = useRef(fn);

    // Always keep ref.current in sync with the latest function
    ref.current = fn;

    // Return a stable callback reference that calls the latest function
    return useCallback((...args: Parameters<T>) => {
        return ref.current(...args);
    }, []);
}
