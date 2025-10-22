import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Button,
    Alert,
} from "@mui/material";
import { useLongPress } from "../ui/useLongPress";

const meta: Meta = {
    title: "Hooks/UI/useLongPress",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseLongPressDemo = () => {
    const [pressed, setPressed] = useState(false);
    const longPressEvents = useLongPress(() => setPressed(true), 700);

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useLongPress Demo</Typography>
                    <Typography>
                        Press and hold the button for 700ms to trigger a long
                        press.
                    </Typography>
                    <Button variant="contained" {...longPressEvents}>
                        Hold me
                    </Button>
                    {pressed && (
                        <Alert
                            severity="success"
                            onClose={() => setPressed(false)}
                        >
                            Long pressed!
                        </Alert>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseLongPressDemo />,
};
