import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../storage/useLocalStorage";

describe("useLocalStorage hook", () => {
    const key = "testKey";
    const initialValue = { name: "John" };

    beforeEach(() => {
        window.localStorage.clear();
        jest.clearAllMocks();
    });

    it("should initialize with initial value if localStorage is empty", () => {
        const { result } = renderHook(() => useLocalStorage(key, initialValue));
        const [storedValue] = result.current;

        expect(storedValue).toEqual(initialValue);
    });

    it("should initialize with value from localStorage if present", () => {
        window.localStorage.setItem(key, JSON.stringify({ name: "Jane" }));

        const { result } = renderHook(() => useLocalStorage(key, initialValue));
        const [storedValue] = result.current;

        expect(storedValue).toEqual({ name: "Jane" });
    });

    it("should update value and localStorage when setValue is called", () => {
        const { result } = renderHook(() => useLocalStorage(key, initialValue));
        const [, setValue] = result.current;

        act(() => {
            setValue({ name: "Alice" });
        });

        const [updatedValue] = result.current;
        expect(updatedValue).toEqual({ name: "Alice" });
        expect(JSON.parse(window.localStorage.getItem(key)!)).toEqual({
            name: "Alice",
        });
    });

    it("should update value when setValue is called with a function", () => {
        const { result } = renderHook(() => useLocalStorage(key, { count: 0 }));
        const [, setValue] = result.current;

        act(() => {
            setValue((prev) => ({ count: prev.count + 1 }));
        });

        const [updatedValue] = result.current;
        expect(updatedValue).toEqual({ count: 1 });
        expect(JSON.parse(window.localStorage.getItem(key)!)).toEqual({
            count: 1,
        });
    });

    it("should remove value and reset to initialValue when removeValue is called", () => {
        const { result } = renderHook(() => useLocalStorage(key, initialValue));
        const [, , removeValue] = result.current;

        act(() => {
            removeValue();
        });

        const [storedValue] = result.current;
        expect(storedValue).toEqual(initialValue);
        expect(window.localStorage.getItem(key)).toBeNull();
    });

    it("should update state when localStorage changes from another tab", () => {
        const { result } = renderHook(() => useLocalStorage(key, initialValue));

        act(() => {
            window.dispatchEvent(
                new StorageEvent("storage", {
                    key,
                    newValue: JSON.stringify({ name: "Bob" }),
                })
            );
        });

        const [storedValue] = result.current;
        expect(storedValue).toEqual({ name: "Bob" });
    });

    it("should handle localStorage read errors gracefully", () => {
        jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
            throw new Error("Failed to read");
        });

        const { result } = renderHook(() => useLocalStorage(key, initialValue));
        const [storedValue] = result.current;

        expect(storedValue).toEqual(initialValue);
    });

    it("should handle localStorage write errors gracefully", () => {
        jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
            throw new Error("Failed to write");
        });

        const { result } = renderHook(() => useLocalStorage(key, initialValue));
        const [, setValue] = result.current;

        act(() => {
            setValue({ name: "Alice" });
        });

        const [storedValue] = result.current;
        expect(storedValue).toEqual({ name: "Alice" });
    });
});
