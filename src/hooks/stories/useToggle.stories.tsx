import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useToggle } from "../state/useToggle";
import { Button, Card, CardContent, Typography } from "@mui/material";

const ToggleDemo = () => {
    const [on, toggle] = useToggle(false);

    return (
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Toggle State: {on ? "ON" : "OFF"}
                </Typography>
                <Button variant="contained" onClick={() => toggle()}>
                    Toggle
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => toggle(true)}
                    sx={{ ml: 2 }}
                >
                    Set ON
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => toggle(false)}
                    sx={{ ml: 2 }}
                >
                    Set OFF
                </Button>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof ToggleDemo> = {
    title: "Hooks/useToggle",
    component: ToggleDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof ToggleDemo> = {};
