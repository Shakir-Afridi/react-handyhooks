---
title: useReducerWithLogger
outline: deep
---

# useReducerWithLogger

## 📘 Overview

The useReducerWithLogger hook enhances React’s native useReducer by adding debug-friendly logging for every dispatched action.
It helps visualize state transitions clearly by logging the previous state, dispatched action, and next state in the console.

Perfect for debugging complex reducer logic, especially in large-scale state management setups.

---

## 🚀 Features

- Logs are grouped in the console for clarity.
- Uses styled console messages for better visual distinction:
  - Gray for the previous state
  - Blue for the dispatched action
  - Green for the next state
- Automatically updates internal references to track state changes between renders.

---

## 💡 Example

```tsx
import React from "react";
import useReducerWithLogger from "./useReducerWithLogger";

type Action = { type: "increment" | "decrement" };
const reducer = (state: number, action: Action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

export function CounterLoggerExample() {
  const [count, dispatch] = useReducerWithLogger(reducer, 0);

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Count: {count}</h3>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

## 🧩 API Reference

### Signature

```tsx
function useReducerWithLogger<S, A>(
  reducer: Reducer<S, A>,
  initialState: S
): readonly [S, (action: A) => void];
```

### Parameters

| Name           | Type            | Description                                                                                     |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------- |
| `reducer`      | `Reducer<S, A>` | A function that determines the next state based on the current state and the dispatched action. |
| `initialState` | `S`             | The initial value for the reducer’s state.                                                      |

### Returns

| Index | Type                  | Description                                                                          |
| ----- | --------------------- | ------------------------------------------------------------------------------------ |
| `[0]` | `S`                   | The current reducer-managed state.                                                   |
| `[1]` | `(action: A) => void` | The enhanced dispatch function that logs the previous state, action, and next state. |

## Use Cases

- ✅ Debugging complex reducers
- ✅ Understanding state transitions
- ✅ Teaching reducer-based state management
- ✅ Logging state evolution in development builds

## ⚙️ Implementation

```tsx
function useReducerWithLogger<S, A>(reducer: Reducer<S, A>, initialState: S) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const prevStateRef = useRef<S>(state);
    const lastActionRef = useRef<A | null>(null);

    const dispatchWithLogger = (action: A) => {
        console.groupCollapsed("Previous State");
        console.log("%cValue:", "color: #9E9E9E;", prevStateRef.current);
        console.log("%cAction:", "color: #03A9F4;", action);
        lastActionRef.current = action;
        dispatch(action);
        console.groupEnd();
    };

    useEffect(() => {
        if (lastActionRef.current !== null) {
            console.groupCollapsed("Next State (after dispatch)");
            console.log("%cValue:", "color: #4CAF50;", state);
            console.groupEnd();
            prevStateRef.current = state;
            lastActionRef.current = null;
        }
    }, [state]);

    return [state, dispatchWithLogger] as const;
}

export default useReducerWithLogger;
```
