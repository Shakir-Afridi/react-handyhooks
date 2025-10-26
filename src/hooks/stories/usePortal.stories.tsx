import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Button,
    Box,
} from "@mui/material";
import { usePortal } from "../developer/usePortal";

const meta: Meta = {
    title: "Hooks/Developer/usePortal",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const UsePortalDemo = () => {
    const [open, setOpen] = useState(false);
    const Portal = usePortal("storybook-portal-root");

    return (
        <>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h5">Portal Demo</Typography>
                        <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                        >
                            Open Modal
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
            {open &&
                Portal(
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            bgcolor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1300,
                        }}
                        onClick={() => setOpen(false)}
                    >
                        <Box
                            sx={{
                                bgcolor: "background.paper",
                                p: 4,
                                borderRadius: 2,
                                minWidth: 300,
                                boxShadow: 6,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Typography variant="h6" gutterBottom>
                                Hello from Portal!
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </Button>
                        </Box>
                    </Box>
                )}
        </>
    );
};

export const Default: Story = {
    render: () => <UsePortalDemo />,
};
