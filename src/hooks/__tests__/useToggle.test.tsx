import { renderHook, act } from "@testing-library/react";
import { useToggle } from "../useToggle";

describe("useToggle hook", () => {
    it("should initialize with the default value (false)", () => {
        const { result } = renderHook(() => useToggle());
        const [value] = result.current;
        expect(value).toBe(false);
    });

    it("should initialize with a custom value", () => {
        const { result } = renderHook(() => useToggle(true));
        const [value] = result.current;
        expect(value).toBe(true);
    });

    it("should toggle the value when toggle() is called without arguments", () => {
        const { result } = renderHook(() => useToggle(false));
        const [, toggle] = result.current;

        act(() => {
            toggle();
        });

        expect(result.current[0]).toBe(true);

        act(() => {
            toggle();
        });

        expect(result.current[0]).toBe(false);
    });

    it("should set the value explicitly when toggle(true) is called", () => {
        const { result } = renderHook(() => useToggle(false));
        const [, toggle] = result.current;

        act(() => {
            toggle(true);
        });

        expect(result.current[0]).toBe(true);
    });

    it("should set the value explicitly when toggle(false) is called", () => {
        const { result } = renderHook(() => useToggle(true));
        const [, toggle] = result.current;

        act(() => {
            toggle(false);
        });

        expect(result.current[0]).toBe(false);
    });

    it("should toggle value multiple times correctly", () => {
        const { result } = renderHook(() => useToggle(false));
        const [, toggle] = result.current;

        act(() => {
            toggle();
            toggle();
            toggle();
        });

        expect(result.current[0]).toBe(true);
    });
});
