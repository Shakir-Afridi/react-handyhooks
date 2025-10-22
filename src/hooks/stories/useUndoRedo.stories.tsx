import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import { useUndoRedo } from "../state/useUndoRedo";

const meta: Meta = {
    title: "Hooks/State/useUndoRedo",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseUndoRedoDemo = () => {
    const { past, present, future, set, undo, redo } = useUndoRedo<number>(0);

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        <strong>Present:</strong> {present}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Past:</strong> {JSON.stringify(past)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Future:</strong> {JSON.stringify(future)}
                    </Typography>
                    <Stack direction="row" gap={1}>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => set(present + 1)}
                        >
                            Increment
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => set(present - 1)}
                        >
                            Decrement
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={undo}
                            disabled={past.length === 0}
                        >
                            Undo
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={redo}
                            disabled={future.length === 0}
                        >
                            Redo
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseUndoRedoDemo />,
};
