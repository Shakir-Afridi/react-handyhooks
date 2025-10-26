import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useMap } from "../state/useMap";
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
} from "@mui/material";

const MapDemo = () => {
    const { map, set, remove, clear, reset } = useMap<string, string>([
        ["foo", "bar"],
    ]);
    const [key, setKey] = useState("");
    const [val, setVal] = useState("");

    return (
        <Card sx={{ minWidth: 300, p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Map Entries
                </Typography>
                <List>
                    {[...map.entries()].map(([k, v]) => (
                        <ListItem
                            sx={{ pl: 0 }}
                            key={k}
                            secondaryAction={
                                <Button size="small" onClick={() => remove(k)}>
                                    Remove
                                </Button>
                            }
                        >
                            {k}: {v}
                        </ListItem>
                    ))}
                </List>
                <TextField
                    label="Key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <TextField
                    label="Value"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <Typography sx={{ mt: 2 }} />
                <Button
                    variant="contained"
                    onClick={() => {
                        set(key, val);
                        setKey("");
                        setVal("");
                    }}
                    disabled={!val || !key}
                    sx={{ mr: 1 }}
                >
                    Add/Update
                </Button>
                <Button variant="outlined" onClick={clear} sx={{ mr: 1 }}>
                    Clear
                </Button>
                <Button variant="outlined" onClick={reset}>
                    Reset
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof MapDemo> = {
    title: "Hooks/State/useMap",
    component: MapDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof MapDemo> = {};
