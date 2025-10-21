import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useWindowSize } from "../useWindowSize";
import { Card, CardContent, Typography } from "@mui/material";

const WindowSizeDemo = () => {
    const { width, height } = useWindowSize();
    return (
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Window Size
                </Typography>
                <Typography>Width: {width}px</Typography>
                <Typography>Height: {height}px</Typography>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof WindowSizeDemo> = {
    title: "Hooks/useWindowSize",
    component: WindowSizeDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof WindowSizeDemo> = {};
