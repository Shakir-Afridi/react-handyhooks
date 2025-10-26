---
title: useIdle
outline: deep
---

# useIdle

A React hook to detect when the user has been idle for a specified timeout duration.

---

## ✨ Overview

`useIdle` listens to user activity events such as mouse movements and key presses,  
and returns `true` if the user is idle, `false` otherwise.

---

## 📦 Import

```tsx
import useIdle from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import useIdle from 'react-hookstack';

const isIdle = useIdle(3000);
console.log(isIdle ? "User is idle" : "User is active");
```

## 🧩 API Reference

`useIdle(timeout: number): boolean`

### Parameters

| Parameter   | Type     | Description                                 |
| ----------- | -------- | ------------------------------------------- |
| `timeout`   | number   | Time in milliseconds before considered idle.|

### Returns

| Type    | Description                  |
| ------- | ---------------------------- |
| boolean | `true` if idle, `false` otherwise.|

## ⚙️ Implementation

```tsx
import { useEffect, useState } from "react";

const useIdle = (timeout: number): boolean => {
    const [isIdle, setIsIdle] = useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleActivity = () => {
            clearTimeout(timer);
            setIsIdle(false);
            timer = setTimeout(() => setIsIdle(true), timeout);
        };

        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);

        timer = setTimeout(() => setIsIdle(true), timeout);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
        };
    }, [timeout]);

    return isIdle;
};

export default useIdle;
```

## 💡 Notes

- Automatically resets idle timer on user activity.
- Cleans up listeners on unmount.

## 🧾 Type Definition

```tsx
function useIdle(timeout: number): boolean;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Idle detect  | Tracks user inactivity            |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
