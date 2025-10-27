---
title: useBoolean
outline: deep
---

# useBoolean

A React hook for managing boolean state with handy utilities to toggle, set true, and set false.

---

## 🧩 Overview

`useBoolean` simplifies boolean state handling by providing intuitive helper functions for toggling and setting values.  
It’s ideal for managing UI elements like dialogs, dropdowns, or toggles.

---

## 🚀 Usage

```tsx
import { useBoolean } from "react-hookstack";

function ExampleComponent() {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);

  return (
    <div>
      <p>Value: {value ? "True" : "False"}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Enable</button>
      <button onClick={setFalse}>Disable</button>
    </div>
  );
}
```

## ⚙️ API Reference

`useBoolean(initialValue?: boolean): UseBooleanReturn`

### Parameters

| Name           | Type      | Default | Description                |
| -------------- | --------- | ------- | -------------------------- |
| `initialValue` | `boolean` | `false` | The initial boolean state. |

### Returns

| Property   | Type                          | Description                             |
| ---------- | ----------------------------- | --------------------------------------- |
| `value`    | `boolean`                     | The current boolean value.              |
| `setTrue`  | `() => void`                  | Sets the value to `true`.               |
| `setFalse` | `() => void`                  | Sets the value to `false`.              |
| `toggle`   | `() => void`                  | Toggles between `true` and `false`.     |
| `setValue` | `(newValue: boolean) => void` | Manually sets a specific boolean value. |

## 🧠 Example Use Cases

- Controlling modal visibility (isOpen)
- Managing switch/toggle state
- Enabling/disabling features or modes
- Tracking simple on/off UI states

## 💡 Tips

- Prefer toggle() when you just need to flip state.
- Use setTrue() and setFalse() for clarity in event handlers.
- Works perfectly with memoized callbacks since it returns stable function references.

## 🧱 Implementation

```tsx
import { useCallback, useState } from "react";

export interface UseBooleanReturn {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setValue: (newValue: boolean) => void;
}

export function useBoolean(initialValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return { value, setTrue, setFalse, toggle, setValue };
}

export default useBoolean;
```

## 🧾 Type Definition

```tsx
type UseBooleanReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setValue: (newValue: boolean) => void;
}
```