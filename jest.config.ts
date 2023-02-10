import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  coveragePathIgnorePatterns: [
    "node_modules",
    "<rootDir>/src/generated/*",
    "<rootDir>/src/api.ts",
  ],
};

module.exports = createJestConfig(customJestConfig);
