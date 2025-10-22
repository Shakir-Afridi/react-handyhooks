import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Slider,
    Box,
    Button,
} from "@mui/material";
import { useRafInterval } from "../performance/useRefInterval";

const meta: Meta = {
    title: "Hooks/Performance/useRafInterval",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseRafIntervalDemo = () => {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [running, setRunning] = useState(true);

    useRafInterval(() => {
        if (running) setCount((c) => c + 1);
    }, delay);

    return (
        <Card sx={{ minWidth: 500, p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useRafInterval Demo</Typography>
                    <Typography variant="body2">
                        Counter increments every <b>{delay}ms</b> using
                        requestAnimationFrame.
                    </Typography>
                    <Slider
                        value={delay}
                        min={100}
                        max={2000}
                        step={100}
                        onChange={(_, v) => setDelay(v as number)}
                        valueLabelDisplay="auto"
                        sx={{ width: 200 }}
                        aria-label="Delay"
                    />
                    <Box>
                        <Typography variant="h6">Count: {count}</Typography>
                        <Button
                            variant="contained"
                            onClick={() => setRunning((r) => !r)}
                            sx={{ mt: 1 }}
                        >
                            {running ? "Pause" : "Resume"}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setCount(0)}
                            sx={{ mt: 1, ml: 2 }}
                        >
                            Reset
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseRafIntervalDemo />,
};
