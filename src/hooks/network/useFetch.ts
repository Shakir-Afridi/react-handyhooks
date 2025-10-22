/**
 * @file useFetch.ts
 * @description
 * A custom React hook for fetching data from a given URL.
 * It manages loading, error, and data states automatically,
 * and provides a clean interface for performing basic API requests.
 *
 * @example
 * const { data, loading, error } = useFetch<User[]>("/api/users");
 *
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * return <UserList users={data} />;
 */

import { useState, useEffect } from "react";

/**
 * Fetch data from a given URL and track loading and error states.
 *
 * @template T - The expected shape of the response data.
 * @param url - The endpoint URL to fetch data from.
 * @param options - Optional fetch configuration options.
 * @returns An object containing:
 * - `data`: The fetched data (or `null` initially)
 * - `loading`: Boolean indicating if the request is in progress
 * - `error`: Any error encountered during the request
 */
export function useFetch<T = unknown>(
    url: string,
    options?: RequestInit
): { data: T | null; loading: boolean; error: Error | null } {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(url, { ...options, signal });

                if (!response.ok) {
                    throw new Error(
                        `Fetch failed with status: ${response.status}`
                    );
                }

                const json = (await response.json()) as T;
                setData(json);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup on unmount or URL/options change
        return () => controller.abort();
    }, [url, JSON.stringify(options)]); // stringify options for shallow comparison

    return { data, loading, error };
}

export default useFetch;
