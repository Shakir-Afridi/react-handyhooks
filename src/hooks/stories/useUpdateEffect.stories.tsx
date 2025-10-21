import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useUpdateEffect } from "../useUpdateEffect";
import { Button, Card, CardContent, Typography } from "@mui/material";

const UpdateEffectDemo = () => {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("No update yet");

    useUpdateEffect(() => {
        setMessage(`Count changed to ${count}`);
    }, [count]);

    return (
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    useUpdateEffect Demo
                </Typography>
                <Typography sx={{ mb: 2 }}>Count: {count}</Typography>
                <Button
                    variant="contained"
                    onClick={() => setCount((c) => c + 1)}
                >
                    Increment
                </Button>
                <Typography sx={{ mt: 2 }}>{message}</Typography>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof UpdateEffectDemo> = {
    title: "Hooks/useUpdateEffect",
    component: UpdateEffectDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof UpdateEffectDemo> = {};
