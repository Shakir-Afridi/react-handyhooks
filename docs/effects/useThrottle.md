---
title: useThrottle
outline: deep
---

# useThrottle

A React hook for **throttling** a changing value, ensuring updates occur at most once per specified interval.

---

## ✨ Overview

`useThrottle` limits how often a value can update, making it ideal for performance optimization in scroll, resize, or rapid input scenarios.

---

## 📦 Import

```tsx
import { useThrottle } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useThrottle } from 'react-hookstack';

function ScrollTracker() {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const throttledScrollY = useThrottle(scrollY, 200);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    console.log("Throttled scroll position:", throttledScrollY);
  }, [throttledScrollY]);

  return <div>Scroll Y: {throttledScrollY}</div>;
}
```

## 🧩 API Reference

`useThrottle<T>(value: T, delay?: number): T`

### Parameters

| Parameter | Type     | Default | Description                          |
| --------- | -------- | ------- | ------------------------------------ |
| `value`   | `T`      |         | The value to throttle.               |
| `delay`   | `number` | `300`   | Minimum interval in milliseconds.    |

### Returns

| Property         | Type | Description                           |
| ---------------- | ---- | ------------------------------------- |
| *(return value)* | `T`  | The throttled value.                  |

## ⚙️ Implementation

```tsx
import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, delay: number = 300): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastExecuted = useRef<number>(Date.now());

    useEffect(() => {
        const now = Date.now();
        const remaining = delay - (now - lastExecuted.current);

        if (remaining <= 0) {
            setThrottledValue(value);
            lastExecuted.current = now;
        } else {
            const timeout = setTimeout(() => {
                setThrottledValue(value);
                lastExecuted.current = Date.now();
            }, remaining);

            return () => clearTimeout(timeout);
        }
    }, [value, delay]);

    return throttledValue;
}

export default useThrottle;
```

## 💡 Notes

- Ensures the value updates at most once per delay interval.
- Useful for scroll, resize, or rapid input events.
- Works with any data type.

## 🧾 Type Definition

```tsx
function useThrottle<T>(value: T, delay?: number): T;
```

## 🧭 Summary

| Feature           | Description                        |
| ----------------- | ---------------------------------- |
| ⏱ Throttled value| Updates at most once per interval  |
| 🧩 Generic support| Works with any data type           |
| ⚡ Lightweight    | No dependencies                    |
| 🧠 Intuitive      | Simple API surface                 |
