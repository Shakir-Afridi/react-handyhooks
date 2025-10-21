import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useCounter } from "../useCounter";
import { Button, Typography } from "@mui/material";

const CounterDemo = () => {
    const { count, increment, decrement } = useCounter();
    return (
        <div style={{ padding: 20 }}>
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
        </div>
    );
};

const meta: Meta<typeof CounterDemo> = {
    title: "Hooks/useCounter",
    component: CounterDemo,
};

export default meta;
export const Default: StoryObj<typeof CounterDemo> = {};
