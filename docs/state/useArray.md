---
title: useArray
outline: deep
---

# useArray

A React hook for managing **array state** with convenient, immutable operations such as `push`, `remove`, `update`, `insert`, and `clear`.

---

## ✨ Overview

`useArray` simplifies managing list-based state in React by providing a declarative API for common array operations.  
It ensures immutability and predictable re-renders, making it ideal for managing lists of items such as tags, tasks, users, or form fields.

---

## 📦 Import

```tsx
import { useArray } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useArray } from 'react-hookstack';

function Example() {
  const { array, push, remove, update, insert, clear, isEmpty } = useArray<number>([1, 2, 3]);

  return (
    <div>
      <p>Array: {JSON.stringify(array)}</p>

      <button onClick={() => push(array.length + 1)}>Add</button>
      <button onClick={() => remove(0)}>Remove First</button>
      <button onClick={() => update(1, 99)}>Update Second</button>
      <button onClick={() => insert(1, 50)}>Insert at 1</button>
      <button onClick={clear}>Clear</button>

      <p>{isEmpty ? 'Array is empty' : 'Array has elements'}</p>
    </div>
  );
}
```

## 🧩 API Reference

`useArray<T>(initialValue?: T[]): UseArrayResult<T>`

### Parameters

| Parameter      | Type  | Default | Description              |
| -------------- | ----- | ------- | ------------------------ |
| `initialValue` | `T[]` | `[]`    | The initial array value. |

### Returns

| Property  | Type                                     | Description                                |
| --------- | ---------------------------------------- | ------------------------------------------ |
| `array`   | `T[]`                                    | The current array state.                   |
| `set`     | `(newArray: T[]) => void`                | Replace the entire array with a new one.   |
| `push`    | `(element: T) => void`                   | Add a new element to the end of the array. |
| `remove`  | `(index: number) => void`                | Remove an element by its index.            |
| `update`  | `(index: number, newElement: T) => void` | Update an element at a specific index.     |
| `insert`  | `(index: number, element: T) => void`    | Insert an element at a specific index.     |
| `clear`   | `() => void`                             | Clear all elements in the array.           |
| `isEmpty` | `boolean`                                | Whether the array is currently empty.      |

## ⚙️ Implementation

```tsx
import { useState, useCallback } from "react";

export function useArray<T>(initialValue: T[] = []) {
    const [array, setArray] = useState<T[]>(initialValue);

    /** Add a new element to the end of the array. */
    const push = useCallback((element: T) => {
        setArray((prev) => [...prev, element]);
    }, []);

    /** Remove an element by its index. */
    const remove = useCallback((index: number) => {
        setArray((prev) => prev.filter((_, i) => i !== index));
    }, []);

    /** Update an element at a specific index. */
    const update = useCallback((index: number, newElement: T) => {
        setArray((prev) =>
            prev.map((item, i) => (i === index ? newElement : item))
        );
    }, []);

    /** Insert an element at a specific index. */
    const insert = useCallback((index: number, element: T) => {
        setArray((prev) => [
            ...prev.slice(0, index),
            element,
            ...prev.slice(index),
        ]);
    }, []);

    /** Replace the entire array with a new one. */
    const set = useCallback((newArray: T[]) => {
        setArray(newArray);
    }, []);

    /** Clear the entire array. */
    const clear = useCallback(() => {
        setArray([]);
    }, []);

    /** Check if the array is empty. */
    const isEmpty = array.length === 0;

    return {
        array,
        set,
        push,
        remove,
        update,
        insert,
        clear,
        isEmpty,
    };
}

export default useArray;
```

## 💡 Notes

- All operations are immutable, ensuring React detects state changes correctly.
- Works with any data type (number, string, object, etc.).
- Safe for functional components and concurrent rendering in React 19+.

## 🧾 Type Definition

```tsx
type UseArrayResult<T> = {
  array: T[];
  set: (newArray: T[]) => void;
  push: (element: T) => void;
  remove: (index: number) => void;
  update: (index: number, newElement: T) => void;
  insert: (index: number, element: T) => void;
  clear: () => void;
  isEmpty: boolean;
};
```

## 🧭 Summary

| Feature                 | Description                    |
| ----------------------- | ------------------------------ |
| 🧱 Immutable operations | Ensures predictable re-renders |
| 🧩 Generic support      | Works with any data type       |
| ⚡ Lightweight           | No dependencies                |
| 🧠 Intuitive            | Small, simple API surface      |
