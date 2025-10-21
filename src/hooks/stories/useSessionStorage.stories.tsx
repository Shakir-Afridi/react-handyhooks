import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useSessionStorage } from "../storage/useSessionStorage";
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

const SessionStorageDemo = () => {
    const [value, setValue] = useSessionStorage<string>(
        "storybook-session",
        ""
    );

    return (
        <Card sx={{ minWidth: 300, p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Session Storage Value: {value}
                </Typography>
                <TextField
                    label="Set Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{ mr: 2, mb: 2 }}
                    fullWidth
                />
                <Button variant="outlined" onClick={() => setValue("")}>
                    Clear
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof SessionStorageDemo> = {
    title: "Hooks/useSessionStorage",
    component: SessionStorageDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof SessionStorageDemo> = {};
