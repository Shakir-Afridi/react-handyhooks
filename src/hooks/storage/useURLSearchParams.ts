import { useMemo } from "react";

/**
 * @hook useURLSearchParams
 * @description A React hook that provides a memoized `URLSearchParams` object
 * for the current page URL. Useful for reading query parameters in a React component.
 *
 * @returns {URLSearchParams} The `URLSearchParams` instance for the current location.
 *
 * @example
 * const params = useURLSearchParams();
 * const userId = params.get("userId");
 */
export function useURLSearchParams(): URLSearchParams {
    return useMemo(() => new URLSearchParams(window.location.search), []);
}
