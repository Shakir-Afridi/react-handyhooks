---
title: useClipboardHistory
outline: deep
---

# useClipboardHistory

A React hook for tracking clipboard history within the session.

---

## ✨ Overview

`useClipboardHistory` stores copied text in an array and provides a method to copy new entries, useful for clipboard managers or undo features.

---

## 📦 Import

```tsx
import { useClipboardHistory } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useClipboardHistory } from 'react-hookstack';

function Example() {
  const { history, copyToClipboard } = useClipboardHistory();

  return (
    <div>
      <button onClick={() => copyToClipboard("Hello World")}>Copy</button>
      <ul>
        {history.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}
```

## 🧩 API Reference

`useClipboardHistory(): { history: string[]; copyToClipboard: (text: string) => Promise<void> }`

### Returns

| Property         | Type                  | Description                       |
| ---------------- | --------------------- | --------------------------------- |
| `history`        | `string[]`            | Array of copied texts.            |
| `copyToClipboard`| `(text: string) => Promise<void>` | Copy text and add to history. |

## ⚙️ Implementation

```tsx
export function useClipboardHistory() {
    // State to store the clipboard history
    const [history, setHistory] = useState<string[]>([]);

    /**
     * copyToClipboard
     * Copies a string to the user's clipboard and stores it in the history.
     */
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setHistory((prev) => [text, ...prev]); // Add newest copy at the beginning
        } catch (error) {
            console.error("Failed to copy text to clipboard:", error);
        }
    };

    // Optional: automatically track 'copy' events from the document
    useEffect(() => {
        const handleCopy = (event: ClipboardEvent) => {
            const copiedText = event.clipboardData?.getData("text");
            if (copiedText) {
                setHistory((prev) => [copiedText, ...prev]);
            }
        };

        document.addEventListener("copy", handleCopy);
        return () => document.removeEventListener("copy", handleCopy);
    }, []);

    return { history, copyToClipboard };
}

```

## 💡 Notes

- Tracks clipboard history for the session only.
- Automatically listens to document copy events.

## 🧾 Type Definition

```tsx
type UseClipboardHistoryResult = {
  history: string[];
  copyToClipboard: (text: string) => Promise<void>;
};
```

## 🧭 Summary

| Feature         | Description                |
| --------------- | ------------------------- |
| 📋 Clipboard    | Tracks copy history       |
| ⚡ Lightweight   | Minimal overhead          |
| 🧩 Easy to use   | Simple API                |
