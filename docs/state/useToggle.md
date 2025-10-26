---
title: useToggle
outline: deep
---

# useToggle

A lightweight React hook for managing **boolean toggle state**, perfect for handling UI elements like modals, switches, dropdowns, or visibility toggles.

---

## 📘 Overview

The `useToggle` hook provides a simple and efficient way to manage boolean state. It returns the current boolean value along with a toggle function that can either flip the state or set it explicitly to `true` or `false`.

---

## 🚀 Features

- ✅ Simple toggle logic for any boolean state  
- 🔁 Allows direct control (set `true` / `false`)  
- 🧠 Minimal API surface – intuitive and easy to use  
- ⚡ Lightweight — no dependencies

---

## 💡 Example

```tsx
import { useToggle } from "./useToggle";

function ExampleComponent() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div>
      <p>Dialog is {isOpen ? "open" : "closed"}</p>
      <button onClick={() => toggleOpen()}>Toggle</button>
      <button onClick={() => toggleOpen(true)}>Open</button>
      <button onClick={() => toggleOpen(false)}>Close</button>
    </div>
  );
}
```

## 🧩 API Reference

### Signature

```tsx
const [value, toggle] = useToggle(initialValue?: boolean);
```

### Parameters

| Name           | Type      | Default | Description                |
| -------------- | --------- | ------- | -------------------------- |
| `initialValue` | `boolean` | `false` | The initial boolean state. |

### Returns

| Name     | Type                            | Description                                                   |
| -------- | ------------------------------- | ------------------------------------------------------------- |
| `value`  | `boolean`                       | The current boolean state.                                    |
| `toggle` | `(nextValue?: boolean) => void` | Toggles the state or sets it explicitly if a value is passed. |

## 🧠 When to Use

- Toggling modal visibility (isOpen)
- Managing switches or checkboxes
- Showing/hiding elements conditionally
- Any binary state management scenario

## 🧩 Related Hooks

`useBoolean` - Advanced boolean state management with named setters.

## ⚙️ Implementation

```tsx
import { useState, useCallback } from "react";

export function useToggle(
  initialValue: boolean = false
): [boolean, (nextValue?: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback((nextValue?: boolean) => {
    setValue((prev) =>
      typeof nextValue === "boolean" ? nextValue : !prev
    );
  }, []);

  return [value, toggle];
}

export default useToggle;
```