---
title: useTimeout
outline: deep
---

# useTimeout

A React hook for **executing a callback after a specified delay**, with control functions to clear or reset the timeout.

---

## ✨ Overview

`useTimeout` schedules a function to run after a delay, and provides methods to cancel or restart the timer.  
Useful for notifications, delayed actions, or debounced effects.

---

## 📦 Import

```tsx
import { useTimeout } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useTimeout } from 'react-hookstack';

function DelayedMessage() {
  const [visible, setVisible] = useState(false);

  const { clear, reset } = useTimeout(() => setVisible(true), 3000);

  return (
    <div>
      <button onClick={reset}>Show after 3s</button>
      <button onClick={clear}>Cancel</button>
      {visible && <p>Hello after 3 seconds!</p>}
    </div>
  );
}
```

## 🧩 API Reference

`useTimeout(callback: () => void, delay: number | null): { clear: () => void; reset: () => void; }`

### Parameters

| Parameter | Type              | Description                                 |
| --------- | ----------------- | ------------------------------------------- |
| `callback`| `() => void`      | Function to execute after the delay.        |
| `delay`   | `number \| null`  | Delay in ms, or `null` to disable.          |

### Returns

| Property | Type         | Description                      |
| -------- | ------------ | -------------------------------- |
| `clear`  | `() => void` | Cancels the timeout.             |
| `reset`  | `() => void` | Resets and restarts the timeout. |

## ⚙️ Implementation

```tsx
import { useEffect, useRef, useCallback } from "react";

export function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    const clear = useCallback(() => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
        }
    }, []);

    const set = useCallback(() => {
        if (delay === null) return;
        clear();
        timeoutId.current = setTimeout(() => {
            savedCallback.current();
        }, delay);
    }, [delay, clear]);

    useEffect(() => {
        set();
        return clear;
    }, [set, clear]);

    return { clear, reset: set };
}
```

## 💡 Notes

- Automatically cleans up on unmount or delay change.
- Use `clear` to cancel, `reset` to restart the timer.
- Pass `null` as delay to disable.

## 🧾 Type Definition

```tsx
function useTimeout(callback: () => void, delay: number | null): {
  clear: () => void;
  reset: () => void;
};
```

## 🧭 Summary

| Feature           | Description                        |
| ----------------- | ---------------------------------- |
| ⏲ Delayed action | Runs callback after delay          |
| 🧩 Control        | Clear and reset functions          |
| ⚡ Lightweight    | No dependencies                    |
| 🧠 Intuitive      | Simple API surface                 |
