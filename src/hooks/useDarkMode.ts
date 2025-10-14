/**
 * @file useDarkMode.ts
 * @description A React hook for managing and persisting dark mode preference.
 *
 * @example
 * const { isDarkMode, toggle, enable, disable } = useDarkMode();
 *
 * <button onClick={toggle}>
 *   {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
 * </button>
 */

import { useEffect, useState, useCallback } from "react";

export interface UseDarkModeReturn {
    /** Whether dark mode is currently active */
    isDarkMode: boolean;
    /** Enables dark mode */
    enable: () => void;
    /** Disables dark mode */
    disable: () => void;
    /** Toggles dark mode */
    toggle: () => void;
}

/**
 * A React hook that manages dark mode with persistence and system preference detection.
 *
 * @param storageKey - Key used for storing the theme preference in localStorage.
 * @param defaultValue - Optional default value if no preference is found.
 * @returns An object with `isDarkMode`, `enable`, `disable`, and `toggle`.
 */
export function useDarkMode(
    storageKey: string = "theme",
    defaultValue: boolean = false
): UseDarkModeReturn {
    const getSystemPreference = (): boolean => {
        if (typeof window === "undefined" || !window.matchMedia)
            return defaultValue;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const getInitialValue = (): boolean => {
        if (typeof window === "undefined") return defaultValue;
        const stored = localStorage.getItem(storageKey);
        if (stored !== null) return stored === "dark";
        return getSystemPreference();
    };

    const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialValue);

    // Apply dark mode class to <html>
    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
            localStorage.setItem(storageKey, "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem(storageKey, "light");
        }
    }, [isDarkMode, storageKey]);

    // Sync with system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (event: MediaQueryListEvent) =>
            setIsDarkMode(event.matches);

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const enable = useCallback(() => setIsDarkMode(true), []);
    const disable = useCallback(() => setIsDarkMode(false), []);
    const toggle = useCallback(() => setIsDarkMode((prev) => !prev), []);

    return { isDarkMode, enable, disable, toggle };
}

export default useDarkMode;
