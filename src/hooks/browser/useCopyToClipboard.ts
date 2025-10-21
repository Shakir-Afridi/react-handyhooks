/**
 * @file useCopyToClipboard.ts
 * @description A React hook to copy text to the clipboard with success feedback.
 *
 * @example
 * const { copy, value, success } = useCopyToClipboard();
 *
 * <button onClick={() => copy("Hello World!")}>
 *   {success ? "Copied!" : "Copy Text"}
 * </button>
 */

import { useState, useCallback } from "react";

export interface UseCopyToClipboardReturn {
    /** The last copied value */
    value: string | null;
    /** Whether the last copy attempt was successful */
    success: boolean;
    /** Copies the given text to the clipboard */
    copy: (text: string) => Promise<boolean>;
    /** Resets the state */
    reset: () => void;
}

/**
 * A hook that provides clipboard copy functionality.
 *
 * It supports both the modern Clipboard API and falls back to
 * `document.execCommand` for older browsers.
 *
 * @returns An object with `copy`, `value`, `success`, and `reset`.
 */
export function useCopyToClipboard(): UseCopyToClipboardReturn {
    const [value, setValue] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const copy = useCallback(async (text: string): Promise<boolean> => {
        if (!text) {
            setSuccess(false);
            return false;
        }

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
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
            }

            setValue(text);
            setSuccess(true);
            return true;
        } catch (error) {
            console.error("Failed to copy:", error);
            setSuccess(false);
            return false;
        }
    }, []);

    const reset = useCallback(() => {
        setValue(null);
        setSuccess(false);
    }, []);

    return { value, success, copy, reset };
}

export default useCopyToClipboard;
