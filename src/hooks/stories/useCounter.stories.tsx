import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useCounter } from "../state/useCounter";
import { Button, Card, CardContent, Typography } from "@mui/material";

const CounterDemo = () => {
    const { count, increment, decrement } = useCounter();
    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography component="h3" sx={{ mb: 2 }}>
                    Count: {count}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        mr: 2,
                    }}
                    onClick={increment}
                >
                    Increment
                </Button>
                <Button variant="outlined" onClick={decrement}>
                    Decrement
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof CounterDemo> = {
    title: "Hooks/useCounter",
    component: CounterDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof CounterDemo> = {};
