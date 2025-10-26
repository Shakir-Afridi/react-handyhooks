import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    TextField,
    Button,
    Box,
    Alert,
} from "@mui/material";
import { useIndexedDB } from "../storage/useIndexedDB";

const meta: Meta = {
    title: "Hooks/Storage/useIndexedDB",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseIndexedDBDemo = () => {
    const dbHook = useIndexedDB("storybookDB");
    const [input, setInput] = React.useState("");
    const [addedId, setAddedId] = React.useState<IDBValidKey | null>(null);
    const [fetched, setFetched] = React.useState<any>(null);
    const [error, setError] = React.useState<string | null>(null);

    const handleAdd = async () => {
        setError(null);
        if (!dbHook) return setError("DB not initialized");
        try {
            const id = await dbHook.addItem("defaultStore", { value: input });
            setAddedId(id);
        } catch (e: any) {
            setError(e?.message || String(e));
        }
    };

    const handleGet = async () => {
        setError(null);
        if (!dbHook || addedId == null) return setError("Nothing to fetch");
        try {
            const item = await dbHook.getItem("defaultStore", addedId);
            setFetched(item);
        } catch (e: any) {
            setError(e?.message || String(e));
        }
    };

    const handleDelete = async () => {
        setError(null);
        if (!dbHook || addedId == null) return setError("Nothing to delete");
        try {
            await dbHook.deleteItem("defaultStore", addedId);
            setAddedId(null);
            setFetched(null);
        } catch (e: any) {
            setError(e?.message || String(e));
        }
    };

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, minWidth: 350 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">useIndexedDB Demo</Typography>
                    <TextField
                        label="Value to store"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        fullWidth
                    />
                    <Stack direction="row" spacing={1}>
                        <Button variant="contained" onClick={handleAdd}>
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleGet}
                            disabled={addedId == null}
                        >
                            Get
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleDelete}
                            disabled={addedId == null}
                        >
                            Delete
                        </Button>
                    </Stack>
                    <Box>
                        <Typography variant="subtitle1">
                            Last Added ID: {addedId ? `${addedId}` : "None"}
                        </Typography>
                        {fetched && (
                            <Alert severity="success">
                                Fetched: {JSON.stringify(fetched)}
                            </Alert>
                        )}
                        {error && <Alert severity="error">{error}</Alert>}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseIndexedDBDemo />,
};
