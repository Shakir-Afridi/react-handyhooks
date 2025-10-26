---
title: useNetworkStatus
outline: deep
---

# useNetworkStatus

A React hook to **monitor network connectivity status**.

---

## ✨ Overview

`useNetworkStatus` tracks whether the browser is online or offline, updating reactively as the network status changes.

---

## 📦 Import

```tsx
import { useNetworkStatus } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useNetworkStatus } from 'react-hookstack';

function Example() {
  const isOnline = useNetworkStatus();

  return (
    <div>
      Status: {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}
```

## 🧩 API Reference

`useNetworkStatus(): boolean`

### Returns

| Property   | Type     | Description                        |
| ---------- | -------- | ---------------------------------- |
| `isOnline` | `boolean`| Whether the browser is online.     |

## ⚙️ Implementation

```tsx
import { useEffect, useState } from "react";

export function useNetworkStatus(): boolean {
    const [isOnline, setIsOnline] = useState<boolean>(
        typeof navigator !== "undefined" ? navigator.onLine : true
    );

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        setIsOnline(navigator.onLine);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return isOnline;
}
```

## 💡 Notes

- Reacts to browser network changes.
- Useful for offline/online UI indicators.
- Safe for SSR (defaults to online).

## 🧾 Type Definition

```tsx
function useNetworkStatus(): boolean;
```

## 🧭 Summary

| Feature                 | Description                        |
| ----------------------- | ---------------------------------- |
| 🌐 Network aware        | Tracks online/offline status       |
| ⚡ Lightweight           | No dependencies                    |
| 🧠 Intuitive            | Simple API                         |
