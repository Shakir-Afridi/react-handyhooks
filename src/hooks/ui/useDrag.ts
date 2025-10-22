import { useRef, useState, useCallback } from "react";

/**
 * useDrag
 * A custom React hook to handle dragging behavior for an element.
 * Tracks whether dragging is active and the current position (x, y) relative to the start.
 *
 * @example
 * const { dragging, position, handleMouseDown } = useDrag();
 * <div onMouseDown={handleMouseDown}>Drag me!</div>
 */
export function useDrag() {
    // State to track whether dragging is in progress
    const [dragging, setDragging] = useState<boolean>(false);

    // Ref to track current position
    const position = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    // Refs to store initial positions for calculations
    const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    // Mouse move handler
    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (dragging) {
                position.current = {
                    x: event.clientX - startPos.current.x,
                    y: event.clientY - startPos.current.y,
                };
            }
        },
        [dragging]
    );

    // Mouse up handler to stop dragging
    const handleMouseUp = useCallback(() => {
        setDragging(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);

    // Mouse down handler to start dragging
    const handleMouseDown = useCallback(
        (event: React.MouseEvent) => {
            setDragging(true);
            startPos.current = {
                x: event.clientX - position.current.x,
                y: event.clientY - position.current.y,
            };
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        },
        [handleMouseMove, handleMouseUp]
    );

    return { dragging, position, handleMouseDown };
}
