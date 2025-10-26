---
title: useMergeState
outline: deep
---

# useMergeState

A React hook that provides **state merging behavior** similar to class components’ `setState`.  
It allows you to update only specific properties of an object without replacing the entire state.

---

## 📘 Overview

`useMergeState` simplifies state management for objects by merging partial updates into the existing state — avoiding the need to manually spread and reassign fields every time.

This is especially useful for managing form data, configuration objects, or any composite state.

---

## 🚀 Features

- 🔁 Merges updates into the existing state (like `setState` in class components)  
- 🧠 Type-safe with full TypeScript support  
- ⚡ Prevents unnecessary object recreation  
- ✅ Clean, declarative API

---

## 💡 Example

```tsx
import { useMergeState } from "./useMergeState";

function UserProfile() {
  const [user, setUser] = useMergeState({ name: "John", age: 25, city: "New York" });

  return (
    <div>
      <h3>{user.name}</h3>
      <p>Age: {user.age}</p>
      <p>City: {user.city}</p>

      <button onClick={() => setUser({ age: user.age + 1 })}>Increase Age</button>
      <button onClick={() => setUser({ city: "London" })}>Move to London</button>
    </div>
  );
}
```

## 🧩 API Reference

### Signature

```tsx
const [state, mergeState] = useMergeState<T extends object>(initialState: T);
```

### Parameters

| Name           | Type | Description               |
| -------------- | ---- | ------------------------- |
| `initialState` | `T`  | The initial object state. |

### Returns

| Name         | Type                          | Description                                                                            |
| ------------ | ----------------------------- | -------------------------------------------------------------------------------------- |
| `state`      | `T`                           | The current state object.                                                              |
| `mergeState` | `(patch: Partial<T>) => void` | A function to partially update the state by merging new values with the existing ones. |

## 🧠 When to Use

- Managing form states where multiple fields update independently
- Working with configuration objects or complex component state
- Simplifying state updates that would otherwise require manual object spreading

## 🧩 Related Hooks

`useBoolean` - Manage boolean state with setTrue, setFalse, and toggle.

`useToggle` - Simple toggle for boolean values.

`useCounter` - Manage numeric state with step, min, and max control.

## ⚙️ Implementation

```tsx
import { useState, useCallback } from "react";

/**
 * A custom hook that merges partial updates into the existing state.
 */
export function useMergeState<T extends object>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  const mergeState = useCallback((patch: Partial<T>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  return [state, mergeState] as const;
}

export default useMergeState;
```