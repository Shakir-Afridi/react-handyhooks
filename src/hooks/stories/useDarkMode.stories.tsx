import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useDarkMode } from "../ui/useDarkMode";
import { Button, Card, CardContent, Typography } from "@mui/material";

const DarkModeDemo = () => {
    const { isDarkMode, toggle, enable, disable } = useDarkMode();

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography component="h3" sx={{ mb: 2 }}>
                    Dark Mode: {isDarkMode ? "Enabled" : "Disabled"}
                </Typography>
                <Button variant="contained" sx={{ mr: 1 }} onClick={toggle}>
                    Toggle
                </Button>
                <Button variant="outlined" sx={{ mr: 1 }} onClick={enable}>
                    Enable
                </Button>
                <Button variant="outlined" onClick={disable}>
                    Disable
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof DarkModeDemo> = {
    title: "Hooks/UI/useDarkMode",
    component: DarkModeDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof DarkModeDemo> = {};
