---
title: useCounter
outline: deep
---

# useCounter

A React hook for managing numeric state with increment, decrement, reset, and custom set capabilities.

---

## 🧩 Overview

`useCounter` simplifies handling numeric state, especially for counters, pagination, score tracking, or quantity adjustments.  
It provides helpful methods for incrementing, decrementing, resetting, and directly setting values — with optional `min`, `max`, and `step` limits.

---

## 🚀 Usage

```tsx
import { useCounter } from "your-library";

function CounterExample() {
  const { count, increment, decrement, reset, set } = useCounter(0, {
    min: 0,
    max: 10,
    step: 2,
  });

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => set(5)}>Set to 5</button>
    </div>
  );
}
```

## ⚙️ API Reference

`useCounter(initialValue?: number, options?: UseCounterOptions): UseCounterReturn`

### Parameters

| Name           | Type                | Default | Description                               |
| -------------- | ------------------- | ------- | ----------------------------------------- |
| `initialValue` | `number`            | `0`     | The initial counter value.                |
| `options`      | `UseCounterOptions` | `{}`    | Optional settings for min, max, and step. |


### UseCounterOptions

| Property | Type     | Default     | Description                            |
| -------- | -------- | ----------- | -------------------------------------- |
| `min`    | `number` | `undefined` | Minimum allowed value.                 |
| `max`    | `number` | `undefined` | Maximum allowed value.                 |
| `step`   | `number` | `1`         | The step size for increment/decrement. |

### Returns

| Property    | Type                      | Description                                                            |
| ----------- | ------------------------- | ---------------------------------------------------------------------- |
| `count`     | `number`                  | The current counter value.                                             |
| `increment` | `() => void`              | Increases the counter by the defined step (up to `max` if provided).   |
| `decrement` | `() => void`              | Decreases the counter by the defined step (down to `min` if provided). |
| `reset`     | `() => void`              | Resets the counter to its initial value.                               |
| `set`       | `(value: number) => void` | Manually sets the counter to a specific value.                         |

## 🧠 Example Use Cases

- Managing quantity selectors in shopping carts
- Tracking pagination or current step in a flow
- Implementing score counters in games or quizzes
- Building numeric input controls with step adjustments

## 💡 Tips

- Use min and max to keep your counter within safe bounds.
- Adjust step for smoother or larger increments.
- Combine with useBoolean to toggle enabled/disabled state for controls.

## 🧱 Implementation

```tsx
import { useCallback, useState } from "react";

export interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

export function useCounter(
  initialValue: number = 0,
  options: UseCounterOptions = {}
): UseCounterReturn {
  const { min, max, step = 1 } = options;
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + step;
      if (max !== undefined && next > max) return max;
      return next;
    });
  }, [max, step]);

  const decrement = useCallback(() => {
    setCount((prev) => {
      const next = prev - step;
      if (min !== undefined && next < min) return min;
      return next;
    });
  }, [min, step]);

  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  const set = useCallback((value: number) => setCount(value), []);

  return { count, increment, decrement, reset, set };
}

export default useCounter;
```

## 🧾 Type Definition

```tsx
type UseCounterReturn = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}
```
