import { renderHook, act } from "@testing-library/react";
import { useMap } from "../state/useMap";

describe("useMap hook", () => {
    const initialEntries: [string, number][] = [
        ["a", 1],
        ["b", 2],
    ];

    it("should initialize with empty map if no initial entries provided", () => {
        const { result } = renderHook(() => useMap<string, number>());

        expect(result.current.map.size).toBe(0);
    });

    it("should initialize with given initial entries", () => {
        const { result } = renderHook(() => useMap(initialEntries));

        expect(result.current.map.size).toBe(2);
        expect(result.current.map.get("a")).toBe(1);
        expect(result.current.map.get("b")).toBe(2);
    });

    it("should set a new key-value pair", () => {
        const { result } = renderHook(() => useMap(initialEntries));

        act(() => {
            result.current.set("c", 3);
        });

        expect(result.current.map.get("c")).toBe(3);
        expect(result.current.map.size).toBe(3);
    });

    it("should remove a key", () => {
        const { result } = renderHook(() => useMap(initialEntries));

        act(() => {
            result.current.remove("a");
        });

        expect(result.current.map.has("a")).toBe(false);
        expect(result.current.map.size).toBe(1);
    });

    it("should return value for get()", () => {
        const { result } = renderHook(() => useMap(initialEntries));

        expect(result.current.get("a")).toBe(1);
        expect(result.current.get("nonexistent")).toBeUndefined();
    });

    it("should return boolean for has()", () => {
        const { result } = renderHook(() => useMap(initialEntries));

        expect(result.current.has("a")).toBe(true);
        expect(result.current.has("nonexistent")).toBe(false);
    });

    it("should clear all entries", () => {
        const { result } = renderHook(() => useMap(initialEntries));

        act(() => {
            result.current.clear();
        });

        expect(result.current.map.size).toBe(0);
    });

    it("should reset to initial entries", () => {
        const { result } = renderHook(() => useMap(initialEntries));

        act(() => {
            result.current.set("c", 3);
            result.current.remove("a");
        });

        expect(result.current.map.has("a")).toBe(false);
        expect(result.current.map.has("c")).toBe(true);

        act(() => {
            result.current.reset();
        });

        expect(result.current.map.size).toBe(2);
        expect(result.current.map.get("a")).toBe(1);
        expect(result.current.map.has("c")).toBe(false);
    });
});
