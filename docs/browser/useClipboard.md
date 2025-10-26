---
title: useClipboard
outline: deep
---

# useClipboard

A React hook for **copying text to clipboard**.

---

## ✨ Overview

`useClipboard` provides a simple API to copy text to the clipboard and track copy status, supporting both modern and legacy browsers.

---

## 📦 Import

```tsx
import { useClipboard } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useClipboard } from 'react-hookstack';

function Example() {
  const { copy, copied } = useClipboard();

  return (
    <div>
      <button onClick={() => copy('Hello World')}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
```

## 🧩 API Reference

`useClipboard(): { copy: (text: string) => void; copied: boolean }`

### Returns

| Property | Type                        | Description                          |
| -------- | --------------------------- | ------------------------------------ |
| `copy`   | `(text: string) => void`    | Function to copy text to clipboard.  |
| `copied` | `boolean`                   | Whether text was recently copied.    |

## ⚙️ Implementation

```tsx
import { useState, useCallback } from "react";

export function useClipboard() {
    const [copied, setCopied] = useState(false);

    const copy = useCallback((text: string) => {
        if (!text) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    }, []);

    return { copy, copied };
}
```

## 💡 Notes

- Supports both modern Clipboard API and legacy fallback.
- `copied` resets automatically after a short delay.
- Useful for copy-to-clipboard buttons.

## 🧾 Type Definition

```tsx
function useClipboard(): { copy: (text: string) => void; copied: boolean };
```

## 🧭 Summary

| Feature                 | Description                        |
| ----------------------- | ---------------------------------- |
| 📋 Clipboard support    | Copies text to clipboard           |
| ⚡ Lightweight           | No dependencies                    |
| 🧠 Intuitive            | Simple API                         |
