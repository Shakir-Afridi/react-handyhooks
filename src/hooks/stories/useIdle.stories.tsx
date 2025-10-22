import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Slider,
    Alert,
} from "@mui/material";
import useIdle from "../performance/useIdle";

const meta: Meta = {
    title: "Hooks/Performance/useIdle",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseIdleDemo = () => {
    const [timeout, setTimeoutValue] = useState(3000);
    const isIdle = useIdle(timeout);

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useIdle Demo</Typography>
                    <Typography variant="body2">
                        Move your mouse or press a key to reset the idle timer.
                    </Typography>
                    <Slider
                        value={timeout}
                        min={1000}
                        max={10000}
                        step={500}
                        onChange={(_, v) => setTimeoutValue(v as number)}
                        valueLabelDisplay="auto"
                        sx={{ width: 200 }}
                        aria-label="Idle Timeout"
                    />
                    <Alert severity={isIdle ? "warning" : "success"}>
                        {isIdle ? "User is idle" : "User is active"}
                    </Alert>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseIdleDemo />,
};
