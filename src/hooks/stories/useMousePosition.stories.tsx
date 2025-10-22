import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
import { useMousePosition } from "../ui/useMousePosition";

const meta: Meta = {
    title: "Hooks/UI/useMousePosition",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseMousePositionDemo = () => {
    const { x, y } = useMousePosition();

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useMousePosition Demo</Typography>
                    <Typography>
                        Move your mouse around and see the coordinates update.
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
    render: () => <UseMousePositionDemo />,
};
