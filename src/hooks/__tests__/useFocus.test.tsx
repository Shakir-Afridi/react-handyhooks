import { renderHook, act } from "@testing-library/react";
import { useFocus } from "../ui/useFocus";

describe("useFocus hook", () => {
    it("should initialize with correct ref and isFocused false", () => {
        const { result } = renderHook(() => useFocus<HTMLInputElement>());
        expect(result.current.ref.current).toBeNull();
        expect(result.current.isFocused).toBe(false);
        expect(typeof result.current.focus).toBe("function");
        expect(typeof result.current.blur).toBe("function");
    });

    it("should focus the element when focus is called", () => {
        const { result } = renderHook(() => useFocus<HTMLInputElement>());
        const input = document.createElement("input");
        document.body.appendChild(input);

        // Attach ref manually
        result.current.ref.current = input;

        act(() => {
            result.current.focus();
        });

        expect(document.activeElement).toBe(input);
        expect(result.current.isFocused).toBe(false);
    });

    it("should blur the element when blur is called", () => {
        const { result } = renderHook(() => useFocus<HTMLInputElement>());
        const input = document.createElement("input");
        document.body.appendChild(input);

        // Attach ref manually and focus first
        result.current.ref.current = input;

        act(() => {
            result.current.focus();
        });
        expect(document.activeElement).toBe(input);

        act(() => {
            result.current.blur();
        });

        expect(document.activeElement).not.toBe(input);
        expect(result.current.isFocused).toBe(false);
    });

    it("should do nothing if ref is null", () => {
        const { result } = renderHook(() => useFocus<HTMLInputElement>());

        act(() => {
            result.current.focus();
            result.current.blur();
        });

        expect(result.current.isFocused).toBe(false);
        expect(result.current.ref.current).toBeNull();
    });

    it("should correctly toggle focus state", () => {
        const { result } = renderHook(() => useFocus<HTMLInputElement>());
        const input = document.createElement("input");
        document.body.appendChild(input);
        result.current.ref.current = input;

        act(() => result.current.focus());
        expect(result.current.isFocused).toBe(false);

        act(() => result.current.blur());
        expect(result.current.isFocused).toBe(false);
    });
});
