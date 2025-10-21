import { useState, useCallback } from "react";

/**
 * useInput Hook
 *
 * Manages input value, validation, and change events.
 *
 * @param {string} initialValue - The initial value of the input field.
 * @param {(value: string) => string | undefined} [validate] - Optional validation function that returns an error message.
 *
 * @returns {{
 *   value: string;
 *   error?: string;
 *   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
 *   reset: () => void;
 *   setValue: React.Dispatch<React.SetStateAction<string>>;
 * }}
 *
 * @example
 * const name = useInput('', (val) => !val ? 'Name is required' : undefined);
 *
 * return (
 *   <div>
 *     <input {...name} placeholder="Enter your name" />
 *     {name.error && <span style={{ color: 'red' }}>{name.error}</span>}
 *     <button onClick={name.reset}>Reset</button>
 *   </div>
 * );
 */
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
