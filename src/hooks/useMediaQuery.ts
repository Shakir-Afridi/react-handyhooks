import { useEffect, useState } from "react";

/**
 * useMediaQuery Hook
 *
 * React hook that listens to a CSS media query and returns whether it matches.
 *
 * @param query - A valid CSS media query string (e.g. "(max-width: 768px)")
 *
 * @returns boolean - true if the query matches, false otherwise
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false; // SSR-safe default
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQuery = window.matchMedia(query);
        const handler = (event: MediaQueryListEvent) =>
            setMatches(event.matches);

        // Set the initial value in case it changed before effect runs
        setMatches(mediaQuery.matches);

        // Attach the listener
        mediaQuery.addEventListener("change", handler);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener("change", handler);
        };
    }, [query]);

    return matches;
}
