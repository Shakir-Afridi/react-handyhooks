---
title: useLocalStorage
outline: deep
---

# useLocalStorage

A React hook that synchronizes state with localStorage.

---

## ✨ Overview

`useLocalStorage` provides a simple API to read, write, and remove values from localStorage,  
keeping your React state in sync with persistent browser storage.

---

## 📦 Import

```tsx
import { useLocalStorage } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useLocalStorage } from 'react-hookstack';

const [user, setUser, removeUser] = useLocalStorage("user", { name: "John" });

setUser({ name: "Jane" }); // Update
removeUser(); // Remove
```

## 🧩 API Reference

`useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void]`

### Parameters

| Parameter      | Type   | Description                                 |
| -------------- | ------ | ------------------------------------------- |
| `key`          | string | The localStorage key to read/write.         |
| `initialValue` | T      | The initial value if localStorage is empty. |

### Returns

| Property      | Type                                   | Description                      |
| ------------- | -------------------------------------- | -------------------------------- |
| `value`       | T                                      | Current stored value.            |
| `setValue`    | (value: T \| (prev: T) => T) => void   | Setter function.                 |
| `removeValue` | () => void                             | Removes the value from storage.  |

## ⚙️ Implementation

```tsx
import { useState, useEffect } from "react";

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
```

## 💡 Notes

- Listens for changes from other tabs/windows.
- Handles JSON serialization automatically.

## 🧾 Type Definition

```tsx
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void];
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Persistent   | Syncs state with localStorage     |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
