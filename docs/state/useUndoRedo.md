---
title: useUndoRedo
outline: deep
---

# useUndoRedo

A React hook to manage **state history** with **undo** and **redo** functionality.  
It maintains `past`, `present`, and `future` states, allowing you to easily roll back or redo changes — ideal for text editors, drawing apps, and complex forms.

---

## 📦 Import

```ts
import { useUndoRedo } from "react-hookstack";
```

## 🧠 Quick Example

```tsx
const { present, set, undo, redo } = useUndoRedo<number>(0);

set(1); // present = 1
undo(); // present = 0
redo(); // present = 1
```

## 🧩 API Reference

### Parameters

| Parameter | Type | Default | Description              |
| --------- | ---- | ------- | ------------------------ |
| `initial` | `T`  | —       | The initial state value. |

### Returns

| Property  | Type                      | Description                                      |
| --------- | ------------------------- | ------------------------------------------------ |
| `past`    | `T[]`                     | An array of all previous states.                 |
| `present` | `T`                       | The current active state.                        |
| `future`  | `T[]`                     | An array of undone states that can be redone.    |
| `set`     | `(newPresent: T) => void` | Updates the state and resets the future history. |
| `undo`    | `() => void`              | Moves one step back in history.                  |
| `redo`    | `() => void`              | Moves one step forward in history.               |

## 🧪 Use Cases

- ✍️ Text or code editors
- 🎨 Drawing and design tools
- 🧾 Form history navigation
- 🔄 Versioned state management

## 🗒️ Notes

- Calling set clears the future (redo history) — mimicking real-world editors.
- Each change is stored immutably, so previous states remain intact.
- Undo/redo depth depends on your app’s needs (can be extended easily).

## ⚙️ Implementation

```tsx
import { useState, useCallback } from "react";

export function useUndoRedo<T>(initial: T) {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initial);
  const [future, setFuture] = useState<T[]>([]);

  const set = useCallback(
    (newPresent: T) => {
      setPast((p) => [...p, present]);
      setPresent(newPresent);
      setFuture([]);
    },
    [present]
  );

  const undo = useCallback(() => {
    setPast((p) => {
      if (p.length === 0) return p;
      setFuture((f) => [present, ...f]);
      setPresent(p[p.length - 1]);
      return p.slice(0, -1);
    });
  }, [present]);

  const redo = useCallback(() => {
    setFuture((f) => {
      if (f.length === 0) return f;
      setPast((p) => [...p, present]);
      setPresent(f[0]);
      return f.slice(1);
    });
  }, [present]);

  return { past, present, future, set, undo, redo };
}
```

## 🧰 Type Definition

```tsx
export function useUndoRedo<T>(
  initial: T
): {
  past: T[];
  present: T;
  future: T[];
  set: (newPresent: T) => void;
  undo: () => void;
  redo: () => void;
};
```
