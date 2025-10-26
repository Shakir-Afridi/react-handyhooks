import { renderHook, act } from "@testing-library/react";
import { useInterval } from "../effects/useInterval";

jest.useFakeTimers();

describe("useInterval hook", () => {
    afterEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    it("should call callback at specified interval", () => {
        const callback = jest.fn();
        renderHook(() => useInterval(callback, 1000));

        expect(callback).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(callback).toHaveBeenCalledTimes(1);

        act(() => {
            jest.advanceTimersByTime(3000);
        });
        expect(callback).toHaveBeenCalledTimes(4);
    });

    it("should not call callback if delay is null", () => {
        const callback = jest.fn();
        renderHook(() => useInterval(callback, null));

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        expect(callback).not.toHaveBeenCalled();
    });

    it("should use latest callback after it changes", () => {
        const firstCallback = jest.fn();
        const { rerender } = renderHook(
            ({ cb, delay }) => useInterval(cb, delay),
            { initialProps: { cb: firstCallback, delay: 1000 } }
        );

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(firstCallback).toHaveBeenCalledTimes(1);

        const secondCallback = jest.fn();
        rerender({ cb: secondCallback, delay: 1000 });

        act(() => {
            jest.advanceTimersByTime(2000);
        });
        expect(firstCallback).toHaveBeenCalledTimes(1);
        expect(secondCallback).toHaveBeenCalledTimes(2);
    });

    it("should clear interval on unmount", () => {
        const callback = jest.fn();
        const { unmount } = renderHook(() => useInterval(callback, 1000));

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(callback).toHaveBeenCalledTimes(1);

        unmount();

        act(() => {
            jest.advanceTimersByTime(3000);
        });
        expect(callback).toHaveBeenCalledTimes(1); // no further calls
    });

    it("should update interval if delay changes", () => {
        const callback = jest.fn();
        const { rerender } = renderHook(
            ({ delay }) => useInterval(callback, delay),
            { initialProps: { delay: 1000 } }
        );

        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(callback).toHaveBeenCalledTimes(1);

        // Change delay
        rerender({ delay: 2000 });

        act(() => {
            jest.advanceTimersByTime(2000);
        });
        expect(callback).toHaveBeenCalledTimes(2);
    });
});
