import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
    Button,
    Alert,
} from "@mui/material";
import { useSSE } from "../network/useSSE";

const meta: Meta = {
    title: "Hooks/Network/useSSE",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const DEMO_SSE_URL = "https://stream.wikimedia.org/v2/stream/recentchange";

const UseSSEDemo = () => {
    const [enabled, setEnabled] = useState(false);
    const [error, setError] = useState<Event | null>(null);
    const event = useSSE(enabled ? DEMO_SSE_URL : "", setError);

    return (
        <Card
            sx={{
                maxWidth: "60vw",
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                minWidth: 350,
                height: 400,
            }}
        >
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useSSE Demo</Typography>
                    <Button
                        variant={enabled ? "outlined" : "contained"}
                        onClick={() => {
                            setEnabled((v) => !v);
                            setError(null);
                        }}
                    >
                        {enabled ? "Disconnect" : "Connect"}
                    </Button>
                    {error && (
                        <Alert severity="error">
                            SSE Error: {String(error.type)}
                        </Alert>
                    )}
                    {enabled && (
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
                                Latest Event:
                            </Typography>
                            <Box
                                sx={{
                                    fontFamily: "monospace",
                                    fontSize: 13,
                                    bgcolor: "#f5f5f5",
                                    p: 1,
                                    borderRadius: 1,
                                    maxHeight: 200,
                                    overflow: "auto",
                                }}
                            >
                                {event ? (
                                    event.data
                                ) : (
                                    <em>Waiting for event...</em>
                                )}
                            </Box>
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseSSEDemo />,
};
