import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useEventListener } from "../browser/useEventListener";
import { Card, CardContent, Typography } from "@mui/material";

const EventListenerDemo = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEventListener("resize", () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
    });

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography component="h3" sx={{ mb: 2 }}>
                    Window Size
                </Typography>
                <Typography>Width: {size.width}px</Typography>
                <Typography>Height: {size.height}px</Typography>
                <Typography sx={{ mt: 2 }}>
                    Resize the window to see updates.
                </Typography>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof EventListenerDemo> = {
    title: "Hooks/useEventListener",
    component: EventListenerDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof EventListenerDemo> = {};
