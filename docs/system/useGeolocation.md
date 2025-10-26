---
title: useGeolocation
outline: deep
---

# useGeolocation

A React hook to access the browser's Geolocation API.

---

## ✨ Overview

`useGeolocation` returns the current position of the device, including latitude, longitude, accuracy, and timestamp.

---

## 📦 Import

```tsx
import { useGeolocation } from 'react-hookstack';
```

## 🚀 Usage Example

```tsx
import { useGeolocation } from 'react-hookstack';

const { position, error } = useGeolocation();
console.log(position?.coords.latitude, position?.coords.longitude);
```

## 🧩 API Reference

`useGeolocation(): { position: GeolocationPosition | null, error: GeolocationPositionError | null }`

### Returns

| Property   | Type                          | Description                      |
| ---------- | ----------------------------- | -------------------------------- |
| `position` | GeolocationPosition \| null   | Current position.                |
| `error`    | GeolocationPositionError \| null | Error if any.                  |

## ⚙️ Implementation

```tsx
import { useState, useEffect } from "react";

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
```

## 💡 Notes

- Requires user permission.
- Cleans up watcher on unmount.

## 🧾 Type Definition

```tsx
function useGeolocation(): {
  position: GeolocationPosition | null;
  error: GeolocationPositionError | null;
};
```

## 🧭 Summary

| Feature         | Description                       |
| --------------- | --------------------------------- |
| 🧱 Geolocation  | Access device location            |
| ⚡ Lightweight   | No dependencies                  |
| 🧠 Intuitive    | Simple API surface               |
