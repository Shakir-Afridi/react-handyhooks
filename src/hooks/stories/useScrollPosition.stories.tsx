import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
import { useScrollPosition } from "../ui/useScrollPosition";

const meta: Meta = {
    title: "Hooks/UI/useScrollPosition",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseScrollPositionDemo = () => {
    const { x, y } = useScrollPosition();

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useScrollPosition Demo</Typography>
                    <Typography>
                        Scroll the window and see the coordinates update.
                    </Typography>
                    <Box>
                        <Typography>
                            <strong>X:</strong> {x}
                        </Typography>
                        <Typography>
                            <strong>Y:</strong> {y}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseScrollPositionDemo />,
};
