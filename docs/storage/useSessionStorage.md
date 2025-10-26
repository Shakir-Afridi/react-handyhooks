---
title: useSessionStorage
outline: deep
---

# useSessionStorage

A React hook that synchronizes state with sessionStorage.

---

## ✨ Overview

`useSessionStorage` provides a simple API to read and write values from sessionStorage,  
persisting data for the duration of the page session.

---

## 📦 Import

```tsx
import { useSessionStorage } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useSessionStorage } from 'react-hookstack';

const [user, setUser] = useSessionStorage("user", null);

setUser({ name: "Jane" }); // Update
```

## 🧩 API Reference

`useSessionStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void]`

### Parameters

| Parameter      | Type   | Description                                 |
| -------------- | ------ | ------------------------------------------- |
| `key`          | string | The sessionStorage key to read/write.       |
| `initialValue` | T      | The initial value if sessionStorage is empty.|

### Returns

| Property      | Type                                   | Description                      |
| ------------- | -------------------------------------- | -------------------------------- |
| `value`       | T                                      | Current stored value.            |
| `setValue`    | (value: T \| (val: T) => T) => void    | Setter function.                 |

## ⚙️ Implementation

```tsx
import { useState, useEffect } from "react";

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
```

## 💡 Notes

- Listens for changes from other tabs/windows.
- Handles JSON serialization automatically.

## 🧾 Type Definition

```tsx
function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void];
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Persistent   | Syncs state with sessionStorage   |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
