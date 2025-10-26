---
title: useInterval
outline: deep
---

# useInterval

A React hook for **running a callback at a specified interval**, ensuring the latest callback is always used.

---

## ✨ Overview

`useInterval` repeatedly executes a function at a set interval, and automatically cleans up when the component unmounts or the delay changes.

---

## 📦 Import

```tsx
import { useInterval } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useInterval } from 'react-hookstack';

function Timer() {
  const [count, setCount] = useState(0);

  useInterval(() => setCount(c => c + 1), 1000);

  return <div>Seconds: {count}</div>;
}
```

## 🧩 API Reference

`useInterval(callback: () => void, delay: number | null): void`

### Parameters

| Parameter | Type              | Description                                 |
| --------- | ----------------- | ------------------------------------------- |
| `callback`| `() => void`      | Function to execute on each tick.           |
| `delay`   | `number \| null`  | Interval in ms, or `null` to pause.         |

### Returns

| Property         | Type | Description                           |
| ---------------- | ---- | ------------------------------------- |
| *(return value)* | `void`| No return value.                      |

## ⚙️ Implementation

```tsx
import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void | null>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay === null) return;

        const tick = () => savedCallback.current && savedCallback.current();

        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}
```

## 💡 Notes

- Pass `null` as delay to pause the interval.
- Always uses the latest callback.
- Cleans up automatically.

## 🧾 Type Definition

```tsx
function useInterval(callback: () => void, delay: number | null): void;
```

## 🧭 Summary

| Feature           | Description                        |
| ----------------- | ---------------------------------- |
| ⏲ Repeated action| Runs callback at interval          |
| 🧩 Latest callback| Always uses up-to-date function    |
| ⚡ Lightweight    | No dependencies                    |
| 🧠 Intuitive      | Simple API surface                 |
