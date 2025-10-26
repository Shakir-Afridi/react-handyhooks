---
title: useMousePosition
outline: deep
---

# useMousePosition

A React hook for tracking the mouse cursor's position within the window.

---

## ✨ Overview

`useMousePosition` provides real-time x and y coordinates of the mouse pointer, making it useful for interactive UI features such as tooltips, drawing, or custom cursors.

---

## 📦 Import

```tsx
import { useMousePosition } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useMousePosition } from 'react-hookstack';

function Example() {
  const { x, y } = useMousePosition();

  return (
    <div>
      <p>Mouse X: {x}</p>
      <p>Mouse Y: {y}</p>
    </div>
  );
}
```

## 🧩 API Reference

`useMousePosition(): { x: number; y: number }`

### Returns

| Property | Type     | Description                   |
| -------- | -------- | ----------------------------- |
| `x`      | `number` | Mouse X coordinate (pixels).  |
| `y`      | `number` | Mouse Y coordinate (pixels).  |

## ⚙️ Implementation

```tsx
import { useEffect, useState } from "react";

export function useMousePosition() {
    // State to store mouse coordinates
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        // Mouse move handler
        const handleMouseMove = (event: MouseEvent) => {
            setPosition({ x: event.clientX, y: event.clientY });
        };

        // Listen for mousemove events
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return position;
}

```

## 💡 Notes

- Tracks mouse position globally (window).
- Lightweight and suitable for most UI use cases.

## 🧾 Type Definition

```tsx
type MousePosition = { x: number; y: number };
```

## 🧭 Summary

| Feature         | Description                |
| --------------- | ------------------------- |
| 🖱️ Real-time    | Updates on mouse movement |
| ⚡ Lightweight   | Minimal overhead          |
| 🧩 Easy to use   | Simple API                |
