---
title: useCookie
outline: deep
---

# useCookie

A React hook for reading and updating a browser cookie.

---

## ✨ Overview

`useCookie` provides a stateful value and a setter function similar to useState,  
making it easy to read and update cookies in React.

---

## 📦 Import

```tsx
import { useCookie } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useCookie } from 'react-hookstack';

const [token, setToken] = useCookie("authToken");
setToken("123456", { path: "/", expires: 7 }); // set cookie for 7 days
```

## 🧩 API Reference

`useCookie(key: string): [string | null, (newValue: string, options?: CookieOptions) => void]`

### Parameters

| Parameter      | Type   | Description                                 |
| -------------- | ------ | ------------------------------------------- |
| `key`          | string | The name of the cookie to manage.           |

### Returns

| Property      | Type                                   | Description                      |
| ------------- | -------------------------------------- | -------------------------------- |
| `value`       | string \| null                         | Current cookie value.            |
| `setValue`    | (newValue: string, options?: CookieOptions) => void | Setter function.                 |

## ⚙️ Implementation

```tsx
import { useState, useCallback } from "react";
interface CookieOptions {
    path?: string;
    expires?: number | Date;
    domain?: string;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
}

export function useCookie(key: string) {
    const [value, setValue] = useState<string | null>(() => {
        const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
        return match ? decodeURIComponent(match[2]) : null;
    });

    const updateCookie = useCallback(
        (newValue: string, options: CookieOptions = {}) => {
            const { path = "/", expires, domain, secure, sameSite } = options;

            let cookieStr = `${encodeURIComponent(key)}=${encodeURIComponent(
                newValue
            )}; path=${path}`;

            if (expires) {
                if (typeof expires === "number") {
                    const date = new Date();
                    date.setTime(
                        date.getTime() + expires * 24 * 60 * 60 * 1000
                    );
                    cookieStr += `; expires=${date.toUTCString()}`;
                } else {
                    cookieStr += `; expires=${expires.toUTCString()}`;
                }
            }

            if (domain) cookieStr += `; domain=${domain}`;
            if (secure) cookieStr += "; secure";
            if (sameSite) cookieStr += `; samesite=${sameSite}`;

            document.cookie = cookieStr;
            setValue(newValue);
        },
        [key]
    );

    return [value, updateCookie] as const;
}
```

## 💡 Notes

- Supports cookie options (path, expires, domain, secure, sameSite).
- Updates value immediately after setting.

## 🧾 Type Definition

```tsx
interface CookieOptions {
  path?: string;
  expires?: number | Date;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Cookie       | Browser cookie support            |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
