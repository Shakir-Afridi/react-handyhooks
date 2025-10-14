import { renderHook, act } from "@testing-library/react";
import { useEventListener } from "../useEventListener";

describe("useEventListener hook", () => {
    let addEventListenerSpy: jest.SpyInstance;
    let removeEventListenerSpy: jest.SpyInstance;

    beforeEach(() => {
        addEventListenerSpy = jest.spyOn(window, "addEventListener");
        removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should attach and call a window event listener", () => {
        const handler = jest.fn();
        renderHook(() => useEventListener("resize", handler));

        // Simulate event
        const event = new Event("resize");
        act(() => {
            window.dispatchEvent(event);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(addEventListenerSpy).toHaveBeenCalledWith(
            "resize",
            expect.any(Function)
        );
    });

    it("should attach event listener to a specific DOM element", () => {
        const div = document.createElement("div");
        const handler = jest.fn();

        const addSpy = jest.spyOn(div, "addEventListener");
        const removeSpy = jest.spyOn(div, "removeEventListener");

        renderHook(() => useEventListener("click", handler, div));

        const clickEvent = new Event("click");
        act(() => {
            div.dispatchEvent(clickEvent);
        });

        expect(handler).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith("click", expect.any(Function));

        // Unmount to trigger cleanup
        const { unmount } = renderHook(() =>
            useEventListener("click", handler, div)
        );
        unmount();
        expect(removeSpy).toHaveBeenCalledWith("click", expect.any(Function));
    });

    it("should update the handler when it changes", () => {
        const firstHandler = jest.fn();
        const secondHandler = jest.fn();

        const { rerender } = renderHook(
            ({ handler }) => useEventListener("keydown", handler),
            { initialProps: { handler: firstHandler } }
        );

        const keyEvent = new KeyboardEvent("keydown", { key: "Enter" });
        act(() => {
            window.dispatchEvent(keyEvent);
        });

        expect(firstHandler).toHaveBeenCalledTimes(1);
        expect(secondHandler).toHaveBeenCalledTimes(0);

        // Rerender with new handler
        rerender({ handler: secondHandler });
        act(() => {
            window.dispatchEvent(keyEvent);
        });

        expect(firstHandler).toHaveBeenCalledTimes(1);
        expect(secondHandler).toHaveBeenCalledTimes(1);
    });

    it("should cleanup event listener on unmount", () => {
        const handler = jest.fn();
        const { unmount } = renderHook(() =>
            useEventListener("scroll", handler)
        );

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            "scroll",
            expect.any(Function)
        );

        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "scroll",
            expect.any(Function)
        );
    });

    it("should do nothing if target element is null", () => {
        const handler = jest.fn();
        renderHook(() => useEventListener("click", handler, null));

        const event = new Event("click");
        act(() => {
            window.dispatchEvent(event);
        });

        expect(handler).toHaveBeenCalledTimes(1); // defaults to window
    });
});
