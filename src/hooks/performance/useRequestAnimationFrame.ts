import { useEffect, useRef } from "react";

/**
 * @hook useRequestAnimationFrame
 * @description A custom React hook that executes a callback on every animation frame.
 * It provides the time difference (`deltaTime`) between frames, which is useful for
 * creating smooth animations, game loops, or continuous visual updates.
 *
 * @param {(deltaTime: number) => void} callback - The function to run on each frame, receiving the time delta.
 *
 * @example
 * useRequestAnimationFrame((delta) => {
 *   console.log(`Frame rendered after ${delta}ms`);
 * });
 */
export function useRequestAnimationFrame(callback: (time: number) => void) {
    const requestRef = useRef<number>(0);
    const previousTimeRef = useRef<number>(0);

    useEffect(() => {
        const animate = (time: number) => {
            if (previousTimeRef.current !== undefined) {
                const deltaTime = time - previousTimeRef.current;
                callback(deltaTime);
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, [callback]);
}
