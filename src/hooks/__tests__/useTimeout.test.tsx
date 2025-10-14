import { renderHook, act } from "@testing-library/react";
import { useTimeout } from "../useTimeout";

describe("useTimeout hook", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should call the callback after the delay", () => {
        const callback = jest.fn();
        renderHook(() => useTimeout(callback, 1000));

        expect(callback).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should not call the callback if cleared before delay", () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useTimeout(callback, 1000));

        act(() => {
            result.current.clear();
            jest.advanceTimersByTime(1000);
        });

        expect(callback).not.toHaveBeenCalled();
    });

    it("should restart the timeout when reset is called", () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useTimeout(callback, 1000));

        act(() => {
            jest.advanceTimersByTime(500); // half delay
            result.current.reset(); // restart
            jest.advanceTimersByTime(500); // old remaining time
        });

        expect(callback).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(1000); // new full delay
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should do nothing if delay is null", () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useTimeout(callback, null));

        act(() => {
            jest.advanceTimersByTime(1000);
            result.current.reset();
            jest.advanceTimersByTime(1000);
        });

        expect(callback).not.toHaveBeenCalled();
    });
});
