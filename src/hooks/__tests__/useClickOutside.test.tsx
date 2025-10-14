import React, { useRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import { useClickOutside } from "../useClickOutside";

describe("useClickOutside hook", () => {
    it("should call handler when clicking outside the element", () => {
        const handler = jest.fn();

        const TestComponent = () => {
            const ref = React.useRef<HTMLDivElement>(
                null
            ) as React.RefObject<HTMLDivElement>;

            useClickOutside(ref, handler);
            return (
                <div>
                    <div ref={ref} data-testid="inside">
                        Inside
                    </div>
                    <div data-testid="outside">Outside</div>
                </div>
            );
        };

        const { getByTestId } = render(<TestComponent />);
        fireEvent.mouseDown(getByTestId("outside"));

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should not call handler when clicking inside the element", () => {
        const handler = jest.fn();

        const TestComponent = () => {
            const ref = React.useRef<HTMLDivElement>(
                null
            ) as React.RefObject<HTMLDivElement>;

            useClickOutside(ref, handler);
            return (
                <div>
                    <div ref={ref} data-testid="inside">
                        Inside
                    </div>
                    <div data-testid="outside">Outside</div>
                </div>
            );
        };

        const { getByTestId } = render(<TestComponent />);
        fireEvent.mouseDown(getByTestId("inside"));

        expect(handler).not.toHaveBeenCalled();
    });

    it("should handle different event types", () => {
        const handler = jest.fn();

        const TestComponent = () => {
            const ref = React.useRef<HTMLDivElement>(
                null
            ) as React.RefObject<HTMLDivElement>;

            useClickOutside(ref, handler, "mouseup");
            return (
                <div>
                    <div ref={ref} data-testid="inside">
                        Inside
                    </div>
                    <div data-testid="outside">Outside</div>
                </div>
            );
        };

        const { getByTestId } = render(<TestComponent />);
        fireEvent.mouseUp(getByTestId("outside"));

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should not fail if ref is null", () => {
        const handler = jest.fn();

        const TestComponent = () => {
            const ref = React.useRef<HTMLDivElement>(
                null
            ) as React.RefObject<HTMLDivElement>;

            useClickOutside(ref, handler);
            return <div data-testid="outside">Outside</div>;
        };

        const { getByTestId } = render(<TestComponent />);
        fireEvent.mouseDown(getByTestId("outside"));

        expect(handler).toHaveBeenCalledTimes(0);
    });
});
