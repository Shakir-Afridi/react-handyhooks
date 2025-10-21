/**
 * @file useCounter.ts
 * @description A React hook for managing numeric state with increment, decrement, reset, and custom set capabilities.
 *
 * @example
 * const { count, increment, decrement, reset, set } = useCounter(0, { min: 0, max: 10 });
 *
 * <button onClick={decrement}>-</button>
 * <span>{count}</span>
 * <button onClick={increment}>+</button>
 */

import { useCallback, useState } from "react";

export interface UseCounterOptions {
    /** Minimum value for the counter (optional) */
    min?: number;
    /** Maximum value for the counter (optional) */
    max?: number;
    /** Step value for increment/decrement (default: 1) */
    step?: number;
}

export interface UseCounterReturn {
    /** Current counter value */
    count: number;
    /** Increments the counter */
    increment: () => void;
    /** Decrements the counter */
    decrement: () => void;
    /** Resets the counter to the initial value */
    reset: () => void;
    /** Manually sets a specific value */
    set: (value: number) => void;
}

/**
 * A React hook to manage counter state with optional min, max, and step control.
 *
 * @param initialValue Initial counter value
 * @param options Optional configuration for min, max, and step
 * @returns An object with counter value and control methods
 */
export function useCounter(
    initialValue: number = 0,
    options: UseCounterOptions = {}
): UseCounterReturn {
    const { min, max, step = 1 } = options;
    const [count, setCount] = useState<number>(initialValue);

    const increment = useCallback(() => {
        setCount((prev) => {
            const next = prev + step;
            if (max !== undefined && next > max) return max;
            return next;
        });
    }, [max, step]);

    const decrement = useCallback(() => {
        setCount((prev) => {
            const next = prev - step;
            if (min !== undefined && next < min) return min;
            return next;
        });
    }, [min, step]);

    const reset = useCallback(() => setCount(initialValue), [initialValue]);
    const set = useCallback((value: number) => setCount(value), []);

    return { count, increment, decrement, reset, set };
}

export default useCounter;
