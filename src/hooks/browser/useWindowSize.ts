import { useState, useEffect } from "react";

/**
 * useWindowSize Hook
 *
 * Tracks the current width and height of the browser window.
 * Automatically updates on resize.
 *
 * @returns { width: number, height: number } - The current window dimensions.
 *
 * @example
 * const { width, height } = useWindowSize();
 * console.log(`Width: ${width}, Height: ${height}`);
 */
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add listener
        window.addEventListener("resize", handleResize);

        // Set initial size
        handleResize();

        // Cleanup listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
