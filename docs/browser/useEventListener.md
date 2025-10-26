---
title: useEventListener
outline: deep
---

# useEventListener

A React hook for **safely adding and cleaning up event listeners**.

---

## ✨ Overview

`useEventListener` attaches an event listener to a target (window, document, or element) and cleans up automatically.  
Useful for handling global events like resize, scroll, or keyboard shortcuts.

---

## 📦 Import

```tsx
import { useEventListener } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useEventListener } from 'react-hookstack';

function Example() {
  useEventListener('resize', () => {
    console.log('Window resized!');
  });

  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') alert('Escape pressed!');
  });

  return <div>Try resizing or pressing Escape.</div>;
}
```

## 🧩 API Reference

`useEventListener<K extends keyof WindowEventMap>(eventName: K, handler: (event: WindowEventMap[K]) => void, element?: Window | Document | HTMLElement | null): void`

### Parameters

| Parameter   | Type                                         | Description                                 |
| ----------- | -------------------------------------------- | ------------------------------------------- |
| `eventName` | `string`                                     | The event name (e.g., 'resize', 'keydown'). |
| `handler`   | `(event: WindowEventMap[K]) => void`         | The event handler function.                 |
| `element`   | `Window \| Document \| HTMLElement \| null`  | Optional target element (defaults to window)|

### Returns

| Property | Type | Description |
| -------- | ---- | ----------- |
| `void`   |      | No return value.|

## ⚙️ Implementation

```tsx
import { useEffect, useRef } from "react";

export function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: Window | Document | HTMLElement | null
): void {
    const savedHandler = useRef<typeof handler | null>(null);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement: Window | Document | HTMLElement | null =
            element ?? window;

        if (!(targetElement && targetElement.addEventListener)) return;

        const eventListener = (event: Event) => {
            if (savedHandler.current) {
                savedHandler.current(event as WindowEventMap[K]);
            }
        };

        targetElement.addEventListener(eventName, eventListener);

        return () => {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}
```

## 💡 Notes

- Cleans up listeners automatically.
- Works for window, document, or any HTMLElement.
- Uses a ref to avoid unnecessary re-attaches.

## 🧾 Type Definition

```tsx
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: Window | Document | HTMLElement | null
): void;
```

## 🧭 Summary

| Feature                 | Description                        |
| ----------------------- | ---------------------------------- |
| 🖱️ Event listener       | Attaches and cleans up listeners   |
| 🧩 Generic support      | Works for any DOM target           |
| ⚡ Lightweight           | No dependencies                    |
| 🧠 Intuitive            | Simple API                         |
