import { useEffect, useRef, useState } from "react";

/**
 * @hook useWebSocket
 * @description A React hook to manage WebSocket connections.
 * Automatically connects to the provided URL, listens for messages, and allows sending data.
 *
 * @param {string} url - The WebSocket server URL.
 * @returns {{ send: (data: string) => void, message: MessageEvent | null }}
 * - send: Function to send messages through the WebSocket.
 * - message: The last received message event.
 *
 * @example
 * const { send, message } = useWebSocket("wss://example.com/socket");
 * send("Hello Server");
 */
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
