import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useCopyToClipboard } from "../browser/useCopyToClipboard";
import {
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
} from "@mui/material";

const CopyToClipboardDemo = () => {
    const [input, setInput] = useState("");
    const { copy, success, value, reset } = useCopyToClipboard();

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <TextField
                    label="Text to copy"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    sx={{ mb: 2, width: "100%" }}
                />
                <Button
                    variant="contained"
                    sx={{ mr: 2 }}
                    onClick={() => copy(input)}
                >
                    Copy
                </Button>
                <Button variant="outlined" onClick={reset}>
                    Reset
                </Button>
                <Typography sx={{ mt: 2 }}>
                    {success
                        ? `Copied: "${value}"`
                        : value
                        ? "Copy failed"
                        : "Nothing copied yet"}
                </Typography>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof CopyToClipboardDemo> = {
    title: "Hooks/useCopyToClipboard",
    component: CopyToClipboardDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof CopyToClipboardDemo> = {};
