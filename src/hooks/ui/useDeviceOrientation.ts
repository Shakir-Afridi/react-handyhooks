import { useState, useEffect } from "react";

interface DeviceOrientation {
    alpha: number | null; // Rotation around the z-axis (0 to 360 degrees)
    beta: number | null; // Rotation around the x-axis (-180 to 180 degrees)
    gamma: number | null; // Rotation around the y-axis (-90 to 90 degrees)
    absolute: boolean | null; // Whether the orientation is absolute (true) or relative
}

/**
 * useDeviceOrientation Hook
 * Tracks the physical orientation of the device (alpha, beta, gamma)
 * using the DeviceOrientationEvent API.
 *
 * @returns {DeviceOrientation} Current orientation angles and absolute flag
 *
 * @example
 * const { alpha, beta, gamma, absolute } = useDeviceOrientation();
 * console.log(alpha, beta, gamma);
 */
export function useDeviceOrientation(): DeviceOrientation {
    const [orientation, setOrientation] = useState<DeviceOrientation>({
        alpha: null,
        beta: null,
        gamma: null,
        absolute: null,
    });

    useEffect(() => {
        const handleOrientation = (event: DeviceOrientationEvent) => {
            setOrientation({
                alpha: event.alpha ?? null,
                beta: event.beta ?? null,
                gamma: event.gamma ?? null,
                absolute: event.absolute ?? null,
            });
        };

        // Check if the browser supports device orientation events
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleOrientation);
        } else {
            console.warn(
                "DeviceOrientationEvent is not supported by this browser."
            );
        }

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    return orientation;
}
