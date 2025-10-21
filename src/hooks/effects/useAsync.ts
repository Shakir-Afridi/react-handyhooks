/**
 * @file useAsync.ts
 * @description A React hook for managing asynchronous operations with built-in
 * loading, error, and result state handling.
 *
 * @example
 * const { execute, data, error, isLoading } = useAsync(fetchUsers);
 *
 * useEffect(() => {
 *   execute();
 * }, [execute]);
 */

import { useState, useCallback, useRef, useEffect } from "react";

export interface UseAsyncReturn<T, E = Error> {
    /** Executes the async function manually */
    execute: (...args: any[]) => Promise<T | undefined>;
    /** The last successful result */
    data: T | null;
    /** Any error thrown by the async function */
    error: E | null;
    /** Indicates whether the async operation is in progress */
    isLoading: boolean;
    /** Resets data and error state */
    reset: () => void;
}

/**
 * A React hook for managing asynchronous operations.
 *
 * @param asyncFunction The async function to execute.
 * @param immediate If true, runs immediately on mount.
 *
 * @returns An object containing data, error, loading, and helper methods.
 */
export function useAsync<T, E = Error>(
    asyncFunction: (...args: any[]) => Promise<T>,
    immediate: boolean = false
): UseAsyncReturn<T, E> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(true);

    const execute = useCallback(
        async (...args: any[]) => {
            setIsLoading(true);
            setError(null);

            try {
                const result = await asyncFunction(...args);
                if (isMounted.current) setData(result);
                return result;
            } catch (err) {
                if (isMounted.current) setError(err as E);
            } finally {
                if (isMounted.current) setIsLoading(false);
            }
        },
        [asyncFunction]
    );

    const reset = useCallback(() => {
        setData(null);
        setError(null);
    }, []);

    // Handle cleanup on unmount
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Run immediately if configured
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate, execute]);

    return { execute, data, error, isLoading, reset };
}

export default useAsync;
