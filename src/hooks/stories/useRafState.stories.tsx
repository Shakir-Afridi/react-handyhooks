import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useRefState } from "../state/useRafState";
import { Button, Card, CardContent, Typography } from "@mui/material";

const RafStateDemo = () => {
    const [count, setCount, countRef] = useRefState(0);

    return (
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    useRefState Demo
                </Typography>
                <Typography>State: {count}</Typography>
                <Typography sx={{ mb: 2 }}>Ref: {countRef.current}</Typography>
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

const meta: Meta<typeof RafStateDemo> = {
    title: "Hooks/useRefState",
    component: RafStateDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof RafStateDemo> = {};
