---
title: useUpdateEffect
outline: deep
---

# useUpdateEffect

A React hook that **skips execution on the first render**, running only when dependencies change after mount.

---

## ✨ Overview

`useUpdateEffect` works like `useEffect`, but does not run on the initial mount.  
Useful for avoiding side effects on first render, such as API calls or animations.

---

## 📦 Import

```tsx
import { useUpdateEffect } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useUpdateEffect } from 'react-hookstack';

function Counter({ count }: { count: number }) {
  useUpdateEffect(() => {
    console.log("Runs only when count changes, not on mount");
  }, [count]);

  return <div>Count: {count}</div>;
}
```

## 🧩 API Reference

`useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void`

### Parameters

| Parameter | Type             | Description                                 |
| --------- | ---------------- | ------------------------------------------- |
| `effect`  | `EffectCallback` | The effect callback to run.                 |
| `deps`    | `DependencyList` | Dependency list that triggers the effect.   |

### Returns

| Property         | Type | Description                           |
| ---------------- | ---- | ------------------------------------- |
| *(return value)* | `void`| No return value.                      |

## ⚙️ Implementation

```tsx
import { useEffect, useRef, EffectCallback, DependencyList } from "react";

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        return effect();
    }, deps);
}
```

## 💡 Notes

- Skips the effect on the initial mount.
- Runs only when dependencies change after the first render.
- Useful for avoiding unwanted side effects on mount.

## 🧾 Type Definition

```tsx
function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void;
```

## 🧭 Summary

| Feature           | Description                        |
| ----------------- | ---------------------------------- |
| ⏩ Skips on mount | Runs only on dependency change     |
| ⚡ Lightweight    | No dependencies                    |
| 🧠 Intuitive      | Simple API surface                 |
