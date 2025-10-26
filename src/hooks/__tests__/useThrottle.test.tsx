import { renderHook, act } from "@testing-library/react";
import { useThrottle } from "../effects/useThrottle";

describe("useThrottle hook", () => {
    beforeEach(() => {
        jest.useFakeTimers(); // Enable fake timers
    });

    afterEach(() => {
        jest.useRealTimers(); // Restore real timers
    });

    it("should initialize with the initial value", () => {
        const { result } = renderHook(() => useThrottle(10, 200));
        expect(result.current).toBe(10);
    });

    it("should update immediately if delay has passed", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useThrottle(value, 100),
            { initialProps: { value: 0 } }
        );

        // First update
        rerender({ value: 5 });
        act(() => {
            jest.advanceTimersByTime(101);
        });

        expect(result.current).toBe(5);
    });

    it("should throttle updates within the delay period", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useThrottle(value, 100),
            { initialProps: { value: 0 } }
        );

        // Trigger a new value immediately
        rerender({ value: 10 });

        // It should still be the old value immediately
        expect(result.current).toBe(0);

        // After 100ms, it should update
        act(() => {
            jest.advanceTimersByTime(100);
        });

        expect(result.current).toBe(10);
    });

    it("should only execute the last scheduled update if multiple updates happen quickly", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useThrottle(value, 200),
            { initialProps: { value: 0 } }
        );

        rerender({ value: 1 });
        rerender({ value: 2 });
        rerender({ value: 3 });

        // Before 200ms, throttledValue should still be 0
        expect(result.current).toBe(0);

        act(() => {
            jest.advanceTimersByTime(200);
        });

        expect(result.current).toBe(3); // Should be the last value
    });

    it("should update immediately if enough time has passed since last execution", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useThrottle(value, 100),
            { initialProps: { value: 0 } }
        );

        // Initial update
        rerender({ value: 5 });

        act(() => {
            jest.advanceTimersByTime(101);
        });

        // Because delay passed, should update immediately
        expect(result.current).toBe(5);
    });
});
