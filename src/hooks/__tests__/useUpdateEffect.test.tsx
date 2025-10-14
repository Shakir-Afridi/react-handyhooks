import { renderHook, act } from "@testing-library/react";
import { useUpdateEffect } from "../useUpdateEffect";

describe("useUpdateEffect", () => {
    it("should not call the effect on the first render", () => {
        const effect = jest.fn();

        renderHook(() => useUpdateEffect(effect, []));

        expect(effect).not.toHaveBeenCalled();
    });

    it("should call the effect on dependency update", () => {
        const effect = jest.fn();
        let dep = 0;

        const { rerender } = renderHook(() => useUpdateEffect(effect, [dep]));

        // First render: effect should not be called
        expect(effect).not.toHaveBeenCalled();

        // Update dependency
        dep = 1;
        rerender();

        expect(effect).toHaveBeenCalledTimes(1);

        // Update dependency again
        dep = 2;
        rerender();

        expect(effect).toHaveBeenCalledTimes(2);
    });

    it("should call the effect with cleanup function", () => {
        const cleanup = jest.fn();
        const effect = jest.fn(() => cleanup);
        let dep = 0;

        const { rerender, unmount } = renderHook(() =>
            useUpdateEffect(effect, [dep])
        );

        // First render: effect should not be called
        expect(effect).not.toHaveBeenCalled();
        expect(cleanup).not.toHaveBeenCalled();

        // Update dependency
        dep = 1;
        rerender();

        expect(effect).toHaveBeenCalledTimes(1);
        expect(cleanup).not.toHaveBeenCalled();

        // Update dependency again triggers cleanup
        dep = 2;
        rerender();

        expect(effect).toHaveBeenCalledTimes(2);
        expect(cleanup).toHaveBeenCalledTimes(1);

        // Unmount triggers cleanup of last effect
        unmount();
        expect(cleanup).toHaveBeenCalledTimes(2);
    });

    it("should work without dependencies (runs on every update except first render)", () => {
        const effect = jest.fn();

        const { rerender } = renderHook(() => useUpdateEffect(effect));

        // First render: not called
        expect(effect).not.toHaveBeenCalled();

        // Rerender triggers effect
        rerender();
        expect(effect).toHaveBeenCalledTimes(1);

        rerender();
        expect(effect).toHaveBeenCalledTimes(2);
    });
});
