import { useState, useCallback } from "react";

/**
 * @hook useCookie
 * @description A React hook for reading and updating a browser cookie.
 * Provides a stateful value and a setter function similar to useState.
 *
 * @param {string} key - The name of the cookie to manage.
 * @returns {[string | null, (newValue: string, options?: CookieOptions) => void]}
 * - The current cookie value (or null if not set)
 * - A function to update the cookie
 *
 * @example
 * const [token, setToken] = useCookie("authToken");
 * setToken("123456", { path: "/", expires: 7 }); // set cookie for 7 days
 */

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
