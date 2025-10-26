import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
    Slider,
} from "@mui/material";
import { useRequestAnimationFrame } from "../performance/useRequestAnimationFrame";

const meta: Meta = {
    title: "Hooks/Performance/useRequestAnimationFrame",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseRequestAnimationFrameDemo = () => {
    const [x, setX] = useState(0);
    const [speed, setSpeed] = useState(100);
    const direction = useRef(1);

    useRequestAnimationFrame((delta) => {
        setX((prev) => {
            let next = prev + (direction.current * (speed * delta)) / 1000;
            if (next > 300) {
                direction.current = -1;
                next = 300;
            } else if (next < 0) {
                direction.current = 1;
                next = 0;
            }
            return next;
        });
    });

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        useRequestAnimationFrame Demo
                    </Typography>
                    <Typography variant="body2">
                        The box moves smoothly using requestAnimationFrame.
                    </Typography>
                    <Slider
                        value={speed}
                        min={10}
                        max={500}
                        step={10}
                        onChange={(_, v) => setSpeed(v as number)}
                        valueLabelDisplay="auto"
                        sx={{ width: 200 }}
                        aria-label="Speed"
                    />
                    <Box
                        sx={{
                            position: "relative",
                            height: 40,
                            background: "#eee",
                            borderRadius: 2,
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                left: x,
                                top: 5,
                                width: 30,
                                height: 30,
                                bgcolor: "primary.main",
                                borderRadius: 1,
                                transition: "none",
                            }}
                        />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseRequestAnimationFrameDemo />,
};
