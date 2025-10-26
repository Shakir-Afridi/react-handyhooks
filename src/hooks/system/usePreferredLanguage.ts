import { useState, useEffect } from "react";

/**
 * usePreferredLanguage
 * A custom React hook to get the user's preferred language from the browser.
 * Returns a string like "en-US", "fr-FR", etc.
 *
 * @example
 * const language = usePreferredLanguage();
 * console.log(language); // "en-US"
 */
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
