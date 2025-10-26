---
title: useDebouncedCallback
outline: deep
---

# useDebouncedCallback

A React hook that returns a debounced version of a callback function.

---

## ✨ Overview

`useDebouncedCallback` delays invoking the callback until after a specified delay has elapsed since the last call.  
Useful for search inputs, resize handlers, or any event that should not trigger immediately.

---

## 📦 Import

```tsx
import { useDebouncedCallback } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useDebouncedCallback } from 'react-hookstack';

const handleChange = (value: string) => console.log(value);
const debouncedChange = useDebouncedCallback(handleChange, 500);

<input onChange={(e) => debouncedChange(e.target.value)} />
```

## 🧩 API Reference

`useDebouncedCallback<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void`

### Parameters

| Parameter | Type                       | Description                                 |
| --------- | -------------------------- | ------------------------------------------- |
| `fn`      | `(...args: any[]) => void`   | The callback function to debounce.          |
| `delay`   | number                     | The debounce delay in milliseconds.         |

### Returns

| Type                         | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `(...args: Parameters<T>) => void` | Debounced version of the callback.        |

## ⚙️ Implementation

```tsx
import { useRef, useCallback, useEffect } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [delay]);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => fn(...args), delay);
        },
        [fn, delay]
    );
}
```

## 💡 Notes

- Cleans up timeout on unmount.
- Ensures only the last call within the delay is executed.

## 🧾 Type Definition

```tsx
function useDebouncedCallback<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Debounced    | Delays callback execution         |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
