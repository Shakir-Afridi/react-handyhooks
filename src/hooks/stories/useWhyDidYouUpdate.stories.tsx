import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useWhyDidYouUpdate } from "../developer/useWhyDidYouUpdate";

const meta: Meta = {
    title: "Hooks/Developer/useWhyDidYouUpdate",
    parameters: {
        layout: "centered",
    },
};
export default meta;

type Story = StoryObj;

const DemoChild = React.memo((props: { count: number; label: string }) => {
    useWhyDidYouUpdate("DemoChild", props);
    return (
        <Typography variant="body2" color="text.secondary">
            Child: {props.label} - {props.count}
        </Typography>
    );
});

const UseWhyDidYouUpdateDemo = () => {
    const [count, setCount] = useState(0);
    const [label, setLabel] = useState("A");

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        Why Did You Update Demo
                    </Typography>
                    <DemoChild count={count} label={label} />
                    <Stack direction="row" gap={1}>
                        <Button
                            variant="contained"
                            onClick={() => setCount((c) => c + 1)}
                        >
                            Increment Count
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                setLabel((l) => (l === "A" ? "B" : "A"))
                            }
                        >
                            Toggle Label
                        </Button>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                        Open the browser console to see prop change logs.
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export const Default: Story = {
    render: () => <UseWhyDidYouUpdateDemo />,
};
