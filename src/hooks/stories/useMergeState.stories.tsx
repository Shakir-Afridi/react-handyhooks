import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import { useMergeState } from "../state/useMergeState";

const meta: Meta = {
    title: "Hooks/State/useMergeState",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseMergeStateDemo = () => {
    const [user, setUser] = useMergeState({ name: "John", age: 25 });

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        <strong>User:</strong> {JSON.stringify(user)}
                    </Typography>
                    <Stack direction="row" gap={1}>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => setUser({ name: "Alice" })}
                        >
                            Set Name: Alice
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => setUser({ age: user.age + 1 })}
                        >
                            Increment Age
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseMergeStateDemo />,
};
