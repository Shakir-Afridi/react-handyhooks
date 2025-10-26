---
title: useClickOutside
outline: deep
---

# useClickOutside

A React hook to **detect clicks outside a specific element**.

---

## ✨ Overview

`useClickOutside` helps you handle closing popups, dropdowns, modals, or tooltips when the user clicks outside the target element.

---

## 📦 Import

```tsx
import { useClickOutside } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useClickOutside } from 'react-hookstack';

function Example() {
  const ref = useRef(null);

  useClickOutside(ref, () => {
    alert('Clicked outside!');
  });

  return (
    <div ref={ref} style={{ border: '1px solid #ccc', padding: 20 }}>
      Click outside this box to trigger the callback.
    </div>
  );
}
```

## 🧩 API Reference

`useClickOutside(ref: RefObject<HTMLElement>, callback: () => void): void`

### Parameters

| Parameter | Type                       | Description                       |
| --------- | -------------------------- | --------------------------------- |
| `ref`     | `RefObject<HTMLElement>`   | Reference to the target element.  |
| `callback`| `() => void`               | Function to call on outside click.|

### Returns

| Property | Type | Description |
| -------- | ---- | ----------- |
| `void`   |      | No return value.|

## ⚙️ Implementation

```tsx
import { useEffect } from "react";

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}
```

## 💡 Notes

- Works for any HTML element.
- Useful for closing dropdowns, modals, tooltips, etc.
- Cleans up event listener on unmount.

## 🧾 Type Definition

```tsx
function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void): void;
```

## 🧭 Summary

| Feature                 | Description                        |
| ----------------------- | ---------------------------------- |
| 🖱️ Detects outside click| Calls callback on outside click    |
| 🧩 Generic support      | Works with any HTMLElement         |
| ⚡ Lightweight           | No dependencies                    |
| 🧠 Intuitive            | Simple API                         |
