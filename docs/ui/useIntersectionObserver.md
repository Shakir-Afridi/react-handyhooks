---
title: useIntersectionObserver
outline: deep
---

# useIntersectionObserver

A React hook for observing when a DOM element enters or leaves the viewport (or a parent element).

---

## ✨ Overview

`useIntersectionObserver` lets you track visibility of elements for lazy loading, animations, or analytics.

---

## 📦 Import

```tsx
import { useIntersectionObserver } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useIntersectionObserver } from 'react-hookstack';

function Example() {
  const [ref, entry] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5 });

  return (
    <div ref={ref}>
      {entry?.isIntersecting ? "Visible" : "Not visible"}
    </div>
  );
}
```

## 🧩 API Reference

`useIntersectionObserver<T>(options?: IntersectionObserverInit): [ref, entry]`

### Parameters

| Parameter | Type                      | Default | Description                       |
| --------- | ------------------------- | ------- | --------------------------------- |
| `options` | `IntersectionObserverInit`|         | Observer options (root, margin).  |

### Returns

| Property | Type                              | Description                       |
| -------- | --------------------------------- | --------------------------------- |
| `ref`    | `React.RefObject<T>`              | Attach to target element.         |
| `entry`  | `IntersectionObserverEntry \| null`| Latest intersection info.         |

## ⚙️ Implementation

```tsx
import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver<T extends Element>(
    options?: IntersectionObserverInit
) {
    // Ref to attach to the target element
    const ref = useRef<T | null>(null);

    // State to store the latest intersection entry
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([observedEntry]) => setEntry(observedEntry),
            options
        );

        observer.observe(ref.current);

        // Cleanup observer on unmount
        return () => {
            observer.disconnect();
        };
    }, [options]);

    return [ref, entry] as const;
}
```

## 💡 Notes

- Supports all IntersectionObserver options.
- Useful for infinite scroll, lazy loading, and animations.

## 🧾 Type Definition

```tsx
type UseIntersectionObserverResult<T extends Element> = [
  React.RefObject<T>,
  IntersectionObserverEntry | null
];
```

## 🧭 Summary

| Feature         | Description                    |
| --------------- | ----------------------------- |
| 👀 Visibility   | Detects element intersection  |
| ⚡ Lightweight   | Native browser API            |
| 🧩 Flexible     | Customizable options          |
