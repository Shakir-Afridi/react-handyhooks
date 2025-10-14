import React from "react";
import { render, act } from "@testing-library/react";
import useArray from "../useArray";

// Helper component to test the hook
function TestComponent({
    initialValue,
    onRender,
}: {
    initialValue?: number[];
    onRender: (hook: ReturnType<typeof useArray<number>>) => void;
}) {
    const hook = useArray<number>(initialValue ?? []);
    onRender(hook);
    return null;
}

describe("useArray hook", () => {
    it("should initialize with default empty array", () => {
        let hook: ReturnType<typeof useArray<number>> | null = null;
        render(<TestComponent onRender={(h) => (hook = h)} />);
        expect(hook!.array).toEqual([]);
        expect(hook!.isEmpty).toBe(true);
    });

    it("should initialize with given array", () => {
        let hook: ReturnType<typeof useArray<number>> | null = null;
        render(
            <TestComponent
                initialValue={[1, 2, 3]}
                onRender={(h) => (hook = h)}
            />
        );
        expect(hook!.array).toEqual([1, 2, 3]);
        expect(hook!.isEmpty).toBe(false);
    });

    it("should push elements correctly", () => {
        let hook: ReturnType<typeof useArray<number>> | null = null;
        render(<TestComponent onRender={(h) => (hook = h)} />);

        act(() => {
            hook!.push(1);
            hook!.push(2);
        });

        expect(hook!.array).toEqual([1, 2]);
        expect(hook!.isEmpty).toBe(false);
    });

    it("should remove elements by index", () => {
        let hook: ReturnType<typeof useArray<number>> | null = null;
        render(
            <TestComponent
                initialValue={[1, 2, 3]}
                onRender={(h) => (hook = h)}
            />
        );

        act(() => {
            hook!.remove(1); // remove index 1
        });

        expect(hook!.array).toEqual([1, 3]);
    });

    it("should update elements at a specific index", () => {
        let hook: ReturnType<typeof useArray<number>> | null = null;
        render(
            <TestComponent
                initialValue={[1, 2, 3]}
                onRender={(h) => (hook = h)}
            />
        );

        act(() => {
            hook!.update(0, 10);
        });

        expect(hook!.array).toEqual([10, 2, 3]);
    });

    it("should insert elements at a specific index", () => {
        let hook: ReturnType<typeof useArray<number>> | null = null;
        render(
            <TestComponent
                initialValue={[1, 2, 3]}
                onRender={(h) => (hook = h)}
            />
        );

        act(() => {
            hook!.insert(1, 5); // insert 5 at index 1
        });

        expect(hook!.array).toEqual([1, 5, 2, 3]);
    });

    it("should replace the entire array using set", () => {
        let hook: ReturnType<typeof useArray<number>> | null = null;
        render(
            <TestComponent
                initialValue={[1, 2, 3]}
                onRender={(h) => (hook = h)}
            />
        );

        act(() => {
            hook!.set([7, 8]);
        });

        expect(hook!.array).toEqual([7, 8]);
    });

    it("should clear the array", () => {
        let hook: ReturnType<typeof useArray<number>> | null = null;
        render(
            <TestComponent
                initialValue={[1, 2, 3]}
                onRender={(h) => (hook = h)}
            />
        );

        act(() => {
            hook!.clear();
        });

        expect(hook!.array).toEqual([]);
        expect(hook!.isEmpty).toBe(true);
    });
});
