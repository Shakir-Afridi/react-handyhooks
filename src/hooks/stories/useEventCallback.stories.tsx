import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useEventCallback } from "../developer/useEventCallback";

const meta: Meta = {
    title: "Hooks/Developer/useEventCallback",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseEventCallbackDemo = () => {
    const [count, setCount] = useState(0);

    const handleClick = useEventCallback(() => {
        setCount((c) => c + 1);
    });

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">Event Callback Demo</Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Count:</strong> {count}
                    </Typography>
                    <Button variant="contained" onClick={handleClick}>
                        Increment
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseEventCallbackDemo />,
};
