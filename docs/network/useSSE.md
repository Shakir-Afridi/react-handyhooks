---
title: useSSE
outline: deep
---

# useSSE

A React hook for establishing a Server-Sent Events (SSE) connection and listening for real-time messages.

---

## ✨ Overview

`useSSE` simplifies working with the EventSource API in React.  
It automatically connects to the given URL and listens for messages or custom events.

---

## 📦 Import

```tsx
import { useSSE } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useSSE } from 'react-hookstack';

function Example() {
  const event = useSSE("https://api.example.com/stream");

  return (
    <div>
      <div>Last event: {event?.data}</div>
    </div>
  );
}
```

## 🧩 API Reference

`useSSE(url: string, onError?: (error: Event) => void, eventType?: string): MessageEvent | null`

### Parameters

| Parameter   | Type                       | Description                                 |
| ----------- | -------------------------- | ------------------------------------------- |
| `url`       | string                     | The SSE endpoint URL.                       |
| `onError`   | (error: Event) => void     | Optional error handler.                     |
| `eventType` | string                     | Optional custom event type (default: "message"). |

### Returns

| Type                  | Description                      |
| --------------------- | -------------------------------- |
| MessageEvent \| null  | Most recent event received.      |

## ⚙️ Implementation

```tsx
import { useEffect, useState } from "react";

export function useSSE(
    url: string,
    onError?: (error: Event) => void,
    eventType: string = "message"
): MessageEvent | null {
    const [event, setEvent] = useState<MessageEvent | null>(null);

    useEffect(() => {
        if (!url) return;

        const source = new EventSource(url);

        const handleMessage = (e: MessageEvent) => setEvent(e);
        const handleError = (e: Event) => {
            if (onError) onError(e);
            if (process.env.NODE_ENV === "development") {
                // eslint-disable-next-line no-console
                console.error(`[useSSE] Connection error for ${url}:`, e);
            }
            source.close();
        };

        source.addEventListener(eventType, handleMessage);
        source.addEventListener("error", handleError);

        return () => {
            source.removeEventListener(eventType, handleMessage);
            source.removeEventListener("error", handleError);
            source.close();
        };
    }, [url, onError, eventType]);

    return event;
}
```

## 💡 Notes

- Cleans up connection on unmount.
- Supports custom event types.

## 🧾 Type Definition

```tsx
function useSSE(
  url: string,
  onError?: (error: Event) => void,
  eventType?: string
): MessageEvent | null;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 SSE          | Real-time server events           |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
