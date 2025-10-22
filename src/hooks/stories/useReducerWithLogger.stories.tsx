import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import useReducerWithLogger from "../state/useReducerWithLogger";

const meta: Meta = {
    title: "Hooks/State/useReducerWithLogger",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

type Action = { type: "increment" } | { type: "decrement" };

const reducer = (state: number, action: Action) => {
    switch (action.type) {
        case "increment":
            return state + 1;
        case "decrement":
            return state - 1;
        default:
            return state;
    }
};

const UseReducerWithLoggerDemo = () => {
    const [count, dispatch] = useReducerWithLogger(reducer, 0);

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        <strong>Count:</strong> {count}
                    </Typography>
                    <Stack direction="row" gap={1}>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => dispatch({ type: "increment" })}
                        >
                            Increment
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => dispatch({ type: "decrement" })}
                        >
                            Decrement
                        </Button>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        Check the browser console for reducer logs.
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseReducerWithLoggerDemo />,
};
