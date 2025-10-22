import { useState, useEffect } from "react";

/**
 * useClipboardHistory
 * A custom React hook to track clipboard history within the application session.
 * Stores copied text in an array and provides a way to add new entries.
 *
 * Note: This hook does not persist data beyond the current session.
 *
 * @example
 * const { history, copyToClipboard } = useClipboardHistory();
 * copyToClipboard("Hello World");
 * console.log(history); // ["Hello World"]
 */
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
