/**
 * @file usePortal.ts
 * @description
 * A custom React hook for creating and managing React portals dynamically.
 * It creates a detached DOM node and appends it to a specified container
 * (like `#portal-root` or `document.body`), allowing components such as
 * modals, tooltips, or dropdowns to render outside the main DOM hierarchy.
 *
 * @example
 * const Portal = usePortal("modal-root");
 *
 * return (
 *   <>
 *     <button onClick={() => setOpen(true)}>Open Modal</button>
 *     {open && Portal(<div className="modal">Hello from Portal!</div>)}
 *   </>
 * );
 */

import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * A hook that returns a function to render React elements into a
 * dynamically created DOM node (portal).
 *
 * @param id - The ID of the container element to attach the portal to.
 *             Defaults to `"portal-root"`. If it doesn’t exist, `document.body` is used.
 * @returns A function that accepts React children and returns a React portal.
 */
export function usePortal(id: string = "portal-root") {
    const rootElemRef = useRef<HTMLDivElement | null>(null);

    // Create a div element lazily
    if (!rootElemRef.current) {
        rootElemRef.current = document.createElement("div");
    }

    useEffect(() => {
        const parentElem = document.getElementById(id) || document.body;
        const elem = rootElemRef.current!;

        // Append the element when mounted
        parentElem.appendChild(elem);

        // Cleanup when unmounted
        return () => {
            parentElem.removeChild(elem);
        };
    }, [id]);

    /**
     * Render children inside the portal's DOM node.
     */
    const renderPortal = (children: React.ReactNode) =>
        createPortal(children, rootElemRef.current!);

    return renderPortal;
}
