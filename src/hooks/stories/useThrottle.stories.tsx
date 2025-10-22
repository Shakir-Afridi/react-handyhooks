import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useThrottle } from "../effects/useThrottle";
import { Button, Card, CardContent, Typography } from "@mui/material";

const ThrottleDemo = () => {
    const [value, setValue] = useState(0);
    const throttled = useThrottle(value, 1000);

    return (
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    useThrottle Demo
                </Typography>
                <Typography>Raw Value: {value}</Typography>
                <Typography sx={{ mb: 2 }}>
                    Throttled Value: {throttled}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setValue((v) => v + 1)}
                >
                    Increment
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof ThrottleDemo> = {
    title: "Hooks/Effects/useThrottle",
    component: ThrottleDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof ThrottleDemo> = {};
