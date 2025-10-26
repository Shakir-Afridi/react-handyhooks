---
title: useFormState
outline: deep
---

# useFormState

A powerful React hook for managing form state, validation, and submission — designed to simplify controlled form handling and improve maintainability.

---

## 🧩 Overview

`useFormState` provides a simple yet robust way to manage form values, errors, touched fields, and submission state.  
It is a lightweight alternative to form libraries like Formik or React Hook Form, suitable for small to medium forms that need controlled state and validation.

---

## 🚀 Usage

```tsx
import { useFormState } from "your-library";

function SignupForm() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } =
    useFormState(
      { name: "", email: "" },
      (values) => {
        const errors: Record<string, string> = {};
        if (!values.name) errors.name = "Name is required";
        if (!values.email.includes("@")) errors.email = "Invalid email";
        return errors;
      }
    );

  return (
    <form onSubmit={handleSubmit(async (vals) => console.log("Submitted:", vals))}>
      <div>
        <label>Name</label>
        <input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
        {touched.name && errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <label>Email</label>
        <input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
        {touched.email && errors.email && <span>{errors.email}</span>}
      </div>

      <button type="submit">Submit</button>
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
}
```

## ⚙️ API Reference

`useFormState<T>(initialValues: T, validate?: (values: T) => Partial<Record<keyof T, string>>)`

### Parameters

| Name            | Type                                              | Required | Description                                                |
| --------------- | ------------------------------------------------- | -------- | ---------------------------------------------------------- |
| `initialValues` | `T`                                               | ✅        | The initial object of form field values.                   |
| `validate`      | `(values: T) => Partial<Record<keyof T, string>>` | ❌        | Optional validation function that returns a map of errors. |

### Returns

| Property       | Type                                    | Description                                         |
| -------------- | --------------------------------------- | --------------------------------------------------- |
| `values`       | `T`                                     | The current state of all form field values.         |
| `errors`       | `Partial<Record<keyof T, string>>`      | The current validation errors for each field.       |
| `touched`      | `Partial<Record<keyof T, boolean>>`     | Tracks whether each field has been interacted with. |
| `isSubmitting` | `boolean`                               | Indicates whether the form is currently submitting. |
| `handleChange` | `(e: React.ChangeEvent<HTMLInputElement \| HTMLTextAreaElement                                 \| HTMLSelectElement>) => void`                                             | Updates a field value when changed.
| `handleBlur`   | `(e: React.FocusEvent<HTMLInputElement  \| HTMLTextAreaElement                                 \| HTMLSelectElement>) => void`                                             | Marks a field as touched and revalidates it.
| `handleSubmit` | `(onSubmit: (values: T) => void         \| Promise<void>) => (e: React.FormEvent) => void`     | Wraps your submit handler with built-in validation and submission logic. |
| `resetForm`    | `() => void`                            | Resets the form to its initial state.               |

## 🧠 Example Use Cases

- Controlled Forms: Keep full control over form fields and validation.
- Dynamic Field Validation: Run validation logic dynamically on change or blur.
- Asynchronous Submissions: Perfect for async form handlers (e.g., API calls).
- Reusable Form Logic: Build reusable form hooks for multiple forms.

## 💡 Tips

- The validate function can be synchronous or asynchronous.
- Combine useFormState with useBoolean to handle form submission states or modals.
- Supports checkbox inputs — automatically handles boolean checked values.
- For complex validations, consider schema validators (like Yup) within the validate function.

## 🧱 Implementation

```tsx
import { useState, useCallback } from "react";

export function useFormState<T extends Record<string, any>>(
  initialValues: T,
  validate?: (values: T) => Partial<Record<keyof T, string>>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const target = e.target;
      const { name, value, type } = target;
      const fieldValue =
        target instanceof HTMLInputElement && type === "checkbox"
          ? target.checked
          : value;

      setValues((prev) => ({ ...prev, [name]: fieldValue }));
      if (validate) setErrors(validate({ ...values, [name]: fieldValue }));
    },
    [validate, values]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
```