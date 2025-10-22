import React, { useRef, useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
import { useDrag } from "../ui/useDrag";

const meta: Meta = {
    title: "Hooks/UI/useDrag",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseDragDemo = () => {
    const { dragging, position, handleMouseDown } = useDrag();

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useDrag Demo</Typography>
                    <Typography>
                        Drag the blue box around. Position is relative to the
                        start.
                    </Typography>
                    <Box
                        onMouseDown={handleMouseDown}
                        sx={{
                            width: 80,
                            height: 80,
                            background: "#1976d2",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            cursor: "grab",
                            position: "absolute",
                            left: position.x,
                            top: position.y,
                            userSelect: "none",
                        }}
                    >
                        Drag me!
                    </Box>
                    <Typography>
                        <strong>Dragging:</strong> {dragging ? "Yes" : "No"}
                    </Typography>
                    <Typography>
                        <strong>Position:</strong> x: {position.x}, y:{" "}
                        {position.y}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseDragDemo />,
};
