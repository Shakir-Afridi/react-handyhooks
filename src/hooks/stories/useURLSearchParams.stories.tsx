import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
    Alert,
} from "@mui/material";
import { useURLSearchParams } from "../storage/useURLSearchParams";

const meta: Meta = {
    title: "Hooks/Storage/useURLSearchParams",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseURLSearchParamsDemo = () => {
    const params = useURLSearchParams();
    const entries = Array.from(params.entries());

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        useURLSearchParams Demo
                    </Typography>
                    <Typography variant="body2">
                        Try adding query parameters to the URL (e.g.{" "}
                        <code>?foo=bar&baz=qux</code>)
                    </Typography>
                    <Box>
                        <Typography variant="subtitle1">
                            Current Query Parameters:
                        </Typography>
                        {entries.length === 0 ? (
                            <Alert severity="info">
                                No query parameters found.
                            </Alert>
                        ) : (
                            <ul>
                                {entries.map(([key, value]) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {value}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseURLSearchParamsDemo />,
};
