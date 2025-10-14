import { renderHook, act } from "@testing-library/react";
import { useInput } from "../useInput";

describe("useInput hook", () => {
    it("should initialize with empty string if no initialValue is provided", () => {
        const { result } = renderHook(() => useInput());
        expect(result.current.value).toBe("");
        expect(result.current.error).toBeUndefined();
    });

    it("should initialize with provided initialValue", () => {
        const { result } = renderHook(() => useInput("hello"));
        expect(result.current.value).toBe("hello");
        expect(result.current.error).toBeUndefined();
    });

    it("should update value on onChange", () => {
        const { result } = renderHook(() => useInput(""));

        act(() => {
            result.current.onChange({ target: { value: "new value" } } as any);
        });

        expect(result.current.value).toBe("new value");
        expect(result.current.error).toBeUndefined();
    });

    it("should validate value if validate function is provided", () => {
        const validate = (val: string) =>
            val.length < 5 ? "Too short" : undefined;
        const { result } = renderHook(() => useInput("", validate));

        act(() => {
            result.current.onChange({ target: { value: "abc" } } as any);
        });
        expect(result.current.value).toBe("abc");
        expect(result.current.error).toBe("Too short");

        act(() => {
            result.current.onChange({ target: { value: "abcdef" } } as any);
        });
        expect(result.current.value).toBe("abcdef");
        expect(result.current.error).toBeUndefined();
    });

    it("should reset value and error when reset is called", () => {
        const validate = (val: string) => (!val ? "Required" : undefined);
        const { result } = renderHook(() => useInput("initial", validate));

        act(() => {
            result.current.onChange({ target: { value: "" } } as any);
        });
        expect(result.current.value).toBe("");
        expect(result.current.error).toBe("Required");

        act(() => {
            result.current.reset();
        });
        expect(result.current.value).toBe("initial");
        expect(result.current.error).toBeUndefined();
    });

    it("should allow manually setting value using setValue", () => {
        const { result } = renderHook(() => useInput("start"));

        act(() => {
            result.current.setValue("manual");
        });

        expect(result.current.value).toBe("manual");
    });
});
