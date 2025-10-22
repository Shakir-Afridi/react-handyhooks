/**
 * @file useSSE.ts
 * @description
 * A custom React hook that establishes a Server-Sent Events (SSE) connection
 * to a given URL and listens for messages in real time.
 *
 * This hook simplifies working with the EventSource API and automatically
 * handles connection cleanup when the component unmounts.
 *
 * @example
 * const event = useSSE("https://api.example.com/stream");
 *
 * useEffect(() => {
 *   if (event) {
 *     console.log("New message:", event.data);
 *   }
 * }, [event]);
 */

import { useEffect, useState } from "react";

/**
 * Establishes a Server-Sent Events (SSE) connection to the given URL and
 * returns the most recent event received.
 *
 * @param url - The URL endpoint providing the SSE stream.
 * @param onError - Optional error handler callback for connection errors.
 * @param eventType - Optional custom event type to listen for (default: `"message"`).
 * @returns The most recent `MessageEvent` received, or `null` if none yet.
 */
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
            // eslint-disable-next-line no-console
            if (process.env.NODE_ENV === "development") {
                console.error(`[useSSE] Connection error for ${url}:`, e);
            }
            source.close(); // Optionally close on error
        };

        source.addEventListener(eventType, handleMessage);
        source.addEventListener("error", handleError);

        // Cleanup when component unmounts
        return () => {
            source.removeEventListener(eventType, handleMessage);
            source.removeEventListener("error", handleError);
            source.close();
        };
    }, [url, onError, eventType]);

    return event;
}
