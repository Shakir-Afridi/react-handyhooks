import { useEffect, useRef, useState } from "react";

/**
 * useIntersectionObserver
 * A custom React hook to observe the intersection of a DOM element with the viewport or a parent element.
 * Returns a ref to attach to the element and the latest IntersectionObserverEntry.
 *
 * @param options - IntersectionObserverInit options (root, rootMargin, threshold)
 *
 * @example
 * const [ref, entry] = useIntersectionObserver<HTMLDivElement>({
 *   threshold: 0.5,
 * });
 * <div ref={ref}>Observe me!</div>
 * console.log(entry?.isIntersecting);
 */
export function useIntersectionObserver<T extends Element>(
    options?: IntersectionObserverInit
) {
    // Ref to attach to the target element
    const ref = useRef<T | null>(null);

    // State to store the latest intersection entry
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([observedEntry]) => setEntry(observedEntry),
            options
        );

        observer.observe(ref.current);

        // Cleanup observer on unmount
        return () => {
            observer.disconnect();
        };
    }, [options]);

    return [ref, entry] as const;
}
