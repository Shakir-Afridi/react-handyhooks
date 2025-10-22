import { useEffect, useState } from "react";

/**
 * useVisibilityChange
 * A custom React hook to track the visibility state of the document (tab/window).
 * Returns `true` if the document is visible and `false` if it is hidden.
 *
 * Useful for:
 * - Pausing timers or animations when the user switches tabs
 * - Reducing resource usage when the tab is not visible
 *
 * @example
 * const isVisible = useVisibilityChange();
 * console.log(isVisible); // true if tab is active
 */
export function useVisibilityChange(): boolean {
    // State to track visibility
    const [visible, setVisible] = useState<boolean>(!document.hidden);

    useEffect(() => {
        // Event handler to update visibility state
        const handleVisibilityChange = () => setVisible(!document.hidden);

        // Listen for visibility change events
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Cleanup listener on unmount
        return () =>
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
    }, []);

    return visible;
}
