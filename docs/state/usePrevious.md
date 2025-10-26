---
title: usePrevious
outline: deep
---

# usePrevious

A lightweight React hook that returns the **previous value** of a state or prop from the last render.  
Perfect for comparing current and past values to detect changes over time.

---

## 📘 Overview

`usePrevious` captures and returns the value from the previous render cycle.  
It’s often used in debugging, change detection, and implementing custom animations or transitions when a value changes.

---

## 🚀 Features

- 🔄 Tracks the **previous render value**
- 🧠 Works with any data type (`number`, `string`, `object`, etc.)
- ⚡ Lightweight and dependency-free
- 🧩 Perfect for comparison logic and debugging

---

## 💡 Example

```tsx
import { useState, useEffect } from "react";
import { usePrevious } from "./usePrevious";

export default function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  useEffect(() => {
    if (prevCount !== undefined && prevCount !== count) {
      console.log(`Count changed from ${prevCount} → ${count}`);
    }
  }, [count, prevCount]);

  return (
    <div>
      <h3>Current: {count}</h3>
      <p>Previous: {prevCount ?? "—"}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

## 🧩 API Reference

### Signature

```tsx
const prevValue = usePrevious<T>(value: T): T | undefined;
```

### Parameters

| Name    | Type | Description                 |
| ------- | ---- | --------------------------- |
| `value` | `T`  | The current value to track. |

### Returns

| Type             | Description                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| `T \| undefined` | The previous value from the last render. Returns `undefined` on the initial render. |

## 🧠 When to Use

- Tracking previous props or state values
- Comparing current and old values to trigger side effects
- Implementing custom animations or transitions
- Debugging state changes in components

## 🧩 Related Hooks

`useToggle` - Toggle boolean states easily.

`useCounter` - Manage numeric state with increment/decrement helpers.

`useRenderCount` - Track how many times a component has rendered.

## ⚙️ Implementation

```tsx
import { useEffect, useRef } from "react";

/**
 * A hook that stores and returns the previous value from the last render.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;

```