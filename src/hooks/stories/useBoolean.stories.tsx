import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useBoolean } from "../state/useBoolean";
import { Button, Card, CardContent, Typography } from "@mui/material";

const BooleanDemo = () => {
    const { value, setTrue, setFalse, toggle } = useBoolean(false);
    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography component="h3" sx={{ mb: 2 }}>
                    Value: {value ? "True" : "False"}
                </Typography>
                <Button variant="contained" sx={{ mr: 1 }} onClick={toggle}>
                    Toggle
                </Button>
                <Button variant="outlined" sx={{ mr: 1 }} onClick={setTrue}>
                    Set True
                </Button>
                <Button variant="outlined" onClick={setFalse}>
                    Set False
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof BooleanDemo> = {
    title: "Hooks/useBoolean",
    component: BooleanDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof BooleanDemo> = {};
