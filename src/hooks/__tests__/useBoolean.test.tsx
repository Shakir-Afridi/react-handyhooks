import React from "react";
import { render, act } from "@testing-library/react";
import { useBoolean } from "../state/useBoolean";

// Helper component to test the hook
function TestComponent({
    initialValue,
    onRender,
}: {
    initialValue?: boolean;
    onRender: (hook: ReturnType<typeof useBoolean>) => void;
}) {
    const hook = useBoolean(initialValue);
    onRender(hook);
    return null;
}

describe("useBoolean hook", () => {
    it("should initialize with default value (false)", () => {
        let hook: ReturnType<typeof useBoolean> | null = null;
        render(<TestComponent onRender={(h) => (hook = h)} />);
        expect(hook!.value).toBe(false);
    });

    it("should initialize with given value", () => {
        let hook: ReturnType<typeof useBoolean> | null = null;
        render(
            <TestComponent initialValue={true} onRender={(h) => (hook = h)} />
        );
        expect(hook!.value).toBe(true);
    });

    it("should set value to true when setTrue is called", () => {
        let hook: ReturnType<typeof useBoolean> | null = null;
        render(
            <TestComponent initialValue={false} onRender={(h) => (hook = h)} />
        );

        act(() => {
            hook!.setTrue();
        });

        expect(hook!.value).toBe(true);
    });

    it("should set value to false when setFalse is called", () => {
        let hook: ReturnType<typeof useBoolean> | null = null;
        render(
            <TestComponent initialValue={true} onRender={(h) => (hook = h)} />
        );

        act(() => {
            hook!.setFalse();
        });

        expect(hook!.value).toBe(false);
    });

    it("should toggle the value when toggle is called", () => {
        let hook: ReturnType<typeof useBoolean> | null = null;
        render(
            <TestComponent initialValue={false} onRender={(h) => (hook = h)} />
        );

        act(() => {
            hook!.toggle();
        });
        expect(hook!.value).toBe(true);

        act(() => {
            hook!.toggle();
        });
        expect(hook!.value).toBe(false);
    });
});
