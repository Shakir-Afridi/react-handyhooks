/**
 * @file useEventListener.ts
 * @description A React hook for safely adding and cleaning up event listeners.
 *              Works for both window, document, or specific DOM elements.
 *
 * @example
 * // Example: Listening to window resize
 * useEventListener('resize', () => console.log('Window resized!'));
 *
 * // Example: Listening to key press
 * useEventListener('keydown', (e) => {
 *   if (e.key === 'Escape') console.log('Escape pressed!');
 * });
 */

import { useEffect, useRef } from "react";

/**
 * Custom hook to attach an event listener to a target element (window by default).
 *
 * @param eventName - The name of the event to listen for (e.g., 'click', 'resize').
 * @param handler - The event handler function.
 * @param element - Optional target element (defaults to window).
 */
export function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    element?: Window | Document | HTMLElement | null
): void {
    // Store the latest handler in a ref to avoid re-attaching listeners unnecessarily
    const savedHandler = useRef<typeof handler | null>(null);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement: Window | Document | HTMLElement | null =
            element ?? window;

        if (!(targetElement && targetElement.addEventListener)) return;

        // Create event listener that calls the saved handler
        const eventListener = (event: Event) => {
            if (savedHandler.current) {
                savedHandler.current(event as WindowEventMap[K]);
            }
        };

        // Add event listener
        targetElement.addEventListener(eventName, eventListener);

        // Clean up on unmount
        return () => {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}

export default useEventListener;
