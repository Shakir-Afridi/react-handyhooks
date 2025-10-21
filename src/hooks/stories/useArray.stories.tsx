import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Button,
    Card,
    CardContent,
    Typography,
    Stack,
    TextField,
} from "@mui/material";
import { useArray } from "../useArray";

const meta: Meta = {
    title: "Hooks/useArray",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UseArrayDemo = () => {
    const { array, push, remove, update, insert, clear, isEmpty } =
        useArray<number>([1, 2, 3]);

    const [insertIndex, setInsertIndex] = useState<string>("1");
    const [insertValue, setInsertValue] = useState<string>("");

    const getRandomNumber = () => Math.floor(Math.random() * 1000) + 1;

    const handleInsert = () => {
        const index = Number(insertIndex);
        const value = insertValue ? Number(insertValue) : getRandomNumber();
        if (!Number.isInteger(index) || index < 0 || index > array.length) {
            alert(
                `Invalid index. Please enter a number between 0 and ${array.length}.`
            );
            return;
        }
        insert(index, value);
        setInsertValue("");
    };

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={3}>
                    <Typography variant="h5">
                        <strong>Current Array:</strong>{" "}
                        {isEmpty ? (
                            <Typography component="span" color="text.secondary">
                                Empty
                            </Typography>
                        ) : (
                            JSON.stringify(array)
                        )}
                    </Typography>

                    <Stack direction="row" flexWrap="wrap" gap={1}>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => push(getRandomNumber())}
                        >
                            Push Random
                        </Button>

                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => remove(array.length - 1)}
                            disabled={isEmpty}
                        >
                            Remove Last
                        </Button>

                        <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={() => update(0, getRandomNumber())}
                            disabled={isEmpty}
                        >
                            Update First (Random)
                        </Button>

                        <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={clear}
                        >
                            Clear
                        </Button>
                    </Stack>

                    {/* Insert Section */}
                    <Stack direction="row" alignItems="center" gap={1}>
                        <TextField
                            label="Index"
                            size="small"
                            value={insertIndex}
                            onChange={(e) => setInsertIndex(e.target.value)}
                            type="number"
                            sx={{ width: 80 }}
                        />
                        <TextField
                            label="Value (optional)"
                            size="small"
                            value={insertValue}
                            onChange={(e) => setInsertValue(e.target.value)}
                            type="number"
                            sx={{ width: 130 }}
                        />
                        <Button
                            size="small"
                            variant="outlined"
                            color="info"
                            onClick={handleInsert}
                        >
                            Insert
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseArrayDemo />,
};
