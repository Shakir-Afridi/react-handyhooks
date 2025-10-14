import React from "react";
import { render, act } from "@testing-library/react";
import { useCounter, UseCounterReturn } from "../useCounter";

describe("useCounter hook", () => {
    it("should initialize with default value", () => {
        let hook: UseCounterReturn | null = null;

        render(<TestComponent onRender={(h) => (hook = h)} />);

        expect(hook!.count).toBe(0);
    });

    it("should increment and decrement correctly", () => {
        let hook: UseCounterReturn | null = null;

        render(<TestComponent initialValue={5} onRender={(h) => (hook = h)} />);

        act(() => {
            hook!.increment();
        });
        expect(hook!.count).toBe(6);

        act(() => {
            hook!.decrement();
        });
        expect(hook!.count).toBe(5);
    });

    it("should respect step value", () => {
        let hook: UseCounterReturn | null = null;

        render(
            <TestComponent
                initialValue={0}
                step={2}
                onRender={(h) => (hook = h)}
            />
        );

        act(() => {
            hook!.increment();
        });
        expect(hook!.count).toBe(2);

        act(() => {
            hook!.decrement();
        });
        expect(hook!.count).toBe(0);
    });

    it("should respect min and max boundaries", () => {
        let hook: UseCounterReturn | null = null;

        render(
            <TestComponent
                initialValue={5}
                min={3}
                max={7}
                onRender={(h) => (hook = h)}
            />
        );

        act(() => {
            hook!.increment();
            hook!.increment();
            hook!.increment();
        });
        expect(hook!.count).toBe(7);

        act(() => {
            hook!.decrement();
            hook!.decrement();
            hook!.decrement();
            hook!.decrement();
        });
        expect(hook!.count).toBe(3);
    });

    it("should reset to initial value", () => {
        let hook: UseCounterReturn | null = null;

        render(
            <TestComponent initialValue={10} onRender={(h) => (hook = h)} />
        );

        act(() => {
            hook!.increment();
        });
        expect(hook!.count).toBe(11);

        act(() => {
            hook!.reset();
        });
        expect(hook!.count).toBe(10);
    });

    it("should manually set value", () => {
        let hook: UseCounterReturn | null = null;

        render(<TestComponent onRender={(h) => (hook = h)} />);

        act(() => {
            hook!.set(42);
        });
        expect(hook!.count).toBe(42);
    });
});

// Helper component to test the hook
function TestComponent({
    initialValue = 0,
    min,
    max,
    step,
    onRender,
}: {
    initialValue?: number;
    min?: number;
    max?: number;
    step?: number;
    onRender: (hook: UseCounterReturn) => void;
}) {
    const hook = useCounter(initialValue, { min, max, step });
    onRender(hook);
    return null;
}
