import { useState, useEffect } from "react";

/**
 * A React hook that synchronizes state with localStorage.
 *
 * @template T - The data type of the stored value
 * @param key - The localStorage key to read/write
 * @param initialValue - The initial value used if localStorage is empty or invalid
 * @returns A tuple [value, setValue, removeValue]
 *
 * @example
 * const [user, setUser, removeUser] = useLocalStorage("user", { name: "John" });
 *
 * // Update
 * setUser({ name: "Jane" });
 *
 * // Remove
 * removeUser();
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    // Retrieve stored value or fallback to initialValue
    const readValue = (): T => {
        if (typeof window === "undefined") return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(
                `[react-handyhooks]: Error reading localStorage key “${key}”:`,
                error
            );
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(readValue);

    // Sync state to localStorage
    const setValue = (value: T | ((prev: T) => T)) => {
        try {
            const newValue =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(newValue);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(newValue));
            }
        } catch (error) {
            console.warn(
                `[react-handyhooks]: Error setting localStorage key “${key}”:`,
                error
            );
        }
    };

    // Remove the value from localStorage
    const removeValue = () => {
        try {
            setStoredValue(initialValue);
            if (typeof window !== "undefined") {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            console.warn(
                `[react-handyhooks]: Error removing localStorage key “${key}”:`,
                error
            );
        }
    };

    // Listen for changes from other tabs/windows
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                setStoredValue(
                    event.newValue ? JSON.parse(event.newValue) : initialValue
                );
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key]);

    return [storedValue, setValue, removeValue] as const;
}
