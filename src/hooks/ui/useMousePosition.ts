import { useEffect, useState } from "react";

/**
 * useMousePosition
 * A custom React hook to track the mouse cursor's position within the window.
 *
 * @example
 * const position = useMousePosition();
 * console.log(position.x, position.y);
 */
export function useMousePosition() {
    // State to store mouse coordinates
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        // Mouse move handler
        const handleMouseMove = (event: MouseEvent) => {
            setPosition({ x: event.clientX, y: event.clientY });
        };

        // Listen for mousemove events
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return position;
}
