import { useRef, useCallback } from "react";

/**
 * useLongPress
 * A custom React hook to detect long-press events on an element.
 * Calls the provided callback if the user presses and holds for the specified duration.
 *
 * @param callback - Function to be called on long press
 * @param ms - Duration in milliseconds to consider as a long press (default: 500ms)
 *
 * @example
 * const longPressEvents = useLongPress(() => alert("Long pressed!"), 700);
 * <button {...longPressEvents}>Hold me</button>
 */
export function useLongPress(callback: () => void, ms: number = 500) {
    // Ref to store the timer ID
    const timer = useRef<NodeJS.Timeout | null>(null);

    // Start the long press timer
    const start = useCallback(() => {
        timer.current = setTimeout(callback, ms);
    }, [callback, ms]);

    // Stop the long press timer
    const stop = useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    }, []);

    // Return handlers to attach to the element
    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    };
}
