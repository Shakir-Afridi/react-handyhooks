import { useEffect, useState } from "react";

/**
 * @hook useIdle
 * @description Detects when the user has been idle for a specified timeout duration.
 * Listens to user activity events such as mouse movements and key presses.
 *
 * @param {number} timeout - Time in milliseconds after which the user is considered idle.
 * @returns {boolean} - Returns `true` if the user is idle, `false` otherwise.
 *
 * @example
 * const isIdle = useIdle(3000);
 * console.log(isIdle ? "User is idle" : "User is active");
 */
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
