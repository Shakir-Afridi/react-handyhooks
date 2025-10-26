---
title: usePreferredLanguage
outline: deep
---

# usePreferredLanguage

A React hook to get the user's preferred language from the browser.

---

## ✨ Overview

`usePreferredLanguage` returns a string like "en-US", "fr-FR", etc.

---

## 📦 Import

```tsx
import { usePreferredLanguage } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { usePreferredLanguage } from 'react-hookstack';

const language = usePreferredLanguage();
console.log(language); // "en-US"
```

## 🧩 API Reference

`usePreferredLanguage(): string`

### Returns

| Type    | Description                  |
| ------- | ---------------------------- |
| string  | Preferred language string.   |

## ⚙️ Implementation

```tsx
import { useState, useEffect } from "react";

export function usePreferredLanguage(): string {
    const [language, setLanguage] = useState<string>(
        navigator.language || "en-US"
    );

    useEffect(() => {
        // Optional: listen for changes in the user's preferred language
        const handleLanguageChange = () => {
            setLanguage(navigator.language || "en-US");
        };

        window.addEventListener("languagechange", handleLanguageChange);

        return () => {
            window.removeEventListener("languagechange", handleLanguageChange);
        };
    }, []);

    return language;
}
```

## 💡 Notes

- Listens for language changes.
- Defaults to "en-US" if unavailable.

## 🧾 Type Definition

```tsx
function usePreferredLanguage(): string;
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Language     | Get browser preferred language    |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
