---
title: usePortal
outline: deep
---

# usePortal

A React hook for creating and managing React portals dynamically.

---

## ✨ Overview

`usePortal` creates a detached DOM node and appends it to a specified container, allowing components such as modals, tooltips, or dropdowns to render outside the main DOM hierarchy.

---

## 📦 Import

```tsx
import { usePortal } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { usePortal } from 'react-hookstack';

const Portal = usePortal("modal-root");

return (
  <>
    <button onClick={() => setOpen(true)}>Open Modal</button>
    {open && Portal(<div className="modal">Hello from Portal!</div>)}
  </>
);
```

## 🧩 API Reference

`usePortal(id?: string): (children: React.ReactNode) => React.ReactPortal`

### Parameters

| Parameter | Type   | Default      | Description                                 |
| --------- | ------ | ------------ | ------------------------------------------- |
| `id`      | string | "portal-root"| The ID of the container element.            |

### Returns

| Type                                   | Description                                 |
| --------------------------------------- | ------------------------------------------- |
| (children: React.ReactNode) => React.ReactPortal | Function to render children in portal.      |

## ⚙️ Implementation

```tsx
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export function usePortal(id: string = "portal-root") {
    const rootElemRef = useRef<HTMLDivElement | null>(null);

    if (!rootElemRef.current) {
        rootElemRef.current = document.createElement("div");
    }

    useEffect(() => {
        const parentElem = document.getElementById(id) || document.body;
        const elem = rootElemRef.current!;
        parentElem.appendChild(elem);

        return () => {
            parentElem.removeChild(elem);
        };
    }, [id]);

    const renderPortal = (children: React.ReactNode) =>
        createPortal(children, rootElemRef.current!);

    return renderPortal;
}
```

## 💡 Notes

- Cleans up the portal node on unmount.
- Useful for modals, tooltips, dropdowns, etc.

## 🧾 Type Definition

```tsx
function usePortal(id?: string): (children: React.ReactNode) => React.ReactPortal;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Portal       | Renders outside main DOM tree     |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
