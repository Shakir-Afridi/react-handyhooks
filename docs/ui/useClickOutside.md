---
title: useClickOutside
outline: deep
---

# useClickOutside

A React hook for detecting clicks outside a referenced element.

---

## ✨ Overview

`useClickOutside` lets you close dropdowns, modals, or popovers when the user clicks outside the target element.

---

## 📦 Import

```tsx
import { useClickOutside } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useClickOutside } from 'react-hookstack';

function Example() {
  const ref = useRef(null);
  useClickOutside(ref, () => alert("Clicked outside!"));

  return (
    <div ref={ref}>Click outside me!</div>
  );
}
```

## 🧩 API Reference

`useClickOutside(ref, handler, eventType?): void`

### Parameters

| Parameter   | Type                                   | Default     | Description                       |
| ----------- | -------------------------------------- | ----------- | --------------------------------- |
| `ref`       | `React.RefObject<HTMLElement>`         |             | Ref for target element.           |
| `handler`   | `(event: MouseEvent \| TouchEvent) => void` |         | Called when click outside.        |
| `eventType` | `"mousedown" \| "mouseup" \| "click" \| "touchstart"` | `"mousedown"` | Event type to listen for.         |

## ⚙️ Implementation

```tsx
export function useClickOutside<T extends HTMLElement | null = HTMLElement>(
    ref: React.RefObject<T>,
    handler: (event: MouseEvent | TouchEvent) => void,
    eventType: "mousedown" | "mouseup" | "click" | "touchstart" = "mousedown"
): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref?.current;
            // Do nothing if clicking inside the element or if it’s unmounted
            if (!el || el.contains(event.target as Node)) return;
            handler(event);
        };

        document.addEventListener(eventType, listener, true);
        return () => {
            document.removeEventListener(eventType, listener, true);
        };
    }, [ref, handler, eventType]);
}

export default useClickOutside;
```

## 💡 Notes

- Supports mouse and touch events.
- Useful for closing overlays and popups.

## 🧾 Type Definition

```tsx
type UseClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
  eventType?: "mousedown" | "mouseup" | "click" | "touchstart"
) => void;
```

## 🧭 Summary

| Feature         | Description                |
| --------------- | ------------------------- |
| 🖱️ Outside click| Detects outside clicks    |
| ⚡ Lightweight   | Minimal overhead          |
| 🧩 Easy to use   | Simple API                |
