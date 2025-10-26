---
title: useEventCallback
outline: deep
---

# useEventCallback

A React hook that returns a stable event callback reference, always calling the latest version of the provided function.

---

## ✨ Overview

`useEventCallback` ensures the callback identity remains constant between renders while always calling the latest version of the provided function.  
Useful for event listeners or child components to avoid unnecessary re-renders.

---

## 📦 Import

```tsx
import { useEventCallback } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useEventCallback } from 'react-hookstack';

const handleClick = useEventCallback(() => {
  console.log("Button clicked!");
});

<button onClick={handleClick}>Click Me</button>
```

## 🧩 API Reference

`useEventCallback<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T>`

### Parameters

| Parameter | Type                                 | Description                                 |
| --------- | ------------------------------------ | ------------------------------------------- |
| `fn`      | `(...args: any[]) => any`              | The callback function to stabilize.         |

### Returns

| Type                                   | Description                                 |
| --------------------------------------- | ------------------------------------------- |
| `(...args: Parameters<T>) => ReturnType<T>` | Stable callback that calls the latest `fn`. |

## ⚙️ Implementation

```tsx
import { useRef, useCallback } from "react";

export function useEventCallback<T extends (...args: any[]) => any>(
    fn: T
): (...args: Parameters<T>) => ReturnType<T> {
    const ref = useRef(fn);
    ref.current = fn;
    return useCallback((...args: Parameters<T>) => {
        return ref.current(...args);
    }, []);
}
```

## 💡 Notes

- The returned callback reference is stable.
- Always calls the latest version of the function.

## 🧾 Type Definition

```tsx
function useEventCallback<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T>;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Stable ref   | Prevents unnecessary re-renders   |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
