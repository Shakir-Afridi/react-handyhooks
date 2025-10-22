import { useEffect, useState } from "react";

/**
 * useScrollPosition
 * A custom React hook to track the current scroll position of the window.
 * Returns an object with x (horizontal) and y (vertical) scroll coordinates.
 *
 * @example
 * const scrollPos = useScrollPosition();
 * console.log(scrollPos.x, scrollPos.y);
 */
export function useScrollPosition() {
    // State to store scroll coordinates
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        // Scroll event handler
        const handleScroll = () => {
            setPosition({ x: window.scrollX, y: window.scrollY });
        };

        // Attach scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Initialize state immediately
        handleScroll();

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return position;
}
