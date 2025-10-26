---
title: useInput
outline: deep
---

# useInput

A React hook for **managing input value, validation, and change events**.

---

## ✨ Overview

`useInput` simplifies handling form input state, validation, and change events in React.  
It provides a value, error, change handler, and reset function.

---

## 📦 Import

```tsx
import { useInput } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useInput } from 'react-hookstack';

function Example() {
  const name = useInput('', (val) => !val ? 'Name is required' : undefined);

  return (
    <div>
      <input {...name} placeholder="Enter your name" />
      {name.error && <span style={{ color: 'red' }}>{name.error}</span>}
      <button onClick={name.reset}>Reset</button>
    </div>
  );
}
```

## 🧩 API Reference

`useInput(initialValue?: string, validate?: (value: string) => string | undefined): { value: string; error?: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; reset: () => void; setValue: React.Dispatch<React.SetStateAction<string>> }`

### Parameters

| Parameter      | Type                                   | Description                                 |
| -------------- | -------------------------------------- | ------------------------------------------- |
| `initialValue` | `string`                               | The initial value of the input field.       |
| `validate`     | `(value: string) => string \| undefined`| Optional validation function.               |

### Returns

| Property   | Type                                                        | Description                                 |
| ---------- | ----------------------------------------------------------- | ------------------------------------------- |
| `value`    | `string`                                                    | Current input value.                        |
| `error`    | `string \| undefined`                                       | Validation error message, if any.           |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void` | Change handler for input.                   |
| `reset`    | `() => void`                                                | Resets value and error.                     |
| `setValue` | `React.Dispatch<React.SetStateAction<string>>`              | Setter for value.                           |

## ⚙️ Implementation

```tsx
import { useState, useCallback } from "react";

export function useInput(
    initialValue: string = "",
    validate?: (value: string) => string | undefined
) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState<string | undefined>();

    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const newValue = e.target.value;
            setValue(newValue);

            if (validate) {
                const validationError = validate(newValue);
                setError(validationError);
            }
        },
        [validate]
    );

    const reset = useCallback(() => {
        setValue(initialValue);
        setError(undefined);
    }, [initialValue]);

    return { value, error, onChange, reset, setValue };
}
```

## 💡 Notes

- Supports both input and textarea elements.
- Validation is optional and runs on every change.
- Returns a full set of helpers for input management.

## 🧾 Type Definition

```tsx
function useInput(
  initialValue?: string,
  validate?: (value: string) => string | undefined
): {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  reset: () => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
```

## 🧭 Summary

| Feature                 | Description                        |
| ----------------------- | ---------------------------------- |
| 📝 Input management     | Handles value, error, change, reset|
| 🧩 Generic support      | Works for input and textarea       |
| ⚡ Lightweight           | No dependencies                    |
| 🧠 Intuitive            | Simple API                         |
