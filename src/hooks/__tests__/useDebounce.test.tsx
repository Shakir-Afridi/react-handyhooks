import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../effects/useDebounce";

describe("useDebounce hook", () => {
    beforeEach(() => {
        jest.useFakeTimers(); // Use fake timers for setTimeout
    });

    afterEach(() => {
        jest.runOnlyPendingTimers(); // Run remaining timers
        jest.useRealTimers(); // Restore real timers
    });

    it("should return initial value immediately", () => {
        const { result } = renderHook(() => useDebounce("initial", 500));
        expect(result.current).toBe("initial");
    });

    it("should update the debounced value after the delay", () => {
        let value = "first";
        const { result, rerender } = renderHook(() => useDebounce(value, 500));

        expect(result.current).toBe("first");

        // Change value
        value = "second";
        rerender();

        // Before delay, value should not change
        expect(result.current).toBe("first");

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBe("second");
    });

    it("should reset debounce timer if value changes quickly", () => {
        let value = "a";
        const { result, rerender } = renderHook(() => useDebounce(value, 500));

        expect(result.current).toBe("a");

        // Change value before debounce time expires
        value = "b";
        rerender();

        act(() => {
            jest.advanceTimersByTime(300); // less than delay
        });

        value = "c";
        rerender();

        act(() => {
            jest.advanceTimersByTime(300); // still less than 500 from last change
        });

        // Value should not have updated yet
        expect(result.current).toBe("a");

        act(() => {
            jest.advanceTimersByTime(200); // now total 500ms since last change
        });

        expect(result.current).toBe("c");
    });

    it("should work with numeric values", () => {
        let value = 10;
        const { result, rerender } = renderHook(() => useDebounce(value, 300));

        expect(result.current).toBe(10);

        value = 20;
        rerender();

        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(result.current).toBe(20);
    });

    it("should work with zero delay (immediate update)", () => {
        const { result, rerender } = renderHook(
            ({ val }) => useDebounce(val, 0),
            { initialProps: { val: "x" } }
        );

        expect(result.current).toBe("x");

        rerender({ val: "y" });
        act(() => {
            jest.advanceTimersByTime(0);
        });

        expect(result.current).toBe("y");
    });
});
