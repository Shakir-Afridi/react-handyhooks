import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useThrottledCallback } from "../developer/useThrottledCallback";

const meta: Meta = {
    title: "Hooks/Developer/useThrottledCallback",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseThrottledCallbackDemo = () => {
    const [count, setCount] = useState(0);

    const throttledIncrement = useThrottledCallback(() => {
        setCount((c) => c + 1);
    }, 1000);

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        Throttled Callback Demo
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Count:</strong> {count}
                    </Typography>
                    <Button variant="contained" onClick={throttledIncrement}>
                        Increment (throttled 1s)
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseThrottledCallbackDemo />,
};
