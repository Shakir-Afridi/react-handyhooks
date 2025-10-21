import { useRef, useCallback } from "react";

/**
 * useFocus Hook
 * Provides an easy way to manage focus state on a DOM element.
 *
 * @returns {{
 *   ref: React.RefObject<HTMLElement>;
 *   focus: () => void;
 *   blur: () => void;
 *   isFocused: boolean;
 * }}
 *
 * @example
 * const { ref, focus, blur, isFocused } = useFocus();
 *
 * return (
 *   <div>
 *     <input ref={ref} placeholder="Focus me" />
 *     <button onClick={focus}>Focus</button>
 *     <button onClick={blur}>Blur</button>
 *     <p>{isFocused ? "Focused" : "Not Focused"}</p>
 *   </div>
 * );
 */
export function useFocus<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const isFocused = useRef<boolean>(false);

    const focus = useCallback(() => {
        if (ref.current) {
            ref.current.focus();
            isFocused.current = true;
        }
    }, []);

    const blur = useCallback(() => {
        if (ref.current) {
            ref.current.blur();
            isFocused.current = false;
        }
    }, []);

    return { ref, focus, blur, isFocused: isFocused.current };
}
