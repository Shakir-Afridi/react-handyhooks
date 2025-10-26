---
title: useWindowSize
outline: deep
---

# useWindowSize

A React hook to **track window dimensions**.

---

## ✨ Overview

`useWindowSize` provides the current width and height of the browser window, updating automatically on resize.  
Useful for responsive layouts and dynamic UI adjustments.

---

## 📦 Import

```tsx
import { useWindowSize } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useWindowSize } from 'react-hookstack';

function Example() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window size: {width} x {height}
    </div>
  );
}
```

## 🧩 API Reference

`useWindowSize(): { width: number; height: number }`

### Returns

| Property | Type     | Description                        |
| -------- | -------- | ---------------------------------- |
| `width`  | `number` | Current window width in pixels.    |
| `height` | `number` | Current window height in pixels.   |

## ⚙️ Implementation

```tsx
import { useState, useEffect } from "react";

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
```

## 💡 Notes

- Updates automatically on window resize.
- Returns `{ width, height }` object.
- Safe for SSR (returns 0 if window is undefined).

## 🧾 Type Definition

```tsx
function useWindowSize(): { width: number; height: number };
```

## 🧭 Summary

| Feature                 | Description                        |
| ----------------------- | ---------------------------------- |
| 📏 Responsive           | Tracks window size                 |
| ⚡ Lightweight           | No dependencies                    |
| 🧠 Intuitive            | Simple API                         |
