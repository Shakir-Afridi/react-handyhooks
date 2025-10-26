---
title: useDebounce
outline: deep
---

# useDebounce

A React hook for **debouncing** a changing value over a specified delay, useful for optimizing performance in search inputs, filters, or resize events.

---

## ✨ Overview

`useDebounce` delays updating a value until after a specified period of inactivity.  
This is ideal for scenarios where you want to wait for user input to "settle" before triggering expensive operations like API calls.

---

## 📦 Import

```tsx
import { useDebounce } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useDebounce } from 'react-hookstack';

function SearchInput() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Type to search..."
    />
  );
}
```

## 🧩 API Reference

`useDebounce<T>(value: T, delay?: number): T`

### Parameters

| Parameter | Type     | Default | Description                          |
| --------- | -------- | ------- | ------------------------------------ |
| `value`   | `T`      |         | The value to debounce.               |
| `delay`   | `number` | `500`   | Delay in milliseconds before update. |

### Returns

| Property         | Type | Description                           |
| ---------------- | ---- | ------------------------------------- |
| *(return value)* | `T`  | The debounced value after the delay.  |

## ⚙️ Implementation

```tsx
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
```

## 💡 Notes

- Only updates the debounced value after the specified delay has passed without changes.
- Useful for reducing unnecessary renders or API calls.
- Works with any data type.

## 🧾 Type Definition

```tsx
function useDebounce<T>(value: T, delay?: number): T;
```

## 🧭 Summary

| Feature           | Description                        |
| ----------------- | ---------------------------------- |
| ⏳ Debounced value| Updates after inactivity           |
| 🧩 Generic support| Works with any data type           |
| ⚡ Lightweight    | No dependencies                    |
| 🧠 Intuitive      | Simple API surface                 |
