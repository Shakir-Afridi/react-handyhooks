---
title: useFetch
outline: deep
---

# useFetch

A React hook for fetching data from a given URL, managing loading, error, and data states.

---

## ✨ Overview

`useFetch` provides a simple way to fetch data in React components.  
It tracks loading and error states, and returns the fetched data.

---

## 📦 Import

```tsx
import { useFetch } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useFetch } from 'react-hookstack';

function Example() {
  const { data, loading, error } = useFetch<User[]>("/api/users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

## 🧩 API Reference

`useFetch<T = unknown>(url: string, options?: RequestInit): { data: T | null; loading: boolean; error: Error | null }`

### Parameters

| Parameter | Type         | Description                                 |
| --------- | ------------ | ------------------------------------------- |
| `url`     | string       | The endpoint URL to fetch data from.        |
| `options` | RequestInit  | Optional fetch configuration options.       |

### Returns

| Property   | Type                  | Description                      |
| ---------- | --------------------- | -------------------------------- |
| `data`     | T \| null             | The fetched data.                |
| `loading`  | boolean               | Is the request in progress?      |
| `error`    | Error \| null         | Any error encountered.           |

## ⚙️ Implementation

```tsx
import { useState, useEffect } from "react";

export function useFetch<T = unknown>(
    url: string,
    options?: RequestInit
): { data: T | null; loading: boolean; error: Error | null } {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(url, { ...options, signal });

                if (!response.ok) {
                    throw new Error(
                        `Fetch failed with status: ${response.status}`
                    );
                }

                const json = (await response.json()) as T;
                setData(json);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url, JSON.stringify(options)]);

    return { data, loading, error };
}
```

## 💡 Notes

- Automatically aborts request on unmount.
- Use generic type for strong typing.

## 🧾 Type Definition

```tsx
function useFetch<T = unknown>(
  url: string,
  options?: RequestInit
): { data: T | null; loading: boolean; error: Error | null };
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Fetch        | Data fetching with state          |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
