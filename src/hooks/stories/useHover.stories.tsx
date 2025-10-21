import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useHover } from "../useHover";
import { Card, CardContent, Typography } from "@mui/material";

const HoverDemo = () => {
    const { ref, isHovered } = useHover<HTMLDivElement>();

    return (
        <Card
            ref={ref}
            sx={{
                p: 4,
                borderRadius: 3,
                boxShadow: 3,
                background: isHovered ? "lightblue" : "white",
                textAlign: "center",
                cursor: "pointer",
            }}
        >
            <CardContent>
                <Typography variant="h6">
                    {isHovered ? "Hovered!" : "Hover over this card"}
                </Typography>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof HoverDemo> = {
    title: "Hooks/useHover",
    component: HoverDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof HoverDemo> = {};
