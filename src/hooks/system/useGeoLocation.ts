import { useState, useEffect } from "react";

/**
 * useGeolocation
 * A custom React hook to access the browser's Geolocation API.
 * Returns the current position of the device, including:
 * - coords.latitude
 * - coords.longitude
 * - coords.accuracy
 * - timestamp
 *
 * Note: User permission is required to access location.
 *
 * @example
 * const position = useGeolocation();
 * console.log(position?.coords.latitude, position?.coords.longitude);
 */
export function useGeolocation() {
    // State to store the geolocation position
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const [error, setError] = useState<GeolocationPositionError | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.warn("Geolocation API is not supported in this browser.");
            return;
        }

        // Success callback
        const handleSuccess = (pos: GeolocationPosition) => setPosition(pos);

        // Error callback
        const handleError = (err: GeolocationPositionError) => setError(err);

        // Options for geolocation
        const options: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 10000, // 10 seconds
            maximumAge: 0,
        };

        // Get the current position
        const watchId = navigator.geolocation.watchPosition(
            handleSuccess,
            handleError,
            options
        );

        // Cleanup: stop watching position on unmount
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return { position, error };
}
