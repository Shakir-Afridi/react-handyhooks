import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import { useDarkMode, UseDarkModeReturn } from "../useDarkMode";

describe("useDarkMode hook", () => {
    const storageKey = "theme";

    // Mock matchMedia globally for all tests
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        document.documentElement.className = "";

        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: query.includes("dark"),
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                addListener: jest.fn(), // legacy
                removeListener: jest.fn(), // legacy
                dispatchEvent: jest.fn(),
            })),
        });
    });

    it("should initialize with localStorage value 'dark'", async () => {
        localStorage.setItem(storageKey, "dark");

        let hook: UseDarkModeReturn | null = null;
        render(<TestComponent onRender={(h) => (hook = h)} />);

        await waitFor(() => {
            expect(hook!.isDarkMode).toBe(true);
            expect(document.documentElement.classList.contains("dark")).toBe(
                true
            );
        });
    });

    it("should initialize with localStorage value 'light'", async () => {
        localStorage.setItem(storageKey, "light");

        let hook: UseDarkModeReturn | null = null;
        render(<TestComponent onRender={(h) => (hook = h)} />);

        await waitFor(() => {
            expect(hook!.isDarkMode).toBe(false);
            expect(document.documentElement.classList.contains("dark")).toBe(
                false
            );
        });
    });

    it("should fallback to system preference if no localStorage", async () => {
        // Ensure no value in localStorage
        localStorage.removeItem(storageKey);

        let hook: UseDarkModeReturn | null = null;
        render(<TestComponent onRender={(h) => (hook = h)} />);

        await waitFor(() => {
            expect(hook!.isDarkMode).toBe(true); // matchMedia mocked as dark
            expect(document.documentElement.classList.contains("dark")).toBe(
                true
            );
        });
    });

    it("should enable and disable dark mode", async () => {
        let hook: UseDarkModeReturn | null = null;
        render(<TestComponent onRender={(h) => (hook = h)} />);

        act(() => hook!.enable());
        await waitFor(() => {
            expect(hook!.isDarkMode).toBe(true);
            expect(localStorage.getItem(storageKey)).toBe("dark");
            expect(document.documentElement.classList.contains("dark")).toBe(
                true
            );
        });

        act(() => hook!.disable());
        await waitFor(() => {
            expect(hook!.isDarkMode).toBe(false);
            expect(localStorage.getItem(storageKey)).toBe("light");
            expect(document.documentElement.classList.contains("dark")).toBe(
                false
            );
        });
    });

    it("should react to system preference changes", async () => {
        const listeners: Record<string, (event: any) => void> = {};
        (window.matchMedia as jest.Mock).mockImplementation((query) => ({
            matches: false,
            media: query,
            addEventListener: (event: string, cb: (e: any) => void) => {
                listeners[event] = cb;
            },
            removeEventListener: jest.fn(),
            addListener: jest.fn(),
            removeListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }));

        let hook: UseDarkModeReturn | null = null;
        render(<TestComponent onRender={(h) => (hook = h)} />);

        act(() => {
            listeners["change"]({ matches: true });
        });

        await waitFor(() => {
            expect(hook!.isDarkMode).toBe(true);
            expect(document.documentElement.classList.contains("dark")).toBe(
                true
            );
        });
    });
});

// Helper component to test the hook
function TestComponent({
    onRender,
}: {
    onRender: (hook: UseDarkModeReturn) => void;
}) {
    const hook = useDarkMode();
    onRender(hook);
    return null;
}
