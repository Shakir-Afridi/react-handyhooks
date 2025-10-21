import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useInterval } from "../effects/useInterval";
import { Button, Card, CardContent, Typography } from "@mui/material";

const IntervalDemo = () => {
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(true);

    useInterval(
        () => {
            setCount((c) => c + 1);
        },
        running ? 1000 : null
    );

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Interval Count: {count}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setRunning((r) => !r)}
                    sx={{ mr: 2 }}
                >
                    {running ? "Pause" : "Resume"}
                </Button>
                <Button variant="outlined" onClick={() => setCount(0)}>
                    Reset
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof IntervalDemo> = {
    title: "Hooks/useInterval",
    component: IntervalDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof IntervalDemo> = {};
