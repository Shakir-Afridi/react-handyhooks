---
title: useDarkMode
outline: deep
---

# useDarkMode

A React hook for managing and persisting dark mode preference.

---

## ✨ Overview

`useDarkMode` enables dark mode toggling, syncs with system preferences, and persists the user's choice in localStorage.

---

## 📦 Import

```tsx
import { useDarkMode } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useDarkMode } from 'react-hookstack';

function Example() {
  const { isDarkMode, toggle, enable, disable } = useDarkMode();

  return (
    <button onClick={toggle}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}
```

## 🧩 API Reference

`useDarkMode(storageKey?: string, defaultValue?: boolean): UseDarkModeReturn`

### Parameters

| Parameter      | Type     | Default   | Description                                 |
| -------------- | -------- | --------- | ------------------------------------------- |
| `storageKey`   | `string` | `"theme"` | Key for localStorage persistence.           |
| `defaultValue` | `boolean`| `false`   | Default mode if no preference is found.     |

### Returns

| Property     | Type      | Description                       |
| ------------ | --------- | --------------------------------- |
| `isDarkMode` | `boolean` | True if dark mode is active.      |
| `enable`     | `() => void` | Enable dark mode.              |
| `disable`    | `() => void` | Disable dark mode.             |
| `toggle`     | `() => void` | Toggle dark mode.              |

## ⚙️ Implementation

```tsx
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
```

## 💡 Notes

- Applies/removes `.dark` class on `<html>`.
- Syncs with system theme changes.
- Persists preference in localStorage.

## 🧾 Type Definition

```tsx
type UseDarkModeReturn = {
  isDarkMode: boolean;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
};
```

## 🧭 Summary

| Feature         | Description                |
| --------------- | ------------------------- |
| 🌙 Dark mode    | Toggle and persist theme  |
| ⚡ Lightweight   | Minimal overhead          |
| 🧩 Easy to use   | Simple API                |
