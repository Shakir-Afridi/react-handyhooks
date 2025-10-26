import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Button,
    Card,
    CardContent,
    Typography,
    Stack,
    TextField,
} from "@mui/material";
import usePreviousDistinct from "../state/usePreviousDistinct";

const meta: Meta = {
    title: "Hooks/State/usePreviousDistinct",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UsePreviousDistinctDemo = () => {
    const [value, setValue] = useState<string>("");
    const prev = usePreviousDistinct(value, (a, b) => a?.trim() === b?.trim());

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <TextField
                        label="Value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        size="small"
                    />
                    <Typography>
                        <strong>Current:</strong> {JSON.stringify(value)}
                    </Typography>
                    <Typography>
                        <strong>Previous Distinct:</strong>{" "}
                        {JSON.stringify(prev)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Previous value updates only if the trimmed value
                        changes.
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UsePreviousDistinctDemo />,
};
