import { renderHook, act } from "@testing-library/react";
import { useWindowSize } from "../browser/useWindowSize";

describe("useWindowSize", () => {
    const originalInnerWidth = global.innerWidth;
    const originalInnerHeight = global.innerHeight;

    beforeEach(() => {
        // Set default window size
        global.innerWidth = 1024;
        global.innerHeight = 768;
    });

    afterEach(() => {
        // Reset window size
        global.innerWidth = originalInnerWidth;
        global.innerHeight = originalInnerHeight;
    });

    it("should return initial window size", () => {
        // Mock React to avoid errors during SSR
        jest.mock("react", () => ({
            ...jest.requireActual("react"),
            useState: jest.fn(() => [0, jest.fn()]),
            useEffect: jest.fn(),
        }));

        const { result } = renderHook(() => useWindowSize());

        // Restore original React after the test
        jest.unmock("react");
        expect(result.current.width).toBe(global.innerWidth);
        expect(result.current.height).toBe(global.innerHeight);
    });

    it("should update size on window resize", () => {
        const { result } = renderHook(() => useWindowSize());

        act(() => {
            global.innerWidth = 800;
            global.innerHeight = 600;
            global.dispatchEvent(new Event("resize"));
        });

        expect(result.current.width).toBe(800);
        expect(result.current.height).toBe(600);

        act(() => {
            global.innerWidth = 1920;
            global.innerHeight = 1080;
            global.dispatchEvent(new Event("resize"));
        });

        expect(result.current.width).toBe(1920);
        expect(result.current.height).toBe(1080);
    });

    it("should clean up the resize listener on unmount", () => {
        const removeEventListenerSpy = jest.spyOn(
            window,
            "removeEventListener"
        );
        const { unmount } = renderHook(() => useWindowSize());

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "resize",
            expect.any(Function)
        );
    });

    it("should be SSR safe (window values undefined)", () => {
        const originalInnerWidth = window.innerWidth;
        const originalInnerHeight = window.innerHeight;

        // Mock window dimensions to undefined
        Object.defineProperty(window, "innerWidth", {
            configurable: true,
            value: undefined,
        });
        Object.defineProperty(window, "innerHeight", {
            configurable: true,
            value: undefined,
        });

        const { result } = renderHook(() => useWindowSize());

        expect(result.current.width).toBe(undefined);
        expect(result.current.height).toBe(undefined);

        // Restore original window dimensions
        Object.defineProperty(window, "innerWidth", {
            configurable: true,
            value: originalInnerWidth,
        });
        Object.defineProperty(window, "innerHeight", {
            configurable: true,
            value: originalInnerHeight,
        });
    });
});
