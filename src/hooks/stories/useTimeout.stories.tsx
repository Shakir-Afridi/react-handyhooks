import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useTimeout } from "../effects/useTimeout";
import { Button, Card, CardContent, Typography } from "@mui/material";

const TimeoutDemo = () => {
    const [fired, setFired] = useState(false);
    const { clear, reset } = useTimeout(() => setFired(true), 2000);

    return (
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    useTimeout Demo
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    {fired ? "Timeout fired!" : "Waiting..."}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => {
                        setFired(false);
                        reset();
                    }}
                    sx={{ mr: 2 }}
                >
                    Reset
                </Button>
                <Button variant="outlined" onClick={clear}>
                    Clear
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof TimeoutDemo> = {
    title: "Hooks/useTimeout",
    component: TimeoutDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof TimeoutDemo> = {};
