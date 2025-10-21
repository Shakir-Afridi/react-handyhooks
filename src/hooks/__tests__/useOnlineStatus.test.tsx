import { renderHook, act } from "@testing-library/react";
import { useOnlineStatus } from "../browser/useOnlineStatus";

describe("useOnlineStatus hook", () => {
    let onlineListeners: (() => void)[] = [];
    let offlineListeners: (() => void)[] = [];

    beforeEach(() => {
        onlineListeners = [];
        offlineListeners = [];

        // Mock addEventListener
        jest.spyOn(window, "addEventListener").mockImplementation(
            (event, cb) => {
                if (event === "online") onlineListeners.push(cb as () => void);
                if (event === "offline")
                    offlineListeners.push(cb as () => void);
                return window;
            }
        );

        // Mock removeEventListener
        jest.spyOn(window, "removeEventListener").mockImplementation(
            (event, cb) => {
                if (event === "online")
                    onlineListeners = onlineListeners.filter((fn) => fn !== cb);
                if (event === "offline")
                    offlineListeners = offlineListeners.filter(
                        (fn) => fn !== cb
                    );
                return window;
            }
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should initialize with navigator.onLine status", () => {
        Object.defineProperty(navigator, "onLine", {
            value: true,
            configurable: true,
        });

        const { result } = renderHook(() => useOnlineStatus());
        expect(result.current).toBe(true);
    });

    it("should update to offline when offline event is fired", () => {
        Object.defineProperty(navigator, "onLine", {
            value: true,
            configurable: true,
        });

        const { result } = renderHook(() => useOnlineStatus());
        expect(result.current).toBe(true);

        act(() => {
            offlineListeners.forEach((fn) => fn());
        });

        expect(result.current).toBe(false);
    });

    it("should update to online when online event is fired", () => {
        Object.defineProperty(navigator, "onLine", {
            value: false,
            configurable: true,
        });

        const { result } = renderHook(() => useOnlineStatus());
        expect(result.current).toBe(false);

        act(() => {
            onlineListeners.forEach((fn) => fn());
        });

        expect(result.current).toBe(true);
    });

    it("should cleanup event listeners on unmount", () => {
        const removeOnlineSpy = jest.spyOn(window, "removeEventListener");
        const { unmount } = renderHook(() => useOnlineStatus());

        unmount();

        expect(removeOnlineSpy).toHaveBeenCalledWith(
            "online",
            expect.any(Function)
        );
        expect(removeOnlineSpy).toHaveBeenCalledWith(
            "offline",
            expect.any(Function)
        );
    });
});
