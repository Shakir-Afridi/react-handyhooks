import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useFetch } from "../network/useFetch";

const meta: Meta = {
    title: "Hooks/Network/useFetch",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseFetchDemo = () => {
    // Example public API for demonstration
    const { data, loading, error } = useFetch<{ id: number; title: string }[]>(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useFetch Demo</Typography>
                    {loading && <CircularProgress />}
                    {error && <Alert severity="error">{error.message}</Alert>}
                    {data && (
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>
                                Fetched Todos:
                            </Typography>
                            <ul>
                                {data.map((todo) => (
                                    <li key={todo.id}>{todo.title}</li>
                                ))}
                            </ul>
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseFetchDemo />,
};
