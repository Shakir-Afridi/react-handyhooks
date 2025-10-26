import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useLocalStorage } from "../storage/useLocalStorage";
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

const LocalStorageDemo = () => {
    const [value, setValue, removeValue] = useLocalStorage<string>(
        "storybook-local",
        ""
    );

    return (
        <Card sx={{ minWidth: 300, p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Local Storage Value: {value}
                </Typography>
                <TextField
                    label="Set Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{ mr: 2, mb: 2 }}
                    fullWidth
                />
                <Button variant="outlined" onClick={removeValue}>
                    Remove
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof LocalStorageDemo> = {
    title: "Hooks/Storage/useLocalStorage",
    component: LocalStorageDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof LocalStorageDemo> = {};
