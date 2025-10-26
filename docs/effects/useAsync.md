---
title: useAsync
outline: deep
---

# useAsync

A React hook for **managing asynchronous operations** with built-in loading, error, and result state handling.

---

## ✨ Overview

`useAsync` simplifies handling async logic in React by providing state for loading, error, and result, plus helper methods to execute and reset.

---

## 📦 Import

```tsx
import { useAsync } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useAsync } from 'react-hookstack';

function UserList() {
  const { execute, data, error, isLoading } = useAsync(fetchUsers, true);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>}
      <button onClick={execute}>Reload</button>
    </div>
  );
}
```

## 🧩 API Reference

`useAsync<T, E = Error>(asyncFunction: (...args: any[]) => Promise<T>, immediate?: boolean): UseAsyncReturn<T, E>`

### Parameters

| Parameter      | Type                                | Default | Description                                 |
| -------------- | ----------------------------------- | ------- | ------------------------------------------- |
| `asyncFunction`| `(...args: any[]) => Promise<T>`    |         | The async function to execute.              |
| `immediate`    | `boolean`                           | `false` | If true, runs immediately on mount.         |

### Returns

| Property   | Type                                         | Description                                 |
| ---------- | -------------------------------------------- | ------------------------------------------- |
| `execute`  | `(...args: any[]) => Promise<T | undefined>` | Executes the async function manually.       |
| `data`     | `T \| null`                                  | The last successful result.                 |
| `error`    | `E \| null`                                  | Any error thrown by the async function.     |
| `isLoading`| `boolean`                                    | Indicates if the async operation is running.|
| `reset`    | `() => void`                                 | Resets data and error state.                |

## ⚙️ Implementation

```tsx
import { useState, useCallback, useRef, useEffect } from "react";

export function useAsync<T, E = Error>(
    asyncFunction: (...args: any[]) => Promise<T>,
    immediate: boolean = false
) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(true);

    const execute = useCallback(
        async (...args: any[]) => {
            setIsLoading(true);
            setError(null);

            try {
                const result = await asyncFunction(...args);
                if (isMounted.current) setData(result);
                return result;
            } catch (err) {
                if (isMounted.current) setError(err as E);
            } finally {
                if (isMounted.current) setIsLoading(false);
            }
        },
        [asyncFunction]
    );

    const reset = useCallback(() => {
        setData(null);
        setError(null);
    }, []);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate, execute]);

    return { execute, data, error, isLoading, reset };
}

export default useAsync;
```

## 💡 Notes

- Handles loading, error, and result state automatically.
- Use `execute` to run the async function, `reset` to clear state.
- Pass `immediate:
