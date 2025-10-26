import React, { useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Stack,
    Alert,
} from "@mui/material";
import useAsync from "../effects/useAsync";

// --- Fake async function (simulates API call) ---
const fetchRandomUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate delay
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0];
};

const DemoAsyncComponent: React.FC = () => {
    const { execute, data, error, isLoading, reset } =
        useAsync(fetchRandomUser);

    useEffect(() => {
        execute(); // initial fetch
    }, [execute]);

    return (
        <Card
            sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: 4,
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Random User Fetcher
                </Typography>

                {isLoading && (
                    <Stack alignItems="center" spacing={1}>
                        <CircularProgress size={30} />
                        <Typography variant="body2" color="text.secondary">
                            Loading user data...
                        </Typography>
                    </Stack>
                )}

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        Failed to load data: {String(error)}
                    </Alert>
                )}

                {data && !isLoading && (
                    <Stack alignItems="center" spacing={1} mt={2}>
                        <img
                            src={data.picture.large}
                            alt="User"
                            style={{
                                borderRadius: "50%",
                                width: 100,
                                height: 100,
                            }}
                        />
                        <Typography variant="subtitle1">
                            {data.name.first} {data.name.last}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.email}
                        </Typography>
                    </Stack>
                )}

                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    mt={3}
                >
                    <Button
                        variant="contained"
                        onClick={() => execute()}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Fetch Again"}
                    </Button>
                    <Button variant="outlined" onClick={reset}>
                        Reset
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof DemoAsyncComponent> = {
    title: "Hooks/Effects/useAsync",
    component: DemoAsyncComponent,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof DemoAsyncComponent>;

export const Default: Story = {
    render: () => <DemoAsyncComponent />,
};
