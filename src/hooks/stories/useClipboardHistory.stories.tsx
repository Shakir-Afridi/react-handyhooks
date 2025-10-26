import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Alert,
} from "@mui/material";
import { useClipboardHistory } from "../ui/useClipboardHistory";

const meta: Meta = {
    title: "Hooks/UI/useClipboardHistory",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseClipboardHistoryDemo = () => {
    const { history, copyToClipboard } = useClipboardHistory();
    const [input, setInput] = useState("");
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await copyToClipboard(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        useClipboardHistory Demo
                    </Typography>
                    <TextField
                        label="Text to copy"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        size="small"
                    />
                    <Button
                        variant="contained"
                        onClick={handleCopy}
                        disabled={!input}
                    >
                        Copy to Clipboard
                    </Button>
                    {copied && <Alert severity="success">Copied!</Alert>}
                    <Typography variant="subtitle1">
                        Clipboard History:
                    </Typography>
                    <List dense>
                        {history.map((item, idx) => (
                            <ListItem key={idx}>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))}
                    </List>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseClipboardHistoryDemo />,
};
