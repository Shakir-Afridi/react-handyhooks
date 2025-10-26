import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useDebounce } from "../effects/useDebounce";
import { Card, CardContent, Typography, TextField } from "@mui/material";

const DebounceDemo = () => {
    const [value, setValue] = useState("");
    const debounced = useDebounce(value, 1000);

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <TextField
                    label="Type something"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{ mb: 2, width: "100%" }}
                />
                <Typography>
                    Debounced value (1s delay): <b>{debounced}</b>
                </Typography>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof DebounceDemo> = {
    title: "Hooks/Effects/useDebounce",
    component: DebounceDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof DebounceDemo> = {};
