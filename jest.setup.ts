Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: query === "(prefers-color-scheme: dark)" ? false : false, // default value
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(), // legacy
        removeListener: jest.fn(), // legacy
        dispatchEvent: jest.fn(),
    }),
});
