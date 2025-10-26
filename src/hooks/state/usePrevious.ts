/**
 * @file usePrevious.ts
 * @description A React hook that stores the previous value of a state or prop.
 *              This is helpful for comparing current and past values between renders.
 *
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * useEffect(() => {
 *   if (prevCount !== undefined && prevCount !== count) {
 *     console.log(`Count changed from ${prevCount} → ${count}`);
 *   }
 * }, [count, prevCount]);
 */

import { useEffect, useRef } from "react";

/**
 * Custom hook to get the previous value of a variable.
 *
 * @param value - The current value you want to track.
 * @returns The value from the previous render (or undefined on the first render).
 */
export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined);

    // Store current value into ref after each render
    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default usePrevious;
