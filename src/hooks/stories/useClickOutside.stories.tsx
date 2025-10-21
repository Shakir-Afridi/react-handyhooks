import React, { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useClickOutside } from "../useClickOutside";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const ClickOutsideDemo = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(true);

    useClickOutside(ref, () => setOpen(false));

    return (
        <Box>
            <Typography sx={{ mb: 2 }}>
                Click outside the box to close it.
            </Typography>
            {open ? (
                <Card ref={ref} sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography>Click outside me!</Typography>
                    </CardContent>
                </Card>
            ) : (
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Reopen Box
                </Button>
            )}
        </Box>
    );
};

const meta: Meta<typeof ClickOutsideDemo> = {
    title: "Hooks/useClickOutside",
    component: ClickOutsideDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof ClickOutsideDemo> = {};
