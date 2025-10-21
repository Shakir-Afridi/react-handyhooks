import { render, fireEvent } from "@testing-library/react";
import { useHover } from "../ui/useHover";
import React from "react";

function TestComponent() {
    const { ref, isHovered } = useHover<HTMLDivElement>();
    return (
        <div data-testid="hover" ref={ref}>
            {isHovered ? "hovered" : "not hovered"}
        </div>
    );
}

describe("useHover hook", () => {
    it("should initialize with isHovered as false", () => {
        const { getByTestId } = render(<TestComponent />);
        expect(getByTestId("hover").textContent).toBe("not hovered");
    });

    it("should set isHovered to true on mouseenter", () => {
        const { getByTestId } = render(<TestComponent />);
        const div = getByTestId("hover");

        fireEvent.mouseEnter(div);

        expect(div.textContent).toBe("hovered");
    });

    it("should set isHovered to false on mouseleave", () => {
        const { getByTestId } = render(<TestComponent />);
        const div = getByTestId("hover");

        fireEvent.mouseEnter(div);
        expect(div.textContent).toBe("hovered");

        fireEvent.mouseLeave(div);
        expect(div.textContent).toBe("not hovered");
    });
});
