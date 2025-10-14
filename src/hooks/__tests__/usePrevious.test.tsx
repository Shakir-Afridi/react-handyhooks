import { renderHook, act } from "@testing-library/react";
import { usePrevious } from "../usePrevious";

describe("usePrevious hook", () => {
    it("should return undefined on first render", () => {
        const { result } = renderHook(() => usePrevious(0));
        expect(result.current).toBeUndefined();
    });

    it("should return previous value after state update", () => {
        let value = 0;

        const { result, rerender } = renderHook(() => usePrevious(value));

        expect(result.current).toBeUndefined(); // First render

        // Update value
        value = 1;
        rerender();
        expect(result.current).toBe(0); // Previous value should be 0

        // Update value again
        value = 2;
        rerender();
        expect(result.current).toBe(1); // Previous value should be 1
    });

    it("should work with complex objects", () => {
        let obj = { a: 1 };

        const { result, rerender } = renderHook(() => usePrevious(obj));

        expect(result.current).toBeUndefined();

        obj = { a: 2 };
        rerender();
        expect(result.current).toEqual({ a: 1 });

        obj = { a: 3 };
        rerender();
        expect(result.current).toEqual({ a: 2 });
    });

    it("should handle null and undefined values", () => {
        let value: string | null | undefined = null;

        const { result, rerender } = renderHook(() => usePrevious(value));
        expect(result.current).toBeUndefined();

        value = "hello";
        rerender();
        expect(result.current).toBeNull();

        value = undefined;
        rerender();
        expect(result.current).toBe("hello");
    });
});
