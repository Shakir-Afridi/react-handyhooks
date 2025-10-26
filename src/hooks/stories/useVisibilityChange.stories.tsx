import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, Typography, Stack, Alert } from "@mui/material";
import { useVisibilityChange } from "../system/useVisibilityChange";

const meta: Meta = {
    title: "Hooks/System/useVisibilityChange",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseVisibilityChangeDemo = () => {
    const isVisible = useVisibilityChange();

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        useVisibilityChange Demo
                    </Typography>
                    <Alert severity={isVisible ? "success" : "warning"}>
                        {isVisible
                            ? "Tab is visible (active)."
                            : "Tab is hidden (inactive)."}
                    </Alert>
                    <Typography variant="body2">
                        Switch to another tab or minimize the window to see the
                        state change.
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseVisibilityChangeDemo />,
};
