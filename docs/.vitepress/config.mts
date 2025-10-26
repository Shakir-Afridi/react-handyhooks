import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "React Hookstack",
    description:
        "A lightweight and powerful collection of reusable React hooks designed to simplify state management, event handling, and UI logic in your React apps.",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Documentation", link: "/state/useArray" },
        ],

        sidebar: [
            {
                text: "State Hook",
                collapsed: false,
                items: [
                    { text: "useArray", link: "/state/useArray" },
                    { text: "useBoolean", link: "/state/useBoolean" },
                    { text: "useCounter", link: "/state/useCounter" },
                    { text: "useFormState", link: "/state/useFormState" },
                    { text: "useMap", link: "/state/useMap" },
                    { text: "useToggle", link: "/state/useToggle" },
                    { text: "useMergeState", link: "/state/useMergeState" },
                    { text: "usePrevious", link: "/state/usePrevious" },
                    {
                        text: "usePreviousDistinct",
                        link: "/state/usePreviousDistinct",
                    },
                    { text: "useRefState", link: "/state/useRefState" },
                    {
                        text: "useReducerWithLogger",
                        link: "/state/useReducerWithLogger",
                    },
                    { text: "useToggleSet", link: "/state/useToggleSet" },
                    { text: "useUndoRedo", link: "/state/useUndoRedo" },
                ],
            },
            {
                text: "Effect Hook",
                collapsed: true,
                items: [
                    { text: "useDebounce", link: "/effect/useDebounce" },
                    { text: "useInterval", link: "/effect/useInterval" },
                    { text: "useTimeout", link: "/effect/useTimeout" },
                ],
            },
            {
                text: "UI Hook",
                collapsed: true,
                items: [
                    {
                        text: "useDocumentTitle",
                        link: "/ui/useDocumentTitle",
                    },
                    {
                        text: "useElementSize",
                        link: "/ui/useElementSize",
                    },
                    { text: "useHover", link: "/ui/useHover" },
                    { text: "useMediaQuery", link: "/ui/useMediaQuery" },
                    { text: "useWindowSize", link: "/ui/useWindowSize" },
                ],
            },
            {
                text: "Storage Hook",
                collapsed: true,
                items: [
                    {
                        text: "useLocalStorage",
                        link: "/storage/useLocalStorage",
                    },
                    {
                        text: "useSessionStorage",
                        link: "/storage/useSessionStorage",
                    },
                ],
            },
            {
                text: "Performance Hook",
                collapsed: true,
                items: [
                    { text: "useAsync", link: "/performance/useAsync" },
                    { text: "useFetch", link: "/performance/useFetch" },
                    {
                        text: "useMemoizedFn",
                        link: "/performance/useMemoizedFn",
                    },
                ],
            },
            {
                text: "Developer Hook",
                collapsed: true,
                items: [
                    { text: "useLogger", link: "/developer/useLogger" },
                    {
                        text: "useWhyDidYouUpdate",
                        link: "/developer/useWhyDidYouUpdate",
                    },
                ],
            },
            {
                text: "Network Hook",
                collapsed: true,
                items: [
                    {
                        text: "useOnlineStatus",
                        link: "/network/useOnlineStatus",
                    },
                ],
            },
            {
                text: "Browser Hook",
                collapsed: true,
                items: [
                    { text: "useClipboard", link: "/browser/useClipboard" },
                    { text: "useGeolocation", link: "/browser/useGeolocation" },
                ],
            },
            {
                text: "System Hook",
                collapsed: true,
                items: [
                    { text: "useBattery", link: "/system/useBattery" },
                    { text: "useDarkMode", link: "/system/useDarkMode" },
                ],
            },
        ],
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/Shakir-Afridi/react-handyhooks",
            },
            {
                icon: "npm",
                link: "https://www.npmjs.com/package/react-hookstack",
            },
            {
                icon: {
                    svg: `
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FF4785" d="M23.86 0v24H.14V0zM19.97 2.47l-.08 2.35a.34.34 0 0 0 .56.28l.76-.57.74.54a.33.33 0 0 0 .53-.26l.1-2.36a.33.33 0 0 0-.34-.34h-2.03a.33.33 0 0 0-.34.36zm-2.23 10.55a.37.37 0 0 1 .37.37v5.44a.37.37 0 0 1-.37.37h-.76a.37.37 0 0 1-.36-.31l-.33-2.07-2.34.29-.4 1.77a.37.37 0 0 1-.37.31h-.78a.37.37 0 0 1-.37-.37V13.4a.37.37 0 0 1 .37-.37zm-6.7-.02a.37.37 0 0 1 .37.37v3.45c0 .2.16.36.36.36h2.54a.37.37 0 0 1 .36.37v.74a.37.37 0 0 1-.36.37H9.77a.37.37 0 0 1-.37-.37V13.4a.37.37 0 0 1 .37-.37zm3.77-4.77a1.11 1.11 0 1 1-1.11-1.11 1.1 1.1 0 0 1 1.11 1.11z"/>
                  </svg>
                `,
                },
                link: "https://shakir-afridi.github.io/react-handy",
            },
        ],
    },
});
