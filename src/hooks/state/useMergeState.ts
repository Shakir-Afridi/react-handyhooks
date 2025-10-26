import { useState, useCallback } from "react";

/**
 * @hook useMergeState
 * @description A custom React hook.
 * It allows partial updates to an object state by merging the new values with the existing state.
 *
 * @template T - The shape of the state object.
 * @param {T} initialState - The initial state object.
 * @returns {[T, (patch: Partial<T>) => void]} A tuple containing the current state and a merge function.
 *
 * @example
 * const [user, setUser] = useMergeState({ name: "John", age: 25 });
 *
 * // Update only the age field
 * setUser({ age: 26 });
 */
export function useMergeState<T extends object>(initialState: T) {
    const [state, setState] = useState<T>(initialState);

    const mergeState = useCallback((patch: Partial<T>) => {
        setState((prev) => ({ ...prev, ...patch }));
    }, []);

    return [state, mergeState] as const;
}
