import { useState, useCallback } from "react";

/**
 * useMap Hook
 *
 * A React hook to manage a Map with helpful utility functions.
 *
 * @template K - Key type
 * @template V - Value type
 *
 * @param initialEntries - Optional initial entries for the Map
 *
 * @returns {{
 *   map: Map<K, V>;
 *   set: (key: K, value: V) => void;
 *   get: (key: K) => V | undefined;
 *   remove: (key: K) => void;
 *   has: (key: K) => boolean;
 *   clear: () => void;
 *   reset: () => void;
 * }}
 *
 * @example
 * const { map, set, get, remove, clear } = useMap<string, number>([['a', 1]]);
 *
 * set('b', 2);
 * console.log(map.get('a')); // 1
 * remove('a');
 * clear();
 */
export function useMap<K, V>(initialEntries?: readonly (readonly [K, V])[]) {
    const [map, setMap] = useState<Map<K, V>>(() => new Map(initialEntries));

    const set = useCallback((key: K, value: V) => {
        setMap((prev) => {
            const newMap = new Map(prev);
            newMap.set(key, value);
            return newMap;
        });
    }, []);

    const remove = useCallback((key: K) => {
        setMap((prev) => {
            const newMap = new Map(prev);
            newMap.delete(key);
            return newMap;
        });
    }, []);

    const get = useCallback((key: K) => map.get(key), [map]);

    const has = useCallback((key: K) => map.has(key), [map]);

    const clear = useCallback(() => {
        setMap(new Map());
    }, []);

    const reset = useCallback(() => {
        setMap(new Map(initialEntries));
    }, [initialEntries]);

    return { map, set, get, remove, has, clear, reset };
}
