import { renderHook, act } from "@testing-library/react";
import { useMediaQuery } from "../ui/useMediaQuery";

describe("useMediaQuery hook", () => {
    const query = "(max-width: 768px)";
    let listeners: Record<string, (event: MediaQueryListEvent) => void> = {};

    beforeEach(() => {
        listeners = {};

        // Mock matchMedia
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation((query) => {
                return {
                    matches: false,
                    media: query,
                    addEventListener: (event: string, cb: (e: any) => void) => {
                        listeners[event] = cb;
                    },
                    removeEventListener: jest.fn(),
                    dispatchEvent: jest.fn(),
                };
            }),
        });
    });

    it("should initialize with the current match value", () => {
        // Mock matches as true
        window.matchMedia = jest.fn().mockReturnValue({
            matches: true,
            media: query,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        const { result } = renderHook(() => useMediaQuery(query));
        expect(result.current).toBe(true);
    });

    it("should update matches when media query changes", () => {
        const { result } = renderHook(() => useMediaQuery(query));

        // Initially false
        expect(result.current).toBe(false);

        // Simulate media query change
        act(() => {
            listeners["change"]({ matches: true } as MediaQueryListEvent);
        });

        expect(result.current).toBe(true);

        // Simulate another change
        act(() => {
            listeners["change"]({ matches: false } as MediaQueryListEvent);
        });

        expect(result.current).toBe(false);
    });

    it("should cleanup event listener on unmount", () => {
        const removeEventListenerMock = jest.fn();

        window.matchMedia = jest.fn().mockReturnValue({
            matches: false,
            media: query,
            addEventListener: jest.fn(),
            removeEventListener: removeEventListenerMock,
        });

        const { unmount } = renderHook(() => useMediaQuery(query));
        unmount();

        expect(removeEventListenerMock).toHaveBeenCalledTimes(1);
    });

    it("should handle SSR (window undefined) safely", () => {
        const originalWindow = global.window;
        // @ts-ignore
        delete global.window;

        const { result } = renderHook(() => useMediaQuery(query));
        expect(result.current).toBe(false);

        // Restore window
        global.window = originalWindow;
    });
});
