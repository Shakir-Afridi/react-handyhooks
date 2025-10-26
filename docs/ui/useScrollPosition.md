---
title: useScrollPosition
outline: deep
---

# useScrollPosition

A React hook for tracking the window's scroll position (x and y coordinates).

---

## ✨ Overview

`useScrollPosition` provides real-time scroll coordinates, useful for sticky headers, scroll-based animations, or infinite scroll features.

---

## 📦 Import

```tsx
import { useScrollPosition } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useScrollPosition } from 'react-hookstack';

function Example() {
  const { x, y } = useScrollPosition();

  return (
    <div>
      <p>Scroll X: {x}</p>
      <p>Scroll Y: {y}</p>
    </div>
  );
}
```

## 🧩 API Reference

`useScrollPosition(): { x: number; y: number }`

### Returns

| Property | Type     | Description                       |
| -------- | -------- | --------------------------------- |
| `x`      | `number` | Horizontal scroll position (px).  |
| `y`      | `number` | Vertical scroll position (px).    |

## ⚙️ Implementation

```tsx
import { useEffect, useState } from "react";

export function useScrollPosition() {
    // State to store scroll coordinates
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        // Scroll event handler
        const handleScroll = () => {
            setPosition({ x: window.scrollX, y: window.scrollY });
        };

        // Attach scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Initialize state immediately
        handleScroll();

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return position;
}
```

## 💡 Notes

- Tracks scroll position of the window only.
- Updates on every scroll event.

## 🧾 Type Definition

```tsx
type ScrollPosition = { x: number; y: number };
```

## 🧭 Summary

| Feature         | Description                |
| --------------- | ------------------------- |
| 🖱️ Real-time    | Updates on scroll         |
| ⚡ Lightweight   | Minimal overhead          |
| 🧩 Easy to use   | Simple API                |
