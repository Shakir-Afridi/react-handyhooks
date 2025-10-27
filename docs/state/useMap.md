---
title: useMap
outline: deep
---

# useMap

A React hook to manage a `Map` with convenient utility functions for setting, retrieving, and clearing entries — built for immutability and React reactivity.

---

## 🧩 Overview

`useMap` provides a simple and efficient way to handle JavaScript `Map` objects inside React components.  
It ensures updates are immutable and trigger re-renders when the map changes, while keeping a clean and declarative API.

---

## 🚀 Usage

```tsx
import { useMap } from "react-hookstack";

function MapExample() {
  const { map, set, get, remove, has, clear, reset } = useMap<string, number>([
    ["a", 1],
    ["b", 2],
  ]);

  return (
    <div>
      <p>Keys: {[...map.keys()].join(", ")}</p>
      <p>Has "a": {has("a") ? "Yes" : "No"}</p>

      <button onClick={() => set("c", 3)}>Add "c"</button>
      <button onClick={() => remove("a")}>Remove "a"</button>
      <button onClick={clear}>Clear</button>
      <button onClick={reset}>Reset</button>

      <p>Value of "b": {get("b")}</p>
    </div>
  );
}
```

## ⚙️ API Reference

`useMap<K, V>(initialEntries?: readonly (readonly [K, V])[])`

### Parameters

| Name             | Type                           | Required | Description                                                     |
| ---------------- | ------------------------------ | -------- | --------------------------------------------------------------- |
| `initialEntries` | `readonly (readonly [K, V])[]` | ❌        | Optional array of key-value pairs used to initialize the `Map`. |

### Returns

| Property | Type                         | Description                                                        |
| -------- | ---------------------------- | ------------------------------------------------------------------ |
| `map`    | `Map<K, V>`                  | The current map instance.                                          |
| `set`    | `(key: K, value: V) => void` | Adds or updates an entry in the map.                               |
| `get`    | `(key: K) => V \| undefined` | Retrieves the value associated with the given key.                 |
| `remove` | `(key: K) => void`           | Deletes a key-value pair from the map.                             |
| `has`    | `(key: K) => boolean`        | Checks if the map contains a given key.                            |
| `clear`  | `() => void`                 | Removes all entries from the map.                                  |
| `reset`  | `() => void`                 | Restores the map to its initial state (based on `initialEntries`). |

## 🧠 Example Use Cases

- Managing cache-like structures (e.g., memoized data or lookup tables).
- Building key-value stores for dynamic configuration or form field tracking.
- Storing API response maps (like user IDs to user data).
- Implementing React-controlled dictionaries that update predictably.

## 💡 Tips

- Since useMap returns a real Map instance, you can use native Map methods like .entries(), .keys(), and .values().
- The hook guarantees immutability, meaning state updates always create a new Map, triggering re-renders safely.
- Use reset() to revert to the original map without manual state management.

## 🧱 Implementation

```tsx
import { useState, useCallback } from "react";

export function useMap<K, V>(initialEntries?: readonly (readonly [K, V])[]) {
  const [map, setMap] = useState<Map<K, V>>(() => new Map(initialEntries));

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    });
  }, []);

  const remove = useCallback((key: K) => {
    setMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const get = useCallback((key: K) => map.get(key), [map]);
  const has = useCallback((key: K) => map.has(key), [map]);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  const reset = useCallback(() => {
    setMap(new Map(initialEntries));
  }, [initialEntries]);

  return { map, set, get, remove, has, clear, reset };
}
```