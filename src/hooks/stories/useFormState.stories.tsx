import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useFormState } from "../state/useFormState";
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

const FormDemo = () => {
    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
    } = useFormState({ name: "", email: "" }, (vals) => {
        const errs: any = {};
        if (!vals.name) errs.name = "Name is required";
        if (!vals.email.includes("@")) errs.email = "Invalid email";
        return errs;
    });

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Form State Demo
                </Typography>
                <form
                    onSubmit={handleSubmit(async (v) => {
                        alert(`Submitted: ${JSON.stringify(v)}`);
                    })}
                >
                    <TextField
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.name && touched.name}
                        helperText={touched.name && errors.name}
                        sx={{ mb: 2, mr: 2 }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.email && touched.email}
                        helperText={touched.email && errors.email}
                        sx={{ mb: 2 }}
                    />
                    <div>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{ mr: 2 }}
                        >
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={resetForm}>
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

const meta: Meta<typeof FormDemo> = {
    title: "Hooks/useFormState",
    component: FormDemo,
    parameters: {
        layout: "centered",
    },
};

export default meta;
export const Default: StoryObj<typeof FormDemo> = {};
