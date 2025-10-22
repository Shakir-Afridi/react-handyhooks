import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Alert,
    CircularProgress,
    Box,
} from "@mui/material";
import { useGeolocation } from "../system/useGeoLocation";

const meta: Meta = {
    title: "Hooks/System/useGeolocation",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseGeolocationDemo = () => {
    const { position, error } = useGeolocation();

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useGeolocation Demo</Typography>
                    {!position && !error && <CircularProgress />}
                    {error && (
                        <Alert severity="error">
                            {error.message || "Failed to get geolocation."}
                        </Alert>
                    )}
                    {position && (
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
                                Your Position:
                            </Typography>
                            <ul>
                                <li>
                                    <strong>Latitude:</strong>{" "}
                                    {position.coords.latitude}
                                </li>
                                <li>
                                    <strong>Longitude:</strong>{" "}
                                    {position.coords.longitude}
                                </li>
                                <li>
                                    <strong>Accuracy:</strong>{" "}
                                    {position.coords.accuracy} meters
                                </li>
                                <li>
                                    <strong>Timestamp:</strong>{" "}
                                    {new Date(
                                        position.timestamp
                                    ).toLocaleString()}
                                </li>
                            </ul>
                        </Box>
                    )}
                    <Typography variant="body2">
                        Allow location access in your browser to see your
                        coordinates.
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseGeolocationDemo />,
};
