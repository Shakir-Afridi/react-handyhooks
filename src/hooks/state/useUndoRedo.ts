import { useState, useCallback } from "react";

/**
 * @hook useUndoRedo
 * @description A React hook to manage state history with undo and redo functionality.
 * It keeps track of past, present, and future states, allowing easy rollback or redo of changes.
 *
 * @template T - The type of the state being tracked.
 * @param {T} initial - The initial state value.
 * @returns {{
 *   past: T[],
 *   present: T,
 *   future: T[],
 *   set: (newPresent: T) => void,
 *   undo: () => void,
 *   redo: () => void
 * }}
 * An object containing the current state, past states, future states, and methods to set, undo, and redo.
 *
 * @example
 * const { present, set, undo, redo } = useUndoRedo<number>(0);
 *
 * set(1); // present = 1
 * undo(); // present = 0
 * redo(); // present = 1
 */
export function useUndoRedo<T>(initial: T) {
    const [past, setPast] = useState<T[]>([]);
    const [present, setPresent] = useState<T>(initial);
    const [future, setFuture] = useState<T[]>([]);

    const set = useCallback(
        (newPresent: T) => {
            setPast((p) => [...p, present]);
            setPresent(newPresent);
            setFuture([]);
        },
        [present]
    );

    const undo = useCallback(() => {
        setPast((p) => {
            if (p.length === 0) return p;
            setFuture((f) => [present, ...f]);
            setPresent(p[p.length - 1]);
            return p.slice(0, -1);
        });
    }, [present]);

    const redo = useCallback(() => {
        setFuture((f) => {
            if (f.length === 0) return f;
            setPast((p) => [...p, present]);
            setPresent(f[0]);
            return f.slice(1);
        });
    }, [present]);

    return { past, present, future, set, undo, redo };
}
