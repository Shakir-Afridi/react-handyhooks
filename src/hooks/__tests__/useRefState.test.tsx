import { renderHook, act } from "@testing-library/react";
import { useRefState } from "../state/useRafState";

describe("useRefState hook", () => {
    it("should initialize state and ref with the initial value", () => {
        const { result } = renderHook(() => useRefState(10));

        const [state, , ref] = result.current;
        expect(state).toBe(10);
        expect(ref.current).toBe(10);
    });

    it("should update state and ref when setValue is called with a value", () => {
        const { result } = renderHook(() => useRefState(5));
        const [, setValue, ref] = result.current;

        act(() => {
            setValue(20);
        });

        const [stateAfter] = result.current;
        expect(stateAfter).toBe(20);
        expect(ref.current).toBe(20);
    });

    it("should update state and ref when setValue is called with a function", () => {
        const { result } = renderHook(() => useRefState(2));
        const [, setValue, ref] = result.current;

        act(() => {
            setValue((prev) => prev * 3);
        });

        const [stateAfter] = result.current;
        expect(stateAfter).toBe(6);
        expect(ref.current).toBe(6);
    });

    it("ref should always reflect the latest state even without re-render", () => {
        const { result } = renderHook(() => useRefState(0));
        const [, setValue, ref] = result.current;

        expect(ref.current).toBe(0);

        act(() => {
            setValue(5);
        });

        // ref updates immediately
        expect(ref.current).toBe(5);
    });

    it("should work with complex objects", () => {
        const initialObj = { a: 1, b: 2 };
        const { result } = renderHook(() => useRefState(initialObj));
        const [, setValue, ref] = result.current;

        act(() => {
            setValue((prev) => ({ ...prev, b: 3 }));
        });

        const [stateAfter] = result.current;
        expect(stateAfter).toEqual({ a: 1, b: 3 });
        expect(ref.current).toEqual({ a: 1, b: 3 });
    });
});
