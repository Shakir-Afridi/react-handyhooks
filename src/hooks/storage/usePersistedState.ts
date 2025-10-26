import { useState, useCallback } from "react";

/**
 * @hook usePersistedState
 * @description A React hook that persists state to `localStorage`.
 * Automatically initializes state from localStorage if available and
 * updates localStorage whenever the state changes.
 *
 * @template T - The type of the state.
 * @param {string} key - The key to use in localStorage.
 * @param {T} initial - The initial state value if nothing exists in localStorage.
 * @returns {[T, (newValue: T) => void]} A tuple containing the state and a setter function.
 *
 * @example
 * const [name, setName] = usePersistedState<string>("userName", "John");
 * setName("Alice"); // Also updates localStorage
 */
export function usePersistedState<T>(key: string, initial: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initial;
        } catch {
            return initial;
        }
    });

    const setPersistedState = useCallback(
        (newValue: T) => {
            setState(newValue);
            try {
                localStorage.setItem(key, JSON.stringify(newValue));
            } catch (err) {
                console.error("Failed to persist state to localStorage:", err);
            }
        },
        [key]
    );

    return [state, setPersistedState] as const;
}
