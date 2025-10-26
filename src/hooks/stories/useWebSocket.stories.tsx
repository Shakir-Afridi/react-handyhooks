import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
    Button,
    TextField,
    Alert,
} from "@mui/material";
import { useWebSocket } from "../network/useWebSocket";

const meta: Meta = {
    title: "Hooks/Network/useWebSocket",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

// Public echo server for demo purposes
const WS_URL = "wss://ws.postman-echo.com/raw";

const UseWebSocketDemo = () => {
    const { send, message } = useWebSocket(WS_URL);
    const [input, setInput] = useState("");
    const [sent, setSent] = useState<string | null>(null);

    const handleSend = () => {
        send(input);
        setSent(input);
        setInput("");
    };

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useWebSocket Demo</Typography>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            label="Message"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            size="small"
                        />
                        <Button
                            variant="contained"
                            onClick={handleSend}
                            disabled={!input}
                        >
                            Send
                        </Button>
                    </Stack>
                    {sent && <Alert severity="info">Sent: {sent}</Alert>}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Last Message Received:
                        </Typography>
                        <Box
                            sx={{
                                fontFamily: "monospace",
                                fontSize: 13,
                                bgcolor: "#f5f5f5",
                                p: 1,
                                borderRadius: 1,
                                minHeight: 30,
                            }}
                        >
                            {message ? message.data : <em>No message yet</em>}
                        </Box>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseWebSocketDemo />,
};
