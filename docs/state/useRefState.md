---
title: useRefState
outline: deep
---

# useRefState

A hybrid React hook that **combines `useState` and `useRef`** — giving you both reactive state updates *and* synchronous access to the latest value.

---

## 📘 Overview

React’s `useState` updates are asynchronous, making it tricky to access the most recent value in certain callbacks or effects (like inside `setInterval` or event listeners).  
`useRefState` solves this problem by coupling state with a ref that **always stays up to date** — even between renders.

This hook is especially useful for **real-time data**, **interval logic**, or **asynchronous event handling**.

---

## 🚀 Features

- ✅ Provides **reactive state** and **immediate ref access**
- ⚙️ Synchronous `ref.current` updates
- 🔄 Perfect for **timers, listeners, and async operations**
- 🧩 Drop-in replacement for `useState`
- ⚡ Type-safe and dependency-free

---

## 💡 Example

```tsx
import { useEffect } from "react";
import { useRefState } from "react-hookstack";

export default function RefStateExample() {
  const [count, setCount, countRef] = useRefState(0);

  // Log the latest count every second, even if re-renders are delayed
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Current count (sync ref):", countRef.current);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

## 🧠 Why it matters

Inside an interval or event listener, `countRef.current` always gives the latest value —
even if the component hasn’t re-rendered yet.

## 🧩 API Reference

### Signature

```tsx
function useRefState<T>(
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, React.MutableRefObject<T>];
```

### Parameters

| Name           | Type | Description              |
| -------------- | ---- | ------------------------ |
| `initialValue` | `T`  | The initial state value. |

### Returns

| Index | Name       | Type                                     | Description                                              |
| ----- | ---------- | ---------------------------------------- | -------------------------------------------------------- |
| `[0]` | `state`    | `T`                                      | The current state value (reactive, triggers re-renders). |
| `[1]` | `setState` | `(value: T \| ((prev: T) => T)) => void` | Updates the state and keeps the ref synchronized.        |
| `[2]` | `ref`      | `React.MutableRefObject<T>`              | Always points to the latest state value (non-reactive).  |

## 🧠 When to Use

- When you need instant access to the latest state value
- When using setInterval, event listeners, or async callbacks
- To avoid stale closures in functional updates
- To simplify state tracking in non-reactive contexts

## 🧩 Related Hooks

`usePrevious` — Retrieve the previous value after a render.

`usePreviousDistinct` — Get only distinct previous values.

`useBoolean` — Manage boolean state with handy toggles.

## ⚙️ Implementation

```tsx
import { useCallback, useRef, useState } from "react";

/**
 * Combines useState and useRef to provide synchronous and reactive state access.
 */
export function useRefState<T>(
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, React.MutableRefObject<T>] {
  const [state, setState] = useState<T>(initialValue);
  const ref = useRef<T>(state);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setState((prev) => {
      const newValue =
        typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
      ref.current = newValue;
      return newValue;
    });
  }, []);

  // Keep ref in sync
  ref.current = state;

  return [state, setValue, ref];
}
```