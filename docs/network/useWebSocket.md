---
title: useWebSocket
outline: deep
---

# useWebSocket

A React hook to manage WebSocket connections, send messages, and listen for incoming data.

---

## ✨ Overview

`useWebSocket` simplifies working with WebSocket APIs in React.  
It automatically connects to the provided URL, listens for messages, and allows sending data.

---

## 📦 Import

```tsx
import { useWebSocket } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useWebSocket } from 'react-hookstack';

function Example() {
  const { send, message } = useWebSocket("wss://example.com/socket");

  return (
    <div>
      <button onClick={() => send("Hello Server")}>Send</button>
      <div>Last message: {message?.data}</div>
    </div>
  );
}
```

## 🧩 API Reference

`useWebSocket(url: string): { send: (data: string) => void, message: MessageEvent | null }`

### Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | --------------------------- |
| `url`     | string | The WebSocket server URL.    |

### Returns

| Property   | Type                  | Description                      |
| ---------- | --------------------- | -------------------------------- |
| `send`     | (data: string) => void| Send a message to the server.    |
| `message`  | MessageEvent \| null  | Last received message event.     |

## ⚙️ Implementation

```tsx
import { useEffect, useRef, useState } from "react";

export function useWebSocket(url: string) {
    const ws = useRef<WebSocket | null>(null);
    const [message, setMessage] = useState<MessageEvent | null>(null);

    useEffect(() => {
        ws.current = new window.WebSocket(url);
        ws.current.onmessage = setMessage;
        return () => {
            ws.current?.close();
        };
    }, [url]);

    const send = (data: string) => ws.current?.send(data);

    return { send, message };
}
```

## 💡 Notes

- Automatically cleans up connection on unmount.
- Use `message?.data` to access the payload.

## 🧾 Type Definition

```tsx
function useWebSocket(url: string): {
  send: (data: string) => void;
  message: MessageEvent | null;
};
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 WebSocket    | Real-time communication           |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
