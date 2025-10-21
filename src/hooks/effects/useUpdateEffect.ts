import { useEffect, useRef, EffectCallback, DependencyList } from "react";

/**
 * useUpdateEffect Hook
 *
 * Works like useEffect but skips execution on the first render.
 *
 * @param effect - The effect callback to run.
 * @param deps - Dependency list that triggers the effect.
 *
 * @example
 * useUpdateEffect(() => {
 *   console.log("Runs only when count changes, not on mount");
 * }, [count]);
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        return effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
