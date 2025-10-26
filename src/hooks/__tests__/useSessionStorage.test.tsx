import { renderHook, act } from "@testing-library/react";
import { useSessionStorage } from "../storage/useSessionStorage";

describe("useSessionStorage hook", () => {
    const key = "testKey";
    const initialValue = "initial";

    beforeEach(() => {
        sessionStorage.clear();
        jest.clearAllMocks();
    });

    it("should initialize with the initial value if sessionStorage is empty", () => {
        const { result } = renderHook(() =>
            useSessionStorage(key, initialValue)
        );
        const [value] = result.current;

        expect(value).toBe(initialValue);
    });

    it("should initialize with the value from sessionStorage if it exists", () => {
        sessionStorage.setItem(key, JSON.stringify("storedValue"));
        const { result } = renderHook(() =>
            useSessionStorage(key, initialValue)
        );
        const [value] = result.current;

        expect(value).toBe("storedValue");
    });

    it("should update the state and sessionStorage when setValue is called with a value", () => {
        const { result } = renderHook(() =>
            useSessionStorage(key, initialValue)
        );
        const [, setValue] = result.current;

        act(() => {
            setValue("newValue");
        });

        const [updatedValue] = result.current;
        expect(updatedValue).toBe("newValue");
        expect(sessionStorage.getItem(key)).toBe(JSON.stringify("newValue"));
    });

    it("should update the state and sessionStorage when setValue is called with a function", () => {
        const { result } = renderHook(() => useSessionStorage(key, 5));
        const [, setValue] = result.current;

        act(() => {
            setValue((prev) => prev + 1);
        });

        const [updatedValue] = result.current;
        expect(updatedValue).toBe(6);
        expect(sessionStorage.getItem(key)).toBe(JSON.stringify(6));
    });

    it("should respond to sessionStorage changes from other tabs/windows", () => {
        const { result } = renderHook(() =>
            useSessionStorage(key, initialValue)
        );
        const [initial] = result.current;
        expect(initial).toBe(initialValue);

        act(() => {
            const event = new StorageEvent("storage", {
                key,
                newValue: JSON.stringify("updatedElsewhere"),
                storageArea: sessionStorage,
            });
            window.dispatchEvent(event);
        });

        const [updatedValue] = result.current;
        expect(updatedValue).toBe("updatedElsewhere");
    });

    it("should handle removing the key from sessionStorage externally", () => {
        const { result } = renderHook(() =>
            useSessionStorage(key, initialValue)
        );
        const [, setValue] = result.current;

        act(() => setValue("tempValue"));
        expect(result.current[0]).toBe("tempValue");

        act(() => {
            const event = new StorageEvent("storage", {
                key,
                newValue: null,
                storageArea: sessionStorage,
            });
            window.dispatchEvent(event);
        });

        expect(result.current[0]).toBe(initialValue);
    });
});
