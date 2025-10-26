module.exports = {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // <- runs before tests
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
