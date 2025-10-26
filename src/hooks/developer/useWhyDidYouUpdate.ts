/**
 * @file useWhyDidYouUpdate.ts
 * @description
 * A custom React hook for debugging re-renders by logging which props
 * changed between renders and why a component updated.
 *
 * This hook is *only* intended for development/debugging use
 * and should not be included in production builds.
 *
 * @example
 * function MyComponent(props) {
 *   useWhyDidYouUpdate("MyComponent", props);
 *   return <div>{props.value}</div>;
 * }
 */

import { useRef, useEffect } from "react";

/**
 * Logs the differences between the current and previous props of a component.
 *
 * @param name - The display name of the component (for clearer console output).
 * @param props - The current props object to track changes on.
 */
export function useWhyDidYouUpdate(
    name: string,
    props: Record<string, any>
): void {
    const prevProps = useRef<Record<string, any>>(props);

    useEffect(() => {
        const allKeys = Object.keys({ ...prevProps.current, ...props });
        const changesObj: Record<string, { from: any; to: any }> = {};

        allKeys.forEach((key) => {
            if (prevProps.current[key] !== props[key]) {
                changesObj[key] = {
                    from: prevProps.current[key],
                    to: props[key],
                };
            }
        });

        if (Object.keys(changesObj).length > 0) {
            // Only log in development mode to avoid cluttering production logs
            if (process.env.NODE_ENV === "development") {
                // eslint-disable-next-line no-console
                console.log(
                    `%c[why-did-you-update] ${name}`,
                    "color: #00bcd4; font-weight: bold;",
                    changesObj
                );
            }
        }

        prevProps.current = props;
    }, [name, props]);
}
