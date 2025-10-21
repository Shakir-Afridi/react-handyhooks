import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useDeviceOrientation } from "../useDeviceOrientation";
import { Card, CardContent, Typography } from "@mui/material";

const DeviceOrientationDemo = () => {
    const { alpha, beta, gamma, absolute } = useDeviceOrientation();

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography component="h3" sx={{ mb: 2 }}>
                    Device Orientation
                </Typography>
                <Typography>Alpha (z): {alpha ?? "N/A"}</Typography>
                <Typography>Beta (x): {beta ?? "N/A"}</Typography>
                <Typography>Gamma (y): {gamma ?? "N/A"}</Typography>
                <Typography>
                    Absolute:{" "}
                    {absolute === null ? "N/A" : absolute ? "Yes" : "No"}
                </Typography>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof DeviceOrientationDemo> = {
    title: "Hooks/useDeviceOrientation",
    component: DeviceOrientationDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof DeviceOrientationDemo> = {};
