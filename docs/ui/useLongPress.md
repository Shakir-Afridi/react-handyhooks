---
title: useLongPress
outline: deep
---

# useLongPress

A React hook for detecting long-press events on an element.

---

## ✨ Overview

`useLongPress` enables you to trigger a callback when a user presses and holds on an element for a specified duration. Useful for mobile gestures, context menus, or custom interactions.

---

## 📦 Import

```tsx
import { useLongPress } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useLongPress } from 'react-hookstack';

function Example() {
  const longPressEvents = useLongPress(() => alert("Long pressed!"), 700);

  return (
    <button {...longPressEvents}>Hold me</button>
  );
}
```

## 🧩 API Reference

`useLongPress(callback: () => void, ms?: number): { ...handlers }`

### Parameters

| Parameter | Type         | Default | Description                          |
| --------- | ------------ | ------- | ------------------------------------ |
| `callback`| `() => void` |         | Function called on long press.       |
| `ms`      | `number`     | `500`   | Duration in ms to trigger long press.|

### Returns

| Property         | Type         | Description                      |
| ---------------- | ------------ | -------------------------------- |
| `onMouseDown`    | `function`   | Attach to element.               |
| `onMouseUp`      | `function`   | Attach to element.               |
| `onMouseLeave`   | `function`   | Attach to element.               |
| `onTouchStart`   | `function`   | Attach to element.               |
| `onTouchEnd`     | `function`   | Attach to element.               |

## ⚙️ Implementation

```tsx
import { useRef, useCallback } from "react";

export function useLongPress(callback: () => void, ms: number = 500) {
    // Ref to store the timer ID
    const timer = useRef<NodeJS.Timeout | null>(null);

    // Start the long press timer
    const start = useCallback(() => {
        timer.current = setTimeout(callback, ms);
    }, [callback, ms]);

    // Stop the long press timer
    const stop = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    }, []);

    // Return handlers to attach to the element
    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    };
}
```

## 💡 Notes

- Works for both mouse and touch events.
- Prevents accidental triggers by requiring a hold.

## 🧾 Type Definition

```tsx
type LongPressHandlers = {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
};
```

## 🧭 Summary

| Feature         | Description                  |
| --------------- | --------------------------- |
| ⏱️ Customizable | Set duration for long press |
| 🧩 Flexible     | Mouse & touch support       |
| ⚡ Lightweight   | No dependencies            |
