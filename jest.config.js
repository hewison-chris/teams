module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'],
    testMatch: ['**/test/**/*.test.ts'],  // Point Jest to the 'tests' folder
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleFileExtensions: ['ts', 'tsx', "js", "mjs", "cjs", "jsx", "json", "node"],
};
