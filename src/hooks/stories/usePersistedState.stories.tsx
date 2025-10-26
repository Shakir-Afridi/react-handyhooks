import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    TextField,
    Box,
    Alert,
} from "@mui/material";
import { usePersistedState } from "../storage/usePersistedState";

const meta: Meta = {
    title: "Hooks/Storage/usePersistedState",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UsePersistedStateDemo = () => {
    const [name, setName] = usePersistedState<string>("storybookName", "");

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">usePersistedState Demo</Typography>
                    <TextField
                        label="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <Box>
                        <Typography variant="subtitle1">
                            Persisted Value:
                        </Typography>
                        <Alert severity="info">{name || "No value set"}</Alert>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UsePersistedStateDemo />,
};
