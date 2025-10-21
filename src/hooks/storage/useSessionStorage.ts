import { useState, useEffect } from "react";

/**
 * useSessionStorage Hook
 *
 * Synchronizes state with `sessionStorage`.
 * The data persists for the duration of the page session
 * and is cleared when the tab or browser is closed.
 *
 * @param key - The key to store the value under in sessionStorage.
 * @param initialValue - The default value used if nothing is stored.
 *
 * @returns [value, setValue] - Current stored value and a setter function.
 *
 * @example
 * const [user, setUser] = useSessionStorage("user", null);
 */
export function useSessionStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
    const readValue = (): T => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading sessionStorage key “${key}”:`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(readValue);

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.sessionStorage.setItem(
                    key,
                    JSON.stringify(valueToStore)
                );
            }
        } catch (error) {
            console.warn(`Error setting sessionStorage key “${key}”:`, error);
        }
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (
                event.storageArea === window.sessionStorage &&
                event.key === key
            ) {
                setStoredValue(
                    event.newValue ? JSON.parse(event.newValue) : initialValue
                );
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key, initialValue]);

    return [storedValue, setValue];
}
