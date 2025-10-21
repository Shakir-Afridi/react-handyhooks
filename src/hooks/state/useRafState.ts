import { useCallback, useRef, useState } from "react";

/**
 * useRefState Hook
 *
 * Combines useState and useRef to provide both reactive and synchronous access
 * to the current state value.
 *
 * @param initialValue - The initial state value.
 *
 * @returns [state, setState, ref] - A tuple where:
 * - `state` is the current value (reactive, causes re-renders)
 * - `setState` updates the value (just like useState)
 * - `ref` always points to the latest value (non-reactive)
 *
 * @example
 * const [count, setCount, countRef] = useRefState(0);
 *
 * useEffect(() => {
 *   const interval = setInterval(() => {
 *     console.log("Current count:", countRef.current);
 *   }, 1000);
 *   return () => clearInterval(interval);
 * }, []);
 */
export function useRefState<T>(
    initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, React.MutableRefObject<T>] {
    const [state, setState] = useState<T>(initialValue);
    const ref = useRef<T>(state);

    const setValue = useCallback((value: T | ((prev: T) => T)) => {
        setState((prev) => {
            const newValue =
                typeof value === "function"
                    ? (value as (prev: T) => T)(prev)
                    : value;
            ref.current = newValue;
            return newValue;
        });
    }, []);

    // Keep ref updated when state changes
    ref.current = state;

    return [state, setValue, ref];
}
