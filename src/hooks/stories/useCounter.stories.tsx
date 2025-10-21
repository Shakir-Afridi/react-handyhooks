import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { useCounter } from "../useCounter";

const CounterDemo = () => {
    const { count, increment, decrement } = useCounter();
    return (
        <div style={{ padding: 20 }}>
            <h3>Count: {count}</h3>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

const meta: Meta<typeof CounterDemo> = {
    title: "Hooks/useCounter",
    component: CounterDemo,
};

export default meta;
export const Default: StoryObj<typeof CounterDemo> = {};
