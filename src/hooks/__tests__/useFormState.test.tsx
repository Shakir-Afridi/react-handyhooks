import { renderHook, act } from "@testing-library/react";
import { useFormState } from "../useFormState";

interface FormValues {
    name: string;
    email: string;
    agree: boolean;
}

describe("useFormState hook", () => {
    const initialValues: FormValues = {
        name: "",
        email: "",
        agree: false,
    };

    const validate = (values: FormValues) => {
        const errors: Partial<Record<keyof FormValues, string>> = {};
        if (!values.name) errors.name = "Name is required";
        if (!values.email.includes("@")) errors.email = "Invalid email";
        return errors;
    };

    it("should initialize with initial values and empty states", () => {
        const { result } = renderHook(() =>
            useFormState(initialValues, validate)
        );
        expect(result.current.values).toEqual(initialValues);
        expect(result.current.errors).toEqual({});
        expect(result.current.touched).toEqual({});
        expect(result.current.isSubmitting).toBe(false);
    });

    it("should update values and errors on handleChange", () => {
        const { result } = renderHook(() =>
            useFormState(initialValues, validate)
        );

        act(() => {
            result.current.handleChange({
                target: { name: "name", value: "John", type: "text" },
            } as any);
        });

        expect(result.current.values.name).toBe("John");
        expect(result.current.errors.name).toBeUndefined();

        act(() => {
            result.current.handleChange({
                target: { name: "email", value: "invalidemail", type: "text" },
            } as any);
        });

        expect(result.current.values.email).toBe("invalidemail");
        expect(result.current.errors.email).toBe("Invalid email");
    });

    it("should mark fields as touched on handleBlur", () => {
        const { result } = renderHook(() =>
            useFormState(initialValues, validate)
        );

        act(() => {
            result.current.handleBlur({ target: { name: "name" } } as any);
        });

        expect(result.current.touched.name).toBe(true);
        expect(result.current.errors.name).toBe("Name is required");
    });

    it("should handle form submission successfully", async () => {
        const { result } = renderHook(() =>
            useFormState(initialValues, validate)
        );

        const onSubmit = jest.fn();

        // Fill in valid values
        act(() => {
            result.current.handleChange({
                target: { name: "name", value: "Alice", type: "text" },
            } as any);
            result.current.handleChange({
                target: {
                    name: "email",
                    value: "alice@example.com",
                    type: "text",
                },
            } as any);
        });

        await act(async () => {
            await result.current.handleSubmit(onSubmit)({
                preventDefault: jest.fn(),
            } as any);
        });

        expect(onSubmit).toHaveBeenCalledWith(result.current.values);
        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.errors).toEqual({});
    });

    it("should not submit if validation errors exist", async () => {
        const { result } = renderHook(() =>
            useFormState(initialValues, validate)
        );
        const onSubmit = jest.fn();

        // Email invalid
        act(() => {
            result.current.handleChange({
                target: { name: "email", value: "invalid", type: "text" },
            } as any);
        });

        await act(async () => {
            await result.current.handleSubmit(onSubmit)({
                preventDefault: jest.fn(),
            } as any);
        });

        expect(onSubmit).not.toHaveBeenCalled();
        expect(result.current.isSubmitting).toBe(false);
        expect(result.current.errors.email).toBe("Invalid email");
    });

    it("should reset form state correctly", () => {
        const { result } = renderHook(() =>
            useFormState(initialValues, validate)
        );

        // Change some values and touched
        act(() => {
            result.current.handleChange({
                target: { name: "name", value: "Bob", type: "text" },
            } as any);
            result.current.handleBlur({ target: { name: "name" } } as any);
        });

        act(() => {
            result.current.resetForm();
        });

        expect(result.current.values).toEqual(initialValues);
        expect(result.current.errors).toEqual({});
        expect(result.current.touched).toEqual({});
        expect(result.current.isSubmitting).toBe(false);
    });

    it("should handle checkbox changes correctly", () => {
        const { result } = renderHook(() =>
            useFormState(initialValues, validate)
        );

        // Create a real checkbox input element
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "agree";
        checkbox.checked = true;

        act(() => {
            result.current.handleChange({ target: checkbox } as any);
        });

        expect(result.current.values.agree).toBe(true);
    });
});
