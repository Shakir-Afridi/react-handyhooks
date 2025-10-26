import React from "react";
import { render, act } from "@testing-library/react";
import { useCopyToClipboard } from "../browser/useCopyToClipboard";

describe("useCopyToClipboard hook", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should copy text using navigator.clipboard.writeText", async () => {
        const writeTextMock = jest.fn().mockResolvedValue(undefined);
        Object.assign(navigator, {
            clipboard: { writeText: writeTextMock },
        });

        let hook: ReturnType<typeof useCopyToClipboard> | null = null;

        render(<TestComponent onRender={(h) => (hook = h)} />);

        await act(async () => {
            const result = await hook!.copy("Hello World");
            expect(result).toBe(true);
        });

        expect(writeTextMock).toHaveBeenCalledWith("Hello World");
        expect(hook!.value).toBe("Hello World");
        expect(hook!.success).toBe(true);
    });

    it("should fallback to execCommand when clipboard API is unavailable", async () => {
        Object.assign(navigator, { clipboard: undefined });
        const execCommandMock = jest.fn();
        document.execCommand = execCommandMock;

        let hook: ReturnType<typeof useCopyToClipboard> | null = null;

        render(<TestComponent onRender={(h) => (hook = h)} />);

        await act(async () => {
            const result = await hook!.copy("Fallback text");
            expect(result).toBe(true);
        });

        expect(execCommandMock).toHaveBeenCalledWith("copy");
        expect(hook!.value).toBe("Fallback text");
        expect(hook!.success).toBe(true);
    });

    it("should return false when copying empty text", async () => {
        const writeTextMock = jest.fn();
        Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

        let hook: ReturnType<typeof useCopyToClipboard> | null = null;
        render(<TestComponent onRender={(h) => (hook = h)} />);

        await act(async () => {
            const result = await hook!.copy("");
            expect(result).toBe(false);
        });

        expect(hook!.value).toBeNull();
        expect(hook!.success).toBe(false);
    });

    it("should reset the hook state", async () => {
        const writeTextMock = jest.fn().mockResolvedValue(undefined);
        Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

        let hook: ReturnType<typeof useCopyToClipboard> | null = null;
        render(<TestComponent onRender={(h) => (hook = h)} />);

        await act(async () => {
            await hook!.copy("Some text");
        });

        act(() => {
            hook!.reset();
        });

        expect(hook!.value).toBeNull();
        expect(hook!.success).toBe(false);
    });
});

// Helper component to test the hook
function TestComponent({
    onRender,
}: {
    onRender: (hook: ReturnType<typeof useCopyToClipboard>) => void;
}) {
    const hook = useCopyToClipboard();
    onRender(hook);
    return null;
}
