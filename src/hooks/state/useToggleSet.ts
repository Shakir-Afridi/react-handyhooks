import { useState, useCallback } from "react";

/**
 * @hook useToggleSet
 * @description A React hook for managing a `Set` with toggle functionality.
 * It allows you to easily add or remove items from a Set in an immutable way,
 * useful for handling selected items, filters, or multi-select UI states.
 *
 * @template T - The type of elements stored in the Set.
 * @param {Set<T>} [initialSet=new Set()] - The initial Set of items.
 * @returns {[Set<T>, (item: T) => void]} A tuple containing the current Set and a toggle function.
 *
 * @example
 * const [selectedItems, toggleItem] = useToggleSet<number>(new Set([1, 2]));
 *
 * // Add item 3
 * toggleItem(3);
 *
 * // Remove item 1
 * toggleItem(1);
 */
export function useToggleSet<T>(initialSet: Set<T> = new Set()) {
    const [set, setSet] = useState<Set<T>>(initialSet);

    const toggle = useCallback((item: T) => {
        setSet((prev) => {
            const next = new Set(prev);
            if (next.has(item)) next.delete(item);
            else next.add(item);
            return next;
        });
    }, []);

    return [set, toggle] as const;
}
