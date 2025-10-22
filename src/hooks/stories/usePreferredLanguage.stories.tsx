import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, Typography, Stack, Alert } from "@mui/material";
import { usePreferredLanguage } from "../system/usePreferredLanguage";

const meta: Meta = {
    title: "Hooks/System/usePreferredLanguage",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UsePreferredLanguageDemo = () => {
    const language = usePreferredLanguage();

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        usePreferredLanguage Demo
                    </Typography>
                    <Alert severity="info">
                        Preferred Language: <strong>{language}</strong>
                    </Alert>
                    <Typography variant="body2">
                        This hook detects your browser's preferred language.
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UsePreferredLanguageDemo />,
};
