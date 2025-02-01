// jest.config.js
module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Transform JS and JSX files with babel-jest
    },
    moduleNameMapper: {
        // If you have styles or images imported in your components
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.js', // Add the path to your setupTests.js file
        '<rootDir>/jest.setup.js' // Path to the global setup file (add this line)
    ],
    testEnvironment: 'jsdom', // Use jsdom as the test environment
};