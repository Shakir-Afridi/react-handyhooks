import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { usePrevious } from "../state/usePrevious";
import { Button, Card, CardContent, Typography } from "@mui/material";

const PreviousDemo = () => {
    const [count, setCount] = useState(0);
    const prev = usePrevious(count);

    return (
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    usePrevious Demo
                </Typography>
                <Typography>Current: {count}</Typography>
                <Typography sx={{ mb: 2 }}>
                    Previous: {prev ?? "N/A"}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => setCount((c) => c + 1)}
                >
                    Increment
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof PreviousDemo> = {
    title: "Hooks/usePrevious",
    component: PreviousDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof PreviousDemo> = {};
