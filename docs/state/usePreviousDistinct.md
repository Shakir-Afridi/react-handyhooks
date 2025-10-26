---
title: usePreviousDistinct
outline: deep
---

# usePreviousDistinct

A smart React hook that returns the **previous distinct value** of a variable,  
only updating when the value meaningfully changes (based on a custom comparison function).

---

## 📘 Overview

`usePreviousDistinct` extends the behavior of [`usePrevious`](./usePrevious.md) by introducing **custom equality logic**.  
Instead of tracking *every* previous value, it only updates when the new value is **distinct** — helping you reduce unnecessary re-renders or side effects.

---

## 🚀 Features

- 🧠 Tracks **previous distinct values** only  
- ⚙️ Supports **custom equality comparison**
- 🧩 Prevents **unnecessary updates**
- ✅ Works with any data type (strings, objects, numbers, etc.)
- 🔄 Simple and dependency-free

---

## 💡 Example

```tsx
import { useState, useEffect } from "react";
import usePreviousDistinct from "./usePreviousDistinct";

export default function DistinctExample() {
  const [name, setName] = useState("John");
  const prevName = usePreviousDistinct(name, (a, b) => a.toLowerCase() === b.toLowerCase());

  useEffect(() => {
    console.log("Previous distinct name:", prevName);
  }, [name, prevName]);

  return (
    <div>
      <h3>Current Name: {name}</h3>
      <h4>Previous Distinct: {prevName ?? "—"}</h4>

      <button onClick={() => setName("John")}>Set John (no change)</button>
      <button onClick={() => setName("JOHN")}>Set JOHN (no change)</button>
      <button onClick={() => setName("Jane")}>Set Jane (distinct)</button>
    </div>
  );
}
```

## 🧩 API Reference

### Signature

```tsx
function usePreviousDistinct<T>(
  value: T,
  isEqual?: (prev: T, next: T) => boolean
): T | undefined;
```

### Parameters

| Name      | Type                            | Description                                                                                         |
| --------- | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| `value`   | `T`                             | The current value you want to track.                                                                |
| `isEqual` | `(prev: T, next: T) => boolean` | *(Optional)* A comparison function that determines equality. Defaults to strict inequality (`!==`). |

### Returns

| Type             | Description                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `T \| undefined` | The previous distinct value. Returns `undefined` on first render or when no distinct value exists. |

## 🧠 When to Use

- To detect meaningful changes in data
- When using debounced or normalized state values
- When you need custom equality checks (e.g., case-insensitive string comparison, shallow object check)
- To optimize side effects that depend on actual data changes

## 🧩 Related Hooks

`usePrevious` — Tracks the previous value on every render.

## ⚙️ Implementation

```tsx
import { useEffect, useRef } from "react";

/**
 * Returns the previous distinct value based on a custom equality check.
 */
function usePreviousDistinct<T>(
  value: T,
  isEqual?: (prev: T, next: T) => boolean
): T | undefined {
  const previousRef = useRef<T | null>(null);
  const currentRef = useRef<T | null>(null);

  useEffect(() => {
    // Update previous only when value changes meaningfully
    if (!isEqual || !isEqual(currentRef.current as T, value)) {
      previousRef.current = currentRef.current;
    }
    currentRef.current = value;
  }, [value, isEqual]);

  return previousRef?.current || undefined;
}

export default usePreviousDistinct;
```