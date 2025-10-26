---
title: useVisibilityChange
outline: deep
---

# useVisibilityChange

A React hook to track the visibility state of the document (tab/window).

---

## ✨ Overview

`useVisibilityChange` returns `true` if the document is visible and `false` if it is hidden.  
Useful for pausing timers or animations when the user switches tabs.

---

## 📦 Import

```tsx
import { useVisibilityChange } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useVisibilityChange } from 'react-hookstack';

const isVisible = useVisibilityChange();
console.log(isVisible); // true if tab is active
```

## 🧩 API Reference

`useVisibilityChange(): boolean`

### Returns

| Type    | Description                  |
| ------- | ---------------------------- |
| boolean | `true` if visible, `false` otherwise.|

## ⚙️ Implementation

```tsx
import { useEffect, useState } from "react";

export function useVisibilityChange(): boolean {
    // State to track visibility
    const [visible, setVisible] = useState<boolean>(!document.hidden);

    useEffect(() => {
        // Event handler to update visibility state
        const handleVisibilityChange = () => setVisible(!document.hidden);

        // Listen for visibility change events
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup listener on unmount
        return () =>
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
    }, []);

    return visible;
}
```

## 💡 Notes

- Listens for `visibilitychange` events.
- Cleans up listener on unmount.

## 🧾 Type Definition

```tsx
function useVisibilityChange(): boolean;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Visibility   | Track tab/window visibility       |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
