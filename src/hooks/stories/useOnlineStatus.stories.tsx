import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useOnlineStatus } from "../browser/useOnlineStatus";
import { Card, CardContent, Typography } from "@mui/material";

const OnlineStatusDemo = () => {
    const isOnline = useOnlineStatus();

    return (
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Online Status
                </Typography>
                <Typography
                    sx={{
                        color: isOnline ? "green" : "red",
                        fontWeight: "bold",
                        fontSize: 24,
                    }}
                >
                    {isOnline ? "🟢 Online" : "🔴 Offline"}
                </Typography>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof OnlineStatusDemo> = {
    title: "Hooks/Browser/useOnlineStatus",
    component: OnlineStatusDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof OnlineStatusDemo> = {};
