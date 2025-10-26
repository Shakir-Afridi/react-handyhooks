---
title: useRequestAnimationFrame
outline: deep
---

# useRequestAnimationFrame

A React hook that executes a callback on every animation frame, providing the time difference (`deltaTime`) between frames.

---

## ✨ Overview

`useRequestAnimationFrame` is useful for smooth animations, game loops, or continuous visual updates.  
It calls your callback with the time elapsed since the last frame.

---

## 📦 Import

```tsx
import { useRequestAnimationFrame } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useRequestAnimationFrame } from 'react-hookstack';

useRequestAnimationFrame((delta) => {
  console.log(`Frame rendered after ${delta}ms`);
});
```

## 🧩 API Reference

`useRequestAnimationFrame(callback: (deltaTime: number) => void): void`

### Parameters

| Parameter   | Type                          | Description                                 |
| ----------- | ----------------------------- | ------------------------------------------- |
| `callback`  | (deltaTime: number) => void   | Function to run on each frame.              |

### Returns

| Type | Description |
| ---- | ----------- |
| void | No return value. |

## ⚙️ Implementation

```tsx
import { useEffect, useRef } from "react";

export function useRequestAnimationFrame(callback: (time: number) => void) {
    const requestRef = useRef<number>(0);
    const previousTimeRef = useRef<number>(0);

    useEffect(() => {
        const animate = (time: number) => {
            if (previousTimeRef.current !== undefined) {
                const deltaTime = time - previousTimeRef.current;
                callback(deltaTime);
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [callback]);
}
```

## 💡 Notes

- Automatically cancels animation frame on unmount.
- Useful for custom animation loops.

## 🧾 Type Definition

```tsx
function useRequestAnimationFrame(callback: (deltaTime: number) => void): void;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Animation    | Frame-based callback              |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
