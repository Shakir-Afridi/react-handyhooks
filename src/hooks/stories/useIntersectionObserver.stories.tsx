import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
    Alert,
} from "@mui/material";
import { useIntersectionObserver } from "../ui/useIntersectionObserver";

const meta: Meta = {
    title: "Hooks/UI/useIntersectionObserver",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseIntersectionObserverDemo = () => {
    const [ref, entry] = useIntersectionObserver<HTMLDivElement>({
        threshold: 0.5,
    });

    return (
        <Card
            sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                minWidth: 350,
                height: 300,
                overflow: "scroll",
            }}
        >
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        useIntersectionObserver Demo
                    </Typography>
                    <Typography>
                        Scroll the box into view (at least 50%) to trigger
                        intersection.
                    </Typography>
                    <Box sx={{ height: 100 }} />
                    <Box
                        ref={ref}
                        sx={{
                            height: 100,
                            background: "#1976d2",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                        }}
                    >
                        Observe me!
                    </Box>
                    <Box sx={{ height: 170 }} />
                    {entry && (
                        <Alert
                            severity={entry.isIntersecting ? "success" : "info"}
                        >
                            {entry.isIntersecting
                                ? "Element is at least 50% visible."
                                : "Element is not sufficiently visible."}
                        </Alert>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseIntersectionObserverDemo />,
};
