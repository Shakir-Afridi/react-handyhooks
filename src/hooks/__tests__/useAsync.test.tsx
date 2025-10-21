import React, { useEffect } from "react";
import { render, act } from "@testing-library/react";
import useAsync, { UseAsyncReturn } from "../effects/useAsync";

// Helper component to test the hook
function TestComponent({
    asyncFunction,
    immediate = false,
    onRender,
}: {
    asyncFunction: (...args: any[]) => Promise<any>;
    immediate?: boolean;
    onRender: (hook: UseAsyncReturn<any, any>) => void;
}) {
    const hook = useAsync<any, any>(asyncFunction, immediate);
    onRender(hook);
    return null;
}

describe("useAsync hook", () => {
    it("should execute async function and set data", async () => {
        const mockAsync = jest.fn(async () => "result");
        let hook: UseAsyncReturn<string> | null = null;

        render(
            <TestComponent
                asyncFunction={mockAsync}
                onRender={(h) => (hook = h)}
            />
        );

        await act(async () => {
            const result = await hook!.execute();
            expect(result).toBe("result");
        });

        expect(hook!.data).toBe("result");
        expect(hook!.error).toBeNull();
        expect(hook!.isLoading).toBe(false);
        expect(mockAsync).toHaveBeenCalledTimes(1);
    });

    it("should handle async function errors", async () => {
        const mockError = new Error("fail");
        const mockAsync = jest.fn(async () => {
            throw mockError;
        });

        let hook: UseAsyncReturn<string> | null = null;
        render(
            <TestComponent
                asyncFunction={mockAsync}
                onRender={(h) => (hook = h)}
            />
        );

        await act(async () => {
            const result = await hook!.execute();
            expect(result).toBeUndefined();
        });

        expect(hook!.data).toBeNull();
        expect(hook!.error).toBe(mockError);
        expect(hook!.isLoading).toBe(false);
    });

    it("should update isLoading during execution", async () => {
        let resolvePromise: (value: string) => void;
        const promise = new Promise<string>(
            (resolve) => (resolvePromise = resolve)
        );
        const mockAsync = jest.fn(() => promise);

        let hook: UseAsyncReturn<string> | null = null;
        render(
            <TestComponent
                asyncFunction={mockAsync}
                onRender={(h) => (hook = h)}
            />
        );

        act(() => {
            hook!.execute();
        });

        expect(hook!.isLoading).toBe(true);

        await act(async () => {
            resolvePromise!("done");
        });

        expect(hook!.isLoading).toBe(false);
        expect(hook!.data).toBe("done");
    });

    it("should reset data and error", async () => {
        const mockAsync = jest.fn(async () => "result");
        let hook: UseAsyncReturn<string> | null = null;

        render(
            <TestComponent
                asyncFunction={mockAsync}
                onRender={(h) => (hook = h)}
            />
        );

        await act(async () => {
            await hook!.execute();
        });

        expect(hook!.data).toBe("result");

        act(() => {
            hook!.reset();
        });

        expect(hook!.data).toBeNull();
        expect(hook!.error).toBeNull();
    });

    it("should execute immediately if immediate=true", async () => {
        const mockAsync = jest.fn(async () => "auto");
        let hook: UseAsyncReturn<string> | null = null;

        await act(async () => {
            render(
                <TestComponent
                    asyncFunction={mockAsync}
                    immediate={true}
                    onRender={(h) => (hook = h)}
                />
            );
        });

        expect(mockAsync).toHaveBeenCalledTimes(1);
        expect(hook!.data).toBe("auto");
    });
});
