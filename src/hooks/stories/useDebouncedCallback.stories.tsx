import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, Typography, Stack, TextField } from "@mui/material";
import { useDebouncedCallback } from "../developer/useDebouncedCallback";

const meta: Meta = {
    title: "Hooks/Developer/useDebouncedCallback",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseDebouncedCallbackDemo = () => {
    const [value, setValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    const debouncedChange = useDebouncedCallback((val: string) => {
        setDebouncedValue(val);
    }, 500);

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">Debounced Input</Typography>
                    <TextField
                        label="Type here"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            debouncedChange(e.target.value);
                        }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        <strong>Debounced Value:</strong> {debouncedValue}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseDebouncedCallbackDemo />,
};
