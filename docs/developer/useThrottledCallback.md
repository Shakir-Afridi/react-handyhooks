---
title: useThrottledCallback
outline: deep
---

# useThrottledCallback

A React hook that returns a throttled version of a callback function.

---

## ✨ Overview

`useThrottledCallback` ensures the callback is only executed once within the specified delay period, even if called multiple times.  
Useful for optimizing performance for events like window resizing, scrolling, or continuous user input.

---

## 📦 Import

```tsx
import { useThrottledCallback } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useThrottledCallback } from 'react-hookstack';

const handleScroll = useThrottledCallback(() => {
  console.log("Scroll event triggered");
}, 300);

window.addEventListener("scroll", handleScroll);
```

## 🧩 API Reference

`useThrottledCallback<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void`

### Parameters

| Parameter | Type                       | Description                                 |
| --------- | -------------------------- | ------------------------------------------- |
| `fn`      | `(...args: any[]) => void`   | The callback function to throttle.          |
| `delay`   | number                     | The minimum delay between calls (ms).       |

### Returns

| Type                         | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `(...args: Parameters<T>) => void` | Throttled version of the callback.        |

## ⚙️ Implementation

```tsx
import { useRef, useCallback } from "react";

export function useThrottledCallback<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    const lastCallRef = useRef(0);

    return useCallback(
        (...args: Parameters<T>) => {
            const now = Date.now();
            if (now - lastCallRef.current >= delay) {
                lastCallRef.current = now;
                fn(...args);
            }
        },
        [fn, delay]
    );
}
```

## 💡 Notes

- Ensures callback is not called more than once per delay period.
- Useful for performance optimization.

## 🧾 Type Definition

```tsx
function useThrottledCallback<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Throttled    | Limits callback execution rate    |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
