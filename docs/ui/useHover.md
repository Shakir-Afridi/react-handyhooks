---
title: useHover
outline: deep
---

# useHover

A React hook for tracking whether a DOM element is hovered.

---

## ✨ Overview

`useHover` provides a simple way to detect when a user is hovering over an element, enabling interactive UI effects.

---

## 📦 Import

```tsx
import { useHover } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useHover } from 'react-hookstack';

function Example() {
  const { ref, isHovered } = useHover<HTMLDivElement>();

  return (
    <div ref={ref} style={{ background: isHovered ? 'lightblue' : 'white' }}>
      Hover over me!
    </div>
  );
}
```

## 🧩 API Reference

`useHover<T>(): { ref: React.RefObject<T>; isHovered: boolean }`

### Returns

| Property    | Type                   | Description                    |
| ----------- | ---------------------- | ------------------------------ |
| `ref`       | `React.RefObject<T>`   | Attach to target element.      |
| `isHovered` | `boolean`              | True if element is hovered.    |

## ⚙️ Implementation

```tsx
import { useRef, useState, useEffect } from "react";

export function useHover<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return { ref, isHovered };
}

```

## 💡 Notes

- Works for any HTML element.
- Useful for tooltips, highlights, and custom hover effects.

## 🧾 Type Definition

```tsx
type UseHoverResult<T extends HTMLElement> = {
  ref: React.RefObject<T>;
  isHovered: boolean;
};
```

## 🧭 Summary

| Feature         | Description                |
| --------------- | ------------------------- |
| 🖱️ Hover state  | Tracks mouse hover        |
| ⚡ Lightweight   | Minimal overhead          |
| 🧩 Easy to use   | Simple API                |
