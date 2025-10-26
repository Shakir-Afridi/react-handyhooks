---
title: usePersistedState
outline: deep
---

# usePersistedState

A React hook that persists state to localStorage.

---

## ✨ Overview

`usePersistedState` automatically initializes state from localStorage if available  
and updates localStorage whenever the state changes.

---

## 📦 Import

```tsx
import { usePersistedState } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { usePersistedState } from 'react-hookstack';

const [name, setName] = usePersistedState<string>("userName", "John");
setName("Alice"); // Also updates localStorage
```

## 🧩 API Reference

`usePersistedState<T>(key: string, initial: T): [T, (newValue: T) => void]`

### Parameters

| Parameter      | Type   | Description                                 |
| -------------- | ------ | ------------------------------------------- |
| `key`          | string | The localStorage key to use.                |
| `initial`      | T      | The initial value if nothing exists.        |

### Returns

| Property      | Type                                   | Description                      |
| ------------- | -------------------------------------- | -------------------------------- |
| `state`       | T                                      | Current state value.             |
| `setState`    | (newValue: T) => void                  | Setter function.                 |

## ⚙️ Implementation

```tsx
import { useState, useCallback } from "react";

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
```

## 💡 Notes

- Automatically syncs state to localStorage.
- Handles JSON serialization automatically.

## 🧾 Type Definition

```tsx
function usePersistedState<T>(key: string, initial: T): [T, (newValue: T) => void];
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Persistent   | Persists state to localStorage    |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
