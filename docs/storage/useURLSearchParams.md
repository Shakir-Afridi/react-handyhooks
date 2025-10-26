---
title: useURLSearchParams
outline: deep
---

# useURLSearchParams

A React hook that provides a memoized `URLSearchParams` object for the current page URL.

---

## ✨ Overview

`useURLSearchParams` is useful for reading query parameters in a React component.

---

## 📦 Import

```tsx
import { useURLSearchParams } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useURLSearchParams } from 'react-hookstack';

const params = useURLSearchParams();
const userId = params.get("userId");
```

## 🧩 API Reference

`useURLSearchParams(): URLSearchParams`

### Returns

| Type            | Description                      |
| --------------- | -------------------------------- |
| URLSearchParams | Instance for current location.   |

## ⚙️ Implementation

```tsx
import { useMemo } from "react";

export function useURLSearchParams(): URLSearchParams {
    return useMemo(() => new URLSearchParams(window.location.search), []);
}
```

## 💡 Notes

- Memoized for performance.
- Reads from `window.location.search`.

## 🧾 Type Definition

```tsx
function useURLSearchParams(): URLSearchParams;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Query params | Reads URL search parameters       |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
