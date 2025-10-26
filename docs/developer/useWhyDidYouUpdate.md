---
title: useWhyDidYouUpdate
outline: deep
---

# useWhyDidYouUpdate

A React hook for debugging re-renders by logging which props changed between renders and why a component updated.

---

## ✨ Overview

`useWhyDidYouUpdate` helps developers understand why a component re-rendered by logging the differences between previous and current props.  
It is intended for development/debugging and should not be used in production.

---

## 📦 Import

```tsx
import { useWhyDidYouUpdate } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useWhyDidYouUpdate } from 'react-hookstack';

function MyComponent(props) {
  useWhyDidYouUpdate("MyComponent", props);
  return <div>{props.value}</div>;
}
```

## 🧩 API Reference

`useWhyDidYouUpdate(name: string, props: Record<string, any>): void`

### Parameters

| Parameter | Type                | Description                                 |
| --------- | ------------------- | ------------------------------------------- |
| `name`    | string              | The display name of the component.          |
| `props`   | Record<string, any> | The current props object to track changes.  |

### Returns

| Type |
| ---- |
| void |

## ⚙️ Implementation

```tsx
import { useRef, useEffect } from "react";

export function useWhyDidYouUpdate(
    name: string,
    props: Record<string, any>
): void {
    const prevProps = useRef<Record<string, any>>(props);

    useEffect(() => {
        const allKeys = Object.keys({ ...prevProps.current, ...props });
        const changesObj: Record<string, { from: any; to: any }> = {};

        allKeys.forEach((key) => {
            if (prevProps.current[key] !== props[key]) {
                changesObj[key] = {
                    from: prevProps.current[key],
                    to: props[key],
                };
            }
        });

        if (Object.keys(changesObj).length > 0) {
            if (process.env.NODE_ENV === "development") {
                // eslint-disable-next-line no-console
                console.log(
                    `%c[why-did-you-update] ${name}`,
                    "color: #00bcd4; font-weight: bold;",
                    changesObj
                );
            }
        }

        prevProps.current = props;
    }, [name, props]);
}
```

## 💡 Notes

- Only logs in development mode.
- Useful for tracking unnecessary re-renders and optimizing performance.

## 🧾 Type Definition

```tsx
function useWhyDidYouUpdate(name: string, props: Record<string, any>): void;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Debug helper | Logs prop changes for debugging   |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
