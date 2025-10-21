/**
 * @file useClickOutside.ts
 * @description A React hook that detects and handles clicks outside of a referenced element.
 *
 * @example
 * const ref = useRef(null);
 * useClickOutside(ref, () => setOpen(false));
 *
 * return <div ref={ref}>Dropdown Content</div>;
 */

import { useEffect } from "react";

/**
 * A React hook to detect clicks outside a given element.
 *
 * @param ref - React ref object for the target element.
 * @param handler - Callback function invoked when a click occurs outside the element.
 * @param eventType - The event type to listen for (default: 'mousedown').
 */
export function useClickOutside<T extends HTMLElement | null = HTMLElement>(
    ref: React.RefObject<T>,
    handler: (event: MouseEvent | TouchEvent) => void,
    eventType: "mousedown" | "mouseup" | "click" | "touchstart" = "mousedown"
): void {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref?.current;
            // Do nothing if clicking inside the element or if it’s unmounted
            if (!el || el.contains(event.target as Node)) return;
            handler(event);
        };

        document.addEventListener(eventType, listener, true);
        return () => {
            document.removeEventListener(eventType, listener, true);
        };
    }, [ref, handler, eventType]);
}

export default useClickOutside;
