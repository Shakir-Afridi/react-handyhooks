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
    Button,
} from "@mui/material";
import { useCookie } from "../storage/useCookie";

const meta: Meta = {
    title: "Hooks/Storage/useCookie",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseCookieDemo = () => {
    const [cookie, setCookie] = useCookie("storybookCookie");
    const [input, setInput] = React.useState(cookie ?? "");

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useCookie Demo</Typography>
                    <TextField
                        label="Cookie Value"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        onClick={() =>
                            setCookie(input, { path: "/", expires: 7 })
                        }
                    >
                        Set Cookie (7 days)
                    </Button>
                    <Box>
                        <Typography variant="subtitle1">
                            Current Cookie Value:
                        </Typography>
                        <Alert severity="info">
                            {cookie ?? "No cookie set"}
                        </Alert>
                        <Typography variant="caption" display="block" mt={1}>
                            (Open your browser's developer tools to inspect
                            cookies under the name storybookCookie)
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseCookieDemo />,
};
