/**
 * @file useArray.ts
 * @description A React hook for managing array state with convenient helper methods.
 *              Provides immutable operations such as push, remove, update, and clear.
 *
 * @example
 * const { array, push, remove, update, clear } = useArray<number>([1, 2, 3]);
 *
 * push(4); // [1, 2, 3, 4]
 * remove(1); // [1, 3, 4]
 * update(0, 10); // [10, 3, 4]
 * clear(); // []
 */

import { useState, useCallback } from "react";

/**
 * A hook to manage array state with built-in immutable operations.
 *
 * @param initialValue - The initial array value.
 * @returns An object containing the array and helper functions.
 */
export function useArray<T>(initialValue: T[] = []) {
    const [array, setArray] = useState<T[]>(initialValue);

    /** Add a new element to the end of the array. */
    const push = useCallback((element: T) => {
        setArray((prev) => [...prev, element]);
    }, []);

    /** Remove an element by its index. */
    const remove = useCallback((index: number) => {
        setArray((prev) => prev.filter((_, i) => i !== index));
    }, []);

    /** Update an element at a specific index. */
    const update = useCallback((index: number, newElement: T) => {
        setArray((prev) =>
            prev.map((item, i) => (i === index ? newElement : item))
        );
    }, []);

    /** Insert an element at a specific index. */
    const insert = useCallback((index: number, element: T) => {
        setArray((prev) => [
            ...prev.slice(0, index),
            element,
            ...prev.slice(index),
        ]);
    }, []);

    /** Replace the entire array with a new one. */
    const set = useCallback((newArray: T[]) => {
        setArray(newArray);
    }, []);

    /** Clear the entire array. */
    const clear = useCallback(() => {
        setArray([]);
    }, []);

    /** Check if the array is empty. */
    const isEmpty = array.length === 0;

    return {
        array,
        set,
        push,
        remove,
        update,
        insert,
        clear,
        isEmpty,
    };
}

export default useArray;
