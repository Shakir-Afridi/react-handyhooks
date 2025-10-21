import { useState, useCallback } from "react";

/**
 * useFormState Hook
 *
 * A powerful hook to manage form data, validation, and submission.
 *
 * @template T - Type of the form data object
 *
 * @param initialValues - Initial form values
 * @param validate - Optional validation function that returns errors
 *
 * @returns {{
 *   values: T;
 *   errors: Partial<Record<keyof T, string>>;
 *   touched: Partial<Record<keyof T, boolean>>;
 *   isSubmitting: boolean;
 *   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
 *   handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
 *   handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e: React.FormEvent) => void;
 *   resetForm: () => void;
 * }}
 *
 * @example
 * const { values, errors, handleChange, handleSubmit } = useFormState(
 *   { name: '', email: '' },
 *   (values) => {
 *     const errors: any = {};
 *     if (!values.name) errors.name = 'Name is required';
 *     if (!values.email.includes('@')) errors.email = 'Invalid email';
 *     return errors;
 *   }
 * );
 *
 * return (
 *   <form onSubmit={handleSubmit((vals) => console.log(vals))}>
 *     <input name="name" value={values.name} onChange={handleChange} />
 *     {errors.name && <span>{errors.name}</span>}
 *
 *     <input name="email" value={values.email} onChange={handleChange} />
 *     {errors.email && <span>{errors.email}</span>}
 *
 *     <button type="submit">Submit</button>
 *   </form>
 * );
 */
export function useFormState<T extends Record<string, any>>(
    initialValues: T,
    validate?: (values: T) => Partial<Record<keyof T, string>>
) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>(
        {}
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback(
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            const target = e.target;
            const { name, value, type } = target;
            const fieldValue =
                target instanceof HTMLInputElement && type === "checkbox"
                    ? target.checked
                    : value;

            setValues((prev) => ({ ...prev, [name]: fieldValue }));
            if (validate)
                setErrors(validate({ ...values, [name]: fieldValue }));
        },
        [validate, values]
    );

    const handleBlur = useCallback(
        (
            e: React.FocusEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            const { name } = e.target;
            setTouched((prev) => ({ ...prev, [name]: true }));
            if (validate) setErrors(validate(values));
        },
        [validate, values]
    );

    const handleSubmit = useCallback(
        (onSubmit: (values: T) => void | Promise<void>) =>
            async (e: React.FormEvent) => {
                e.preventDefault();
                setIsSubmitting(true);
                if (validate) {
                    const validationErrors = validate(values);
                    setErrors(validationErrors);
                    const hasErrors = Object.keys(validationErrors).length > 0;
                    if (hasErrors) {
                        setIsSubmitting(false);
                        return;
                    }
                }
                await onSubmit(values);
                setIsSubmitting(false);
            },
        [validate, values]
    );

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
    };
}
