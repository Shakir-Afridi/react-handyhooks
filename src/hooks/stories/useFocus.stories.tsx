import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useFocus } from "../useFocus";
import {
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
} from "@mui/material";

const FocusDemo = () => {
    const { ref, focus, blur, isFocused } = useFocus<HTMLInputElement>();

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <TextField
                    inputRef={ref}
                    label="Focusable Input"
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" onClick={focus} sx={{ mr: 1 }}>
                    Focus
                </Button>
                <Button variant="outlined" onClick={blur}>
                    Blur
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof FocusDemo> = {
    title: "Hooks/useFocus",
    component: FocusDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof FocusDemo> = {};
