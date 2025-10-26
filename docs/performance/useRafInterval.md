---
title: useRafInterval
outline: deep
---

# useRafInterval

A React hook that runs a callback function at a specified interval using `requestAnimationFrame`.

---

## ✨ Overview

`useRafInterval` provides smoother and more efficient timing than `setInterval`,  
especially for animations or UI updates tied to frame rendering.

---

## 📦 Import

```tsx
import { useRafInterval } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useRafInterval } from 'react-hookstack';

useRafInterval(() => {
  console.log("Frame-based interval triggered!");
}, 1000);
```

## 🧩 API Reference

`useRafInterval(callback: () => void, delay: number): void`

### Parameters

| Parameter   | Type         | Description                                 |
| ----------- | ------------ | ------------------------------------------- |
| `callback`  | () => void   | Function to execute on each interval.       |
| `delay`     | number       | Interval in milliseconds.                   |

### Returns

| Type | Description |
| ---- | ----------- |
| void | No return value. |

## ⚙️ Implementation

```tsx
import { useRef, useEffect } from "react";

export function useRafInterval(callback: () => void, delay: number) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        let id: number;
        let start: number;

        function tick(now: number) {
            if (!start) start = now;
            if (now - start >= delay) {
                savedCallback.current();
                start = now;
            }
            id = requestAnimationFrame(tick);
        }

        id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, [delay]);
}
```

## 💡 Notes

- Automatically cancels interval on unmount.
- Useful for frame-based UI updates.

## 🧾 Type Definition

```tsx
function useRafInterval(callback: () => void, delay: number): void;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Animation    | Frame-based interval              |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
