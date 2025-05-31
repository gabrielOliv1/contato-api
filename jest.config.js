module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/*.test.ts'],
    coveragePathIgnorePatterns: [
      '/node_modules/'
    ],
    setupFilesAfterEnv: ['./src/tests/setup.ts'],
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.json'
      }
    }
  };