import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useInput } from "../browser/useInput";
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

const InputDemo = () => {
    const input = useInput("", (val) => (!val ? "Required" : undefined));

    return (
        <Card sx={{ minWidth: 300, p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Input with Validation
                </Typography>
                <TextField
                    label="Name"
                    value={input.value}
                    onChange={input.onChange}
                    error={!!input.error}
                    helperText={input.error}
                    sx={{ mr: 2, mb: 2 }}
                    fullWidth
                />
                <Button variant="outlined" onClick={input.reset}>
                    Reset
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof InputDemo> = {
    title: "Hooks/useInput",
    component: InputDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof InputDemo> = {};
