---
title: useToggleSet
outline: deep
---

# useToggleSet

A React hook for managing a **`Set`** with toggle functionality.  
It allows you to easily **add or remove items** from a Set in an immutable way — ideal for managing selected items, filters, or multi-select UI states.

---

## 📦 Import

```tsx
import { useToggleSet } from "react-hookstack";
```

## Example

```tsx
import React from "react";
import { useToggleSet } from "react-hookstack";

export default function Example() {
  const [selectedItems, toggleItem] = useToggleSet<number>(new Set([1, 2]));

  return (
    <div>
      <h3>Selected Items: {[...selectedItems].join(", ")}</h3>
      {[1, 2, 3, 4].map((item) => (
        <button
          key={item}
          onClick={() => toggleItem(item)}
          style={{
            margin: "4px",
            padding: "6px 10px",
            background: selectedItems.has(item) ? "#4CAF50" : "#f0f0f0",
            color: selectedItems.has(item) ? "#fff" : "#000",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          {selectedItems.has(item) ? `Remove ${item}` : `Add ${item}`}
        </button>
      ))}
    </div>
  );
}
```

## 🧩 API Reference

### Parameters

| Parameter    | Type     | Default     | Description               |
| ------------ | -------- | ----------- | ------------------------- |
| `initialSet` | `Set<T>` | `new Set()` | The initial Set of items. |

### Returns

| Return Value | Type                | Description                                            |
| ------------ | ------------------- | ------------------------------------------------------ |
| `set`        | `Set<T>`            | The current Set of selected or active items.           |
| `toggle`     | `(item: T) => void` | Function to toggle the presence of an item in the Set. |

## 🧪 Example Scenarios

- Multi-select checkboxes
- Filter chips
- Tag selectors
- Feature toggles

## 🗒️ Notes

- The hook maintains immutability — a new Set is created on every state change.
- Ideal for situations where you need fast existence checks or unique selections.

## 🧭 Related Hooks

`useToggle` – For toggling a single boolean state.

`useArray` – For managing arrays with immutable operations.

## ⚙️ Implementation

```tsx
import { useState, useCallback } from "react";

export function useToggleSet<T>(initialSet: Set<T> = new Set()) {
    const [set, setSet] = useState<Set<T>>(initialSet);

    const toggle = useCallback((item: T) => {
        setSet((prev) => {
            const next = new Set(prev);
            if (next.has(item)) next.delete(item);
            else next.add(item);
            return next;
        });
    }, []);

    return [set, toggle] as const;
}
```

## 🧰 Type Definition

```tsx
export function useToggleSet<T>(initialSet: Set<T> = new Set()): readonly [Set<T>, (item: T) => void];
```
