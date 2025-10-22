import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import { useToggleSet } from "../state/useToggleSet";

const meta: Meta = {
    title: "Hooks/State/useToggleSet",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseToggleSetDemo = () => {
    const [set, toggle] = useToggleSet<number>(new Set([1, 3]));

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        <strong>Current Set:</strong>{" "}
                        {JSON.stringify(Array.from(set))}
                    </Typography>
                    <Stack direction="row" gap={1}>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <Button
                                key={num}
                                size="small"
                                variant={
                                    set.has(num) ? "contained" : "outlined"
                                }
                                onClick={() => toggle(num)}
                            >
                                {num}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseToggleSetDemo />,
};
