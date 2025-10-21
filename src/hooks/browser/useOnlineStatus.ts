import { useEffect, useState } from "react";

/**
 * useOnlineStatus Hook
 *
 * Detects the user's current online/offline status and updates reactively.
 *
 * @returns boolean - true if the user is online, false if offline
 *
 * @example
 * const isOnline = useOnlineStatus();
 * console.log(isOnline ? "🟢 Online" : "🔴 Offline");
 */
export function useOnlineStatus(): boolean {
    const [isOnline, setIsOnline] = useState<boolean>(
        typeof navigator !== "undefined" ? navigator.onLine : true
    );

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Set the initial status
        setIsOnline(navigator.onLine);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return isOnline;
}
