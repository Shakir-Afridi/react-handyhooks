import { renderHook, act } from "@testing-library/react";
import { useDeviceOrientation } from "../ui/useDeviceOrientation";

describe("useDeviceOrientation hook", () => {
    let listeners: Record<string, ((e: any) => void)[]> = {};

    beforeEach(() => {
        listeners = {};
        // Mock addEventListener to capture listeners
        jest.spyOn(window, "addEventListener").mockImplementation(
            (event, cb) => {
                if (!listeners[event]) listeners[event] = [];
                listeners[event].push(cb as (e: any) => void);
            }
        );
        jest.spyOn(window, "removeEventListener").mockImplementation(
            (event, cb) => {
                if (!listeners[event]) return;
                listeners[event] = listeners[event].filter((fn) => fn !== cb);
            }
        );
        // Ensure DeviceOrientationEvent exists
        (window as any).DeviceOrientationEvent = function () {} as any;
    });

    it("should initialize with null values", () => {
        const { result } = renderHook(() => useDeviceOrientation());
        expect(result.current).toEqual({
            alpha: null,
            beta: null,
            gamma: null,
            absolute: null,
        });
    });

    it("should update orientation when deviceorientation event is fired", () => {
        const { result } = renderHook(() => useDeviceOrientation());

        // Mock a DeviceOrientationEvent
        const deviceOrientationEvent = {
            alpha: 30,
            beta: 45,
            gamma: 60,
            absolute: true,
        } as unknown as DeviceOrientationEvent;

        // Trigger the actual event listener manually
        const listeners: ((e: DeviceOrientationEvent) => void)[] = [];
        const addSpy = jest
            .spyOn(window, "addEventListener")
            .mockImplementation(
                (event, cb: EventListenerOrEventListenerObject) => {
                    if (event === "deviceorientation")
                        listeners.push(cb as any);
                }
            );

        // Re-render the hook so it registers our spy
        const { result: newResult } = renderHook(() => useDeviceOrientation());

        act(() => {
            listeners.forEach((listener) => listener(deviceOrientationEvent));
        });

        expect(newResult.current).toEqual({
            alpha: 30,
            beta: 45,
            gamma: 60,
            absolute: true,
        });

        addSpy.mockRestore();
    });

    it("should fallback to null if event properties are undefined", () => {
        const { result } = renderHook(() => useDeviceOrientation());

        const event = new Event("deviceorientation") as DeviceOrientationEvent;
        Object.defineProperties(event, {
            alpha: { value: undefined },
            beta: { value: undefined },
            gamma: { value: undefined },
            absolute: { value: undefined },
        });

        act(() => {
            window.dispatchEvent(event);
        });

        expect(result.current).toEqual({
            alpha: null,
            beta: null,
            gamma: null,
            absolute: null,
        });
    });

    it("should warn if DeviceOrientationEvent is not supported", () => {
        const original = window.DeviceOrientationEvent;
        // @ts-ignore
        delete window.DeviceOrientationEvent;

        const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

        renderHook(() => useDeviceOrientation());

        expect(consoleSpy).toHaveBeenCalledWith(
            "DeviceOrientationEvent is not supported by this browser."
        );

        // Restore
        window.DeviceOrientationEvent = original;
        consoleSpy.mockRestore();
    });

    it("should remove event listener on unmount", () => {
        const addSpy = jest.spyOn(window, "addEventListener");
        const removeSpy = jest.spyOn(window, "removeEventListener");

        const { unmount } = renderHook(() => useDeviceOrientation());

        expect(addSpy).toHaveBeenCalledWith(
            "deviceorientation",
            expect.any(Function)
        );

        unmount();

        expect(removeSpy).toHaveBeenCalledWith(
            "deviceorientation",
            expect.any(Function)
        );

        addSpy.mockRestore();
        removeSpy.mockRestore();
    });
});
